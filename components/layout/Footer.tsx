"use client";

import Link from "next/link";
import { site } from "@/data/site";
import { buildContactWhatsAppUrl } from "@/lib/order";
import { useLocale } from "@/hooks/use-locale";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { IconMail, IconWhatsApp } from "@/components/ui/icons";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h2 className="text-sm font-bold text-matcha-deep">{title}</h2>
      <ul className="mt-5 space-y-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  label,
  external,
}: {
  href: string;
  label: string;
  external?: boolean;
}) {
  const className =
    "text-[15px] text-ink-faint transition-colors hover:text-matcha-deep";

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <li>
        <a
          href={href}
          className={className}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>
      </li>
    );
  }

  return (
    <li>
      <Link href={href} className={className}>
        {label}
      </Link>
    </li>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const { t, dict } = useLocale();

  const productLinks = [
    { href: "/", label: t("footer.home") },
    { href: "/productos", label: t("footer.products") },
    { href: "/#benefits", label: t("footer.benefits") },
    { href: "/pedido", label: t("footer.placeOrder") },
  ];

  const resourceLinks = [
    { href: "/origen", label: t("footer.origin") },
    { href: "/coleccion", label: t("footer.collection") },
    { href: "/como-pedir", label: t("footer.howToOrder") },
  ];

  const companyLinks = [
    { href: "/origen", label: t("footer.aboutSolae") },
    { href: `mailto:${site.email}`, label: t("common.email") },
    {
      href: buildContactWhatsAppUrl(dict.orderMsg.contactHello),
      label: t("common.whatsapp"),
      external: true,
    },
    { href: "/contacto", label: t("footer.contact") },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden border-t border-line bg-cream"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[28%] z-0 flex justify-center overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 25%, black 55%, transparent 100%)",
        }}
      >
        <p className="translate-y-[-18%] font-serif text-[min(38vw,18rem)] leading-none font-bold tracking-tight text-matcha-deep/[0.07] select-none">
          Solae
        </p>
      </div>

      <div className="relative z-10 w-full px-4 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.45fr_0.9fr_0.9fr_0.9fr] lg:gap-8 xl:gap-12">
          <div className="max-w-md sm:col-span-2 lg:col-span-1">
            <BrandLogo variant="combo" size="lg" className="max-w-full flex-wrap" />
            <p className="mt-6 text-[15px] leading-relaxed text-ink-faint">
              {t("footer.blurb")}
            </p>
            <div className="mt-7 flex items-center gap-1">
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center text-matcha-deep/55 transition-colors hover:text-matcha-deep"
              >
                <InstagramIcon className="h-[1.15rem] w-[1.15rem]" />
              </a>
              <a
                href={buildContactWhatsAppUrl(dict.orderMsg.contactHello)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 items-center justify-center text-matcha-deep/55 transition-colors hover:text-matcha-deep"
              >
                <IconWhatsApp className="h-[1.15rem] w-[1.15rem]" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label={t("common.email")}
                className="flex h-10 w-10 items-center justify-center text-matcha-deep/55 transition-colors hover:text-matcha-deep"
              >
                <IconMail className="h-[1.15rem] w-[1.15rem]" />
              </a>
            </div>
          </div>

          <FooterColumn title={t("footer.product")}>
            {productLinks.map((link) => (
              <FooterLink key={link.href + link.label} {...link} />
            ))}
          </FooterColumn>

          <FooterColumn title={t("footer.resources")}>
            {resourceLinks.map((link) => (
              <FooterLink key={link.href + link.label} {...link} />
            ))}
          </FooterColumn>

          <FooterColumn title={t("footer.company")}>
            {companyLinks.map((link) => (
              <FooterLink
                key={link.href + link.label}
                href={link.href}
                label={link.label}
                external={"external" in link ? link.external : false}
              />
            ))}
          </FooterColumn>
        </div>

        <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col gap-4 border-t border-line pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-faint">
            © {year} {site.name}. {t("footer.rights")}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-faint">
            <li>
              <Link
                href="/condiciones"
                className="underline decoration-matcha-200 underline-offset-4 transition-colors hover:text-matcha-deep hover:decoration-matcha-deep"
              >
                {t("footer.conditions")}
              </Link>
            </li>
            <li>
              <Link
                href="/terminos"
                className="underline decoration-matcha-200 underline-offset-4 transition-colors hover:text-matcha-deep hover:decoration-matcha-deep"
              >
                {t("footer.terms")}
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${site.email}`}
                className="underline decoration-matcha-200 underline-offset-4 transition-colors hover:text-matcha-deep hover:decoration-matcha-deep"
              >
                {t("footer.contact")}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
