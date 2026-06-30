import { prisma } from "../lib/prisma.js";
import { RiotTftMatch } from "../types/riotTft.js";

type AggregateBucket = {
  games: number;
  totalPlacement: number;
  top4Count: number;
  winCount: number;
};

function createBucket(): AggregateBucket {
  return {
    games: 0,
    totalPlacement: 0,
    top4Count: 0,
    winCount: 0,
  };
}

function addResult(bucket: AggregateBucket, placement: number) {
  bucket.games += 1;
  bucket.totalPlacement += placement;

  if (placement <= 4) {
    bucket.top4Count += 1;
  }

  if (placement === 1) {
    bucket.winCount += 1;
  }
}

function getRank(avgPlacement: number) {
  if (avgPlacement <= 4.25) return "S";
  if (avgPlacement <= 4.45) return "A";
  if (avgPlacement <= 4.65) return "B";
  if (avgPlacement <= 4.95) return "C";

  return "D";
}

function bucketToStats(bucket: AggregateBucket) {
  const avgPlacement = bucket.totalPlacement / bucket.games;
  const top4Rate = (bucket.top4Count / bucket.games) * 100;
  const winRate = (bucket.winCount / bucket.games) * 100;

  return {
    games: bucket.games,
    totalPlacement: bucket.totalPlacement,
    top4Count: bucket.top4Count,
    winCount: bucket.winCount,
    avgPlacement,
    top4Rate,
    winRate,
    rank: getRank(avgPlacement),
  };
}

function getOrCreateBucket(buckets: Map<string, AggregateBucket>, id: string) {
  const existingBucket = buckets.get(id);

  if (existingBucket) {
    return existingBucket;
  }

  const newBucket = createBucket();
  buckets.set(id, newBucket);

  return newBucket;
}

export async function rebuildStatsFromMatches() {
  /*Matches currently do not have info about augment selections */
  const matches = await prisma.riotMatch.findMany();

  const championBuckets = new Map<string, AggregateBucket>();
  const itemBuckets = new Map<string, AggregateBucket>();
  //   const augmentBuckets = new Map<string, AggregateBucket>();

  for (const storedMatch of matches) {
    const match = storedMatch.raw as RiotTftMatch;

    for (const participant of match.info.participants) {
      const placement = participant.placement;

      for (const unit of participant.units) {
        const championBucket = getOrCreateBucket(
          championBuckets,
          unit.character_id,
        );

        addResult(championBucket, placement);

        for (const itemId of unit.itemNames ?? []) {
          const itemBucket = getOrCreateBucket(itemBuckets, itemId);

          addResult(itemBucket, placement);
        }
      }

      //   for (const augmentId of participant.augments ?? []) {
      //     const augmentBucket = getOrCreateBucket(augmentBuckets, augmentId);

      //     addResult(augmentBucket, placement);
      //   }
    }
  }
  for (const [championId, bucket] of championBuckets) {
    const stats = bucketToStats(bucket);

    await prisma.championStat.upsert({
      where: {
        championId,
      },
      update: stats,
      create: {
        championId,
        ...stats,
      },
    });
  }

  for (const [itemId, bucket] of itemBuckets) {
    const stats = bucketToStats(bucket);

    await prisma.itemStat.upsert({
      where: {
        itemId,
      },
      update: stats,
      create: {
        itemId,
        ...stats,
      },
    });
  }
  return {
    matchCount: matches.length,
    championCount: championBuckets.size,
    itemCount: itemBuckets.size,
    //augmentCount: augmentBuckets.size,
  };
}
