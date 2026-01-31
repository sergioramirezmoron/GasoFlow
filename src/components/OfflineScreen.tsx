export const OfflineScreen = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-fade-in">
      
      {/* Icono animado */}
      <div className="bg-red-500/10 p-6 rounded-full mb-6 relative">
        <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping"></div>
        <svg 
          className="w-16 h-16 text-red-500 relative z-10" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
        </svg>
      </div>

      <h1 className="text-3xl font-bold text-white mb-3">
        ¡Sin conexión!
      </h1>
      
      <p className="text-slate-300 text-lg max-w-sm mx-auto mb-8">
        No podemos cargar los precios actualizados sin internet. Comprueba tu WiFi o tus datos.
      </p>

      <button 
        onClick={() => window.location.reload()}
        className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition active:scale-95"
      >
        Reintentar
      </button>

      <p className="absolute bottom-10 text-slate-500 text-sm">
        GasoFlow v1.0
      </p>
    </div>
  );
};