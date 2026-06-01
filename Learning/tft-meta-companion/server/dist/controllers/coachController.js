"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoachRecommendationController = getCoachRecommendationController;
const coachService_1 = require("../services/coachService");
function getCoachRecommendationController(req, res) {
    const recommendation = (0, coachService_1.getCoachRecommendation)(req.body);
    res.json(recommendation);
}
