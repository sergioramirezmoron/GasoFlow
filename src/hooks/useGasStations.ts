import { useState, useEffect, useMemo } from "react";
import { fetchGasStations } from "../services/api";
import { calculateDistance, getUserLocation } from "../services/geo";
import type { CleanGasStation, FuelType } from "../types/types";

export const useGasStations = () => {
  const [gasStations, setGasStations] = useState<CleanGasStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [provinceId, setProvinceId] = useState("28");
  const [municipality, setMunicipality] = useState("all");
  const [fuelType, setFuelType] = useState<FuelType>("all");
  const [search, setSearch] = useState("");
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        let url = "";
        if (provinceId === "spain") {
          url =
            "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/";
        } else {
          url = `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroProvincia/${provinceId}`;
        }

        const data = await fetchGasStations(url);
        setGasStations(data);

        if (!userLocation) {
          setMunicipality("all");
        }
      } catch (error) {
        console.error("Error fetching stations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [provinceId]);

  const toggleLocation = async () => {
    if (userLocation) {
      setLoadingLocation(true);

      await new Promise((resolve) => setTimeout(resolve, 300));
      setLoadingLocation(false);

      setUserLocation(null);
      setProvinceId("28");
      return;
    }

    setLoadingLocation(true);
    try {
      const location = await getUserLocation();
      setUserLocation(location);
      setProvinceId("spain");
      setMunicipality("all");
    } catch (error) {
      console.error(error);
      alert("Necesitamos permiso de ubicación para encontrar las cercanas.");
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleManualProvinceChange = (newProvinceId: string) => {
    setProvinceId(newProvinceId);
    setUserLocation(null);
  };

  const filteredStations = useMemo(() => {
    const processedStations = gasStations.map((station) => {
      if (userLocation) {
        return {
          ...station,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            station.lat,
            station.lng,
          ),
        };
      }
      return station;
    });

    const result = processedStations.filter((station) => {
      if (municipality !== "all" && station.town !== municipality) return false;

      if (fuelType === "diesel" && station.priceDiesel <= 0) return false;
      if (fuelType === "95" && station.price95 <= 0) return false;
      if (fuelType === "98" && station.price98 <= 0) return false;
      if (fuelType === "licuated" && station.priceLicuatedGas <= 0)
        return false;
      if (fuelType === "natural" && station.priceNaturalGas <= 0) return false;

      if (userLocation && station.distance && station.distance > 20) {
        return false;
      }

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
      if (fuelType === "licuated")
        return a.priceLicuatedGas - b.priceLicuatedGas;
      if (fuelType === "natural") return a.priceNaturalGas - b.priceNaturalGas;

      if (
        userLocation &&
        a.distance !== undefined &&
        b.distance !== undefined
      ) {
        return a.distance - b.distance;
      }

      return a.priceDiesel - b.priceDiesel;
    });

    return result;
  }, [gasStations, search, fuelType, municipality, userLocation]);

  const municipalities = useMemo(() => {
    return [...new Set(gasStations.map((s) => s.town))].sort();
  }, [gasStations]);

  return {
    loading,
    stations: filteredStations,
    totalCount: filteredStations.length,
    municipalities,
    userLocation,
    toggleLocation,
    loadingLocation,
    handleManualProvinceChange,
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
