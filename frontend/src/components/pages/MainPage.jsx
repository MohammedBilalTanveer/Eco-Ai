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

      {/* Floating Blobs */}
      <FloatingBlob size="400px" color="#8245ec" top="20%" left="10%" delay={0} />
      <FloatingBlob size="300px" color="#4ade80" top="50%" left="70%" delay={2} />
      <FloatingBlob size="350px" color="#60a5fa" top="75%" left="30%" delay={4} />

      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-[8vw] text-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]"></div>

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

      {/* About Section */}
      <section
        id="about"
        className="relative py-16 px-[8vw] z-10 flex flex-col items-center"
      >
        <motion.h2
          className="text-4xl sm:text-5xl font-extrabold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-white">What</span> we  do
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl">
          {/* Card 1 */}
          <motion.div
            className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/10 hover:shadow-[0_0_30px_rgba(130,69,236,0.4)] transition-all"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Driving Sustainability
            </h3>
            <p className="text-gray-300 leading-relaxed">
              We are committed to building eco-friendly communities with the power of AI.  
              Our initiatives span waste reporting, food donation, recycling, and smart sustainability solutions.  
              Join us in making a tangible difference for our planet.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/10 hover:shadow-[0_0_30px_rgba(130,69,236,0.4)] transition-all"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Empowering Communities
            </h3>
            <p className="text-gray-300 leading-relaxed">
              EcoAI empowers citizens to take action through easy-to-use tools:  
              report waste, donate surplus food, and track garbage trucks in real time.  
              Our AI-powered GreenBot Advisor offers personalized guidance for sustainable living.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/10 hover:shadow-[0_0_30px_rgba(130,69,236,0.4)] transition-all"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Smart Recycling
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Through AI-powered insights, we optimize recycling processes,  
              helping communities reuse materials efficiently and minimize waste.  
              Our platform educates people on sustainable disposal practices.
            </p>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            className="bg-gray-900/70 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-white/10 hover:shadow-[0_0_30px_rgba(130,69,236,0.4)] transition-all"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold text-white mb-4">
              Collaborative Impact
            </h3>
            <p className="text-gray-300 leading-relaxed">
              By connecting individuals, NGOs, and local authorities,  
              EcoAI builds a network of changemakers. Together,  
              we foster collaboration and drive long-term environmental impact.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="relative py-20 px-[8vw] z-10">
        <WorkCarousel />
      </section>

      {/* Contact Section */}
     
      {/* Reviews */}
      
       <section id="contact" className="relative py-16 px-[8vw] z-10 pt-0">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
