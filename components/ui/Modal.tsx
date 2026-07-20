"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { EASE } from "@/lib/motion";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  wide?: boolean;
};

export function Modal({ open, onClose, label, children, wide = false }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-8">
          <motion.button
            aria-label="Cerrar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default bg-forest/40 backdrop-blur-md"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className={`relative w-full overflow-hidden rounded-[1.75rem] bg-cream shadow-lift outline-none ${
              wide ? "max-w-4xl" : "max-w-lg"
            }`}
          >
            <button
              onClick={onClose}
              aria-label="Cerrar ventana"
              className="glass absolute top-4 right-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-ink"
            >
              <X className="h-4 w-4" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
