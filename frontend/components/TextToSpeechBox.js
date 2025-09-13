// 1. TextToSpeechBox Component
"use client";
import { useState, useEffect } from "react";
import { Play, Pause, Download } from "lucide-react";
import Image from "next/image";

export default function TextToSpeechBox() {
  const [activeTab, setActiveTab] = useState("TEXT TO SPEECH");
  const [selectedLang, setSelectedLang] = useState("ENGLISH");
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioObj, setAudioObj] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const tabs = [
    "TEXT TO SPEECH",
    "AGENTS",
    "MUSIC",
    "SPEECH TO TEXT",
    "DUBBING",
    "VOICE CLONING",
    "ELEVENREADER",
  ];

  const voices = [
    { name: "Samara", desc: "Narrate a story", dot: "bg-cyan-500" },
    { name: "2 speakers", desc: "Create a dialogue", dot: "bg-pink-500" },
    { name: "Announcer", desc: "Voiceover a game", dot: "bg-green-500" },
    { name: "Sergeant", desc: "Play a drill sergeant", dot: "bg-purple-500" },
    { name: "Spuds", desc: "Recount an old story", dot: "bg-blue-500" },
    { name: "Jessica", desc: "Provide customer support", dot: "bg-rose-500" },
  ];

  // Fetch audio from backend when lang changes
  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/audio/${selectedLang}`
        );
        const data = await res.json();
        setAudioUrl(data.url || null);
      } catch (error) {
        console.error("Error fetching audio:", error);
        setAudioUrl(null);
      }
    };

    fetchAudio();
  }, [selectedLang]);

  const toggleAudio = () => {
    if (!audioUrl) return alert("No audio available!");

    if (!isPlaying) {
      const audio = new Audio(audioUrl);
      setAudioObj(audio);
      audio.play();
      setIsPlaying(true);

      audio.onended = () => {
        setIsPlaying(false);
        setAudioObj(null);
      };
    } else {
      if (audioObj) audioObj.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-3 sm:px-5 md:px-8 lg:px-12 w-full">
      {/* ===== Card Container ===== */}
      <div className="max-w-6xl w-full mb-6 border border-gray-200 rounded-2xl bg-white overflow-hidden shadow-lg">
        {/* Tabs */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 border-b border-gray-200 px-3 sm:px-4 py-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Section */}
        {activeTab === "TEXT TO SPEECH" && (
          <>
            {/* Text Area */}
            <div className="px-3 sm:px-6 py-5 text-gray-800 text-sm sm:text-base md:text-lg leading-relaxed">
              In the ancient land of Eldoria, where skies shimmered and forests
              whispered secrets to the wind, lived a dragon named Zephyros.{" "}
              <span className="text-purple-600 font-medium">
                [sarcastically]
              </span>{" "}
              Not the &quot;burn it all down&quot; kind...{" "}
              <span className="text-purple-600 font-medium">[giggles]</span> but
              he was gentle, wise, with eyes like old stars.{" "}
              <span className="text-purple-600 font-medium">[whispers]</span>{" "}
              Even the birds fell silent when he passed.
            </div>

            {/* Voice Chips */}
            <div className="flex flex-wrap gap-2 px-3 sm:px-6 py-4 sm:py-6 md:py-8 border-t border-gray-200 mt-6 sm:mt-10">
              {voices.map((voice) => (
                <div
                  key={voice.name}
                  className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-full text-xs sm:text-sm bg-white"
                >
                  <span className={`w-2 h-2 rounded-full ${voice.dot}`}></span>
                  <span className="font-semibold">{voice.name}</span>
                  <span className="text-gray-400 hidden sm:inline">|</span>
                  <span className="text-gray-600 hidden sm:inline">
                    {voice.desc}
                  </span>
                </div>
              ))}
            </div>

            {/* Footer Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3 sm:px-6 py-3 border-t border-gray-200 bg-gradient-to-r from-white via-transparent to-pink-100 gap-3 sm:gap-4">
              {/* Language Dropdown */}
              <div className="relative">
                <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 bg-white cursor-pointer">
                  <Image
                    src={
                      selectedLang === "ENGLISH"
                        ? "https://flagcdn.com/w20/us.png"
                        : "https://flagcdn.com/w20/sa.png"
                    }
                    alt="flag"
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="font-semibold text-sm sm:text-base bg-transparent outline-none cursor-pointer"
                  >
                    <option value="ENGLISH">ENGLISH</option>
                    <option value="ARABIC">ARABIC</option>
                  </select>
                </div>
              </div>

              {/* Play + Download */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={toggleAudio}
                  className="flex items-center gap-2 bg-black text-white rounded-full px-5 py-2 text-sm sm:text-base font-semibold hover:bg-gray-800 flex-1 sm:flex-initial justify-center"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>PAUSE</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>PLAY</span>
                    </>
                  )}
                </button>
                <a
                  href={audioUrl || "#"}
                  download
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100 transition"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Attribution */}
            <div className="text-center text-xs sm:text-sm font-medium text-gray-600 py-2 border-t border-gray-200">
              Powered by Eleven v3 (alpha)
            </div>
          </>
        )}
      </div>

      {/* ===== CTA Section (below card) ===== */}
      <div className="text-center mb-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <p className="text-xs sm:text-sm font-semibold tracking-wide uppercase text-center">
          EXPERIENCE THE FULL AUDIO AI PLATFORM
        </p>
        <button className="bg-black text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-full hover:bg-gray-800">
          SIGN UP
        </button>
      </div>
    </div>
  );
}
