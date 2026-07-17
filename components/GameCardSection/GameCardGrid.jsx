import GameCard from "./GameCard";
import { supabase } from "@/lib/supabase";

export default async function GameCardGrid() {
  const { data: games, error } = await supabase.from("games").select("*");

  if (error) {
    return <h1 className="text-white text-center mt-10">{error.message}</h1>;
  }

  return (
    <section className="min-h-screen bg-slate-950 p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-25">
      {games?.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
}
