import { getProduct } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice, getProductPrice } from "@/lib/utils";
import { es } from "@/lib/i18n/es";
import type { Dictionary, Locale } from "@/lib/i18n/types";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type DeliveryMethod = "delivery" | "pickup";

export type OrderDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  delivery: DeliveryMethod;
  items: CartItem[];
};

export function cartTotal(items: CartItem[], locale: Locale = "es") {
  return items.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return product ? sum + getProductPrice(product, locale) * item.quantity : sum;
  }, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function buildOrderLines(
  order: OrderDetails,
  dict: Dictionary = es,
  locale: Locale = "es"
) {
  const msg = dict.orderMsg;
  const lines: string[] = [];
  lines.push(msg.newOrder);
  lines.push("");
  lines.push(msg.products);

  for (const item of order.items) {
    const product = getProduct(item.productId);
    if (!product) continue;
    const lineTotal = getProductPrice(product, locale) * item.quantity;
    lines.push(
      `• ${product.name} (${product.unit}) × ${item.quantity} — ${formatPrice(lineTotal, locale)}`
    );
  }

  lines.push("");
  lines.push(
    `${msg.estimatedTotal}: ${formatPrice(cartTotal(order.items, locale), locale)}`
  );
  lines.push("");
  lines.push(msg.contactData);
  lines.push(`${msg.name}: ${order.name}`);
  if (order.email) lines.push(`${msg.email}: ${order.email}`);
  lines.push(`${msg.phone}: ${order.phone}`);
  lines.push(
    `${msg.delivery}: ${order.delivery === "delivery" ? msg.deliveryHome : msg.pickup}`
  );
  if (order.delivery === "delivery" && order.address) {
    lines.push(`${msg.address}: ${order.address}`);
  }
  if (order.notes) {
    lines.push(`${msg.notes}: ${order.notes}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(
  order: OrderDetails,
  dict: Dictionary = es,
  locale: Locale = "es"
) {
  const text = encodeURIComponent(buildOrderLines(order, dict, locale));
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

export function buildMailtoUrl(
  order: OrderDetails,
  dict: Dictionary = es,
  locale: Locale = "es"
) {
  const subject = encodeURIComponent(dict.orderMsg.subject.replace("{name}", order.name));
  const body = encodeURIComponent(buildOrderLines(order, dict, locale));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function buildContactWhatsAppUrl(message?: string, dict: Dictionary = es) {
  const text = encodeURIComponent(message ?? dict.orderMsg.contactHello);
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
