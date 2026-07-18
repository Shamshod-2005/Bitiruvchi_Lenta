import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
}: SearchBarProps) {
  return (
    <label className="group relative block w-full">
      <span className="sr-only">Search templates</span>
      <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-gold" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-gold/10 bg-warm-bg/50 py-3 pl-11 pr-4 text-sm text-editorial-dark shadow-sm outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-gold focus:ring-2 focus:ring-gold/10"
        aria-label="Qidirish"
      />
    </label>
  );
}
