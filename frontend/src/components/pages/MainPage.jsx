// --- inside MainPage.jsx ---
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import Contact from "../Contact";
import Footer from "../Footer";
import { FiStar } from "react-icons/fi";
import WorkCarousel from "./WorkCarousel"; // ✅ import carousel

const FloatingBlob = ({ size, color, top, left, delay }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-30"
    style={{ width: size, height: size, top, left, backgroundColor: color }}
    animate={{ y: [0, -30, 0] }}
    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay }}
  />
);

// Reviews data
const reviews = [
  {
    name: "Amit Sharma",
    service: "Food Donation",
    stars: 5,
    text: "EcoAI connected me with NGOs effortlessly. Amazing impact!"
  },
  {
    name: "Priya Singh",
    service: "Waste Reporting",
    stars: 4,
    text: "Quick response from authorities after my report. Very useful!"
  },
  {
    name: "Rahul Mehta",
    service: "Live Truck Map",
    stars: 5,
    text: "Real-time tracking is a game changer. No more missed collections."
  }
];

const MainPage = () => {
  return (
    <div className="bg-[#050414] min-h-screen relative overflow-hidden text-white">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Floating Blobs */}
      <FloatingBlob size="400px" color="#8245ec" top="20%" left="10%" delay={0} />
      <FloatingBlob size="300px" color="#4ade80" top="50%" left="70%" delay={2} />
      <FloatingBlob size="350px" color="#60a5fa" top="75%" left="30%" delay={4} />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-[8vw] text-center">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-6"
        >
          Building a <span className="text-[#8245ec]">Greener</span> Future with AI
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl text-gray-400 max-w-3xl mx-auto mb-10"
        >
          EcoAI leverages technology to streamline waste management, reduce
          environmental impact, and build sustainable communities.
        </motion.p>
        <Link
          to="/home"
          className="px-8 py-3 bg-gradient-to-r from-[#8245ec] to-purple-500 text-white font-semibold rounded-lg shadow hover:from-purple-500 hover:to-[#8245ec] transition-all"
        >
          Explore →
        </Link>
      </section>

      {/* About */}
      <section id="about" className="relative py-24 px-[8vw] text-center">
        <h2 className="text-4xl font-bold mb-6">What We Do</h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          We are committed to building eco-friendly communities with the power of AI.
          Our initiatives span waste reporting, food donation, recycling, and smart
        sustainability solutions. Join us in making a tangible difference for our planet. Our platform connects individuals, organizations, and local authorities to enable efficient waste management, facilitate food donations, and promote recycling initiatives. By harnessing the power of artificial intelligence, we provide real-time insights, optimize resource allocation, and empower communities to take actionable steps toward a cleaner, healthier environment. Whether you're reporting waste, tracking recycling efforts, or contributing surplus food, EcoAI is your partner in driving positive environmental change.
        </p>
      </section>

      {/* Our Work (Carousel) */}
      <section id="work" className="relative py-24 px-[8vw]">
        <WorkCarousel /> {/* ✅ replaced old scroll section */}
      </section>

      {/* Reviews */}
      <section id="reviews" className="relative py-24 px-[8vw]">
        <h2 className="text-4xl font-bold text-center mb-10">What People Say</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-900/70 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-white">{rev.name}</h3>
              <p className="text-sm text-[#8245ec]">{rev.service}</p>
              <div className="flex items-center my-2">
                {Array.from({ length: rev.stars }).map((_, i) => (
                  <FiStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-400 text-sm">{rev.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
