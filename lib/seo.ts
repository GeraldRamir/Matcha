import { FAQS } from "@/data/faqs";
import { PRODUCTS } from "@/data/products";
import { site } from "@/data/site";

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#org`,
        name: site.name,
        url: site.url,
        email: site.email,
        description: site.description,
        logo: `${site.url}/images/brand/solae-logo-512.png`,
        sameAs: [site.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        inLanguage: "es",
        publisher: { "@id": `${site.url}/#org` },
      },
      {
        "@type": "ItemList",
        name: "Productos de matcha",
        itemListElement: PRODUCTS.map((product, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: product.name,
            description: product.description,
            image: `${site.url}${product.image}`,
            brand: { "@id": `${site.url}/#org` },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating,
              reviewCount: product.reviews,
              bestRating: 5,
            },
            offers: {
              "@type": "Offer",
              price: product.priceUsd,
              priceCurrency: "USD",
              availability:
                product.stock === "low-stock"
                  ? "https://schema.org/LimitedAvailability"
                  : "https://schema.org/InStock",
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
    ],
  };
}
