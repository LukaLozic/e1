import { useState, useRef, useEffect } from "react";

interface CountryDropdownProps {
  countries: { [code: string]: string };        // e.g. { "US": "United States", "DE": "Germany" }
  selectedCountry: string | null | "";          // e.g. "US" or "" for none selected
  onChange: (code: string) => void;             // callback when user picks a country
  countryCounts: { [code: string]: number };    // e.g. { "US": 5, "DE": 3 }
}

export default function CountryDropdown({
  countries,
  selectedCountry,
  onChange,
  countryCounts,
}: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedName = selectedCountry ? countries[selectedCountry] : "Alle lande";

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-800 text-white px-3 py-1 rounded flex items-center gap-2"
      >
        {selectedCountry && (
          <img
            src={`https://flagcdn.com/24x18/${selectedCountry.toLowerCase()}.png`}
            alt={selectedCountry}
            className="w-5 h-auto rounded-sm"
            loading="lazy"
          />
        )}
        <span>{selectedName}</span>
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 max-h-60 w-56 overflow-auto rounded-md bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <li
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
            className="cursor-pointer select-none px-4 py-2 text-white hover:bg-pink-500"
          >
            Alle lande
          </li>
{Object.keys(countries)
  .filter(code => countryCounts[code] && countryCounts[code] > 0)
  .map((code) => (
    <li
      key={code}
      onClick={() => {
        onChange(code);
        setIsOpen(false);
      }}
      className="flex items-center gap-2 cursor-pointer select-none px-4 py-2 text-white hover:bg-pink-500"
    >
      <img
        src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
        alt={code}
        className="w-5 h-auto rounded-sm"
        loading="lazy"
      />
      <span>{countries[code]} ({countryCounts[code]})</span>
    </li>
  ))}

        </ul>
      )}
    </div>
  );
}
