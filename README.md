# KUMO Matcha — Landing premium

Landing page de venta de matcha con sistema de pedidos por WhatsApp y email.
Construida con Next.js (App Router), Tailwind CSS v4 y Framer Motion.

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Configuración del negocio

Edita `data/site.ts` para poner tus datos reales:

- `whatsappNumber` — número de WhatsApp con código de país, sin `+` ni espacios (ej. `18095550123`)
- `email` — correo donde recibirás los pedidos
- `url` — dominio de producción (usado en SEO/OpenGraph)
- Dirección, horarios e Instagram

Los productos, precios, testimonios, FAQs y textos viven en `/data`. No hay que
tocar componentes para cambiar el contenido.

## Páginas

- `/` — Hero, beneficios, productos destacados y testimonios
- `/productos` — Tienda completa y tabla comparativa
- `/origen` — Proceso, por qué elegirnos y galería
- `/faq` — Preguntas frecuentes
- `/pedido` — Formulario de pedido y proceso de compra

## Estructura

```
app/          Layout compartido (navbar/footer), páginas por sección, SEO
components/
  ui/         Sistema de diseño: Button, Card, Badge, Input, Accordion, Drawer, Modal…
  layout/     Navbar, Footer, botón flotante de WhatsApp
  sections/   Secciones de la landing (Hero, Beneficios, Productos, FAQ…)
  order/      Carrito: ProductCard, CartDrawer, QuantityStepper
data/         Contenido editable (productos, textos, FAQs, marca)
hooks/        useCart (estado global del pedido), useBodyScrollLock
lib/          Utilidades: mensajes de pedido, variantes de animación, SEO
public/       Imágenes optimizadas (WebP)
```

## Cómo funcionan los pedidos

1. El usuario agrega productos (desde las cards o el propio formulario).
2. Completa nombre, teléfono, email, dirección y método de entrega.
3. Al presionar **Enviar por WhatsApp** se abre `wa.me` con el pedido armado;
   **Enviar por email** abre el cliente de correo con asunto y cuerpo listos.

No hay backend ni pasarela de pago: el cierre de la venta ocurre en WhatsApp/email.

## Build de producción

```bash
npm run build
npm start
```
