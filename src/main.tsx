import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import NotFound from "../pages/404";
import "./index.css";
import App from "./App";
import { PokemonPage } from "./components/Pokemon/PokemonPage/PokemonPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
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
