"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import { useCart } from "@/hooks/use-cart";
import { useLocale } from "@/hooks/use-locale";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openDrawer } = useCart();
  const { t } = useLocale();
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
        {t("common.skipToContent")}
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
          <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-24 sm:gap-4 sm:px-8">
            <BrandLogo variant="mark" className="h-12 w-12 rounded-full sm:h-16 sm:w-16" />

            <nav
              aria-label={t("common.primaryNav")}
              className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
            >
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
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
              <LanguageSwitcher className="hidden sm:inline-flex" />

              <button
                onClick={openDrawer}
                aria-label={t("common.cartAria", { count })}
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
                className="hidden h-10 items-center rounded-md bg-matcha-deep px-5 text-sm font-medium text-gold transition-colors hover:bg-matcha sm:inline-flex"
              >
                {t("nav.order")}
              </Link>

              <button
                onClick={() => setMenuOpen(true)}
                aria-label={t("common.openMenu")}
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
              aria-label={t("common.closeMenu")}
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
              <div className="mb-8 flex items-center justify-between">
                <BrandLogo variant="mark" linked={false} className="h-12 w-12 rounded-full" />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label={t("common.close")}
                  className="flex h-10 w-10 items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mb-6">
                <LanguageSwitcher />
              </div>
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block py-3 font-serif text-2xl text-ink"
                    >
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/pedido"
                onClick={() => setMenuOpen(false)}
                className="mt-auto flex h-12 items-center justify-center rounded-md bg-matcha-deep text-sm font-medium text-gold"
              >
                {t("nav.orderNow")}
              </Link>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
