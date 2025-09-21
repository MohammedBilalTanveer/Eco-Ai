// src/components/Contact.jsx
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiMail, FiUser, FiEdit3 } from "react-icons/fi";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const [isSent, setIsSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_hc3ymvj", "template_ez9bw4e", form.current, "EZd_-9QWM0kBzphGC")
      .then(
        () => {
          setIsSent(true);
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        },
        () => {
          toast.error("Failed to send message. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        }
      );
  };

  return (
    <section className="flex flex-col items-center justify-center relative px-4 mt-1">
      <ToastContainer />

      <h2 className="text-5xl text-center text-white font-bold mb-10">
        Contact <span className="text-[#8245ec]">Us</span>
      </h2>
      <div className="mb-4"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative w-full max-w-md bg-gray-900/70 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(130,69,236,0.4)]"
      >
        <p className="text-gray-200 mb-6 text-center">
          We'd love to hear from you!
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-5">
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
              className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
            />
          </div>

          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
              className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
            />
          </div>

          <div className="relative">
            <FiEdit3 className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
            />
          </div>

          <div className="relative">
            <FiEdit3 className="absolute left-3 top-3 text-gray-400 text-xl" />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              required
              className="w-full pl-10 p-3 bg-gray-800/80 rounded-lg focus:ring-2 focus:ring-[#8245ec] outline-none text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#8245ec] to-purple-500 rounded-lg font-bold text-white shadow hover:from-purple-500 hover:to-[#8245ec] transition-all"
          >
            {isSent ? "Sent ✅" : "Send"}
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Contact;
