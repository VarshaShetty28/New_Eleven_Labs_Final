// app/page.js
import Navbar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import TextToSpeechBox from "../components/TextToSpeechBox";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <HeroSection />

        {/* Text To Speech Card */}
        <div className="mt-8 flex justify-center">
          <TextToSpeechBox />
        </div>
      </main>
    </div>
  );
}