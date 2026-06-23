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
