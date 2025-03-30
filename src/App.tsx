import { PokemonCardList } from "./components/Pokemon/PokemonCardView/PokemonCardList";
import { SpeedInsights } from "@vercel/speed-insights/next";

function App() {
  return (
    <main className="flex justify-center min-h-screen py-6 bg-gradient-to-b from-gray-50 to-gray-100 ">
      <PokemonCardList />
      <SpeedInsights />
    </main>
  );
}

export default App;
