import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBook, FaUsers, FaEnvelope, FaTimes, FaBars } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

// Import Networkand Free font from Google Fonts or add to your project
// Add this to your index.html or CSS:
// <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@700&display=swap" rel="stylesheet">

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Detect scroll for glass effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", icon: FaHome, label: "Trang chủ" },
    { to: "/gallery", icon: FaBook, label: "Thư viện" },
    { to: "/member", icon: FaUsers, label: "Thành viên" },
    { to: "/contact", icon: FaEnvelope, label: "Liên hệ" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-slate-950/90 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-blue-500/20' 
            : 'bg-gradient-to-r from-slate-950/80 via-blue-950/80 to-slate-950/80 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Left Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.slice(0, 2).map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-aos="fade-down"
                  data-aos-delay={index * 100}
                  className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2.5 ${
                    isActive(link.to) 
                      ? 'text-white bg-gradient-to-r from-blue-600/30 to-cyan-600/30' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {/* Hover Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/20 group-hover:to-cyan-600/20 rounded-xl transition-all duration-300"></div>
                  
                  <link.icon className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Bottom Border Animation */}
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-transform duration-300 ${
                    isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></div>
                </Link>
              ))}
            </nav>

            {/* Logo Center */}
            <div 
              className="flex-shrink-0"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <Link to="/" className="group flex items-center gap-4">
                {/* Logo Icon/Badge - Enhanced */}
                <div className="relative">
                  {/* Outer glow rings */}
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full blur-md opacity-60 group-hover:opacity-100 animate-pulse transition duration-500"></div>
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300"></div>
                  
                  {/* Main badge */}
                  <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 via-cyan-500 to-blue-700 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50 border-2 border-cyan-300/30 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-black text-2xl drop-shadow-lg" style={{ fontFamily: 'Impact, sans-serif' }}>T</span>
                    {/* Inner shine effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent"></div>
                  </div>
                  
                  {/* Rotating ring decoration */}
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-spin" style={{ animationDuration: '8s' }}></div>
                </div>
                
                {/* Logo Text with Networkand Free Font */}
                <div className="hidden sm:flex flex-col">
                  <h1 
                    className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 tracking-wider drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.8)] transition-all duration-300"
                    style={{ 
                      fontFamily: "'Networkand Free', 'Orbitron', 'Rajdhani', sans-serif",
                      letterSpacing: '0.1em'
                    }}
                  >
                    TSHINE
                  </h1>
                  <div className="flex items-center gap-2 -mt-1">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                    <p className="text-xs text-cyan-400 font-bold tracking-[0.3em]" style={{ fontFamily: "'Networkand Free', sans-serif" }}>
                      BAND
                    </p>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Right Navigation - Desktop */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.slice(2, 4).map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-aos="fade-down"
                  data-aos-delay={(index + 2) * 100}
                  className={`group relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center gap-2.5 ${
                    isActive(link.to) 
                      ? 'text-white bg-gradient-to-r from-blue-600/30 to-cyan-600/30' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/20 group-hover:to-cyan-600/20 rounded-xl transition-all duration-300"></div>
                  
                  <link.icon className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" />
                  <span className="relative z-10">{link.label}</span>
                  
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full transition-transform duration-300 ${
                    isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></div>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-10 h-10 rounded-xl bg-white/5 border border-blue-400/30 flex items-center justify-center text-white hover:bg-blue-500/20 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="w-5 h-5" />
              ) : (
                <FaBars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        ></div>

        {/* Menu Content */}
        <div className={`relative h-full flex flex-col items-center justify-center transition-transform duration-500 ${
          isOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <nav className="flex flex-col items-center space-y-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center gap-3">
                  {/* Icon Circle */}
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
                    <div className={`relative w-16 h-16 border rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive(link.to)
                        ? 'bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border-cyan-400'
                        : 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-400/30 group-hover:border-cyan-400'
                    }`}>
                      <link.icon className={`w-7 h-7 transition-all duration-300 ${
                        isActive(link.to) 
                          ? 'text-cyan-300' 
                          : 'text-blue-400 group-hover:text-cyan-300 group-hover:scale-110'
                      }`} />
                    </div>
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xl font-semibold transition-colors duration-300 ${
                    isActive(link.to) ? 'text-white' : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {link.label}
                  </span>
                </div>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-10 text-center">
            <p className="text-sm text-gray-500">Tshine Band © 2024</p>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-20"></div>
    </>
  );
};

export default Header;