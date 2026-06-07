import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AiCoachPage from "./pages/AiCoachPage";
import MetaCompsPage from "./pages/MetaCompsPage";
import StatsExplorerPage from "./pages/StatsExplorerPage";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MetaCompsPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/explorer" element={<StatsExplorerPage />} />
        <Route path="/ai-coach" element={<AiCoachPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
