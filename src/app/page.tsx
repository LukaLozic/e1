"use client";

import { useEffect, useState } from "react";
import { Model } from "@/types/model";

export default function HomePage() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(100);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      let offset = 0;
      const limit = 500;

      try {
        const res = await fetch(
          `https://chaturbate.com/api/public/affiliates/onlinerooms/?wm=RCJNu&format=json&limit=${limit}&offset=${offset}&client_ip=request_ip`
        );
        const data = await res.json();
        setModels(data.results || []);
        console.log(`Total models fetched: ${data.results.length}`);
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

  const fullDescriptionFemale = [
    "Det her er ikke nogen porno med manuskript – det er ægte piger, der tænder på at blive set. Hver dag, 24/7, logger tusindvis af liderlige piger på, tænder kameraet, spreder benene og begynder at lege med deres våde fisse – kun for dig.",
    "Se dem gnide klitten, stønne og tigge om mere. Nogle gør det blidt og langsomt – finger for finger. Andre maser straks dildoen helt op i sig og bliver gennemrystet af kraftige vibratorer, indtil de kommer i ekstatiske ryk.",
    "Der er generte piger, som rødmer, når du roser dem – men de stopper ikke med at lege. Og så er der de vilde luder-typer, der smækker røven op i cam’en og råber: “Sig at du spiller pik til mig!”.",
    "Nogle er unge teen-tøser, der prøver cam for første gang. Andre er erfarne milfs, der ved præcis hvad de skal sige og gøre for at få din pik stiv på to sekunder.",
    "Fisserne er barberede, behårede, stramme, saftige, slidte – vælg lige præcis den du tænder på. Du kan se dem, sende beskeder, vælge efter udseende og endda få dem til at gøre lige hvad du vil.",
    "Alt er live. Alt er ægte. Og alt er fucking frækt.",
  ];

  const fullDescriptionCouple = [
    "Hundredvis af par er online lige nu – klik og se dem knalde vildt foran kameraet. Her får du rå og liderlig live-sex direkte fra soveværelset, hele døgnet rundt.",
    "På kneppe.me møder du ægte amatørpar fra hele verden, klar til at vise alt. Eksotiske, nysgerrige, liderlige – de elsker at blive set, mens de knepper hårdt foran deres webcam.",
    "Hvis du vil se ægte lyster, saftige pikke og våde fisser i aktion, er du kommet til det helt rigtige sted. 24/7 non-stop webcam knald, uden filter.",
  ];

  const fullDescriptionTrans = [
    "Klik på et billede og kom direkte ind i en verden af frække transsexuelle, der elsker at blive set. Her finder du smukke shemales med faste bryster, stive pikker og forførende læber – alt sammen live på cam.",
    "Uanset om du tænder på en liderlig trans-pige der leger med sig selv, suger pik eller bliver kneppet i røven – her får du det hele serveret råt og tæt på.",
    "Disse transsexuelle er ægte amatører fra hele verden, som elsker at vise deres liderlige kroppe frem foran kameraet. Nogle flirter, andre dominerer – og mange vil have dig til at tage styringen i chatten.",
    "Hvis du elsker kombinationen af bryster og pik, frække øjne og sulten attitude, så er du kommet til det helt rigtige sted. Se dem live, tal med dem, og få dem til at gøre alt det, du fantaserer om.",
  ];

  const fullDescriptionMale = [
    "Stive pikke, liderlige fyre og frække gay-par viser alt foran cam – klar til at lege, flirte og sprøjte for dig. Her finder du både homo og bi fyre, der elsker at spille pik og vise sig frem.",
    "Gå ind, se dem gøre sig klar, gnide sig selv, og måske finde en fyr at knalde live. Vores mænd er ægte amatører – de tænder på at blive kigget på, mens de leger med sig selv eller hinanden.",
    "Deltag, chat, og nyd synet af hårde kroppe og varme pikker, der venter på din opmærksomhed.",
  ];

  const filteredModels = models.filter((model) => {
    if (selectedGender !== "All" && model.gender !== genderMap[selectedGender]) return false;
    if (selectedCountry && model.country !== selectedCountry) return false;
    if (model.age < minAge || model.age > maxAge) return false;
    return true;
  });

  const countryCounts: { [country: string]: number } = models.reduce((acc, model) => {
    if (model.country) {
      acc[model.country] = (acc[model.country] || 0) + 1;
    }
    return acc;
  }, {} as { [country: string]: number });

  const uniqueCountries = Object.keys(countryCounts).sort();

  const handleAgeChange = (range: string) => {
    const [min, max] = range.split("-").map(Number);
    setMinAge(min);
    setMaxAge(max);
  };

  const getDescriptionContent = () => {
    if (selectedGender === "Female") {
      return {
        title: "Camshow med piger & kvinder",
        paragraphs: fullDescriptionFemale,
      };
    } else if (selectedGender === "Couple") {
      return {
        title: "Se par knalde live på cam",
        paragraphs: fullDescriptionCouple,
      };
    } else if (selectedGender === "Trans") {
      return {
        title: "Transsexuelle live – se shemales vise alt for dig",
        paragraphs: fullDescriptionTrans,
      };
    } else if (selectedGender === "Male") {
      return {
        title: "Se nøgne mænd og drengerøv knalde live på cam",
        paragraphs: fullDescriptionMale,
      };
    }
    return null;
  };

  const description = getDescriptionContent();

  return (
    <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
      {/* Header */}
      <header className="bg-zinc-950 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold tracking-wide text-pink-500">ErosLive</h1>

          <div className="flex flex-wrap gap-4 items-center">
            <select
              className="bg-zinc-800 text-white px-3 py-1 rounded"
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option value="">Alle lande</option>
              {uniqueCountries.map((country) => (
                <option key={country} value={country}>
                  {country} ({countryCounts[country]})
                </option>
              ))}
            </select>

            <select
              className="bg-zinc-800 text-white px-3 py-1 rounded"
              onChange={(e) => handleAgeChange(e.target.value)}
            >
              <option value="18-100">Alle aldre</option>
              <option value="18-25">18–25</option>
              <option value="26-35">26–35</option>
              <option value="36–50">36–50</option>
              <option value="51-100">50+</option>
            </select>

            {["All", "Female", "Male", "Couple", "Trans"].map((gender) => (
              <button
                key={gender}
                onClick={() => {
                  setSelectedGender(gender);
                  setIsExpanded(false);
                }}
                className={`px-3 py-1 rounded ${
                  selectedGender === gender
                    ? "bg-pink-500 text-white"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {gender === "All" ? "Alle" : gender === "Female" ? "Kvinder" : gender === "Couple" ? "Par" : gender === "Trans" ? "Trans" : "Mænd"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Optional Description Section */}
      {description && (
        <section className="bg-zinc-800 text-white px-6 py-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-pink-400 mb-4">{description.title}</h2>
            <div className="text-sm leading-6 text-zinc-300 space-y-4">
              {isExpanded
                ? description.paragraphs.map((para, idx) => <p key={idx}>{para}</p>)
                : <p>{description.paragraphs[0]}</p>}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-sm text-pink-400 hover:underline border border-pink-500 px-2 py-1 rounded"
            >
              {isExpanded ? "Se mindre ▲" : "Se mere ▼"}
            </button>
          </div>
        </section>
      )}

      {/* Main content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-10">
        {filteredModels.length === 0 ? (
          <p className="text-center text-gray-400">Ingen modeller fundet.</p>
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
                <div className="relative">
                  <img
                    src={model.image_url_360x270}
                    alt={model.display_name}
                    className="w-full h-44 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>

                <div className="p-3 pb-10 space-y-2 relative z-10">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span>{model.username}</span>
                    <span className="text-pink-400">{model.age}</span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-snug">{model.room_subject}</p>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center text-xs text-zinc-400 bg-zinc-900 bg-opacity-75 px-2 py-1 rounded">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4 mr-1"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.68 1.662-1.196 2.385a11.954 11.954 0 01-1.786 1.987C16.268 16.057 14.477 17 12 17c-2.477 0-4.268-.943-5.56-2.628a11.954 11.954 0 01-1.786-1.987A11.954 11.954 0 012.458 12z" />
                  </svg>
                  <span>{model.num_users}</span>
                </div>

                {model.country && (
                  <div className="absolute bottom-2 left-2 text-xs bg-zinc-900 bg-opacity-75 px-2 py-1 rounded">
                    <img
                      src={`https://flagcdn.com/w40/${model.country.toLowerCase()}.png`}
                      alt={model.country}
                      className="w-6 h-4 object-cover"
                    />
                  </div>
                )}

                {model.is_hd && (
                  <span className="absolute top-2 right-2 bg-pink-500 text-xs px-2 py-1 rounded font-bold">
                    HD
                  </span>
                )}
                {model.is_new && (
                  <span className="absolute top-2 left-2 bg-green-600 text-xs px-2 py-1 rounded font-bold">
                    NY
                  </span>
                )}
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
            <a href="#" className="hover:text-white">Privatliv</a>
            <a href="#" className="hover:text-white">Betingelser</a>
            <a href="#" className="hover:text-white">DMCA</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
