"use client";

import clsx from "clsx";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathName = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (current > previous && current > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <motion.header
      animate={{
        y: hidden ? -100 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={clsx(
        "bg-transparent w-full p-5 fixed top-0 right-0 left-0 z-50",
        pathName === "/"
          ? "text-white"
          : "text-black border-b border-zinc-300 duration-200 opacity-95 bg-white",
      )}
    >
      <nav className="flex items-center justify-between max-w-6xl mx-auto ">
        <Link href={"/"}>
          <p className="text-3xl font-black italic font-bebas">Genius Travel</p>
        </Link>
        <div className="flex gap-10 items-center">
          <Link href={"/blog"}>
            <p
              className={clsx(
                `hover:underline font-extrabold `,
                pathName === "/blog" ? "underline" : "",
              )}
            >
              Blog
            </p>
          </Link>
          <Link href={"/contact"}>
            <p
              className={clsx(
                `hover:underline font-extrabold `,
                pathName === "/contact" ? "underline" : "",
              )}
            >
              Contact
            </p>
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
