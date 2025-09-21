// src/components/pages/WorkCarousel.jsx
import React from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";

SwiperCore.use([EffectCoverflow, Autoplay, Navigation]);

const workSamples = [
  {
    id: 1,
    title: "Plastic Recycling Drive",
    img: "https://cdn.prod.website-files.com/62733f1361e2ad64f8790984/627401a21a9afd937033647b_61318a06f5468d6f1dccd147_sustainlife-how-to-recycle-plastic.jpeg",
    desc: "We collected and recycled over 10 tons of plastic waste in the city.",
  },
  {
    id: 2,
    title: "Food Donation Camps",
    img: "https://childvikasfoundation.org/assets/images/food-distribution/1.jpg",
    desc: "Partnered with local NGOs to distribute meals to 5000+ families.",
  },
  {
    id: 3,
    title: "Clean Streets Initiative",
    img: "https://erns72xipwt.exactdn.com/wp-content/uploads-new/2024/02/Adopt-a-street-%40-UglyIndian1.jpeg?strip=all&lossy=1&ssl=1",
    desc: "Organized volunteers to clean and beautify public spaces.",
  },
  {
    id: 4,
    title: "Tree Plantation",
    img: "https://sc0.blr1.cdn.digitaloceanspaces.com/article/176795-mvavbtrydc-1657103806.jpg",
    desc: "Planted 2000+ trees across urban and rural areas.",
  },
  {
    id: 5,
    title: "E-Waste Recycling",
    img: "https://sreeewasterecycling.com/wp-content/uploads/2023/01/E-waste-Recycling.jpg",
    desc: "Collected and recycled old electronics responsibly.",
  },
  {
    id: 6,
    title: "River Clean-Up",
    img: "https://media.river-cleanup.org/4468/conversions/2024-03_press_release_2-1600.jpeg",
    desc: "Mobilized 300 volunteers to clean 5 km of polluted riverside.",
  },
];

const WorkCarousel = () => {
  return (
    <div className="relative w-full flex flex-col items-center font-[Poppins]">
      <style>
        {`
          .swiper-slide {
            transition: transform 0.3s ease;
          }
          .swiper-slide-prev, .swiper-slide-next {
            transform: scale(0.9);
            opacity: 0.6;
          }
          .swiper-slide-active {
            transform: scale(1.1);
            z-index: 10;
          }
          .gradient-text {
            background: linear-gradient(to right, #8245ec, #a855f7);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
          }
        `}
      </style>

      {/* Section Title */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center mb-2 gradient-text drop-shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our <span className="text-white">Work</span> 
      </motion.h2>

      {/* Swiper Container */}
      <div className="relative flex items-center justify-center w-full max-w-7xl min-h-[420px] md:min-h-[480px] py-8 overflow-visible">
        {/* Prev Button */}
        <button className="swiper-button-prev absolute top-1/2 -translate-y-1/2 left-4 md:left-[-2.5rem] bg-gradient-to-r from-[#8245ec] to-purple-500 p-3 rounded-full shadow-lg hover:opacity-90 z-10 transition">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Swiper */}
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          breakpoints={{
            0: { slidesPerView: 1, coverflowEffect: { stretch: 20, depth: 80 } },
            640: { slidesPerView: 1.5, coverflowEffect: { stretch: 40, depth: 90 } },
            768: { slidesPerView: 2, coverflowEffect: { stretch: 50, depth: 100 } },
            1024: { slidesPerView: 3, coverflowEffect: { stretch: 50, depth: 120 } },
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 50,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
          className="w-full px-4"
        >
          {workSamples.map((work, index) => (
            <SwiperSlide key={work.id}>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900/70 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-[0_0_20px_rgba(130,69,236,0.3)] hover:shadow-[0_0_35px_rgba(130,69,236,0.5)] transition-all w-full max-w-[400px]"
              >
                <img
                  src={work.img}
                  alt={work.title}
                  className="w-full h-56 object-cover rounded-lg mb-5 shadow-md"
                />
                <h3 className="text-2xl font-semibold text-center mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                  {work.title}
                </h3>
                <p className="text-gray-300 text-base text-center leading-relaxed">
                  {work.desc}
                </p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <button className="swiper-button-next absolute top-1/2 -translate-y-1/2 right-4 md:right-[-2.5rem] bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full shadow-lg hover:opacity-90 z-10 transition">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WorkCarousel;
