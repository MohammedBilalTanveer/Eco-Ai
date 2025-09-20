import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";

// Install Swiper modules
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
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
        Our Work
      </h2>
      <div className="relative flex items-center justify-center w-full max-w-7xl">
        <button className="swiper-button-prev absolute left-2 md:left-[-3rem] bg-black/40 hover:bg-black/60 p-3 rounded-full z-10 transition">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          loop
          slidesPerView={3}
          coverflowEffect={{
            rotate: 0,
            stretch: 50,
            depth: 100,
            modifier: 2,
            slideShadows: true,
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          className="w-full"
        >
          {workSamples.map((work) => (
            <SwiperSlide key={work.id}>
              <div className="bg-gray-900/70 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-xl w-[350px] md:w-[400px]">
                <img
                  src={work.img}
                  alt={work.title}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold text-center mb-3 text-[#8245ec]">
                  {work.title}
                </h3>
                <p className="text-gray-300 text-base text-center">{work.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="swiper-button-next absolute right-2 md:right-[-3rem] bg-black/40 hover:bg-black/60 p-3 rounded-full z-10 transition">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WorkCarousel;