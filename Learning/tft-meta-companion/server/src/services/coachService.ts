import OpenAI from "openai";
import type { CoachRequest, CoachResponse } from "../types/coach.js";

function createOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

function getMockCoachRecommendation(request: CoachRequest): CoachResponse {
  return {
    recommendedComp: "Cybernetic Snipers",
    confidence: "medium",
    reasoning: `Based on round ${request.currentRound} and your selected augments, this comp gives you a flexible backline carry path.`,
    gamePlan: [
      "Play strongest board through the next stage.",
      "Prioritize stable frontline upgrades.",
      "Commit once your carry items and upgrades line up.",
    ],
    pivotOptions: ["Bruiser Gunners", "Star Guardian Mages"],
  };
}

function isCoachResponse(value: unknown): value is CoachResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const response = value as Record<string, unknown>;

  return (
    typeof response.recommendedComp === "string" &&
    (response.confidence === "low" ||
      response.confidence === "medium" ||
      response.confidence === "high") &&
    typeof response.reasoning === "string" &&
    Array.isArray(response.gamePlan) &&
    response.gamePlan.every((item) => typeof item === "string") &&
    Array.isArray(response.pivotOptions) &&
    response.pivotOptions.every((item) => typeof item === "string")
  );
}

function parseCoachResponse(text: string): CoachResponse | null {
  try {
    const parsed = JSON.parse(text);

    if (isCoachResponse(parsed)) {
      return parsed;
    }

    return null;
  } catch {
    return null;
  }
}

export async function getCoachRecommendation(
  request: CoachRequest,
): Promise<CoachResponse> {
  if (!process.env.OPENAI_API_KEY) {
    return getMockCoachRecommendation(request);
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-5.4-mini";
  const client = createOpenAIClient();

  const response = await client.responses.create({
    model,
    instructions:
      "You are a concise Teamfight Tactics coach for a new player. Return only valid JSON matching the requested schema. Do not include markdown.",
    input: [
      "Recommend one TFT comp based on this game state.",
      `Current round: ${request.currentRound}`,
      `Selected augments: ${request.selectedAugments.join(", ") || "none"}`,
      `Current units: ${request.currentUnits?.join(", ") || "unknown"}`,
      `Current items: ${request.currentItems?.join(", ") || "unknown"}`,
      "",
      "Return JSON with exactly these fields:",
      '{ "recommendedComp": string, "confidence": "low" | "medium" | "high", "reasoning": string, "gamePlan": string[], "pivotOptions": string[] }',
      "Keep gamePlan to 3-5 short steps and pivotOptions to 2-3 comp names.",
    ].join("\n"),
  });

  const parsedResponse = parseCoachResponse(response.output_text);

  return parsedResponse ?? getMockCoachRecommendation(request);
}
