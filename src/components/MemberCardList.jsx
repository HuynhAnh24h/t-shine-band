import React, { useEffect } from "react";
import { members } from "../constant/api.member";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar, FaArrowRight } from 'react-icons/fa';

export default function MemberCardList() {
  useEffect(() => {
    AOS.init({ 
      duration: 800,
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-16 text-center" data-aos="fade-down">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
          Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Team</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Passionate professionals dedicated to excellence
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {members.map((m, index) => (
          <Link
            to={`/member/${m.slug}`}
            key={m.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group relative bg-gradient-to-br from-slate-900/80 to-blue-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-2"
          >
            {/* Glow Effect on Hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
            
            {/* Avatar Section */}
            <div className="relative h-80 overflow-hidden">
              <img
                src={m.avatar}
                alt={m.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              {/* Role Badge - Floating on Image */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600/90 backdrop-blur-md rounded-full text-xs font-bold text-white border border-blue-400/30 shadow-lg">
                  <FaStar className="w-3 h-3" />
                  {m.role.toUpperCase()}
                </span>
              </div>

              {/* Name - Positioned at Bottom of Image */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-3xl font-black text-white mb-1 transform transition-transform duration-300 group-hover:translate-x-1">
                  {m.name}
                </h3>
                <div className="flex items-center text-cyan-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1">
                  <span className="text-sm font-semibold mr-2">View Profile</span>
                  <FaArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="relative p-6">
              <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                {m.desc}
              </p>
              
              {/* Bottom Border Effect */}
              <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </Link>
        ))}
      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
}