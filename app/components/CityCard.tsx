"use client";

import { CityMetadata } from "@/lib/cities";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function CityCard({
  city,
  index,
}: {
  city: CityMetadata;
  index: number;
}) {
  return (
    <Link href={`/blog/${city.slug}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: "easeOut",
          },
        }}
        viewport={{ once: true }}
        className={`flex items-stretch ${
          index % 2 === 0
            ? "flex-col-reverse md:flex-row-reverse"
            : "md:flex-row  flex-col"
        }  gap-10 my-40 border border-gray-200 p-10 rounded-4xl shadow-xl/20 font-serif`}
      >
        <div className="w-full md:w-[40%] h-auto overflow-hidden rounded-2xl ">
          <Image
            src={city.coverImage}
            width={400}
            height={200}
            alt={city.name}
            className="w-full h-full object-cover rounded-2xl hover:scale-105"
          />
        </div>
        <div className="flex-1 min-w-0 flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="text-4xl font-semibold ">{city.name}</p>
            <p>{city.region}</p>
          </div>
          <p className="mb-10 underline max-w-sm">{city.tagline}</p>
          <button className="bg-black text-white mr-auto py-1.5 px-8 rounded-xl cursor-pointer">
            Detail
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
