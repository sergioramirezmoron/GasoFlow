const Header = () => {
  return (
    <div className="bg-linear-to-r from-blue-900 via-blue-800 to-slate-900 text-white pt-12 pb-24 px-4 shadow-lg">
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
