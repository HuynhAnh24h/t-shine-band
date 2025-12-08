import React, { useState, useEffect } from "react";
import { galleryItems } from "../constant/api.gallery";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaImage, FaVideo, FaPlay, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Filter items based on active tab
  const filteredItems = activeTab === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.type === activeTab);

  const openLightbox = (item, index) => {
    setCurrentItem(item);
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentItem(null);
    document.body.style.overflow = 'auto';
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setCurrentItem(filteredItems[nextIndex]);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setCurrentItem(filteredItems[prevIndex]);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, currentIndex]);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-20 px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 text-center" data-aos="fade-down">
        <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300">
            Thư viện
          </span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Khám phá những khoảnh khắc đáng nhớ của chúng tôi
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto mb-12" data-aos="fade-up">
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-300 border border-blue-500/20'
            }`}
          >
            <span>Tất cả</span>
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'image'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-300 border border-blue-500/20'
            }`}
          >
            <FaImage className="w-4 h-4" />
            <span>Hình ảnh</span>
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'video'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-cyan-300 border border-blue-500/20'
            }`}
          >
            <FaVideo className="w-4 h-4" />
            <span>Video</span>
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-slate-900/50 border border-blue-500/20 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/30"
              data-aos="fade-up"
              data-aos-delay={index * 50}
              onClick={() => openLightbox(item, index)}
            >
              {/* Image/Video Preview */}
              {item.type === 'image' ? (
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="relative w-full h-full">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Video Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <FaPlay className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {item.type === 'image' ? (
                      <FaImage className="w-4 h-4 text-cyan-400" />
                    ) : (
                      <FaVideo className="w-4 h-4 text-cyan-400" />
                    )}
                    <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-tight">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-300 text-sm mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Border Effect */}
              <div className="absolute inset-0 border-2 border-cyan-400/0 group-hover:border-cyan-400/50 rounded-2xl transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">Không có nội dung nào</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center text-white hover:bg-red-600/50 hover:border-red-400 transition-all duration-300 z-50"
            aria-label="Close"
          >
            <FaTimes className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          {filteredItems.length > 1 && (
            <>
              <button
                onClick={goToPrev}
                className="absolute left-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center text-white hover:bg-blue-600/50 hover:border-cyan-400 transition-all duration-300 z-50"
                aria-label="Previous"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-cyan-400/30 flex items-center justify-center text-white hover:bg-blue-600/50 hover:border-cyan-400 transition-all duration-300 z-50"
                aria-label="Next"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Content */}
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-8">
            <div className="max-w-6xl w-full max-h-full flex flex-col">
              {/* Media Content */}
              <div className="flex-1 flex items-center justify-center mb-6">
                {currentItem.type === 'image' ? (
                  <img 
                    src={currentItem.url} 
                    alt={currentItem.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                  />
                ) : (
                  <div className="w-full max-w-4xl aspect-video">
                    <iframe
                      src={currentItem.url}
                      title={currentItem.title}
                      className="w-full h-full rounded-2xl shadow-2xl"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/30 to-cyan-600/30 backdrop-blur-md border border-cyan-400/30 rounded-full mb-4">
                  {currentItem.type === 'image' ? (
                    <FaImage className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <FaVideo className="w-4 h-4 text-cyan-400" />
                  )}
                  <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">
                    {currentItem.type}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {currentItem.title}
                </h3>
                {currentItem.description && (
                  <p className="text-gray-400 text-lg">
                    {currentItem.description}
                  </p>
                )}
                <p className="text-gray-500 text-sm mt-4">
                  {currentIndex + 1} / {filteredItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>
    </section>
  );
};

export default Gallery;