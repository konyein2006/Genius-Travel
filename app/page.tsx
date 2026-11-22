"use client";

import Image from "next/image";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

const CITIES = [
  { name: "Bagan", src: "/images/cities/bagan.jpg" },
  { name: "Kalaw", src: "/images/cities/kalaw.jpg" },
  { name: "Mandalay", src: "/images/cities/mandalay.jpg" },
  { name: "Yangon", src: "/images/cities/yangon.jpg" },
  { name: "Hpa An", src: "/images/cities/hpa-an.jpg" },
  { name: "Mawlamyine", src: "/images/cities/mawlamyine.jpg" },
  { name: "Ngwe Saung", src: "/images/cities/ngwe-saung.jpg" },
  { name: "Nyaung Shwe", src: "/images/cities/nyaungshwe.jpg" },
  { name: "Pwin Oo Lwin", src: "/images/cities/pwin-oo-lwin.jpg" },
  { name: "Taung Gyi", src: "/images/cities/taunggyi.jpg" },
];

function CityCarousel() {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      speed={500}
      className="h-full w-full"
    >
      {CITIES.map((city, index) => (
        <SwiperSlide key={city.name} className="relative h-full w-full">
          <Image
            src={city.src}
            alt={city.name}
            fill
            sizes="100vw"
            priority={index === 0}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20" />
          <h2 className="relative z-10 flex h-full w-full items-center justify-center font-bebas text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight italic">
            {city.name}
          </h2>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden bg-black">
      <CityCarousel />
    </main>
  );
}
