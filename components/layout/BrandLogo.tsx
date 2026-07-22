import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  /** "wordmark" = texto oficial | "mark" = icono | "combo" = ambos */
  variant?: "wordmark" | "mark" | "combo";
  linked?: boolean;
  size?: "sm" | "md" | "lg";
};

const markSize = {
  sm: "h-9 w-9 sm:h-10 sm:w-10",
  md: "h-11 w-11 sm:h-12 sm:w-12",
  lg: "h-16 w-16 sm:h-20 sm:w-20",
} as const;

const wordmarkSize = {
  sm: "h-8 w-auto sm:h-9",
  md: "h-9 w-auto sm:h-11",
  lg: "h-11 w-auto max-w-[min(100%,14rem)] sm:h-14 sm:max-w-none lg:h-16",
} as const;

const markOnlySize = {
  sm: "h-12 w-12 sm:h-14 sm:w-14",
  md: "h-14 w-14 sm:h-16 sm:w-16",
  lg: "h-20 w-20 sm:h-24 sm:w-24",
} as const;

const wordmarkOnlySize = {
  sm: "h-10 w-auto sm:h-11",
  md: "h-11 w-auto sm:h-[3.25rem]",
  lg: "h-14 w-auto sm:h-16",
} as const;

export function BrandLogo({
  className,
  variant = "wordmark",
  linked = true,
  size = "md",
}: BrandLogoProps) {
  const content =
    variant === "wordmark" ? (
      <Image
        src="/images/brand/solae-wordmark.png"
        alt={site.name}
        width={304}
        height={112}
        className={cn(wordmarkOnlySize[size], className)}
        priority={linked}
      />
    ) : variant === "mark" ? (
      <Image
        src="/images/brand/solae-logo.png"
        alt={site.name}
        width={128}
        height={128}
        className={cn(markOnlySize[size], "rounded-full", className)}
        priority={linked}
      />
    ) : (
      <span className={cn("inline-flex items-center gap-3 sm:gap-4", className)}>
        <Image
          src="/images/brand/solae-logo.png"
          alt=""
          width={80}
          height={80}
          className={cn(markSize[size], "rounded-full")}
          priority={linked}
        />
        <Image
          src="/images/brand/solae-wordmark.png"
          alt={site.name}
          width={304}
          height={112}
          className={wordmarkSize[size]}
          priority={linked}
        />
      </span>
    );

  if (!linked) return content;

  return (
    <Link
      href="/"
      aria-label={`${site.name} — inicio`}
      className="relative z-10 shrink-0 justify-self-start"
    >
      {content}
    </Link>
  );
}
