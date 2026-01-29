import { StationCard } from "./components/StationCard";
import { FilterBar } from "./components/FilterBar";
import { useGasStations } from "./hooks/useGasStations";
import LoadingFallback from "./components/LoadingFallback";
import Header from "./components/Header";

const App = () => {
  const { loading, stations, totalCount, municipalities, filters } =
    useGasStations();

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-blue-100">
      <Header />
      <main className="max-w-6xl mx-auto px-4 -mt-16 pb-20">
        <FilterBar
          filters={filters}
          municipalities={municipalities}
          loading={loading}
        />

        {loading ? (
          <LoadingFallback message="Consultando satélites..." />
        ) : (
          <>
            <div className="flex justify-between items-center mb-6 px-2">
              <h2 className="text-xl font-bold text-slate-700">Resultados</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                {totalCount} gasolineras
              </span>
            </div>

            {stations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {stations.map((station) => (
                  <StationCard key={station.id} station={station} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-400 text-xl font-medium">
                  No hay nada por aquí...
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
