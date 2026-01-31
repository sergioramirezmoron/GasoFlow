const Header = () => {
  return (
    // Añadido 'relative' para poder posicionar el botón de Donar
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white pt-12 pb-24 px-4 shadow-lg">
      
      {/* Botón DONAR (Esquina superior derecha) */}
      <a
        href="https://www.buymeacoffee.com/sergioramor"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 bg-[#FFDD00] text-slate-900 hover:bg-yellow-300 font-bold text-xs md:text-sm px-4 py-2 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
      >
        <span>☕</span>
        <span>Donar</span>
      </a>

      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
          Gaso<span className="text-blue-400">Flow</span>
        </h1>
        <p className="text-blue-100 text-lg font-medium max-w-2xl mx-auto">
          El buscador de precios en tiempo real más avanzado. Encuentra las
          gasolineras más baratas cerca de ti y ahorra en cada litro.
        </p>
      </div>
    </div>
  );
};

export default Header;