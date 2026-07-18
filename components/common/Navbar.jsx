"use client";

import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";

const filters = [
  { label: "All Giveaways", type: null },
  { label: "Full Games", type: "Game" },
  { label: "DLC", type: "DLC" },
  { label: "Early Access", type: "Early Access" },
  { label: "Other", type: "Other" },
];

function NavbarContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top */}
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-cyan-400">
            GT Game Loot
          </h1>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center bg-slate-800 rounded-lg px-4 py-2 w-80">
            <input
              type="text"
              placeholder="Search Game..."
              className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400"
              value={search}
              onChange={(e) => {
                const value = e.target.value
                setSearch(value);

                if (value.trim() !== "") {
                  router.push(`/?search=${encodeURIComponent(value.trim())}`)
                } else {
                  router.push("/")
                }
              }}
            />
            <Search className="text-cyan-400" size={20} />
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:flex gap-3">
            {filters.map((filter) => (
              <Link
                key={filter.label}
                href={
                  filter.type
                    ? `/?type=${encodeURIComponent(filter.type)}`
                    : "/"
                }
                className={`px-4 py-2 rounded-lg border transition-all duration-200 active:scale-95 font-semibold ${
                  type === filter.type || (!type && filter.type === null)
                    ? "bg-cyan-500 text-black border-cyan-500"
                    : "bg-slate-800 border-slate-700 text-white hover:bg-cyan-500/20 hover:border-cyan-500"
                }`}
              >
                {filter.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden mt-5 border-t border-slate-800 pt-5 space-y-4">
            {/* Search */}
            <div className="flex items-center bg-slate-800 rounded-lg px-4 py-3">
              <input
                type="text"
                placeholder="Search Game..."
                className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="text-cyan-400" size={20} />
            </div>

            {/* Filters */}
            <div className="flex flex-col gap-3">
              {filters.map((filter) => (
                <Link
                  key={filter.label}
                  href={
                    filter.type
                      ? `/?type=${encodeURIComponent(filter.type)}`
                      : "/"
                  }
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg border text-center transition ${
                    type === filter.type || (!type && filter.type === null)
                      ? "bg-cyan-500 text-black border-cyan-500 font-semibold"
                      : "bg-slate-800 border-slate-700 text-white hover:bg-cyan-500/20 hover:border-cyan-500"
                  }`}
                >
                  {filter.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-20 bg-slate-950" />}>
      <NavbarContent />
    </Suspense>
  );
}
