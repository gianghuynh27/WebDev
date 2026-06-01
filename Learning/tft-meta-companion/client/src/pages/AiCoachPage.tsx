import PageHeader from "../components/PageHeader";
import { useState } from "react";
import type { CoachResponse } from "../types/coach";
import { getCoachRecommendation } from "../services/coachApi";
function AiCoachPage() {
  const [currentRound, setCurrentRound] = useState("");
  const [selectedAugments, setSelectedAugments] = useState("");
  const [coachResponse, setCoachResponse] = useState<CoachResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await getCoachRecommendation({
        currentRound,
        selectedAugments: selectedAugments
          .split(",")
          .map((augment) => augment.trim())
          .filter(Boolean),
      });
      setCoachResponse(response);
    } catch {
      setError("Could not get coach advice. Make sure the server is running.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Your tft companion"
        title="AI Coach"
        description="Enter your current game state and get a mocked coaching recommendation later."
      />

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-800 bg-slate-950 p-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Current Round
          </label>
          <input
            value={currentRound}
            onChange={(event) => setCurrentRound(event.target.value)}
            placeholder="3-2"
            className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300">
            Selected Augments
          </label>
          <textarea
            value={selectedAugments}
            onChange={(event) => setSelectedAugments(event.target.value)}
            placeholder="Jeweled Lotus, Cybernetic Uplink"
            className="mt-2 min-h-24 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-md bg-cyan-300 px-4 py-2 font-medium text-slate-950"
        >
          {isLoading ? "Getting Advice..." : "Get Coach Advice"}
        </button>
      </form>

      {error && (
        <p className="rounded-md border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      {coachResponse && (
        <section className="rounded-xl border border-slate-800 bg-slate-950 p-4">
          <h3 className="text-xl font-semibold text-white">
            {coachResponse.recommendedComp}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Confidence: {coachResponse.confidence}
          </p>
          <p className="mt-4 text-slate-300">{coachResponse.reasoning}</p>
        </section>
      )}
    </div>
  );
}

export default AiCoachPage;
