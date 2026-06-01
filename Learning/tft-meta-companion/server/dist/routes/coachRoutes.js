"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coachController_1 = require("../controllers/coachController");
const router = (0, express_1.Router)();
router.post("/", coachController_1.getCoachRecommendationController);
exports.default = router;
