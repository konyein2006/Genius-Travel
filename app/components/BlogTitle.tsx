"use client";

import { motion } from "motion/react";

export default function BlogTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center my-40"
    >
      <h1 className="text-4xl font-bebas font-bold my-5">
        Explore Cities of Myanmar
      </h1>
      <p className="text-sm">
        Static travel guides powered by Markdown and Next.js.
      </p>
    </motion.div>
  );
}
