"use client";

import { useEffect, useState } from "react";
import { Model } from "@/types/model";
import { chaturbateCountries } from '@/utils/countries';
import CountryDropdown from "@/components/CountryDropdown";
import AdBlockNotice from "@/components/AdBlockNotice"; // adjust the path as needed>
import { usePathname, useRouter } from "next/navigation";



export default function HomePage({ genderParam = "" }: { genderParam?: string }) {
    const router = useRouter();
    const path = usePathname(); // ✅ VALID outside useEffect
    const [models, setModels] = useState<Model[]>([]);
    const [selectedGender, setSelectedGender] = useState("All");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(100);
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const modelsPerPage = 20; // number of models per page

    useEffect(() => {
   
      // Fetch models
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


    useEffect(() => {
      const pathGender = path?.split("/")[1]?.toLowerCase();

      const genderMapFromPath: { [key: string]: string } = {
        kvinder: "Female",
        maend: "Male",
        par: "Couple",
        trans: "Trans",
        all: "All",
      };

      const genderFromPath = genderMapFromPath[pathGender];

      if (genderFromPath) {
        setSelectedGender(genderFromPath);
      } else {
        setSelectedGender("All"); // fallback
      }
    }, [path]); // 👈 include path as dependency



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

    // Filtering models based on selected filters
    const filteredModels = models.filter((model) => {
      if (selectedGender !== "All" && model.gender !== genderMap[selectedGender]) return false;
      if (selectedCountry && model.country !== selectedCountry) return false;
      if (model.age < minAge || model.age > maxAge) return false;
      return true;
    });

    // Pagination calculations
    const indexOfLastModel = currentPage * modelsPerPage;
    const indexOfFirstModel = indexOfLastModel - modelsPerPage;
    const currentModels = filteredModels.slice(indexOfFirstModel, indexOfLastModel);
    const totalPages = Math.ceil(filteredModels.length / modelsPerPage);

    // Counts for countries in all models
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
      setCurrentPage(1); // Reset to first page on filter change
    };

    // When filters change, reset page to 1
    useEffect(() => {
      setCurrentPage(1);
    }, [selectedGender, selectedCountry, minAge, maxAge]);

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

    const handlePageChange = (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top on page change
      }
    };

    return (
      <div className="min-h-screen flex flex-col bg-zinc-900 text-white">
        {/* AdBlock Warning */}

        {/* Header */}
        <header className="bg-zinc-950 shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold tracking-wide text-pink-500">KneppeMe</h1>

            <div className="flex flex-wrap gap-4 items-center">
              <CountryDropdown
                countries={chaturbateCountries}
                selectedCountry={selectedCountry}
                onChange={setSelectedCountry}
                countryCounts={countryCounts}
              />
              <select
                className="bg-zinc-800 text-white px-3 py-1 rounded"
                onChange={(e) => handleAgeChange(e.target.value)}
                value={`${minAge}-${maxAge}`}
              >
                <option value="18-100">Alle aldre</option>
                <option value="18-25">18–25</option>
                <option value="26-35">26–35</option>
                <option value="36-50">36–50</option>
                <option value="51-100">50+</option>
              </select>

              {["All", "Female", "Male", "Couple", "Trans"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => {
                    const genderPathMap: { [key: string]: string } = {
                      All: "",
                      Female: "kvinder",
                      Male: "maend",
                      Couple: "par",
                      Trans: "trans",
                    };
                    router.push(`/${genderPathMap[gender]}`);
                    setIsExpanded(false);
                  }}

                  className={`px-3 py-1 rounded ${
                    selectedGender === gender
                      ? "bg-pink-500 text-white"
                      : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                  }`}
                >
                  {gender === "All"
                    ? "Alle"
                    : gender === "Female"
                    ? "Kvinder"
                    : gender === "Couple"
                    ? "Par"
                    : gender === "Trans"
                    ? "Trans"
                    : "Mænd"}
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
       
       
        {/* AdBlockNotice  Optional*/}

          {filteredModels.length === 0 ? (
            <p className="text-center text-gray-400">Ingen modeller fundet.</p>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {currentModels.map((model) => (
                  <a
                    key={model.username}
                    href={`/api/redirect?to=${encodeURIComponent(model.chat_room_url)}`}
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
                        <div className="flex items-center space-x-2 text-pink-400">
                          <span>{model.age}</span>
                          {model.country && (
                            <img
                              src={`https://flagcdn.com/24x18/${model.country.toLowerCase()}.png`}
                              alt={model.country}
                              className="w-5 h-auto rounded-sm"
                              loading="lazy"
                            />
                          )}
                        </div>
                      </div>
                      <div className="border-t border-zinc-700 my-2"></div>

                      <p className="text-xs text-zinc-400 line-clamp-2 leading-snug">{model.room_subject}</p>
                    </div>

                    <div className="absolute bottom-2 right-2 flex items-center text-xs text-zinc-400 bg-zinc-900 bg-opacity-75 px-2 py-1 rounded">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                        vectorEffect="non-scaling-stroke"
                        className="w-4 h-4 mr-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.857-.68 1.662-1.196 2.385a11.954 11.954 0 01-1.786 1.987C16.268 16.057 14.477 17 12 17c-2.477 0-4.268-.943-5.56-2.628a11.954 11.954 0 01-1.786-1.987A11.954 11.954 0 012.458 12z"
                        />
                      </svg>
                      <span>{model.num_users}</span>
                    </div>



                    {typeof model.seconds_online === "number" && (
                      <div className="absolute bottom-2 left-2 bg-zinc-900 bg-opacity-75 rounded px-2 py-1 text-xs text-white flex items-center space-x-1 select-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-pink-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                        </svg>
                        <span>
                          {(model.seconds_online / 3600).toFixed(1)} t
                        </span>
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

              {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="mt-8 pt-4 border-t border-pink-300">
                    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 text-white select-none px-4 py-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded border border-pink-500 hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Forrige
                      </button>

                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 2 && page <= currentPage + 2)
                        ) {
                          return (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`px-3 py-1 rounded border border-pink-500 ${
                                currentPage === page ? "bg-pink-600 font-bold" : "hover:bg-pink-600"
                              }`}
                            >
                              {page}
                            </button>
                          );
                        }
                        if (
                          (page === currentPage - 3 && page > 1) ||
                          (page === currentPage + 3 && page < totalPages)
                        ) {
                          return (
                            <span key={page} className="px-2 py-1">
                              ...
                            </span>
                          );
                        }
                        return null;
                        
                      })}

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded border border-pink-500 hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Næste
                      </button>
                    </div>
                  </div>
                )}

            </>
          )}
        </main>

        <footer className="text-center p-5 text-xs text-zinc-500">
          &copy; 2025 KneppeMe. Alle rettigheder forbeholdes.
        </footer>
      </div>
    );
  }
