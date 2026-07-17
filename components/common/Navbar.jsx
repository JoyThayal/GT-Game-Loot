import { Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <section className="fixed top-0 w-full h-20 bg-slate-950/50 backdrop-blur-md p-4 flex items-center justify-between z-999">
      <h1 className="text-2xl font-bold text-white">GT Game Loot</h1>
      <div className="flex items-center bg-slate-700 rounded-full py-2 px-4">
        <input
          type="text"
          placeholder="Search Game Name"
          className="text-white focus:outline-none"
        />
        <Search size={20} className="ml-2 text-cyan-500" />
      </div>
      <div className="flex gap-4">
        <Link href={"/"}>All Giveaways</Link>
        <Link href={"/?type=Game"}>Full Games</Link>
        <Link href={"/"}>In-Game Loot</Link>
        <Link href={"/"}>DLC & Packs</Link>
      </div>
    </section>
  );
}
