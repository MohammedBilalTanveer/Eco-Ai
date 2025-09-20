import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0a081d] py-6 mt-0 border-t border-white/10 text-center text-gray-400 text-sm">
      © {new Date().getFullYear()} EcoAI — Building a Greener Future 🌱
    </footer>
  );
};

export default Footer;
