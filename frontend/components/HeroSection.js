// HeroSection.js
export default function HeroSection() {
  return (
    <section className="text-center py-12 sm:py-16 px-4 bg-white font-inter">
      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl mb-4 text-gray-900 max-w-4xl mx-auto leading-[1.2] sm:leading-[1.1] tracking-tight">
        The most realistic voice AI platform
      </h1>

      <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed tracking-normal px-2">
        AI voice models and products powering millions of developers, creators,
        and enterprises. From low-latency conversational agents to the leading
        AI voice generator for voiceovers and audiobooks.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4 px-2">
        <button className="bg-black text-white w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition-colors text-sm uppercase tracking-wide">
          Sign up
        </button>
        <button className="border border-gray-300 text-gray-700 w-full sm:w-auto px-6 sm:px-8 py-3 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm uppercase tracking-wide">
          Contact Sales
        </button>
      </div>
    </section>
  );
}
