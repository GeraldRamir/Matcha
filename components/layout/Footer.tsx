"use client";

import Link from "next/link";
import { useState } from "react";
import { Leaf } from "lucide-react";
import { NAV_LINKS, site } from "@/data/site";
import { buildContactWhatsAppUrl } from "@/lib/order";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  };

  return (
    <footer id="contact" className="border-t border-line bg-cream-soft">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-serif text-2xl font-bold text-ink"
            >
              <Leaf className="h-5 w-5 text-matcha-mid" strokeWidth={1.75} />
              Matcha
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
              {site.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-matcha hover:text-matcha-deep"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={buildContactWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-xs font-semibold text-ink transition-colors hover:border-matcha hover:text-matcha-deep"
              >
                WA
              </a>
            </div>
          </div>

          <nav aria-label="Explore">
            <h2 className="text-xs font-medium tracking-[0.2em] text-matcha-mid uppercase">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/pedido"
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  Order
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-medium tracking-[0.2em] text-matcha-mid uppercase">
              Contact
            </h2>
            <ul className="mt-5 space-y-3 text-sm text-ink-soft">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </li>
              <li>{site.hours}</li>
              <li>{site.address}</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-medium tracking-[0.2em] text-matcha-mid uppercase">
              Newsletter
            </h2>
            <p className="mt-5 text-sm text-ink-soft">
              Ritual tips and early access to new harvests.
            </p>
            <form onSubmit={onSubmit} className="mt-4 flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="h-11 min-w-0 flex-1 rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none placeholder:text-ink-faint focus:border-matcha"
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-md bg-ink px-4 text-sm font-medium text-cream transition-colors hover:bg-matcha-deep"
              >
                Join
              </button>
            </form>
            {done && (
              <p className="mt-2 text-xs text-matcha-deep">Thanks — you&apos;re on the list.</p>
            )}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-ink-faint">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="text-xs text-ink-faint">Crafted with calm · Uji first flush</p>
        </div>
      </div>
    </footer>
  );
}
