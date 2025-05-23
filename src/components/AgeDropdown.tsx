import { useState, useRef, useEffect } from "react";

interface AgeDropdownProps {
  minAge: number;
  maxAge: number;
  onChange: (range: string) => void;
}

const options = [
  { value: "18-100", label: "Alle aldre" },
  { value: "18-25", label: "18–25" },
  { value: "26-35", label: "26–35" },
  { value: "36-50", label: "36–50" },
  { value: "51-100", label: "50+" }
];

export default function AgeDropdown({ minAge, maxAge, onChange }: AgeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find(o => o.value === `${minAge}-${maxAge}`) || options[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-800 text-white px-3 py-2 rounded flex items-center gap-2 cursor-pointer"
        type="button"
      >
        <span>{selected.label}</span>
        <svg
          className="w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-36 max-h-60 overflow-auto rounded-md bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => {
                const [min, max] = option.value.split('-').map(Number);
                onChange(option.value);
                setIsOpen(false);
              }}
              className="cursor-pointer select-none px-4 py-2 text-white hover:bg-pink-500"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}