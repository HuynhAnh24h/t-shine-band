import React, { useEffect } from "react";
import { sponsors } from "../constant/api.sponsors";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SponsorsCarousel() {
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  // Duplicate sponsors array for seamless loop
  const duplicatedSponsors = [...sponsors, ...sponsors];

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20 px-4 overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16" data-aos="fade-down">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Partners</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Trusted by amazing brands and organizations
        </p>
      </div>

      {/* Carousel Container */}
      <div className="relative" data-aos="fade-up">
        {/* Gradient Overlays for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none"></div>

        {/* Scrolling Track */}
        <div className="flex gap-8 animate-scroll">
          {duplicatedSponsors.map((sponsor, index) => (
            <a
              key={`${sponsor.id}-${index}`}
              href={sponsor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 w-64 h-32 bg-gradient-to-br from-slate-900/80 to-blue-900/40 backdrop-blur-sm rounded-2xl border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
            >
              {/* Glow Effect on Hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
              
              {/* Logo Container */}
              <div className="relative w-full h-full flex items-center justify-center p-6">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
              </div>

              {/* Hover Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
          ))}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}