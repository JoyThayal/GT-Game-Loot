import Image from "next/image";
import Link from "next/link";

export default function GameCard({ game }) {
  let daysLeftText = "Active";
  if (game.end_date) {
    const today = new Date();
    const endDate = new Date(game.end_date);
    const timeDiff = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysLeft > 0) daysLeftText = `⌛ ${daysLeft} Days Left`;
    else if (daysLeft === 0) daysLeftText = "⌛ Ends Today!";
    else daysLeftText = "Expired";
  } else {
    daysLeftText = "⚡ Active";
  }

  return (
    <div className="group w-90 h-full flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl transition-all duration-300 hover:border-cyan-500/40">
      <div className="flex flex-col flex-1">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={game.thumbnail}
            alt={game.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />

          <div className="absolute top-3 left-3">
            <span className="rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-red-300 backdrop-blur border border-red-500/20">
              {daysLeftText}
            </span>
          </div>

          <div className="absolute top-3 right-3 max-w-[50%] truncate">
            <span className="block rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur border border-cyan-500/30 truncate">
              {game.platforms}
            </span>
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h2 className="line-clamp-2 text-xl font-bold text-white mb-3">
            {game.title}
          </h2>

          <p className="text-sm leading-6 text-slate-400">{game.description}</p>
        </div>
      </div>

      <div className="p-5 pt-0">
        <div className="h-px bg-slate-800 mb-4" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Original Price
            </p>
            <p className="text-2xl font-bold text-red-400">
              {game.worth === "N/A" ? "Free" : game.worth}
            </p>
          </div>

          <Link
            href={game.open_giveaway_url}
            target="_blank"
            className="rounded-xl bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400 active:scale-95"
          >
            Claim Free
          </Link>
        </div>
      </div>
    </div>
  );
}
