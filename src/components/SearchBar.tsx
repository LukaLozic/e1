import React, { FormEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <div className="flex w-full rounded-full bg-zinc-900 border border-zinc-700 focus-within:border-pink-500 shadow-sm transition-all">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Søg brugernavn..."
          className="w-full px-5 py-2 text-sm bg-transparent text-white rounded-full outline-none focus:ring-0 placeholder-zinc-400"
        />
        <button
          type="submit"
          className="rounded-full px-5 py-2 bg-pink-500 text-white font-bold text-sm transition-all hover:bg-pink-600 focus:bg-pink-600 focus:outline-none"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
        >
          Søg
        </button>
      </div>
    </form>
  );
}