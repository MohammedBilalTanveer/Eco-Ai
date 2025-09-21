// src/components/Reviews.jsx
import React from "react";
import { motion } from "framer-motion";
import { FiStar } from "react-icons/fi";

const reviews = [
  {
    name: "Amit Sharma",
    service: "Food Donation",
    stars: 5,
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "EcoAI connected me with NGOs effortlessly. I was able to donate food surplus from my restaurant within hours. The platform made the process seamless, and the impact on the community was truly heartwarming. Knowing the food reached families in need makes me grateful for this service."
  },
  {
    name: "Priya Singh",
    service: "Waste Reporting",
    stars: 4,
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I reported overflowing garbage bins in my neighborhood, and within a day authorities responded. The experience was smooth and transparent. The app not only helps report issues but also keeps you updated on progress. I feel empowered to contribute towards a cleaner city."
  },
  {
    name: "Rahul Mehta",
    service: "Live Truck Map",
    stars: 5,
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    text: "The real-time garbage truck tracking has completely changed how we manage waste disposal at home. No more missed pickups or confusion about timings. The system ensures efficiency, and I can plan accordingly. It’s a simple idea with a massive impact on daily life."
  },
  {
    name: "Sneha Kapoor",
    service: "Tree Plantation",
    stars: 5,
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    text: "I participated in a tree plantation drive organized via EcoAI, and it was an incredible experience. The event was well-coordinated, and seeing hundreds of volunteers come together for the environment was inspiring. Planting trees gave me a sense of responsibility towards the planet."
  },
  {
    name: "Vikram Desai",
    service: "E-Waste Recycling",
    stars: 4,
    img: "https://randomuser.me/api/portraits/men/77.jpg",
    text: "I finally found a reliable way to dispose of my old electronics. EcoAI guided me to the nearest e-waste collection point and made the process hassle-free. I wish I had known about this earlier—safe disposal feels good, and I know my gadgets won’t harm the environment."
  },
  {
    name: "Ananya Rao",
    service: "River Clean-Up",
    stars: 5,
    img: "https://randomuser.me/api/portraits/women/21.jpg",
    text: "Joining the river clean-up initiative through EcoAI was one of the most rewarding weekends I’ve had. Working alongside passionate volunteers to restore a polluted river was eye-opening. The sense of teamwork and the visible difference we made motivates me to stay involved."
  }
];


const Reviews = () => {
  return (
    <section id="reviews" className="relative py-20 px-[8vw] pt-5">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl font-bold text-center mb-14 text-white"
      >
        What <span className="text-[#8245ec]">People Say</span>
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {reviews.map((rev, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-gray-900/70 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col hover:shadow-[0_0_25px_rgba(130,69,236,0.4)] transition"
          >
            {/* Header with profile image + name */}
            <div className="flex items-center mb-4">
              <img
                src={rev.img}
                alt={rev.name}
                className="w-14 h-14 rounded-full border-2 border-purple-500 object-cover mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {rev.name}
                </h3>
                <p className="text-sm text-purple-400">{rev.service}</p>
              </div>
            </div>

            {/* Stars */}
                        <div className="flex items-center mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <FiStar
                              key={i}
                              fill={i < rev.stars ? "#facc15" : "none"}
                              className={`w-5 h-5 ${
                                i < rev.stars ? "text-yellow-400" : "text-gray-500"
                              }`}
                            />
                          ))}
                        </div>

                        {/* Review Text */}
            <p className="text-gray-300 text-sm leading-relaxed">
              {rev.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
