import GameCardGrid from "@/components/GameCardSection/GameCardGrid";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  console.log(params);
  
  
  return (
    <main>
      <GameCardGrid type={params.type} />
    </main>
  );
}
