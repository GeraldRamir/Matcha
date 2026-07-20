"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  scriptWord?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  scriptWord,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          className="mb-3 text-xs font-medium tracking-[0.25em] text-olive uppercase"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        className="font-serif text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
      >
        {scriptWord ? (
          <>
            {title}{" "}
            <span className="font-script text-[1.15em] text-forest-mid">{scriptWord}</span>
          </>
        ) : (
          title
        )}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-4 text-base leading-relaxed text-pretty text-ink-soft sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
