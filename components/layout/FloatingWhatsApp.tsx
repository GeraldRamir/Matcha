"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildContactWhatsAppUrl } from "@/lib/order";
import { EASE } from "@/lib/motion";

export function FloatingWhatsApp() {
  return (
    <motion.a
      href={buildContactWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-5 bottom-5 z-80 flex h-14 w-14 items-center justify-center rounded-full bg-forest text-cream shadow-glow sm:right-7 sm:bottom-7"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
    </motion.a>
  );
}
