"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPlatform = searchParams.get("platform") || "";
  const currentSort = searchParams.get("sort") || "newest";

  const handleFilterChange = (key, value) => {
    const params = new URLSearchParams(window.location.search);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 px-4 py-3 mt-20 flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm font-medium">Platform:</span>
          <select
            value={currentPlatform}
            onChange={(e) => handleFilterChange("platform", e.target.value)}
            className="bg-slate-800 text-white text-sm rounded-lg px-3 py-2 outline-none border border-slate-700 focus:border-cyan-500 cursor-pointer"
          >
            <option value="">All Platforms</option>
            <option value="pc">PC</option>
            <option value="playstation">PlayStation (PS4/PS5)</option>
            <option value="xbox">Xbox (One/Series)</option>
            <option value="android">Android</option>
            <option value="ios">iOS</option>
            <option value="vr">VR</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-slate-400 text-sm font-medium">Sort By:</span>
        <select
          value={currentSort}
          onChange={(e) => handleFilterChange("sort", e.target.value)}
          className="bg-slate-800 text-white text-sm rounded-lg px-3 py-2 outline-none border border-slate-700 focus:border-cyan-500 cursor-pointer"
        >
          <option value="newest">Newest Loots</option>
          <option value="highest-worth">Highest Value ($$$)</option>
        </select>
      </div>
    </div>
  );
}
