"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, VIEWPORT } from "@/lib/motion";

export function FinalCta() {
  return (
    <section aria-label="Final call to action" className="border-t border-line py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="relative grid items-center gap-12 overflow-hidden rounded-[2rem] bg-cream-soft lg:grid-cols-2"
        >
          <div className="px-8 py-14 sm:px-12 sm:py-20 lg:pl-16">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Ready to Experience
              <br />
              Premium Matcha?
            </h2>
            <p className="mt-5 max-w-md text-base text-ink-soft">
              Order via WhatsApp or email. Fresh ceremonial grade, sealed and ready
              for your ritual.
            </p>
            <Link
              href="/pedido"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-ink px-8 text-sm font-semibold text-cream transition-colors hover:bg-matcha-deep"
            >
              Shop Collection
            </Link>
          </div>

          <div className="relative min-h-[16rem] sm:min-h-[22rem]">
            <div aria-hidden className="glow-matcha absolute inset-8 opacity-80" />
            <Image
              src="/images/gallery-leaves.webp"
              alt="Fresh matcha leaves"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
