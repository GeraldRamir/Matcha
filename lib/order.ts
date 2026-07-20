import { getProduct } from "@/data/products";
import { site } from "@/data/site";
import { formatPrice } from "@/lib/utils";

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

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);
}

export function cartCount(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

function buildOrderLines(order: OrderDetails) {
  const lines: string[] = [];
  lines.push(`Nuevo pedido — ${site.name}`);
  lines.push("");
  lines.push("PRODUCTOS");

  for (const item of order.items) {
    const product = getProduct(item.productId);
    if (!product) continue;
    lines.push(
      `• ${product.name} (${product.unit}) × ${item.quantity} — ${formatPrice(product.price * item.quantity)}`
    );
  }

  lines.push("");
  lines.push(`Total estimado: ${formatPrice(cartTotal(order.items))}`);
  lines.push("");
  lines.push("DATOS DE CONTACTO");
  lines.push(`Nombre: ${order.name}`);
  if (order.email) lines.push(`Email: ${order.email}`);
  lines.push(`Teléfono: ${order.phone}`);
  lines.push(
    `Entrega: ${order.delivery === "delivery" ? "Envío a domicilio" : "Retiro personal"}`
  );
  if (order.delivery === "delivery" && order.address) {
    lines.push(`Dirección: ${order.address}`);
  }
  if (order.notes) {
    lines.push(`Notas: ${order.notes}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(order: OrderDetails) {
  const text = encodeURIComponent(buildOrderLines(order));
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}

export function buildMailtoUrl(order: OrderDetails) {
  const subject = encodeURIComponent(`Pedido — ${order.name}`);
  const body = encodeURIComponent(buildOrderLines(order));
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}

export function buildContactWhatsAppUrl(message?: string) {
  const text = encodeURIComponent(
    message ?? `Hola ${site.shortName}, me gustaría hacer una consulta sobre sus productos.`
  );
  return `https://wa.me/${site.whatsappNumber}?text=${text}`;
}
