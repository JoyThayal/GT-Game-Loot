export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const response = await fetch("https://www.gamerpower.com/api/giveaways");
    const gamesData = await response.json();

    const liveGameIds = gamesData.map((game) => game.id);

    const games = gamesData.map((game) => {
      let formattedWorth = null;
      if (game.worth && game.worth !== "N/A") {
        const cleanPrice = game.worth.replace(/[^0-9.]/g, "");
        formattedWorth = cleanPrice ? parseFloat(cleanPrice) : null;
      }

      return {
        id: game.id,
        title: game.title,
        description: game.description,
        thumbnail: game.thumbnail,
        worth: formattedWorth,
        published_date:
          game.published_date === "N/A" ? null : game.published_date,
        type: game.type,
        platforms: game.platforms,
        end_date: game.end_date === "N/A" ? null : game.end_date,
        open_giveaway_url: game.open_giveaway_url,
        image: game.image,
        status: game.status,
      };
    });

    const { error: upsertError } = await supabase
      .from("games")
      .upsert(games, { onConflict: "id" });

    if (upsertError) {
      console.error("Upsert Error:", upsertError);
      throw upsertError;
    }

    if (liveGameIds.length > 0) {
      const { error: deleteError } = await supabase
        .from("games")
        .delete()
        .not("id", "in", `(${liveGameIds.join(",")})`);

      if (deleteError) {
        console.error("Delete Error:", deleteError);
      } else {
        console.log("Expired games cleaned up successfully! 🧹");
      }
    }

    return NextResponse.json({
      success: true,
      message: "সব ডেটা সফলভাবে সিঙ্ক এবং এক্সপায়ারড গেম পরিষ্কার হয়েছে! 🚀",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
