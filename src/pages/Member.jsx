import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { members } from "../constant/api.member";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaStar, FaArrowRight, FaMusic, FaUsers } from 'react-icons/fa';

const Members = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  // Get unique roles for filter
  const roles = ['all', ...new Set(members.map(m => m.role))];

  // Filter members
  const filteredMembers = filter === 'all' 
    ? members 
    : members.filter(m => m.role === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-md border border-cyan-400/30 rounded-full mb-6"
            data-aos="fade-down"
          >
            <FaUsers className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 font-semibold tracking-wider">
              {members.length} THÀNH VIÊN
            </span>
          </div>

          {/* Title */}
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
              Our Team
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Gặp gỡ những tài năng đằng sau âm nhạc của chúng tôi
          </p>

          {/* Decorative Line */}
          <div 
            className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"
            data-aos="fade-up"
            data-aos-delay="300"
          ></div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex justify-center gap-3 flex-wrap" data-aos="fade-up">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setFilter(role)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm uppercase tracking-wider ${
                filter === role
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-300 border border-blue-500/20'
              }`}
            >
              {role === 'all' ? 'Tất cả' : role}
            </button>
          ))}
        </div>
      </section>

      {/* Members Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMembers.map((member, index) => (
            <Link
              key={member.id}
              to={`/member/${member.slug}`}
              onMouseEnter={() => setHoveredId(member.id)}
              onMouseLeave={() => setHoveredId(null)}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-slate-900/80 to-blue-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-3">
                
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
                
                {/* Avatar Section */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Role Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600/90 backdrop-blur-md rounded-full text-xs font-bold text-white border border-blue-400/30 shadow-lg">
                      <FaStar className="w-3 h-3" />
                      {member.role.toUpperCase()}
                    </span>
                  </div>

                  {/* Zodiac Badge */}
                  {member.zodiac && (
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-cyan-300 border border-cyan-400/30">
                        {member.zodiac}
                      </span>
                    </div>
                  )}

                  {/* Name & CTA */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-3xl font-black text-white mb-2 transform transition-transform duration-300 group-hover:translate-x-1">
                      {member.name}
                    </h3>
                    <div className="flex items-center text-cyan-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <span className="text-sm font-semibold mr-2">Xem chi tiết</span>
                      <FaArrowRight className="w-3 h-3 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="relative p-6">
                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                    {member.desc || member.bio}
                  </p>
                  
                  {/* Stats/Info */}
                  {member.specialty && (
                    <div className="flex items-center gap-2 text-cyan-400 text-xs">
                      <FaMusic className="w-3 h-3" />
                      <span className="font-medium">{member.specialty}</span>
                    </div>
                  )}

                  {/* Bottom Border Effect */}
                  <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                </div>

                {/* Hover Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 group-hover:left-full transition-all duration-1000"></div>
                </div>
              </div>

              {/* Floating Animation for Hovered Card */}
              <div className={`absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-xl transition-opacity duration-500 -z-10 ${
                hoveredId === member.id ? 'opacity-100' : 'opacity-0'
              }`}></div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="inline-block p-8 bg-white/5 rounded-3xl border border-blue-500/20 mb-6">
              <FaUsers className="w-16 h-16 text-gray-500 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Không tìm thấy thành viên</h3>
            <p className="text-gray-400">Thử chọn bộ lọc khác</p>
          </div>
        )}
      </section>

      

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default Members;