"use client";

import React from "react";

interface Props {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
  hdOnly: boolean;
  onHdChange: (hd: boolean) => void;
  newOnly: boolean;
  onNewChange: (isNew: boolean) => void;
  minAge: number;
  maxAge: number;
  onAgeChange: (min: number, max: number) => void;
  tagFilter: string;
  onTagChange: (tag: string) => void;
}

const genders = ["All", "Female", "Male", "Couple", "Trans"];

const Filters: React.FC<Props> = ({
  selectedGender,
  onGenderChange,
  hdOnly,
  onHdChange,
  newOnly,
  onNewChange,
  minAge,
  maxAge,
  onAgeChange,
  tagFilter,
  onTagChange
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex space-x-2">
        {genders.map((gender) => (
          <button
            key={gender}
            onClick={() => onGenderChange(gender)}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedGender === gender
                ? "bg-pink-600 text-white"
                : "bg-zinc-700 text-zinc-300 hover:bg-zinc-600"
            }`}
          >
            {gender}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 items-center text-sm text-zinc-200">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={hdOnly} onChange={(e) => onHdChange(e.target.checked)} />
          HD Only
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={newOnly} onChange={(e) => onNewChange(e.target.checked)} />
          New Only
        </label>

        <label>
          Age:{" "}
          <input
            type="number"
            className="w-16 px-2 py-1 bg-zinc-700 rounded"
            value={minAge}
            onChange={(e) => onAgeChange(Number(e.target.value), maxAge)}
            placeholder="Min"
          />
          {" - "}
          <input
            type="number"
            className="w-16 px-2 py-1 bg-zinc-700 rounded"
            value={maxAge}
            onChange={(e) => onAgeChange(minAge, Number(e.target.value))}
            placeholder="Max"
          />
        </label>

        <input
          type="text"
          className="px-2 py-1 bg-zinc-700 rounded w-40"
          placeholder="Search tag"
          value={tagFilter}
          onChange={(e) => onTagChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Filters;
