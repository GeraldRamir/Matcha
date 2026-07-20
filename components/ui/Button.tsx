"use client";

import Link from "next/link";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "group/btn inline-flex cursor-pointer items-center justify-center rounded-md font-medium tracking-tight transition-all duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-40";

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-cream hover:bg-matcha-deep",
  secondary:
    "bg-matcha-deep text-cream hover:bg-ink",
  outline:
    "border border-line bg-surface text-ink hover:border-matcha-deep hover:bg-matcha-deep hover:text-cream",
  ghost: "text-ink-soft hover:text-ink hover:bg-cream-soft",
  whatsapp:
    "bg-[#1f6b3a] text-cream hover:bg-matcha-deep",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-5 text-sm gap-1.5",
  md: "h-11 px-6 text-sm gap-2",
  lg: "h-12 px-8 text-base gap-2.5",
};

type ButtonProps = HTMLMotionProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading = false, className, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      disabled={loading || props.disabled}
      aria-busy={loading || undefined}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </motion.button>
  )
);

Button.displayName = "Button";

type ButtonLinkProps = HTMLMotionProps<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <motion.a
      ref={ref}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </motion.a>
  )
);

ButtonLink.displayName = "ButtonLink";

type ButtonNavProps = React.ComponentProps<typeof MotionLink> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function ButtonNav({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonNavProps) {
  return (
    <MotionLink
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
