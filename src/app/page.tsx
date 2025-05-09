"use client";

import { useEffect, useState } from "react";
import { Model } from "@/types/model";

export default function HomePage() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(100);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const res = await fetch("https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=RCJNu&client_ip=request_ip&format=json");
        const data = await res.json();
        console.log(data); // Log the entire response
        setModels(data.results || []);
      } catch (error) {
        console.error("Client fetch error:", error);
      }
    };
  
    loadModels();
  }, []);
  

  const genderMap: { [key: string]: string } = {
    Female: "f",
    Male: "m",
    Couple: "c",
    Trans: "s",
  };

  const filteredModels = models.filter((model) => {
    if (selectedGender !== "All" && model.gender !== genderMap[selectedGender]) return false;
    if (selectedCountry && model.country !== selectedCountry) return false;
    if (model.age < minAge || model.age > maxAge) return false;
    return true;
  });

  const uniqueCountries = Array.from(new Set(models.map((m) => m.country).filter(Boolean))).sort();

  const handleAgeChange = (range: string) => {
    const [min, max] = range.split("-").map(Number);
    setMinAge(min);
    setMaxAge(max);
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Header */}
      <header className="bg-zinc-950 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold tracking-wide text-pink-500">ErosLive</h1>

          <div className="flex flex-wrap gap-4 items-center">
            {/* Country Dropdown */}
            <select
              className="bg-zinc-800 text-white px-3 py-1 rounded"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            {/* Age Range Dropdown */}
            <select
              className="bg-zinc-800 text-white px-3 py-1 rounded"
              onChange={(e) => handleAgeChange(e.target.value)}
            >
              <option value="18-100">All Ages</option>
              <option value="18-25">18–25</option>
              <option value="26-35">26–35</option>
              <option value="36-50">36–50</option>
              <option value="51-100">50+</option>
            </select>

            {/* Gender Buttons */}
            {["All", "Female", "Male", "Couple", "Trans"].map((gender) => (
              <button
                key={gender}
                onClick={() => setSelectedGender(gender)}
                className={`px-3 py-1 rounded ${
                  selectedGender === gender
                    ? "bg-pink-500 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {gender}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">
        {filteredModels.length === 0 ? (
          <p className="text-center text-gray-400">No models found.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredModels.map((model) => (
              <a
                key={model.username}
                href={model.chat_room_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-zinc-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition"
              >
                <img
                  src={model.image_url_360x270}
                  alt={model.display_name}
                  className="w-full h-44 object-cover"
                />
                <div className="p-3 space-y-1">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{model.display_name}</span>
                    <span className="text-pink-400">{model.age}</span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate">{model.room_subject}</p>
                  <div className="flex justify-between items-center mt-2 text-xs text-zinc-400">
                    <span>{model.country}</span>
                    <span>{model.num_users} online</span>
                  </div>
                  {model.is_hd && (
                    <span className="absolute top-2 right-2 bg-pink-500 text-xs px-2 py-1 rounded font-bold">HD</span>
                  )}
                  {model.is_new && (
                    <span className="absolute top-2 left-2 bg-green-600 text-xs px-2 py-1 rounded font-bold">NEW</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 text-zinc-400 text-sm py-6">
        <div className="max-w-7xl mx-auto px-6 flex justify-between flex-wrap gap-4">
          <div>&copy; {new Date().getFullYear()} ErosLive</div>
          <div className="space-x-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">DMCA</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
