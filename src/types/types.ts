export interface GasStationResponse {
  Fecha: string;
  ListaEESSPrecio: GasStation[];
  Nota: string;
  ResultadoConsulta: string;
}

export interface GasStation {
  "C.P.": string;
  Dirección: string;
  Horario: string;
  Latitud: string;
  Localidad: string;
  "Longitud (WGS84)": string;
  Margen: string;
  Municipio: string;
  "Precio Biodiesel": string;
  "Precio Bioetanol": string;
  "Precio Gas Natural Comprimido": string;
  "Precio Gas Natural Licuado": string;
  "Precio Gases licuados del petróleo": string;
  "Precio Gasoleo A": string;
  "Precio Gasoleo B": string;
  "Precio Gasolina 95 E5": string;
  "Precio Gasolina 95 E10": string;
  "Precio Gasolina 98 E5": string;
  "Precio Hidrogeno": string;
  Provincia: string;
  Remisión: string;
  Rótulo: string;
  "Tipo Venta": string;
  "% BioEtanol": string;
  "% Éster metílico": string;
  IDEESS: string;
  IDMunicipio: string;
  IDProvincia: string;
  IDCCAA: string;
}

export interface CleanGasStation {
  id: string;
  name: string;
  address: string;
  town: string;
  province: string;
  priceDiesel: number;
  price95: number;
  price98: number;
  priceLicuatedGas: number;
  priceNaturalGas: number;
  lat: number;
  lng: number;
  distance?: number;
}

export type FuelType = "all" | "diesel" | "95" | "98" | "licuated" | "natural";
