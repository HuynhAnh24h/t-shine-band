import React, { useState, useEffect } from "react";
import { videos, videoCategories, getVideosByCategory } from "../constant/api.video";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaPlay, FaEye, FaClock, FaMusic } from 'react-icons/fa';

export default function VideoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState(videos);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  useEffect(() => {
    setFilteredVideos(getVideosByCategory(selectedCategory));
  }, [selectedCategory]);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-16 px-4 sm:px-6 lg:px-8">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12 text-center" data-aos="fade-down">
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Music</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our latest music videos and performances
        </p>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto mb-12" data-aos="fade-up">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50"
                : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-blue-500/20"
            }`}
          >
            <FaMusic className="inline mr-2" />
            ALL
          </button>
          {videoCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                selectedCategory === cat.slug
                  ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50"
                  : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50 border border-blue-500/20"
              }`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Videos Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video, index) => (
          <div
            key={video.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group relative bg-gradient-to-br from-slate-900/80 to-blue-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-blue-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-2 cursor-pointer"
            onClick={() => openVideoModal(video)}
          >
            {/* Glow Effect on Hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
            
            {/* Thumbnail Section */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              {/* Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-blue-600/90 backdrop-blur-md flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-cyan-500 shadow-2xl">
                  <FaPlay className="w-8 h-8 text-white ml-1" />
                </div>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-lg text-xs font-bold text-white">
                  <FaClock className="w-3 h-3" />
                  {video.duration}
                </span>
              </div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-blue-600/90 backdrop-blur-md rounded-full text-xs font-bold text-white uppercase">
                  {video.category}
                </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="relative p-6">
              <h3 className="text-2xl font-black text-white mb-2 line-clamp-1 group-hover:text-cyan-300 transition-colors duration-300">
                {video.title}
              </h3>
              
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                {video.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center gap-1.5">
                  <FaEye className="w-4 h-4" />
                  <span>{video.views}</span>
                </div>
                <div className="text-xs">
                  {new Date(video.releaseDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
              
              {/* Bottom Border Effect */}
              <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal bg-black/90 */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-cyan-400 transition-colors text-2xl font-bold"
            >
              ✕ Close
            </button>
            
            {/* Video Player */}
            <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="mt-6 bg-gradient-to-br from-slate-900/80 to-blue-900/40 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
              <h2 className="text-3xl font-black text-white mb-2">{selectedVideo.title}</h2>
              <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-6 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <FaEye className="w-4 h-4" />
                  <span>{selectedVideo.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="w-4 h-4" />
                  <span>{selectedVideo.duration}</span>
                </div>
                <div>
                  {new Date(selectedVideo.releaseDate).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </div>
  );
}