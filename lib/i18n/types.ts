export type Locale = "es" | "en";

export const LOCALES: Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_STORAGE_KEY = "solae-locale";

export type NavItem = { href: string; labelKey: string };

export type Dictionary = {
  meta: {
    tagline: string;
    description: string;
    story: string;
  };
  common: {
    skipToContent: string;
    brandLine: string;
    orderNow: string;
    orderCta: string;
    viewProducts: string;
    viewCollection: string;
    howToOrder: string;
    contact: string;
    email: string;
    whatsapp: string;
    learnMore: string;
    close: string;
    openMenu: string;
    closeMenu: string;
    primaryNav: string;
    cartAria: string;
    removeAria: string;
    language: string;
    langEs: string;
    langEn: string;
  };
  nav: {
    home: string;
    products: string;
    benefits: string;
    about: string;
    contact: string;
    order: string;
    orderNow: string;
  };
  footer: {
    blurb: string;
    product: string;
    resources: string;
    company: string;
    home: string;
    products: string;
    benefits: string;
    placeOrder: string;
    origin: string;
    collection: string;
    howToOrder: string;
    aboutSolae: string;
    contact: string;
    rights: string;
    conditions: string;
    terms: string;
  };
  hero: {
    body: string;
    cta: string;
    latteAlt: string;
    chips: { title: string; detail: string }[];
  };
  stats: {
    aria: string;
    title: string;
    lovedBy: string;
    items: { label: string }[];
    videoAria: string;
  };
  whyMatcha: {
    eyebrow: string;
    title: string;
    titleLine2: string;
    body: string;
    cta: string;
    nodes: { title: string; body: string }[];
  };
  products: {
    aria: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    buyNow: string;
    added: string;
    goToOrder: string;
    carouselHint: string;
  };
  product: {
    ceremonial: {
      subtitle: string;
      description: string;
      servings: string;
      badge: string;
      notes: string[];
    };
  };
  greenBanner: {
    aria: string;
    title: string;
    titleLine2: string;
    body: string;
    cta: string;
    route: string;
  };
  benefits: {
    aria: string;
    eyebrow: string;
    title: string;
    titleLine2: string;
    items: { title: string; body: string }[];
  };
  cart: {
    title: string;
    emptyTitle: string;
    emptyBody: string;
    viewProducts: string;
    estimatedTotal: string;
    completeOrder: string;
    sendHint: string;
  };
  floatingWa: {
    aria: string;
  };
  orderMsg: {
    newOrder: string;
    products: string;
    estimatedTotal: string;
    contactData: string;
    name: string;
    email: string;
    phone: string;
    delivery: string;
    deliveryHome: string;
    pickup: string;
    address: string;
    notes: string;
    subject: string;
    contactHello: string;
  };
  ctaBanner: {
    eyebrow: string;
    defaultTitle: string;
    defaultBody: string;
    order: string;
    shop: string;
  };
  orderProcess: {
    eyebrow: string;
    title: string;
    body: string;
    start: string;
    steps: { title: string; description: string }[];
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    description: string;
    stepsLabel: string;
    routeLabel: string;
    imageAlt: string;
    steps: { title: string; description: string }[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    description: string;
    imageAlt: string;
    reasons: { title: string; description: string }[];
  };
  gallery: {
    // captions keyed by id if needed — keep simple list
    items: { alt: string; caption: string }[];
  };
  pages: {
    origen: {
      eyebrow: string;
      title: string;
      description: string;
      pillars: { title: string; text: string }[];
      ready: string;
      viewCollection: string;
      or: string;
      howToOrder: string;
      ctaTitle: string;
      ctaBody: string;
    };
    coleccion: {
      eyebrow: string;
      title: string;
      description: string;
      ctaTitle: string;
      ctaBody: string;
    };
    productos: {
      eyebrow: string;
      title: string;
      description: string;
      ctaTitle: string;
      ctaBody: string;
    };
    pedido: {
      eyebrow: string;
      title: string;
      description: string;
    };
    comoPedir: {
      eyebrow: string;
      title: string;
      description: string;
      knowTitle: string;
      knowBody: string;
      ready: string;
      goForm: string;
      details: { title: string; text: string }[];
      ctaTitle: string;
      ctaBody: string;
    };
    faq: {
      eyebrow: string;
      title: string;
      description: string;
    };
    contacto: {
      eyebrow: string;
      title: string;
      description: string;
      visitTitle: string;
      visitBody: string;
      openMaps: string;
      channelsTitle: string;
      phoneLabel: string;
      phoneHint: string;
      instagramLabel: string;
      instagramHint: string;
      emailLabel: string;
      emailHint: string;
      whatsappLabel: string;
      whatsappHint: string;
      whatsappCta: string;
      hoursLabel: string;
      mapTitle: string;
      mapAria: string;
    };
    terminos: {
      eyebrow: string;
      title: string;
      description: string;
      updated: string;
      seeAlso: string;
      conditionsLink: string;
      sections: { title: string; paragraphs: string[] }[];
    };
    condiciones: {
      eyebrow: string;
      title: string;
      description: string;
      updated: string;
      seeAlso: string;
      termsLink: string;
      sections: { title: string; paragraphs: string[] }[];
    };
  };
  orderForm: {
    eyebrow: string;
    title: string;
    description: string;
    stepProduct: string;
    stepData: string;
    stepSend: string;
    emptyCart: string;
    addProducts: string;
    addLabel: string;
    continue: string;
    name: string;
    phone: string;
    delivery: string;
    deliveryHome: string;
    deliveryHint: string;
    pickup: string;
    pickupHint: string;
    address: string;
    notes: string;
    notesPlaceholder: string;
    summary: string;
    estimatedTotal: string;
    noPaymentNote: string;
    sendWhatsApp: string;
    openingWhatsApp: string;
    sentSuccess: string;
    privacyNote: string;
    dataHint: string;
    miniSteps: { title: string; description: string }[];
    errors: {
      items: string;
      name: string;
      phone: string;
      address: string;
    };
  };
  faqs: { question: string; answer: string }[];
  site: {
    hours: string;
    address: string;
  };
};
