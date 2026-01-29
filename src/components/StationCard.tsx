import type { CleanGasStation } from "../types/types";

const PriceBadge = ({
  label,
  price,
  activeColorClass,
}: {
  label: string;
  price: number;
  activeColorClass: string;
}) => {
  const isAvailable = price > 0;

  return (
    <div
      className={`flex flex-col items-center p-2 rounded-lg border transition-colors ${
        isAvailable
          ? `${activeColorClass} bg-opacity-10 border-opacity-20`
          : "bg-gray-50 border-gray-100 opacity-60"
      }`}
    >
      <span
        className={`text-[10px] uppercase font-bold mb-0.5 ${
          isAvailable ? "text-gray-500" : "text-gray-300"
        }`}
      >
        {label}
      </span>

      {isAvailable ? (
        <span className="text-lg font-black text-slate-800">
          {price} <span className="text-xs font-normal text-gray-500">€</span>
        </span>
      ) : (
        <span className="text-sm font-medium text-gray-300 py-1">No disp.</span>
      )}
    </div>
  );
};

export const StationCard = ({ station }: { station: CleanGasStation }) => {
  return (
    <article className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
            {station.name}
          </h3>
          <p className="text-slate-500 text-xs mt-1 font-medium">
            📍 {station.town}
          </p>
          <p className="text-gray-400 text-xs truncate max-w-50">
            {station.address}
          </p>
        </div>
        <div className="p-2 bg-blue-50 rounded-full text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <PriceBadge
          label="Diésel"
          price={station.priceDiesel}
          activeColorClass="bg-blue-50 ring-1 ring-blue-200"
        />
        <PriceBadge
          label="G95"
          price={station.price95}
          activeColorClass="bg-green-50 ring-1 ring-green-200"
        />
        <PriceBadge
          label="G98"
          price={station.price98}
          activeColorClass="bg-emerald-50 ring-1 ring-emerald-200"
        />
        <PriceBadge
          label="Gas Nat."
          price={station.priceNaturalGas}
          activeColorClass="bg-orange-50 ring-1 ring-orange-200"
        />
        <PriceBadge
          label="Gas Lic."
          price={station.priceLicuatedGas} 
          activeColorClass="bg-cyan-50 ring-1 ring-cyan-200"
        />
      </div>

      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center py-2.5 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200 hover:shadow-blue-200"
      >
        Cómo llegar
      </a>
    </article>
  );
};