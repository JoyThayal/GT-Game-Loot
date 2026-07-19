import GameCard from "./GameCard";
import { supabase } from "@/lib/supabase";

export default async function GameCardGrid({ type, search, platforms, sort }) {
  console.log("Type:", type, "Search:", search);
  let query = supabase.from("games").select("*");

  if (type && type !== "expiring") {
    query = query.eq("type", type);
  }

  if (search && search.trim() !== "") {
    query = query.ilike("title", `%${search}%`);
  }

  if (platforms && platforms.trim() !== "") {
    query = query.ilike("platforms", `%${platforms.trim()}%`);
  }

  if (type === "expiring") {
    query = query.order("end_date", { ascending: true, nullsFirst: false });
  } else if (sort === "highest-worth") {
    query = query.order("worth", { ascending: false, nullsFirst: false });
  } else {
    query = query.order("published_date", {
      ascending: false,
      nullsFirst: false,
    });
  }

  const { data: games, error } = await query;

  if (error) {
    return <h1 className="text-white text-center mt-10">{error.message}</h1>;
  }

  // 🎯 এখন সরাসরি ডাটাবেস থেকে আসা `games` ব্যবহার করছি, মাঝখানের এক্সট্রা ফিল্টার ডিলিট!
  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8">
      {games && games.length > 0 ? (
        <div className="mx-auto grid max-w-8xl gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      ) : (
        <h1 className="text-white text-center mt-10">No Games Found</h1>
      )}
    </section>
  );
}
