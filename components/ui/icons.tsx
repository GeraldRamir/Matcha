import type { SVGProps } from "react";

/**
 * Sistema de iconos único del sitio: trazo 1.5, cajas de 16/24,
 * siempre `aria-hidden` (el texto acompañante da el contexto).
 */
type IconProps = SVGProps<SVGSVGElement>;

const defaults = {
  fill: "none",
  "aria-hidden": true as const,
};

export function IconArrowRight(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...defaults} {...props}>
      <path
        d="M3 8h10m0 0L9 4m4 4l-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...defaults} {...props}>
      <path
        d="M3 8.5l3.5 3.5L13 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...defaults} {...props}>
      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconMinus(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...defaults} {...props}>
      <path d="M3 8h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...defaults} {...props}>
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconCart(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props}>
      <path
        d="M5 8h14l-1.2 11.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8L5 8zM8.5 8V6.5a3.5 3.5 0 117 0V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconWhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.8.9-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.2-.4.7-1.3 0-.2 0-.3-.1-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4 0-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.3z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3.5 7l8.5 6 8.5-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconStar({ filled = true, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      {...props}
    >
      <path d="M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3l-3.8 2 .7-4.3-3.1-3 4.3-.6L8 1.5z" />
    </svg>
  );
}

export function IconLeaf(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props}>
      <path
        d="M12 3c-4 3.5-6 6.8-6 10a6 6 0 0012 0c0-3.2-2-6.5-6-10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTruck(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props}>
      <path
        d="M3 6.5h11v10H3zM14 10h4l3 3.5v3h-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="17.5" r="1.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props}>
      <path
        d="M12 21c-5-2.5-8-6-8-10V6l8-3 8 3v5c0 4-3 7.5-8 10z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 11.5l2 2 4-4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCard(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 11h18M8 7V5.5a2 2 0 012-2h4a2 2 0 012 2V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props}>
      <path
        d="M21 12a8 8 0 01-8 8H4l1.5-3.2A8 8 0 1121 12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function IconSend(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props}>
      <path
        d="M21 4L3 11l6 2.5M21 4l-5 16-4.5-6.5M21 4L9.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconDoc(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconTrash(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" {...defaults} {...props}>
      <path
        d="M3 4h10M6.5 4V3a1 1 0 011-1h1a1 1 0 011 1v1M5 4l.5 9a1 1 0 001 .9h3a1 1 0 001-.9L11 4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconSpinner(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...defaults} {...props} className={`animate-spin ${props.className ?? ""}`}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.25" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
