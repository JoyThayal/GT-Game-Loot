export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const response = await fetch("https://www.gamerpower.com/api/giveaways");
    const gamesData = await response.json();

    const games = gamesData.map((game) => ({
      id: game.id,
      title: game.title,
      description: game.description,
      thumbnail: game.thumbnail,
      worth: game.worth,
      published_date:
        game.published_date === "N/A" ? null : game.published_date,
      type: game.type,
      platforms: game.platforms,
      end_date: game.end_date === "N/A" ? null : game.end_date,
      open_giveaway_url: game.open_giveaway_url,
      image: game.image,
      status: game.status,
    }));

    const { error } = await supabase.from("games").upsert(games, {
      onConflict: "id",
    });

    if (error) {
      console.log(error);
    } else {
      console.log("Success");
    }

    return NextResponse.json({
      success: true,
      message: "সব API থেকে ডেটা সফলভাবে সিঙ্ক হয়েছে! 🚀",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
