"use client";

import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useLocale } from "@/hooks/use-locale";
import { site } from "@/data/site";
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

export function ContactoView() {
  const { dict } = useLocale();
  const page = dict.pages.contacto;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsEmbedQuery)}&hl=es&z=16&output=embed`;

  const channels = [
    {
      icon: Phone,
      label: page.phoneLabel,
      value: site.phoneDisplay,
      href: `tel:${site.phone}`,
      hint: page.phoneHint,
    },
    {
      icon: InstagramIcon,
      label: page.instagramLabel,
      value: site.instagramHandle,
      href: site.instagram,
      hint: page.instagramHint,
      external: true,
    },
    {
      icon: Mail,
      label: page.emailLabel,
      value: site.email,
      href: `mailto:${site.email}`,
      hint: page.emailHint,
    },
    {
      icon: MessageCircle,
      label: page.whatsappLabel,
      value: page.whatsappCta,
      href: buildContactWhatsAppUrl(undefined, dict),
      hint: page.whatsappHint,
      external: true,
    },
  ] as const;

  return (
    <>
      <PageHeader
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.description}
      />

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
              {page.mapTitle}
            </p>
            <div className="relative mt-4 overflow-hidden rounded-[1.5rem] border border-line bg-matcha-50 shadow-[0_12px_40px_-24px_rgb(12_64_53_/_0.25)]">
              <div className="aspect-[4/3] w-full sm:aspect-[16/11]">
                <iframe
                  title={page.mapAria}
                  src={embedSrc}
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="mt-6 rounded-[1.25rem] border border-line bg-cream-soft px-5 py-5 sm:px-6">
              <div className="flex gap-3">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-matcha-deep text-gold">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <div>
                  <h2 className="font-serif text-xl font-bold text-matcha-deep">
                    {page.visitTitle}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {page.visitBody}
                  </p>
                  <a
                    href={site.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex text-sm font-semibold text-matcha-deep underline decoration-matcha-200 underline-offset-4 transition-colors hover:decoration-matcha-deep"
                  >
                    {page.openMaps}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
              {page.channelsTitle}
            </p>
            <ul className="mt-4 space-y-3">
              {channels.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...("external" in channel && channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex gap-4 rounded-[1.25rem] border border-line bg-surface px-4 py-4 transition-colors hover:border-matcha-deep/30 hover:bg-matcha-50/60 sm:px-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-matcha-deep transition-transform group-hover:scale-105">
                      <channel.icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium tracking-[0.16em] text-matcha-mid uppercase">
                        {channel.label}
                      </span>
                      <span className="mt-1 block truncate font-serif text-lg font-bold text-ink">
                        {channel.value}
                      </span>
                      <span className="mt-1 block text-sm text-ink-faint">
                        {channel.hint}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-line pt-6">
              <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
                {page.hoursLabel}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {dict.site.hours}
              </p>
              <Link
                href="/pedido"
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-md bg-matcha-deep px-7 text-sm font-semibold text-gold transition-colors hover:bg-matcha sm:w-auto"
              >
                {dict.common.orderCta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
