"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; // 👈 Suspense ইমপোর্ট করলাম

const filters = [
  { label: "All Giveaways", type: null },
  { label: "Full Games", type: "Game" },
  { label: "DLC", type: "DLC" },
  { label: "Early Access", type: "Early Access" },
  { label: "Other", type: "Other" },
];

// 💡 লজিক আর UI-টা এই নতুন সাব-কম্পোনেন্টে নিয়ে এলাম
function NavbarContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <section className="fixed top-0 w-full h-20 bg-slate-950/50 backdrop-blur-md p-4 flex items-center justify-between z-999">
      <h1 className="text-2xl font-bold text-white">GT Game Loot</h1>

      <div className="flex items-center bg-slate-700 rounded-full py-2 px-4">
        <input
          type="text"
          placeholder="Search Game Name"
          className="text-white focus:outline-none bg-transparent" // bg-transparent যোগ করলাম দেখতে ভালো লাগার জন্য
        />
        <Search size={20} className="ml-2 text-cyan-500" />
      </div>

      <div className="flex gap-4">
        {filters.map((filter) => (
          <Link
            key={filter.label}
            href={filter.type ? `/?type=${filter.type}` : "/"}
            className={`px-4 py-1 rounded-md border transition active:scale-95 ${
              type === filter.type || (!type && filter.type === null)
                ? "bg-cyan-500 text-black border-cyan-500"
                : "bg-slate-800 border-slate-700 hover:bg-blue-600/20 hover:border-blue-500"
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

// 🚀 মেইন এক্সপোর্টে Suspense দিয়ে মুড়ে দিলাম যাতে বিল্ডের সময় কোনো এরর না আসে!
export default function Navbar() {
  return (
    <Suspense
      fallback={<div className="h-20 bg-slate-950/50 fixed top-0 w-full" />}
    >
      <NavbarContent />
    </Suspense>
  );
}
