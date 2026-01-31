import PROVINCIAS from "../services/constants";
import type { FuelType } from "../types/types";
import FilterButton from "./FilterButton";

interface FilterBarProps {
  filters: {
    provinceId: string;
    setProvinceId: (id: string) => void;
    municipality: string;
    setMunicipality: (name: string) => void;
    fuelType: FuelType;
    setFuelType: (type: FuelType) => void;
    search: string;
    setSearch: (term: string) => void;
  };
  municipalities: string[];
  loading: boolean;
  onLocationToggle: () => void;
  userLocation: { lat: number; lng: number } | null;
  loadingLocation: boolean;
  onProvinceChange: (id: string) => void;
}

export const FilterBar = ({
  filters,
  municipalities,
  loading,
  onLocationToggle,
  userLocation,
  loadingLocation,
  onProvinceChange,
}: FilterBarProps) => {
  const {
    provinceId,
    municipality,
    setMunicipality,
    fuelType,
    setFuelType,
    search,
    setSearch,
  } = filters;

  const isGpsActive = !!userLocation;

  return (
    <div className="bg-white/80 backdrop-blur-xl p-4 md:p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white mb-6 sticky top-4 z-20 transition-all">
      <div className="mb-4">
        <button
          onClick={onLocationToggle}
          className={`w-full py-3 md:py-3.5 px-4 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 hover:cursor-pointer ${
            loadingLocation
              ? "bg-red-50 text-red-600 ring-2 ring-red-100 hover:bg-red-100 cursor-pointer"
              : isGpsActive
                ? "bg-red-50 text-red-600 ring-2 ring-red-100 hover:bg-red-100"
                : "bg-linear-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5"
          }`}
        >
          {loadingLocation ? (
            <>
              <svg
                className="animate-spin h-5 w-5 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {userLocation ? "Desactivando..." : "Cancelar búsqueda"}
            </>
          ) : isGpsActive ? (
            <>❌ Desactivar ubicación</>
          ) : (
            <>📍 Buscar cerca de mí</>
          )}
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 mb-4">
        <div className="col-span-1 md:col-span-3">
          <label className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1 ml-1 truncate">
            Provincia
          </label>
          <select
            value={provinceId}
            onChange={(e) => onProvinceChange(e.target.value)}
            disabled={isGpsActive}
            className="w-full p-2.5 md:p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {PROVINCIAS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 md:col-span-3">
          <label className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1 ml-1 truncate">
            Municipio
          </label>
          <select
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            disabled={loading || isGpsActive}
            className="w-full p-2.5 md:p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 disabled:cursor-not-allowed text-slate-700 font-medium"
          >
            <option value="all">{isGpsActive ? "Radio 20km" : "Todos"}</option>
            {municipalities.map((m: string) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-2 md:col-span-6">
          <label className="block text-[10px] md:text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
            Búsqueda rápida
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar gasolinera..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2.5 md:p-3 pl-9 md:pl-10 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span className="absolute left-3 top-3 md:top-3.5 text-slate-400 text-sm">
              🔍
            </span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <FilterButton
          type="all"
          label="Todos"
          activeColor="bg-slate-800"
          currentType={fuelType}
          onClick={setFuelType}
        />
        <FilterButton
          type="diesel"
          label="Diésel"
          activeColor="bg-blue-600"
          currentType={fuelType}
          onClick={setFuelType}
        />
        <FilterButton
          type="95"
          label="G95"
          activeColor="bg-green-600"
          currentType={fuelType}
          onClick={setFuelType}
        />
        <FilterButton
          type="98"
          label="G98"
          activeColor="bg-emerald-600"
          currentType={fuelType}
          onClick={setFuelType}
        />
        <FilterButton
          type="natural"
          label="Gas"
          activeColor="bg-orange-500"
          currentType={fuelType}
          onClick={setFuelType}
        />
        <FilterButton
          type="licuated"
          label="GLP"
          activeColor="bg-sky-500"
          currentType={fuelType}
          onClick={setFuelType}
        />
      </div>
    </div>
  );
};
