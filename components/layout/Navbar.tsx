"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Leaf, Menu, ShoppingBag, X } from "lucide-react";
import { NAV_LINKS, site } from "@/data/site";
import { useCart } from "@/hooks/use-cart";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openDrawer } = useCart();
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useBodyScrollLock(menuOpen);

  useEffect(() => scrollY.on("change", (y) => setScrolled(y > 12)), [scrollY]);
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <a
        href="#contenido"
        className="sr-only z-[110] bg-ink px-4 py-2 text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="fixed inset-x-0 top-0 z-90"
      >
        <div
          className={cn(
            "border-b transition-all duration-500",
            scrolled
              ? "border-line/80 bg-cream/80 shadow-soft backdrop-blur-xl"
              : "border-transparent bg-cream"
          )}
        >
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8">
            <Link
              href="/"
              className="flex items-center gap-2 font-serif text-xl font-bold tracking-tight text-ink"
              aria-label={`${site.name} — home`}
            >
              <Leaf className="h-5 w-5 text-matcha-mid" strokeWidth={1.75} />
              Matcha
            </Link>

            <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
              <ul className="flex items-center gap-0.5 text-[13px] text-ink-soft">
                {NAV_LINKS.map((link, i) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href || pathname.startsWith(link.href + "/");
                  return (
                    <li key={link.href} className="flex items-center gap-0.5">
                      {i > 0 && (
                        <span aria-hidden className="px-1.5 text-line">
                          /
                        </span>
                      )}
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "px-1 py-1 transition-colors hover:text-ink",
                          active && "font-medium text-ink"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2.5">
              <button
                onClick={openDrawer}
                aria-label={`Cart, ${count} items`}
                className="relative flex h-10 w-10 cursor-pointer items-center justify-center text-ink transition-opacity hover:opacity-70"
              >
                <ShoppingBag className="h-5 w-5" strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute top-1 right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-matcha-deep px-1 text-[10px] font-semibold text-cream">
                    {count}
                  </span>
                )}
              </button>

              <Link
                href="/pedido"
                className="hidden h-10 items-center rounded-md bg-ink px-5 text-sm font-medium text-cream transition-colors hover:bg-matcha-deep sm:inline-flex"
              >
                Buy Now
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                className="flex h-10 w-10 cursor-pointer items-center justify-center text-ink lg:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <div className="fixed inset-0 z-100 lg:hidden">
            <motion.button
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute top-0 right-0 flex h-full w-[min(100%,20rem)] flex-col bg-cream p-6 shadow-lift"
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="font-serif text-xl font-bold">Matcha</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close"
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 font-serif text-2xl text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/pedido"
                onClick={() => setMenuOpen(false)}
                className="mt-auto flex h-12 items-center justify-center rounded-md bg-ink text-sm font-medium text-cream"
              >
                Buy Now
              </Link>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
