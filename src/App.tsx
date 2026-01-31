import { StationCard } from "./components/StationCard";
import { FilterBar } from "./components/FilterBar";
import { useGasStations } from "./hooks/useGasStations";
import LoadingFallback from "./components/LoadingFallback";
import Header from "./components/Header";
import { useNetwork } from "./hooks/useNetwork";
import { OfflineScreen } from "./components/OfflineScreen";
import { DonateButton } from "./components/DonateButton";

const App = () => {
  const isOnline = useNetwork();

  const {
    loading,
    stations,
    totalCount,
    municipalities,
    filters,
    toggleLocation,
    userLocation,
    loadingLocation,
    handleManualProvinceChange,
  } = useGasStations();

  return (
    <div className="bg-slate-50 min-h-screen font-sans selection:bg-blue-100 relative">
      <Header />

      <main className="max-w-6xl mx-auto px-4 -mt-16 pb-20">
        <FilterBar
          filters={filters}
          municipalities={municipalities}
          loading={loading}
          onLocationToggle={toggleLocation}
          userLocation={userLocation}
          loadingLocation={loadingLocation}
          onProvinceChange={handleManualProvinceChange}
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
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {stations.map((station) => (
                    <StationCard key={station.id} station={station} />
                  ))}
                </div>

                <div className="mt-10 mb-4 border-t border-slate-200 pt-8">
                  <p className="text-center text-slate-400 text-sm mb-2">
                    ¿Te ha sido útil?
                  </p>
                  <DonateButton />
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-400 text-xl font-medium">
                  No hay nada por aquí... 🏜️
                </p>
                <button
                  onClick={() => {
                    filters.setMunicipality("all");
                    filters.setFuelType("all");
                    filters.setSearch("");
                  }}
                  className="mt-6 px-6 py-2 bg-blue-50 text-blue-600 font-bold rounded-full hover:bg-blue-100 transition mb-8"
                >
                  Limpiar filtros
                </button>

                <DonateButton />
              </div>
            )}
          </>
        )}
      </main>

      {!isOnline && <OfflineScreen />}
    </div>
  );
};

export default App;
