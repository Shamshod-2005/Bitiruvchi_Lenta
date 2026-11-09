type FilterValue = "all" | "Klassik" | "Premium" | "Zamonaviy";

interface FilterBarProps {
  activeFilter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

const filters: Array<{ label: string; value: FilterValue }> = [
  { label: "Barchasi", value: "all" },
  { label: "Klassik", value: "Klassik" },
  { label: "Premium", value: "Premium" },
  { label: "Zamonaviy", value: "Zamonaviy" },
];

export default function FilterBar({
  activeFilter,
  onFilterChange,
}: FilterBarProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
      aria-label="Shablon filtrlari"
    >
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onFilterChange(filter.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/10 ${
              isActive
                ? "border-gold bg-gold text-white shadow-md shadow-gold/20"
                : "border-gold/10 bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:border-gold hover:text-gold"
            }`}
            aria-pressed={isActive}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
