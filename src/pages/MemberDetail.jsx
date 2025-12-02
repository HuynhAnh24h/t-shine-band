import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { members } from "../constant/api.member";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaInstagram, FaTwitter, FaYoutube, FaPlay, FaQuoteLeft, FaStar } from 'react-icons/fa';

export default function MemberDetail() {
  const { slug } = useParams();
  const member = members.find((m) => m.slug === slug);
  const [activeTab, setActiveTab] = useState('photos');

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      easing: 'ease-out-cubic',
      once: true,
    });
  }, []);

  if (!member) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Member Not Found</h2>
        <p className="text-gray-400">Please check the URL and try again</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950">
      
      {/* Hero Section with Cover & Avatar */}
      <div className="relative h-[70vh] min-h-[500px]">
        {/* Cover Image with Gradient Overlay */}
        <div className="absolute inset-0">
          <img 
            src={member.cover} 
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-cyan-900/30"></div>
        </div>

        {/* Content Overlay */}
        <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-end h-full pb-12">
            
            {/* Avatar & Name Section */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
              
              {/* Avatar with Ring Effect */}
              <div 
                className="relative group"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-slate-900 overflow-hidden shadow-2xl">
                  <img 
                    src={member.galleryImages[0] || member.cover} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name & Role */}
              <div className="flex-1 text-center md:text-left" data-aos="fade-up" data-aos-delay="300">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 tracking-tight drop-shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                  {member.name}
                </h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4">
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-sm font-semibold text-white shadow-lg shadow-blue-500/50">
                    <FaStar className="w-4 h-4" />
                    {member.role}
                  </span>
                  <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium text-cyan-300 border border-blue-400/30">
                    {member.zodiac}
                  </span>
                </div>
                
                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-blue-400/30 flex items-center justify-center text-white hover:bg-blue-500/30 hover:border-blue-400 transition">
                    <FaInstagram className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-blue-400/30 flex items-center justify-center text-white hover:bg-blue-500/30 hover:border-blue-400 transition">
                    <FaTwitter className="w-5 h-5" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-blue-400/30 flex items-center justify-center text-white hover:bg-blue-500/30 hover:border-blue-400 transition">
                    <FaYoutube className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
        
        {/* Bio Card */}
        <div 
          className="max-w-4xl mx-auto mb-12"
          data-aos="fade-up"
        >
          <div className="bg-gradient-to-br from-slate-900/90 to-blue-900/60 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-blue-500/20 shadow-blue-500/10">
            <div className="flex items-start gap-4 mb-4">
              <FaQuoteLeft className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light">
                {member.bio}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="max-w-6xl mx-auto mb-8" data-aos="fade-up">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('photos')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'photos'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-300'
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-300'
              }`}
            >
              Videos
            </button>
          </div>
        </div>

        {/* Photos Gallery */}
        {activeTab === 'photos' && (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {member.galleryImages.map((img, i) => (
                <div
                  key={i}
                  className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer"
                  data-aos="fade-up"
                  data-aos-delay={i * 50}
                >
                  <img 
                    src={img} 
                    alt={`${member.name} photo ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/0 to-blue-900/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white font-semibold text-lg">Photo {i + 1}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-cyan-400/60 rounded-2xl transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Gallery */}
        {activeTab === 'videos' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {member.galleryVideos.map((vid, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-sm border border-blue-500/30 shadow-2xl shadow-blue-500/20"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="relative pt-[56.25%]">
                    <iframe
                      src={vid}
                      title={`${member.name} video ${i + 1}`}
                      className="absolute top-0 left-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                    <FaPlay className="inline w-3 h-3 mr-1" />
                    Video {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}