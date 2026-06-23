import { prisma } from "../lib/prisma.js";
import type { RiotTftMatch } from "../types/riotTft.js";

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const RIOT_REGIONAL_ROUTE = process.env.RIOT_REGIONAL_ROUTE ?? "americas";

function getRiotHeaders() {
  if (!RIOT_API_KEY) {
    throw new Error("RIOT_API_KEY is required");
  }

  return {
    "X-Riot-Token": RIOT_API_KEY,
  };
}

export async function getTftMatchById(matchId: string): Promise<RiotTftMatch> {
  console.log(`Fetching TFT match by ID: ${matchId}`);
  const response = await fetch(
    `https://${RIOT_REGIONAL_ROUTE}.api.riotgames.com/tft/match/v1/matches/${matchId}`,
    {
      headers: getRiotHeaders(),
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Riot match: ${response.status}`);
  }

  return response.json();
}

export async function importTftMatch(matchId: string) {
  const existingMatch = await prisma.riotMatch.findUnique({
    where: {
      id: matchId,
    },
  });

  if (existingMatch) {
    throw new Error("Match existed in database");
  }
  const match = await getTftMatchById(matchId);
  return prisma.riotMatch.upsert({
    where: {
      id: match.metadata.match_id,
    },
    update: {
      gameVersion: match.info.game_version,
      gameDatetime: BigInt(match.info.game_datetime),
      queueId: match.info.queue_id,
      raw: match,
    },
    create: {
      id: match.metadata.match_id,
      gameVersion: match.info.game_version,
      gameDatetime: BigInt(match.info.game_datetime),
      queueId: match.info.queue_id,
      raw: match,
    },
  });
}

export async function importTftMatches(matchIds: string[]) {
  const results = [];

  for (const matchId of matchIds) {
    try {
      const importedMatch = await importTftMatch(matchId);

      results.push({
        matchId,
        status: "imported",
        storedId: importedMatch.id,
      });
    } catch (error) {
      results.push({
        matchId,
        status: "failed",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return {
    requested: matchIds.length,
    imported: results.filter((result) => result.status === "imported").length,
    failed: results.filter((result) => result.status === "failed").length,
    results,
  };
}