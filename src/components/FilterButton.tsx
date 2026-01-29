import type { FuelType } from "../types/types";

interface FilterButtonProps {
  type: FuelType;
  label: string;
  activeColor: string;
  currentType: FuelType;
  onClick: (type: FuelType) => void;
}

const FilterButton = ({
  type,
  label,
  activeColor,
  currentType,
  onClick,
}: FilterButtonProps) => {
  return (
    <button
      onClick={() => onClick(type)}
      className={`px-4 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
        currentType === type
          ? `${activeColor} text-white shadow-md transform scale-105`
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
