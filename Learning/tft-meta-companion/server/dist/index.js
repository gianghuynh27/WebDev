"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const coachRoutes_1 = __importDefault(require("./routes/coachRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT ?? 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/coach", coachRoutes_1.default);
app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
