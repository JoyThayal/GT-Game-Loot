"use client";

import { Menu, Search, X, Gamepad2 } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useTransition } from "react"; // 👈 ১. useTransition নিলাম

const filters = [
  { label: "All Giveaways", type: null },
  { label: "Full Games", type: "Game" },
  { label: "DLC", type: "DLC" },
  { label: "Early Access", type: "Early Access" },
  { label: "Other", type: "Other" },
  { label: "Expiring Soon", type: "expiring" },
];

function NavbarContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  // 👈 ২. ট্রানজিশন স্টেট ডিফাইন করলাম (isPending তখন ট্রু হবে যখন পেজ লোড হচ্ছে)
  const [isPending, startTransition] = useTransition();

  // 👈 ৩. ফিল্টার হ্যান্ডেল করার জন্য স্মুথ ফাংশন
  const handleFilterClick = (filterType) => {
    setIsOpen(false);

    // startTransition-এর ভেতরে পুশ করলে ক্লিক করার সাথে সাথে প্রোগ্রেস বার চালু হবে
    startTransition(() => {
      if (filterType) {
        router.push(`/?type=${encodeURIComponent(filterType)}`);
      } else {
        router.push("/");
      }
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      {isPending && (
        <div className="absolute top-0 left-0 h-0.75 bg-cyan-400 animate-pulse w-full z-50 shadow-[0_0_10px_#06b6d4]" />
      )}

      <div className="max-w-8xl mx-auto px-4 py-4">
        {/* Top */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="text-cyan-400" size={28} />
            <h1 className="text-xl md:text-2xl font-extrabold text-cyan-400 uppercase">
              GT Game Loot
            </h1>
          </div>

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center bg-slate-800 rounded-lg px-4 py-2 w-80">
            <input
              type="text"
              placeholder="Search Game..."
              className="flex-1 bg-transparent outline-none text-white placeholder:text-slate-400"
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);

                // সার্চের সময়ও প্রোগ্রেস বারকে একটিভ করছি
                startTransition(() => {
                  if (value.trim() !== "") {
                    router.push(`/?search=${encodeURIComponent(value.trim())}`);
                  } else {
                    router.push("/");
                  }
                });
              }}
            />
            <Search className="text-cyan-400" size={20} />
          </div>

          {/* Desktop Filters */}
          <div className="hidden lg:flex gap-3">
            {filters.map((filter) => {
              // 👈 ১. চেক করছি এটা আমাদের সেই স্পেশাল বাটন কি না
              const isExpiring = filter.type === "expiring";
              const isActive =
                type === filter.type || (!type && filter.type === null);

              return (
                <button
                  key={filter.label}
                  onClick={() => handleFilterClick(filter.type)}
                  className={`px-4 py-2 rounded-lg border transition-all duration-200 active:scale-95 font-semibold ${
                    isPending ? "opacity-70 cursor-not-allowed" : ""
                  } ${
                    isActive
                      ? isExpiring
                        ? "bg-rose-500 text-white border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]" // একটিভ থাকলে লাল গ্লো
                        : "bg-cyan-500 text-black border-cyan-500" // নরমাল একটিভ
                      : isExpiring
                        ? "bg-rose-800 border-rose-500 text-white hover:bg-rose-500 hover:border-rose-500 hover:animate-none shadow-[inset_0_0_8px_rgba(244,63,94,0.1)] animate-pulse" // ইন-একটিভ লাল বাটন
                        : "bg-slate-800 border-slate-700 text-white hover:bg-cyan-500/20 hover:border-cyan-500" // নরমাল ইন-একটিভ
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
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
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                  startTransition(() => {
                    if (value.trim() !== "") {
                      router.push(
                        `/?search=${encodeURIComponent(value.trim())}`,
                      );
                    } else {
                      router.push("/");
                    }
                  });
                }}
              />
              <Search className="text-cyan-400" size={20} />
            </div>

            {/* Mobile Filters */}
            <div className="flex flex-col gap-3">
              {filters.map((filter) => {
                const isExpiring = filter.type === "expiring";
                const isActive =
                  type === filter.type || (!type && filter.type === null);

                return (
                  <button
                    key={filter.label}
                    onClick={() => handleFilterClick(filter.type)}
                    className={`px-4 py-3 rounded-lg border text-center transition ${
                      isPending ? "opacity-70 cursor-not-allowed" : ""
                    } ${
                      isActive
                        ? isExpiring
                          ? "bg-rose-500 text-white border-rose-500 font-semibold shadow-[0_0_15px_rgba(244,63,94,0.5)]"
                          : "bg-cyan-500 text-black border-cyan-500 font-semibold"
                        : isExpiring
                          ? "bg-rose-800 border-rose-500 text-white hover:bg-rose-500 hover:border-rose-500 hover:animate-none shadow-[inset_0_0_8px_rgba(244,63,94,0.1)] animate-pulse"
                          : "bg-slate-800 border-slate-700 text-white hover:bg-cyan-500/20 hover:border-cyan-500"
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
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
