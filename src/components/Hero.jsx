import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import heroSlides from "../constant/api.hero";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaChevronLeft, FaChevronRight, FaPlay } from "react-icons/fa";

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrent((prev) => (prev + 1) % heroSlides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrent((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating && index !== current) {
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-slate-950">
      
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ${
            index === current 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-105"
          }`}
        >
          {/* Background Image with Parallax Effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === current ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {/* Multi-layer Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 to-cyan-950/20"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl w-full text-center">
              
              {/* Slide Number */}
              <div 
                className={`inline-block mb-6 transition-all duration-700 delay-100 ${
                  index === current ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
                }`}
              >
                <span className="px-4 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 backdrop-blur-md border border-cyan-400/30 rounded-full text-cyan-300 text-sm font-bold tracking-wider">
                  {String(index + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
                </span>
              </div>

              {/* Title */}
              <h1 
                className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight transition-all duration-700 delay-200 ${
                  index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                  {slide.title}
                </span>
              </h1>

              {/* Description */}
              <p 
                className={`text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-300 ${
                  index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div 
                className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-700 delay-500 ${
                  index === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <Link
                  to="/members"
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full font-bold text-white shadow-lg shadow-blue-500/50 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Khám phá ngay
                    <FaPlay className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  to="/library"
                  className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-cyan-400/50 rounded-full font-bold text-white hover:bg-white/20 hover:border-cyan-400 transition-all duration-300 hover:scale-105"
                >
                  Xem thêm
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isAnimating}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center text-white hover:bg-blue-600/50 hover:border-cyan-400 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Previous slide"
      >
        <FaChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        disabled={isAnimating}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center text-white hover:bg-blue-600/50 hover:border-cyan-400 transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed group"
        aria-label="Next slide"
      >
        <FaChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`transition-all duration-500 rounded-full disabled:cursor-not-allowed ${
              index === current
                ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-cyan-500/50'
                : 'w-3 h-3 bg-white/30 hover:bg-white/50 hover:scale-125'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </section>
  );
};

export default Hero;