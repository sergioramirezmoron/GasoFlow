import type { CleanGasStation, GasStationResponse } from "../types/types";

export const fetchGasStations = async (
  url: string,
): Promise<CleanGasStation[]> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Error al cargar las gasolineras");
    }

    const data: GasStationResponse = await response.json();

    return data.ListaEESSPrecio.map((item) => ({
      id: item.IDEESS,
      name: item.Rótulo,
      address: item.Dirección,
      lat: parseFloat(item.Latitud.replace(",", ".")),
      lng: parseFloat(item["Longitud (WGS84)"].replace(",", ".")),
      town: item["Municipio"],
      province: item["Provincia"],
      priceDiesel: parseFloat(item["Precio Gasoleo A"].replace(",", ".")) || 0,
      price95: parseFloat(item["Precio Gasolina 95 E5"].replace(",", ".")) || 0,
      price98: parseFloat(item["Precio Gasolina 98 E5"].replace(",", ".")) || 0,
      priceNaturalGas:
        parseFloat(item["Precio Gas Natural Comprimido"].replace(",", ".")) ||
        0,
      priceLicuatedGas:
        parseFloat(
          item["Precio Gases licuados del petróleo"].replace(",", "."),
        ) || 0,
    }));
  } catch (error) {
    throw new Error(`Error charging gas stations: ${error}`);
  }
};
