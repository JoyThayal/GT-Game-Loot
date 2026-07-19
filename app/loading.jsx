export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
      {/* একটা সুন্দর অ্যানিমেটেড স্পিনার */}
      <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-cyan-400 font-medium tracking-wide">
        Loading Loots... 🎮
      </p>
    </div>
  );
}
