// src/components/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiTrash2,
  FiTruck,
  FiMessageCircle,
} from "react-icons/fi";
import Footer from "../Footer";
import WorkCarousel from "../pages/WorkCarousel";
import Contact from "../Contact";
import Reviews from "./Reviews";

const FeatureCard = ({ title, description, path, Icon }) => (
  <motion.div
    whileHover={{
      scale: 1.05,
      boxShadow: "0 0 40px rgba(130,69,236,0.6)",
    }}
    transition={{ type: "spring", stiffness: 200 }}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-gray-900/70 backdrop-blur-md px-6 sm:px-8 py-8 w-full h-auto min-h-[320px] rounded-xl border border-white/10 shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] flex flex-col justify-between items-center text-center hover:shadow-[0_0_30px_2px_rgba(130,69,236,0.5)] transition-shadow"
  >
    <div className="flex flex-col items-center flex-grow">
      <Icon className="text-[#8245ec] text-5xl sm:text-6xl mb-4" />
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-3">
        {title}
      </h3>
      <p className="text-gray-400 text-sm sm:text-base">{description}</p>
    </div>
    <div className="mt-6 pb-4">
      <Link
        to={path}
        className="px-6 py-2 bg-gradient-to-r from-[#8245ec] to-purple-500 text-white font-semibold rounded-lg shadow hover:from-purple-500 hover:to-[#8245ec] transition-all"
      >
        Explore →
      </Link>
    </div>
  </motion.div>
);

const FloatingBlob = ({ size, color, top, left, delay }) => (
  <motion.div
    className="absolute rounded-full mix-blend-screen filter blur-3xl opacity-30"
    style={{ width: size, height: size, top, left, backgroundColor: color }}
    animate={{ y: [0, -30, 0] }}
    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay }}
  />
);

const Home = () => {
  return (
    <div className="bg-[#050414] min-h-screen relative overflow-hidden flex flex-col">
      {/* Floating Blobs */}
      <FloatingBlob size="400px" color="#8245ec" top="15%" left="10%" delay={0} />
      <FloatingBlob size="300px" color="#4ade80" top="45%" left="70%" delay={2} />
      <FloatingBlob size="350px" color="#60a5fa" top="75%" left="30%" delay={4} />

      {/* Hero Section */}
      <div className="relative flex-grow pt-24 sm:pt-32 pb-20 px-6 sm:px-12 lg:px-[8vw] z-10">
      <div className='absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 text-center leading-tight z-30 relative">
          Building a <span className="text-[#8245ec]">Greener</span> Future with AI
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 sm:mb-16 text-center z-30 relative">
          EcoAI leverages technology to streamline waste management, reduce environmental impact, and build sustainable communities.
        </p>

        {/* Features */}
        <section
          id="features"
          className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 justify-center items-stretch max-w-6xl mx-auto"
        >
          <FeatureCard
            title="Report Waste"
            description="Instantly report illegal garbage dumping with photo evidence and precise location."
            path="/report-waste"
            Icon={FiTrash2}
          />
          <FeatureCard
            title="Donate Food"
            description="Easily donate leftover food by reporting it. EcoAI verifies its freshness and connects it with NGOs."
            path="/report-food"
            Icon={FiMapPin}
          />
          <FeatureCard
            title="Live Truck Map"
            description="Track garbage collection trucks in real-time. Stay updated on collection schedules."
            path="/live-map"
            Icon={FiTruck}
          />
          <FeatureCard
            title="GreenBot Advisor"
            description="Chat with our AI-powered assistant for personalized sustainability tips."
            path="/chatbot"
            Icon={FiMessageCircle}
          />
        </section>
      </div>

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
      <Reviews/>
      {/* Contact Section */}
      <section id="contact" className="relative py-16 px-[8vw] z-10 pt-0">
        <Contact />
      </section>

      <Footer />
    </div>
  );
};

export default Home;
