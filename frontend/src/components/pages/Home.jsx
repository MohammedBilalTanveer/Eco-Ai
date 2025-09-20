import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiTrash2, FiTruck, FiMessageCircle } from 'react-icons/fi';
import Footer from '../Footer';
import WorkCarousel from '../pages/WorkCarousel';

const FeatureCard = ({ title, description, path, Icon }) => (
  <motion.div
    whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(130,69,236,0.6)" }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-gray-900 backdrop-blur-md px-6 sm:px-8 py-8 w-full h-auto min-h-[320px] rounded-xl border border-white/10 shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] flex flex-col justify-between items-center text-center hover:shadow-[0_0_30px_2px_rgba(130,69,236,0.5)] transition-shadow"
  >
    <div className="flex flex-col items-center flex-grow">
      <Icon className="text-[#8245ec] text-5xl sm:text-6xl mb-4" />
      <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 mb-3">
        {title}
      </h3>
      <p className="text-gray-400 text-sm sm:text-base">{description}</p>
    </div>
    <div className="mt-6">
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
    <>
      <div className="bg-[#050414] min-h-screen relative overflow-hidden flex flex-col">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Floating Blobs */}
        <FloatingBlob size="400px" color="#8245ec" top="20%" left="10%" delay={0} />
        <FloatingBlob size="300px" color="#4ade80" top="50%" left="70%" delay={2} />
        <FloatingBlob size="350px" color="#60a5fa" top="75%" left="30%" delay={4} />

        {/* Content */}
        <div className="relative flex-grow pt-24 sm:pt-32 pb-10 px-6 sm:px-12 lg:px-[8vw]">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 text-center leading-tight">
            Building a <span className="text-[#8245ec]">Greener</span> Future with AI
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 sm:mb-16 text-center">
            EcoAI leverages technology to streamline waste management, reduce environmental impact, and build sustainable communities.
          </p>

          {/* Features */}
          <section
            id="features"
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 justify-center items-stretch max-w-6xl mx-auto"
          >
            <FeatureCard
              title="Report Waste"
              description="Instantly report illegal garbage dumping with photo evidence and precise location. Our AI system ensures reports are tracked and directed to the right municipal authorities for quick action."
              path="/report-waste"
              Icon={FiTrash2}
            />
            <FeatureCard
              title="Donate Food"
              description="Easily donate leftover food by reporting it. EcoAI verifies its freshness and connects it with local NGOs, shelters, and community kitchens to minimize waste and feed those in need."
              path="/report-food"
              Icon={FiMapPin}
            />
            <FeatureCard
              title="Live Truck Map"
              description="Track garbage collection trucks in real-time. Stay updated on collection schedules, optimize your waste disposal, and help reduce waiting time for cleaner neighborhoods."
              path="/live-map"
              Icon={FiTruck}
            />
            <FeatureCard
              title="GreenBot Advisor"
              description="Chat with our AI-powered assistant for personalized sustainability tips. Get advice on recycling, reducing waste, and building eco-friendly habits that make a real difference."
              path="/chatbot"
              Icon={FiMessageCircle}
            />
          </section>
        </div>
      </div>
      <section id="about" className="relative py-10 px-[8vw] text-center">
        <h2 className="text-4xl font-bold mb-6">What We Do</h2>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg">
          We are committed to building eco-friendly communities with the power of AI.
          Our initiatives span waste reporting, food donation, recycling, and smart
        sustainability solutions. Join us in making a tangible difference for our planet. Our platform connects individuals, organizations, and local authorities to enable efficient waste management, facilitate food donations, and promote recycling initiatives. By harnessing the power of artificial intelligence, we provide real-time insights, optimize resource allocation, and empower communities to take actionable steps toward a cleaner, healthier environment. Whether you're reporting waste, tracking recycling efforts, or contributing surplus food, EcoAI is your partner in driving positive environmental change.
        </p>
      </section>
       <section id="work" className="relative py-10 px-[8vw]">
        <WorkCarousel /> {/* ✅ replaced old scroll section */}
      </section>
      <Footer />
    </>
  );
};

export default Home;
