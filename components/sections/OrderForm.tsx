"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { site } from "@/data/site";
import { useCart } from "@/hooks/use-cart";
import { useLocale } from "@/hooks/use-locale";
import { getLocalizedProducts } from "@/lib/i18n/products";
import {
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
  phone: string;
  address: string;
  notes: string;
  delivery: DeliveryMethod;
};

type Errors = Partial<Record<keyof FormState | "items", string>>;

const INITIAL: FormState = {
  name: "",
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
  const { dict, locale } = useLocale();
  const products = getLocalizedProducts(dict, locale);
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const quantityOf = (productId: string) =>
    items.find((i) => i.productId === productId)?.quantity ?? 0;

  const update = (field: keyof FormState) => (value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const order = useMemo<OrderDetails>(
    () => ({ ...form, email: "", items }),
    [form, items]
  );

  const validate = (): boolean => {
    const next: Errors = {};
    if (items.length === 0) next.items = dict.orderForm.errors.items;
    if (!form.name.trim()) next.name = dict.orderForm.errors.name;
    if (!form.phone.trim()) next.phone = dict.orderForm.errors.phone;
    if (form.delivery === "delivery" && !form.address.trim()) {
      next.address = dict.orderForm.errors.address;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const sendWhatsApp = () => {
    if (!validate()) {
      requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>('[aria-invalid="true"]')
          ?.focus();
      });
      return;
    }
    setSending(true);
    const url = buildWhatsAppUrl(order, dict, locale);
    setTimeout(() => {
      window.open(url, "_blank", "noopener,noreferrer");
      setSending(false);
      setSent(true);
    }, 400);
  };

  return (
    <section
      id="pedido"
      aria-label={dict.orderForm.eyebrow}
      className={showHeading ? "py-16 sm:py-24" : "pb-16 sm:pb-24"}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {showHeading && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mx-auto mb-12 max-w-2xl text-center"
          >
            <p className="text-xs font-medium tracking-[0.22em] text-matcha-mid uppercase">
              {dict.orderForm.eyebrow}
            </p>
            <h2 className="mt-4 font-serif text-[1.75rem] font-bold tracking-tight text-ink sm:text-4xl">
              {dict.orderForm.title}
            </h2>
            <p className="mt-4 text-ink-soft">{dict.orderForm.description}</p>
          </motion.div>
        )}

        <motion.ol
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="mb-10 grid gap-3 sm:mb-12 sm:grid-cols-3 sm:gap-4"
        >
          {dict.orderForm.miniSteps.map((step, i) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl border border-line bg-cream-soft/80 px-4 py-4"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-matcha-deep font-serif text-sm font-bold text-gold">
                {i + 1}
              </span>
              <span>
                <span className="block text-sm font-semibold text-ink">{step.title}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-ink-faint">
                  {step.description}
                </span>
              </span>
            </motion.li>
          ))}
        </motion.ol>

        <form
          ref={formRef}
          onSubmit={(e) => {
            e.preventDefault();
            sendWhatsApp();
          }}
          noValidate
          aria-describedby={errors.items ? "pedido-items-error" : undefined}
          className="grid items-start gap-6 lg:grid-cols-[1fr_22rem] lg:gap-8 xl:grid-cols-[1fr_24rem] xl:gap-10"
        >
          <div className="space-y-8">
            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-7"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                    {dict.orderForm.stepProduct}
                  </h3>
                  <p className="mt-1 text-sm text-ink-soft">
                    {dict.orderForm.addProducts}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {products.map((product) => {
                  const qty = quantityOf(product.id);
                  return (
                    <li
                      key={product.id}
                      className={cn(
                        "flex flex-col gap-3 rounded-2xl border px-4 py-4 transition-colors sm:flex-row sm:items-center sm:gap-4",
                        qty > 0
                          ? "border-matcha-deep/35 bg-matcha-50/70"
                          : "border-line bg-cream-soft/50"
                      )}
                    >
                      <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-cream sm:h-20 sm:w-20">
                          <Image
                            src={product.image}
                            alt=""
                            fill
                            sizes="80px"
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-base font-semibold text-ink sm:text-xl">
                            {product.name}
                          </p>
                          <p className="mt-0.5 text-sm text-ink-faint">
                            {product.unit} · {formatPrice(product.price, locale)}
                          </p>
                          {product.subtitle ? (
                            <p className="mt-1 hidden text-xs text-ink-faint sm:block">
                              {product.subtitle}
                            </p>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex justify-end sm:shrink-0">
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
                            aria-label={`${dict.orderForm.addLabel} ${product.name}`}
                            className="h-11 w-full cursor-pointer rounded-md bg-matcha-deep px-5 text-sm font-semibold text-gold transition-colors hover:bg-matcha sm:w-auto"
                          >
                            {dict.orderForm.addLabel}
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {errors.items && (
                <p
                  id="pedido-items-error"
                  role="alert"
                  className="mt-4 text-sm text-red-600"
                >
                  {errors.items}
                </p>
              )}
            </motion.section>

            <motion.section
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-7"
            >
              <h3 className="font-serif text-xl font-bold text-ink sm:text-2xl">
                {dict.orderForm.stepData}
              </h3>
              <p className="mt-1 text-sm text-ink-soft">{dict.orderForm.dataHint}</p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Input
                  label={dict.orderForm.name}
                  placeholder="María Fernández"
                  autoComplete="name"
                  required
                  value={form.name}
                  onChange={(e) => update("name")(e.target.value)}
                  error={errors.name}
                />
                <Input
                  label={dict.orderForm.phone}
                  type="tel"
                  placeholder={site.phoneDisplay}
                  autoComplete="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update("phone")(e.target.value)}
                  error={errors.phone}
                />
              </div>

              <fieldset className="mt-6">
                <legend className="text-sm font-medium text-ink">
                  {dict.orderForm.delivery}
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2" role="radiogroup">
                  {(
                    [
                      {
                        value: "delivery" as const,
                        label: dict.orderForm.deliveryHome,
                        detail: dict.orderForm.deliveryHint,
                      },
                      {
                        value: "pickup" as const,
                        label: dict.orderForm.pickup,
                        detail: dict.orderForm.pickupHint,
                      },
                    ] as const
                  ).map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer flex-col rounded-2xl border p-4 transition-colors",
                        form.delivery === option.value
                          ? "border-matcha-deep bg-matcha-50"
                          : "border-line bg-cream-soft/40 hover:border-matcha/40"
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
                      <span className="text-sm font-semibold text-ink">
                        {option.label}
                      </span>
                      <span className="mt-1 text-xs leading-relaxed text-ink-faint">
                        {option.detail}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.delivery === "delivery" && (
                <div className="mt-5">
                  <Input
                    label={dict.orderForm.address}
                    placeholder="Calle, número, sector, ciudad"
                    autoComplete="street-address"
                    required
                    value={form.address}
                    onChange={(e) => update("address")(e.target.value)}
                    error={errors.address}
                  />
                </div>
              )}

              <div className="mt-5">
                <Textarea
                  label={dict.orderForm.notes}
                  placeholder={dict.orderForm.notesPlaceholder}
                  value={form.notes}
                  onChange={(e) => update("notes")(e.target.value)}
                />
              </div>
            </motion.section>
          </div>

          <motion.aside
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="lg:sticky lg:top-28"
          >
            <div className="overflow-hidden rounded-[1.5rem] border border-line bg-matcha-deep text-cream shadow-[0_16px_48px_-28px_rgb(12_64_53_/_0.55)]">
              <div className="border-b border-cream/10 px-5 py-5 sm:px-6">
                <p className="text-xs font-medium tracking-[0.2em] text-gold/80 uppercase">
                  {dict.orderForm.stepSend}
                </p>
                <h3 className="mt-2 font-serif text-2xl font-bold text-cream">
                  {dict.orderForm.summary}
                </h3>
              </div>

              <div className="space-y-4 px-5 py-5 sm:px-6">
                {items.length === 0 ? (
                  <p className="text-sm text-cream/65">{dict.orderForm.emptyCart}</p>
                ) : (
                  <ul className="space-y-3">
                    {items.map((item) => {
                      const product = products.find((p) => p.id === item.productId);
                      if (!product) return null;
                      return (
                        <li
                          key={item.productId}
                          className="flex items-start justify-between gap-3 text-sm"
                        >
                          <span className="text-cream/85">
                            {product.name}
                            <span className="block text-xs text-cream/50">
                              × {item.quantity} · {product.unit}
                            </span>
                          </span>
                          <span className="shrink-0 font-semibold tabular-nums text-gold">
                            {formatPrice(product.price * item.quantity, locale)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                )}

                <div className="border-t border-cream/10 pt-4">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <p className="text-xs tracking-[0.16em] text-cream/50 uppercase">
                        {dict.orderForm.estimatedTotal}
                      </p>
                      <p className="mt-1 font-serif text-2xl font-bold tabular-nums text-gold sm:text-3xl">
                        {formatPrice(total, locale)}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-cream/55">
                    {dict.orderForm.noPaymentNote}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-gold px-6 text-sm font-bold text-matcha-deep transition-colors hover:bg-gold-soft disabled:opacity-50"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={1.75} />
                  {sending
                    ? dict.orderForm.openingWhatsApp
                    : dict.orderForm.sendWhatsApp}
                </button>

                <div aria-live="polite">
                  {sent && (
                    <div className="flex items-start gap-3 rounded-2xl bg-cream/10 px-4 py-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold text-matcha-deep">
                        <Check className="h-3 w-3" />
                      </span>
                      <p className="text-sm leading-relaxed text-cream/90">
                        {dict.orderForm.sentSuccess}
                      </p>
                    </div>
                  )}
                </div>

                <p className="text-center text-[11px] text-cream/45">
                  {dict.orderForm.privacyNote}
                </p>
              </div>
            </div>
          </motion.aside>
        </form>
      </div>
    </section>
  );
}
