import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

const Footer = () => {

  const socialLinks = [
    { icon: FaFacebookF, href: "https://facebook.com/yourpage", label: "Facebook", color: "text-blue-500" },
    { icon: FaTwitter, href: "https://twitter.com/yourpage", label: "Twitter", color: "text-cyan-400" },
    { icon: FaInstagram, href: "https://instagram.com/yourpage", label: "Instagram", color: "text-pink-500" },
    { icon: FaYoutube, href: "https://youtube.com/yourpage", label: "Youtube", color: "text-red-600" },
  ];

  const quickLinks = [
    { to: "/", label: "Trang chủ" },
    { to: "/gallery", label: "Thư viện" },
    { to: "/member", label: "Thành viên" },
    { to: "/contact", label: "Liên hệ" },
    { to: "/privacy", label: "Chính sách" },
  ];
  
  // Màu nền xanh navy đậm, viền và shadow màu xanh-cyan
  return (
    <footer 
      className="bg-slate-950 pt-16 border-t border-cyan-500/30 shadow-[0_-5px_20px_rgba(20,184,166,0.1)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cột chính của Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-cyan-500/20 pb-12">
          
          {/* Cột 1: Logo và Mô tả */}
          <div 
            className="space-y-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* Logo Text (Giống Header) */}
            <Link to="/" className="group flex items-center gap-2">
                <h2 
                    className="text-2xl title-font font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-300 tracking-wider drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                >
                    TSHINE
                </h2>
            </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Ban nhạc TSHINE - Ánh sáng của Âm nhạc Điện tử. 
              Nơi giao thoa giữa những giai điệu tương lai và cảm xúc sâu lắng.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group ${item.color}`}
                  data-aos="zoom-in"
                  data-aos-delay={index * 150 + 200}
                >
                  {/* Neon Glow Effect */}
                  <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-50 transition duration-300 ${
                      item.label === 'Facebook' ? 'bg-blue-500' : 
                      item.label === 'Twitter' ? 'bg-cyan-400' :
                      item.label === 'Instagram' ? 'bg-pink-500' :
                      'bg-red-600'
                  }`}></div>
                  <div className="relative p-2 rounded-full bg-slate-800/80 border border-cyan-500/30 group-hover:bg-slate-700 transition duration-300">
                    <item.icon className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Cột 2: Liên kết nhanh */}
          <div 
            className="space-y-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-bold tracking-widest text-cyan-400 border-b border-blue-600/50 pb-2 mb-4 uppercase">
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={link.to} data-aos="fade-left" data-aos-delay={index * 100 + 300}>
                  <Link
                    to={link.to}
                    className="flex items-center gap-3 text-gray-400 hover:text-cyan-300 transition-colors duration-300 group relative"
                  >
                    <FaStar className="w-3 h-3 text-blue-500 group-hover:text-cyan-300 transition-transform duration-300 group-hover:scale-110" />
                    <span>{link.label}</span>
                    {/* Hover line effect */}
                    <span className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Cột 3: Thông tin liên hệ */}
          <div 
            className="space-y-6"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-xl font-bold tracking-widest text-cyan-400 border-b border-blue-600/50 pb-2 mb-4 uppercase">
              Thông tin liên hệ
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3" data-aos="fade-left" data-aos-delay="400">
                <FaMapMarkerAlt className="flex-shrink-0 w-5 h-5 mt-1 text-blue-500" />
                <span>
                  Tầng 1, Tòa nhà Future Tech, 123 Cyber St, <br/>
                  Cyber City, Việt Nam
                </span>
              </li>
              <li className="flex items-center gap-3" data-aos="fade-left" data-aos-delay="500">
                <FaEnvelope className="flex-shrink-0 w-5 h-5 text-blue-500" />
                <a href="mailto:contact@tshineband.com" className="hover:text-cyan-300 transition-colors">
                  contact@tshineband.com
                </a>
              </li>
              <li className="flex items-center gap-3" data-aos="fade-left" data-aos-delay="600">
                <FaPhoneAlt className="flex-shrink-0 w-5 h-5 text-blue-500" />
                <a href="tel:+84123456789" className="hover:text-cyan-300 transition-colors">
                  +84 123 456 789
                </a>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bản quyền (Copyright Bar) */}
        <div 
          className="py-6 text-center text-gray-500 text-sm"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <p className="flex justify-center items-center gap-2">
            © {new Date().getFullYear()} TSHINE Band. Được tạo nên với 
          </p>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;