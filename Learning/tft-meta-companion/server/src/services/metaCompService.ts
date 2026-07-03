import { prisma } from "../lib/prisma.js";
import {
  getStaticAugments,
  getStaticChampions,
  getStaticItems,
} from "./staticDataService.js";
import type { CreateMetaCompFromNamesInput } from "../types/metaComp.js";

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

function findByName<T extends { name: string }>(items: T[], name: string) {
  const normalizedName = normalizeName(name);

  return items.find((item) => normalizeName(item.name) === normalizedName);
}
export async function getMetaComps() {
  return prisma.metaComp.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}
export async function createMetaCompFromNames(
  input: CreateMetaCompFromNamesInput,
) {
  const [champions, items, augments] = await Promise.all([
    getStaticChampions(),
    getStaticItems(),
    getStaticAugments(),
  ]);

  const resolvedUnits = input.units.map((unit) => {
    const champion = findByName(champions, unit.championName);

    if (!champion) {
      throw new Error(`Champion not found: ${unit.championName}`);
    }

    const itemIds = unit.itemNames.map((itemName) => {
      const item = findByName(items, itemName);

      if (!item) {
        throw new Error(`Item not found: ${itemName}`);
      }

      return item.id;
    });

    return {
      championId: champion.id,
      itemIds,
    };
  });

  const recommendedAugments = input.recommendedAugmentNames.map(
    (augmentName) => {
      const augment = findByName(augments, augmentName);

      if (!augment) {
        throw new Error(`Augment not found: ${augmentName}`);
      }

      return augment.id;
    },
  );

  return prisma.metaComp.create({
    data: {
      name: input.name,
      tier: input.tier,
      difficulty: input.difficulty,
      type: input.type,
      plannerUrl: input.plannerUrl,
      avgPlacement: input.avgPlacement,
      top4Rate: input.top4Rate,
      winRate: input.winRate,
      playRate: input.playRate,
      units: resolvedUnits,
      recommendedAugments,
    },
  });
}

export async function getResolvedMetaComps() {
  const [metaComps, champions, items, augments, traits] = await Promise.all([
    prisma.metaComp.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.staticChampion.findMany(),
    prisma.staticItem.findMany(),
    prisma.staticAugment.findMany(),
    prisma.staticTrait.findMany(),
  ]);

  const resolvedComps = metaComps.map((comp) => {
    const compUnits = comp.units as {
      championId: string;
      itemIds: string[];
    }[];

    const recommendedAugmentIds = comp.recommendedAugments as string[];

    return {
      ...comp,
      units: compUnits
        .map((unit) => {
          const champion = champions.find(
            (champion) => champion.id === unit.championId,
          );

          if (!champion) return null;

          return {
            id: champion.id,
            name: champion.name,
            cost: champion.cost,
            traits: champion.traits,
            imageUrl: champion.imageUrl,
            items: unit.itemIds
              .map((itemId) => items.find((item) => item.id === itemId))
              .filter((item) => item !== undefined)
              .map((item) => ({
                id: item.id,
                name: item.name,
                imageUrl: item.imageUrl,
              })),
          };
        })
        .filter((unit) => unit !== null),
      recommendedAugments: recommendedAugmentIds
        .map((augmentId) => augments.find((augment) => augment.id === augmentId))
        .filter((augment) => augment !== undefined)
        .map((augment) => ({
          id: augment.id,
          name: augment.name,
          imageUrl: augment.imageUrl,
        })),
      traits: traits.map((trait) => ({
        id: trait.id,
        name: trait.name,
        breakpoints: trait.breakpoints,
        imageUrl: trait.imageUrl,
      })),
    };
  });

  return resolvedComps;
}