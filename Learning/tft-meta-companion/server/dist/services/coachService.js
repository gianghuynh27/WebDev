"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoachRecommendation = getCoachRecommendation;
function getCoachRecommendation(request) {
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
