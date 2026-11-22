"use client";

import { useSyncExternalStore } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

const emptySubscribe = () => () => {};

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // Client value
    () => false, // Server / prerender value
  );
}

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
  const mounted = useIsMounted();

  if (!mounted) {
    return <div className="h-full w-full bg-black" />;
  }

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
      {CITIES.map((city) => (
        <SwiperSlide key={city.name} className="h-full w-full">
          <div
            className="relative flex h-full w-full flex-col items-center justify-center bg-cover bg-center bg-no-repeat transition-all duration-500"
            style={{
              backgroundImage: `url(${city.src})`,
            }}
          >
            <div className="absolute inset-0 bg-black/10" />
            <h2 className="relative z-10 font-bebas text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tight italic">
              {city.name}
            </h2>
          </div>
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
