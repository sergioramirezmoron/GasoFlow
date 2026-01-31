export const DonateButton = () => {
  return (
    <div className="flex justify-center w-full py-6">
      <a
        href="https://www.buymeacoffee.com/sergioramor"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-3 bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-slate-900 px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-yellow-400/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <span className="text-xl group-hover:animate-bounce">☕</span>
        <span>Donar</span>
      </a>
    </div>
  );
};