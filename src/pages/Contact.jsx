import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaCommentDots, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import emailjs from "emailjs-com";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ 
      duration: 800,
      easing: 'ease-out-cubic',
      once: true
    });
  }, []);

  const sendTelegram = async (message) => {
    const BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN"; // thay bằng token bot
    const CHAT_ID = "YOUR_CHAT_ID"; // thay bằng chat id
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
        }),
      });
      console.log("Telegram message sent!");
    } catch (error) {
      console.error("Telegram error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    try {
      // Gửi email qua EmailJS
      await emailjs.sendForm(
        "service_lmb87gj", 
        "service_lmb87gj", 
        e.target, 
        "HPGOeddMLfK79KV08"
      );

      // Gửi telegram
      await sendTelegram(
        `📩 New Contact:\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`
      );

      // Success state
      setSubmitSuccess(true);
      e.target.reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      
      {/* Background Decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg">
            We'd love to hear from you. Send us a message!
          </p>
        </div>

        {/* Contact Form Card */}
        <div 
          data-aos="fade-up"
          className="relative bg-gradient-to-br from-slate-900/80 to-blue-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-blue-500/20 shadow-2xl shadow-blue-500/20 p-8 md:p-12"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-10 blur"></div>

          {/* Success Message */}
          {submitSuccess && (
            <div 
              className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-2xl flex items-center gap-3 animate-pulse"
              data-aos="zoom-in"
            >
              <FaCheckCircle className="text-green-400 text-2xl" />
              <div>
                <p className="text-green-300 font-bold">Message Sent Successfully!</p>
                <p className="text-green-400/80 text-sm">We'll get back to you soon.</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative space-y-6">
            {/* Name Input */}
            <div className="group" data-aos="fade-right" data-aos-delay="100">
              <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-blue-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full bg-slate-800/50 border border-blue-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="group" data-aos="fade-right" data-aos-delay="200">
              <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">
                Your Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="text-blue-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  required
                  className="w-full bg-slate-800/50 border border-blue-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300"
                />
              </div>
            </div>

            {/* Message Textarea */}
            <div className="group" data-aos="fade-right" data-aos-delay="300">
              <label className="block text-gray-300 font-semibold mb-2 text-sm uppercase tracking-wide">
                Your Message
              </label>
              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <FaCommentDots className="text-blue-400 group-focus-within:text-cyan-400 transition-colors" />
                </div>
                <textarea
                  name="message"
                  placeholder="Tell us what's on your mind..."
                  required
                  rows="6"
                  className="w-full bg-slate-800/50 border border-blue-500/30 rounded-xl pl-12 pr-4 py-4 text-white placeholder-gray-500 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 resize-none"
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div data-aos="fade-up" data-aos-delay="400">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
              >
                {/* Button Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="transform group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </span>
              </button>
            </div>
          </form>

          {/* Bottom Decoration Line */}
          <div className="absolute bottom-0 left-12 right-12 h-1 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 rounded-full"></div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-center" data-aos="fade-up" data-aos-delay="500">
          <p className="text-gray-400 text-sm">
            Or reach us directly at{" "}
            <a href="mailto:contact@band.com" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              contact@band.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;