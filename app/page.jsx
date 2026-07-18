import FilterBar from "@/components/GameCardSection/FilterBar";
import GameCardGrid from "@/components/GameCardSection/GameCardGrid";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  
  return (
    <main>
      <FilterBar />
      <GameCardGrid type={params.type} search={params.search} platforms={params.platform} sort={params.sort} />
    </main>
  );
}
