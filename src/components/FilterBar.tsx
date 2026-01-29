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
}

export const FilterBar = ({
  filters,
  municipalities,
  loading,
}: FilterBarProps) => {
  const {
    provinceId,
    setProvinceId,
    municipality,
    setMunicipality,
    fuelType,
    setFuelType,
    search,
    setSearch,
  } = filters;

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-white mb-8 sticky top-4 z-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
            Provincia
          </label>
          <select
            value={provinceId}
            onChange={(e) => setProvinceId(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-700 font-medium"
          >
            {PROVINCIAS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
            Municipio
          </label>
          <select
            value={municipality}
            onChange={(e) => setMunicipality(e.target.value)}
            disabled={loading}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50 text-slate-700 font-medium"
          >
            <option value="all">Todos</option>
            {municipalities.map((m: string) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-6">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
            Búsqueda rápida
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar gasolinera, calle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-3 pl-10 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <span className="absolute left-3 top-3.5 text-slate-400">🔍</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
          label="Gasolina 95"
          activeColor="bg-green-600"
          currentType={fuelType}
          onClick={setFuelType}
        />
        <FilterButton
          type="98"
          label="Gasolina 98"
          activeColor="bg-emerald-600"
          currentType={fuelType}
          onClick={setFuelType}
        />
        <FilterButton
          type="natural"
          label="Gas Natural"
          activeColor="bg-orange-500"
          currentType={fuelType}
          onClick={setFuelType}
        />
        <FilterButton
          type="licuated"
          label="Gas Lic."
          activeColor="bg-sky-500"
          currentType={fuelType}
          onClick={setFuelType}
        />
      </div>
    </div>
  );
};
