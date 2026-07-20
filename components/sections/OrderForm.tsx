"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Check, Mail, MessageCircle } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { site } from "@/data/site";
import { useCart } from "@/hooks/use-cart";
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  type DeliveryMethod,
  type OrderDetails,
} from "@/lib/order";
import { fadeUp, staggerContainer, VIEWPORT } from "@/lib/motion";
import { cn, formatPrice } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { QuantityStepper } from "@/components/order/QuantityStepper";

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  delivery: DeliveryMethod;
};

type Errors = Partial<Record<keyof FormState | "items", string>>;

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  notes: "",
  delivery: "delivery",
};

type OrderFormProps = {
  showHeading?: boolean;
};

export function OrderForm({ showHeading = true }: OrderFormProps) {
  const { items, total, setQuantity, addItem } = useCart();
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState<"whatsapp" | "email" | null>(null);
  const [sent, setSent] = useState<"whatsapp" | "email" | null>(null);

  const quantityOf = (productId: string) =>
    items.find((i) => i.productId === productId)?.quantity ?? 0;

  const update = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const order = useMemo<OrderDetails>(() => ({ ...form, items }), [form, items]);

  const validate = (channel: "whatsapp" | "email"): boolean => {
    const next: Errors = {};
    if (items.length === 0) next.items = "Selecciona al menos un producto.";
    if (!form.name.trim()) next.name = "Tu nombre es necesario.";
    if (!form.phone.trim()) next.phone = "Necesitamos un teléfono de contacto.";
    if (channel === "email" && !/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Ingresa un correo válido para enviar por email.";
    }
    if (form.delivery === "delivery" && !form.address.trim()) {
      next.address = "Indica la dirección de entrega.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const send = (channel: "whatsapp" | "email") => {
    if (!validate(channel)) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }
    setSending(channel);
    const url = channel === "whatsapp" ? buildWhatsAppUrl(order) : buildMailtoUrl(order);
    setTimeout(() => {
      window.open(url, channel === "whatsapp" ? "_blank" : "_self");
      setSending(null);
      setSent(channel);
    }, 450);
  };

  return (
    <section
      id="pedido"
      aria-label="Formulario de pedido"
      className={showHeading ? "py-20 sm:py-28" : "pb-20 sm:pb-28"}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {showHeading && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
              Pedido
            </p>
            <h2 className="mt-4 font-serif text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Elige, completa y envía
            </h2>
            <p className="mt-4 text-ink-soft">
              Tu pedido se abre en WhatsApp o en tu correo, listo para enviar.
              Sin pasarelas ni registros.
            </p>
          </motion.div>
        )}

        {/* How it works strip */}
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-12 grid gap-4 border-y border-line py-8 sm:grid-cols-3 sm:gap-8"
        >
          {[
            { n: "01", t: "Elige productos", d: "Agrega lo que quieras al pedido." },
            { n: "02", t: "Tus datos", d: "Nombre, teléfono y entrega." },
            { n: "03", t: "WhatsApp o email", d: "Se abre con el mensaje armado." },
          ].map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="flex gap-4">
              <span className="font-serif text-2xl font-bold text-matcha/50">{s.n}</span>
              <div>
                <p className="text-sm font-semibold text-ink">{s.t}</p>
                <p className="mt-1 text-sm text-ink-faint">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <form
          ref={formRef}
          onSubmit={(e) => e.preventDefault()}
          noValidate
          aria-describedby={errors.items ? "pedido-items-error" : undefined}
          className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"
        >
          {/* Products */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <h3 className="font-serif text-2xl font-bold text-ink">1 · Productos</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Toca agregar y ajusta la cantidad. Puedes combinar varios.
            </p>

            <ul className="mt-8 space-y-3">
              {PRODUCTS.map((product) => {
                const qty = quantityOf(product.id);
                return (
                  <li
                    key={product.id}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border px-4 py-3.5 transition-all duration-300",
                      qty > 0
                        ? "border-matcha/40 bg-matcha-50/60"
                        : "border-line bg-surface hover:border-matcha/30"
                    )}
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream-soft">
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain p-1.5"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-serif text-lg font-semibold text-ink">
                        {product.name}
                      </p>
                      <p className="text-xs text-ink-faint">
                        {product.unit} · {formatPrice(product.price)}
                      </p>
                    </div>
                    {qty > 0 ? (
                      <QuantityStepper
                        value={qty}
                        onChange={(q) => setQuantity(product.id, q)}
                        label={product.name}
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => addItem(product.id)}
                        aria-label={`Agregar ${product.name}`}
                        className="h-10 cursor-pointer rounded-md border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors hover:border-matcha-deep hover:bg-matcha-deep hover:text-cream"
                      >
                        Agregar
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>

            {errors.items && (
              <p id="pedido-items-error" role="alert" className="mt-3 text-xs text-red-600">
                {errors.items}
              </p>
            )}
          </motion.div>

          {/* Details + send */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h3 className="font-serif text-2xl font-bold text-ink">2 · Tus datos</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Solo lo necesario para confirmarte el pedido.
            </p>

            <div className="mt-8 space-y-5">
              <Input
                label="Nombre completo"
                placeholder="María Fernández"
                autoComplete="name"
                required
                value={form.name}
                onChange={(e) => update("name")(e.target.value)}
                error={errors.name}
              />
              <Input
                label="Teléfono / WhatsApp"
                type="tel"
                placeholder="+1 809 555 0123"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={(e) => update("phone")(e.target.value)}
                error={errors.phone}
              />
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="maria@correo.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => update("email")(e.target.value)}
                error={errors.email}
                hint="Obligatorio solo si envías por email."
              />

              <fieldset>
                <legend className="text-sm font-medium text-ink">Entrega</legend>
                <div className="mt-3 grid grid-cols-2 gap-3" role="radiogroup">
                  {(
                    [
                      { value: "delivery", label: "A domicilio", detail: "24–48 h" },
                      { value: "pickup", label: "Retiro", detail: site.address },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer flex-col rounded-2xl border p-4 transition-all duration-300",
                        form.delivery === option.value
                          ? "border-matcha-deep bg-matcha-50"
                          : "border-line bg-surface hover:border-matcha/40"
                      )}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={option.value}
                        checked={form.delivery === option.value}
                        onChange={() => update("delivery")(option.value)}
                        className="sr-only"
                      />
                      <span className="text-sm font-semibold text-ink">{option.label}</span>
                      <span className="mt-1 text-xs text-ink-faint line-clamp-2">
                        {option.detail}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.delivery === "delivery" && (
                <Input
                  label="Dirección de entrega"
                  placeholder="Calle, número, sector, ciudad"
                  autoComplete="street-address"
                  required
                  value={form.address}
                  onChange={(e) => update("address")(e.target.value)}
                  error={errors.address}
                />
              )}

              <Textarea
                label="Notas (opcional)"
                placeholder="Horario, indicaciones, si es un regalo…"
                value={form.notes}
                onChange={(e) => update("notes")(e.target.value)}
              />
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs tracking-[0.18em] text-ink-faint uppercase">
                    Total estimado
                  </p>
                  <p className="mt-1 font-serif text-4xl font-bold tabular-nums text-ink">
                    {formatPrice(total)}
                  </p>
                </div>
                <p className="max-w-[10rem] text-right text-xs text-ink-faint">
                  Sin pago online. Confirmas al coordinar.
                </p>
              </div>

              <h3 className="mt-8 font-serif text-xl font-bold text-ink">
                3 · Enviar pedido
              </h3>
              <p className="mt-2 text-sm text-ink-soft">
                Elige cómo enviárnoslo. Se abre WhatsApp o tu correo con el pedido
                listo — solo presiona enviar.
              </p>

              <div className="mt-5 grid gap-3">
                <button
                  type="button"
                  disabled={sending !== null}
                  onClick={() => send("whatsapp")}
                  className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-[#1f6b3a] px-6 text-sm font-semibold text-cream transition-colors hover:bg-matcha-deep disabled:opacity-40"
                >
                  <MessageCircle className="h-4 w-4" />
                  {sending === "whatsapp" ? "Abriendo WhatsApp…" : "Enviar por WhatsApp"}
                </button>
                <button
                  type="button"
                  disabled={sending !== null}
                  onClick={() => send("email")}
                  className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-md bg-ink px-6 text-sm font-semibold text-cream transition-colors hover:bg-matcha-deep disabled:opacity-40"
                >
                  <Mail className="h-4 w-4" />
                  {sending === "email" ? "Abriendo correo…" : "Enviar por email"}
                </button>
              </div>

              <div aria-live="polite">
                {sent && (
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="mt-4 flex items-start gap-3 rounded-2xl border border-matcha/30 bg-matcha-50 px-4 py-3.5"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-matcha-deep text-cream">
                      <Check className="h-3 w-3" />
                    </span>
                    <p className="text-sm leading-relaxed text-matcha-deep">
                      {sent === "whatsapp"
                        ? "WhatsApp se abrió con tu pedido. Presiona enviar y te confirmamos en minutos."
                        : "Tu correo se abrió con el pedido armado. Presiona enviar y te confirmamos en minutos."}
                    </p>
                  </motion.div>
                )}
              </div>

              <p className="mt-5 text-center text-xs text-ink-faint">
                Tus datos solo se usan para gestionar este pedido.
              </p>
            </div>
          </motion.div>
        </form>
      </div>
    </section>
  );
}
