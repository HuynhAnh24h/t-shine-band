import React from "react";
import { FaUser, FaEnvelope, FaCommentDots } from "react-icons/fa";
import emailjs from "emailjs-com";

const ContactPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Gửi email qua EmailJS
    emailjs
      .sendForm("service_lmb87gj", "service_lmb87gj", e.target, "HPGOeddMLfK79KV08")
      .then(
        (result) => {
          console.log("Email sent:", result.text);
        },
        (error) => {
          console.log("Email error:", error.text);
        }
      );

    // Gửi telegram
    sendTelegram(`📩 New Contact:\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`);

    e.target.reset();
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-navy mb-6">Contact Us</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <FaUser className="text-navy mr-2" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2">
          <FaEnvelope className="text-navy mr-2" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full outline-none"
          />
        </div>

        <div className="flex items-start border border-gray-300 rounded-lg px-3 py-2">
          <FaCommentDots className="text-navy mr-2 mt-1" />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="w-full outline-none min-h-[100px]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-navy text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
