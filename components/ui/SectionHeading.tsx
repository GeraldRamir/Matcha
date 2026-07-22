"use client";

import { GsapReveal } from "@/components/ui/GsapReveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  scriptWord?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  scriptWord,
}: SectionHeadingProps) {
  return (
    <GsapReveal
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        align === "left" && "max-w-2xl",
        className
      )}
      childSelector="[data-reveal]"
      stagger={0.1}
    >
      {eyebrow && (
        <p
          data-reveal
          className="mb-3 text-xs font-medium tracking-[0.25em] text-olive uppercase"
        >
          {eyebrow}
        </p>
      )}
      <h2
        data-reveal
        className="font-serif text-[1.75rem] font-bold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl"
      >
        {scriptWord ? (
          <>
            {title}{" "}
            <span className="font-script text-[1.15em] text-forest-mid">
              {scriptWord}
            </span>
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          data-reveal
          className="mt-4 text-base leading-relaxed text-pretty text-ink-soft sm:text-lg"
        >
          {description}
        </p>
      )}
    </GsapReveal>
  );
}
