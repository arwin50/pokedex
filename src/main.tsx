import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "./NotFound";
import "./index.css";
import App from "./App";
import { PokemonPage } from "./components/Pokemon/PokemonPage/PokemonPage";
import { SpeedInsights } from "@vercel/speed-insights/next";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SpeedInsights />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="pokemon/:id" element={<PokemonPage />} />
        <Route
          path="*"
          element={<NotFound message={"Page cannot be found"} />}
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
