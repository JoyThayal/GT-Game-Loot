import Image from "next/image";
import Link from "next/link";

export default function GameCard({ game }) {
  let daysLeftText = "⚡ Active";

  if (game.end_date) {
    const today = new Date();
    const endDate = new Date(game.end_date);
    const timeDiff = endDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysLeft > 0) {
      daysLeftText = `⌛ ${daysLeft} Days Left`;
    } else if (daysLeft === 0) {
      daysLeftText = "⌛ Ends Today!";
    } else {
      daysLeftText = "❌ Expired";
    }
  }

  return (
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl transition-all duration-300 hover:border-cyan-500/40 hover:shadow-cyan-500/10">
      {/* Image */}
      <div className="relative h-48 overflow-hidden sm:h-52 md:h-56">
        <Image
          src={game.thumbnail}
          alt={game.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />

        {/* Days Left */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full border border-red-500/20 bg-slate-950/80 px-3 py-1 text-xs font-semibold text-red-300 backdrop-blur">
            {daysLeftText}
          </span>
        </div>

        {/* Platform */}
        <div className="absolute top-3 right-3 max-w-[60%] sm:max-w-[50%]">
          <span className="block truncate rounded-full border border-cyan-500/30 bg-slate-950/80 px-3 py-1 text-xs font-semibold text-cyan-300 backdrop-blur">
            {game.platforms}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h2 className="mb-3 line-clamp-2 text-xl font-bold text-white">
          {game.title}
        </h2>

        <p className="line-clamp-3 flex-1 text-sm leading-6 text-slate-400">
          {game.description}
        </p>
      </div>

      {/* Footer */}
      <div className="p-5 pt-0">
        <div className="mb-4 h-px bg-slate-800" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Original Price
            </p>

            <p className="text-2xl font-bold text-red-400">
              {game.worth && game.worth > 0 ? `$${game.worth}` : "Free"}
            </p>
          </div>

          <Link
            href={game.open_giveaway_url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full rounded-xl bg-cyan-500 px-5 py-3 text-center font-semibold text-slate-950 transition-all duration-200 hover:bg-cyan-400 active:scale-95 sm:w-auto"
          >
            Claim Free
          </Link>
        </div>
      </div>
    </div>
  );
}
