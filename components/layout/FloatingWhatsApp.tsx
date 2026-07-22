"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { buildContactWhatsAppUrl } from "@/lib/order";
import { EASE } from "@/lib/motion";
import { useLocale } from "@/hooks/use-locale";

export function FloatingWhatsApp() {
  const { dict } = useLocale();

  return (
    <motion.a
      href={buildContactWhatsAppUrl(undefined, dict)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={dict.floatingWa.aria}
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.4, duration: 0.6, ease: EASE }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-80 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-cream shadow-lift sm:right-7 sm:bottom-7 sm:h-14 sm:w-14"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.5} />
    </motion.a>
  );
}
