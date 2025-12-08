import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaBook, FaUsers, FaEnvelope, FaTimes, FaBars, FaMusic } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className={`fixed w-full top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-blue-500/10' 
            : 'bg-slate-950/95 via-blue-950/60 to-slate-950/70 backdrop-blur-lg'
        }`}
      >
        {/* Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            
            {/* Logo - Left Side */}
            <div 
              className="flex-shrink-0 z-20"
              data-aos="fade-right"
            >
              <Link to="/" className="group relative flex items-center gap-3">
                {/* Animated Music Icon */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30 group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <FaMusic className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Logo Text */}
                <div className="flex flex-col">
                  <h1 
                    className="text-4xl title-font font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-blue-400 tracking-wider drop-shadow-[0_0_15px_rgba(34,211,238,0.6)] group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.9)] transition-all duration-300"
                  >
                    TSHINE
                  </h1>
                  <div className="flex items-center gap-2 -mt-1">
                    <div className="h-px w-6 bg-gradient-to-r from-transparent to-cyan-400"></div>
                    <p className="text-[10px] text-cyan-400 font-bold tracking-[0.4em] uppercase">
                      Band
                    </p>
                    <div className="h-px w-6 bg-gradient-to-l from-transparent to-cyan-400"></div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-aos="fade-down"
                  data-aos-delay={index * 50}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                    isActive(link.to) 
                      ? 'text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {/* Animated Background */}
                  {isActive(link.to) ? (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-cyan-600/40 rounded-2xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur"></div>
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/20 group-hover:to-cyan-600/20 rounded-2xl transition-all duration-500"></div>
                  )}
                  
                  {/* Icon with Glow */}
                  <div className="relative">
                    <div className={`absolute -inset-1 rounded-lg blur transition-opacity duration-300 ${
                      isActive(link.to) 
                        ? 'bg-cyan-400 opacity-50' 
                        : 'bg-blue-400 opacity-0 group-hover:opacity-30'
                    }`}></div>
                    <link.icon className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                      isActive(link.to) 
                        ? 'text-cyan-300 scale-110' 
                        : 'text-gray-400 group-hover:text-cyan-300 group-hover:scale-110'
                    }`} />
                  </div>
                  
                  <span className="relative z-10 text-sm tracking-wide">
                    {link.label}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive(link.to) && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden relative w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 flex items-center justify-center text-white hover:border-cyan-400 transition-all duration-300 group overflow-hidden z-20"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/30 group-hover:to-cyan-600/30 transition-all duration-300"></div>
              {isOpen ? (
                <FaTimes className="w-6 h-6 relative z-10 transition-transform duration-300 rotate-90" />
              ) : (
                <FaBars className="w-6 h-6 relative z-10" />
              )}
            </button>
          </div>
        </div>

        {/* Bottom Glow Line */}
        <div className={`h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`}></div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Animated Backdrop */}
        <div 
          className="absolute inset-0 bg-slate-950/98 backdrop-blur-2xl"
          onClick={() => setIsOpen(false)}
        >
          {/* Animated Background Orbs */}
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Menu Content */}
        <div className={`relative h-full flex flex-col items-center justify-center transition-all duration-700 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}>
          
          {/* Logo in Mobile Menu */}
          <div className="mb-16" data-aos="zoom-in">
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-50 blur-xl"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50">
                  <FaMusic className="w-9 h-9 text-white" />
                </div>
              </div>
              <h2 className="text-4xl title-font font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-300 to-blue-400 tracking-wider">
                TSHINE
              </h2>
              <p className="text-xs text-cyan-400 font-bold tracking-[0.4em] uppercase">Band</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center gap-6">
            {navLinks.map((link, index) => (
              <Link
                key={link.to}
                to={link.to}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group relative"
              >
                <div className="flex items-center gap-5">
                  {/* Icon Container */}
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className={`absolute -inset-3 rounded-2xl blur-xl transition-all duration-500 ${
                      isActive(link.to)
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 opacity-75'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 opacity-0 group-hover:opacity-60'
                    }`}></div>
                    
                    {/* Icon Circle */}
                    <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive(link.to)
                        ? 'bg-gradient-to-br from-blue-600 to-cyan-600 shadow-2xl shadow-cyan-500/50 scale-110'
                        : 'bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border border-blue-400/30 group-hover:border-cyan-400 group-hover:scale-110'
                    }`}>
                      <link.icon className={`w-8 h-8 transition-all duration-300 ${
                        isActive(link.to) 
                          ? 'text-white' 
                          : 'text-blue-300 group-hover:text-white'
                      }`} />
                    </div>
                  </div>
                  
                  {/* Label */}
                  <div className="flex flex-col items-start">
                    <span className={`text-2xl font-bold transition-all duration-300 ${
                      isActive(link.to) 
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400' 
                        : 'text-gray-300 group-hover:text-white'
                    }`}>
                      {link.label}
                    </span>
                    {/* Active Indicator Line */}
                    <div className={`h-0.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full transition-all duration-500 ${
                      isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></div>
                  </div>
                </div>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="absolute bottom-8 text-center" data-aos="fade-up" data-aos-delay="500">
            <div className="flex items-center gap-3 text-gray-500 text-sm">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500"></div>
              <span>Tshine Band © 2024</span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-24"></div>
    </>
  );
};

export default Header;