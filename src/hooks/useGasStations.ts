import { useState, useEffect, useMemo } from "react";
import { fetchGasStations } from "../services/api";
import type { CleanGasStation, FuelType } from "../types/types";

export const useGasStations = () => {
  const [gasStations, setGasStations] = useState<CleanGasStation[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de filtros
  const [provinceId, setProvinceId] = useState("28");
  const [municipality, setMunicipality] = useState("all");
  const [fuelType, setFuelType] = useState<FuelType>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const url = `${import.meta.env.VITE_API_URL}/${provinceId}`;

        const data = await fetchGasStations(url);
        setGasStations(data);
        setMunicipality("all");
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [provinceId]);

  // Lógica de filtrado
  const filteredStations = useMemo(() => {
    const result = gasStations.filter((station) => {
      // 1. Filtro Municipio
      if (municipality !== "all" && station.town !== municipality) return false;

      if (fuelType === "diesel" && station.priceDiesel <= 0) return false;
      if (fuelType === "95" && station.price95 <= 0) return false;
      if (fuelType === "98" && station.price98 <= 0) return false;
      if (fuelType === "licuated" && station.priceLicuatedGas <= 0) return false;
      if (fuelType === "natural" && station.priceNaturalGas <= 0) return false;

      if (search) {
        const lowerSearch = search.toLowerCase();
        return (
          station.name.toLowerCase().includes(lowerSearch) ||
          station.address.toLowerCase().includes(lowerSearch) ||
          station.town.toLowerCase().includes(lowerSearch)
        );
      }
      return true;
    });

    result.sort((a, b) => {
      if (fuelType === "diesel") return a.priceDiesel - b.priceDiesel;
      if (fuelType === "95") return a.price95 - b.price95;
      if (fuelType === "98") return a.price98 - b.price98;
      if (fuelType === "licuated") return a.priceLicuatedGas - b.priceLicuatedGas;
      if (fuelType === "natural") return a.priceNaturalGas - b.priceNaturalGas;
      return a.priceDiesel - b.priceDiesel;
    });

    return result;
  }, [gasStations, search, fuelType, municipality]);

  const municipalities = useMemo(() => {
    return [...new Set(gasStations.map((s) => s.town))].sort();
  }, [gasStations]);

  return {
    loading,
    stations: filteredStations,
    totalCount: filteredStations.length,
    municipalities,
    filters: {
      provinceId,
      setProvinceId,
      municipality,
      setMunicipality,
      fuelType,
      setFuelType,
      search,
      setSearch,
    },
  };
};
