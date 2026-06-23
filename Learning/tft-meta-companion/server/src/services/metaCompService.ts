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
