"use client";

import Image from "next/image";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { getProduct } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { Drawer } from "@/components/ui/Drawer";
import { QuantityStepper } from "@/components/order/QuantityStepper";

export function CartDrawer() {
  const { items, total, isDrawerOpen, closeDrawer, setQuantity, removeItem } = useCart();

  return (
    <Drawer open={isDrawerOpen} onClose={closeDrawer} title="Tu pedido">
      {items.length === 0 ? (
        <div className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-matcha-50 text-matcha-deep">
            <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <p className="font-serif text-xl font-bold text-ink">Tu pedido está vacío</p>
          <p className="text-sm text-ink-soft">Agrega productos y completa en un clic.</p>
          <a
            href="/productos"
            onClick={closeDrawer}
            className="mt-2 inline-flex h-10 items-center rounded-md border border-line px-5 text-sm font-medium text-ink transition-colors hover:border-matcha-deep hover:bg-matcha-deep hover:text-cream"
          >
            Ver productos
          </a>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <ul className="flex-1 divide-y divide-line px-6">
            {items.map((item) => {
              const product = getProduct(item.productId);
              if (!product) return null;
              return (
                <li key={item.productId} className="flex gap-4 py-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream-soft">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-contain p-1.5"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-serif text-base font-semibold text-ink">
                          {product.name}
                        </p>
                        <p className="text-xs text-ink-faint">{product.unit}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.productId)}
                        aria-label={`Eliminar ${product.name}`}
                        className="cursor-pointer text-ink-faint transition-colors hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <QuantityStepper
                        value={item.quantity}
                        onChange={(q) => setQuantity(item.productId, q)}
                        label={product.name}
                      />
                      <p className="text-sm font-semibold tabular-nums text-ink">
                        {formatPrice(product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-line bg-cream-soft/80 px-6 py-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-ink-soft">Total estimado</span>
              <span className="font-serif text-2xl font-bold tabular-nums text-ink">
                {formatPrice(total)}
              </span>
            </div>
            <a
              href="/pedido"
              onClick={closeDrawer}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-ink text-sm font-semibold text-cream transition-colors hover:bg-matcha-deep"
            >
              Completar pedido
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-center text-xs text-ink-faint">
              Enviarás el pedido por WhatsApp o email.
            </p>
          </div>
        </div>
      )}
    </Drawer>
  );
}
