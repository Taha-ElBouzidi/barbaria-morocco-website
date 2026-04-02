import type { GammeDef, ProductDef } from "./products";

export type OrderState = Map<string, number>; // productKey → quantity

/** Build a WhatsApp message from the current order state */
export function formatWhatsAppMessage(
  order: OrderState,
  gammes: GammeDef[],
  textileProducts: ProductDef[],
  getProductName: (key: string) => string,
  header: string,
  footer: string
): string {
  if (order.size === 0) return "";

  const lines: string[] = [header];

  // Cosmetics — group by gamme
  gammes.forEach((gamme) => {
    const gammeItems = gamme.products.filter((p) => order.has(p.key));
    if (gammeItems.length === 0) return;

    lines.push(`*${gammeItems[0] ? getProductName(`gamme_${gamme.key}`) : gamme.key.toUpperCase()}*`);
    gammeItems.forEach((p) => {
      lines.push(`- ${getProductName(p.key)} x${order.get(p.key)}`);
    });
    lines.push("");
  });

  // Textile
  const textileItems = textileProducts.filter((p) => order.has(p.key));
  if (textileItems.length > 0) {
    lines.push("*TEXTILE*");
    textileItems.forEach((p) => {
      lines.push(`- ${getProductName(p.key)} x${order.get(p.key)}`);
    });
    lines.push("");
  }

  const totalItems = Array.from(order.values()).reduce((a, b) => a + b, 0);
  lines.push(`Total : ${totalItems} produit(s)`);
  lines.push(footer);

  return lines.join("\n");
}

/** Build a simpler WhatsApp message — flat list with gamme headers from translation names */
export function buildWhatsAppText(
  order: OrderState,
  gammes: GammeDef[],
  textileProducts: ProductDef[],
  productNames: Map<string, string>,
  gammeNames: Map<string, string>,
  header: string,
  footer: string
): string {
  if (order.size === 0) return "";

  const parts: string[] = [header.trimEnd()];

  // Cosmetics by gamme
  gammes.forEach((gamme) => {
    const items = gamme.products.filter((p) => order.has(p.key));
    if (items.length === 0) return;

    const gammeName = gammeNames.get(gamme.key) ?? gamme.key;
    parts.push(`\n*${gammeName.toUpperCase()}*`);
    items.forEach((p) => {
      const qty = order.get(p.key) ?? 1;
      const name = productNames.get(p.key) ?? p.key;
      parts.push(`- ${name} x${qty}`);
    });
  });

  // Textile
  const textileItems = textileProducts.filter((p) => order.has(p.key));
  if (textileItems.length > 0) {
    parts.push("\n*TEXTILE ARTISANAL*");
    textileItems.forEach((p) => {
      const qty = order.get(p.key) ?? 1;
      const name = productNames.get(p.key) ?? p.key;
      parts.push(`- ${name} x${qty}`);
    });
  }

  const totalQty = Array.from(order.values()).reduce((a, b) => a + b, 0);
  const totalProducts = order.size;
  parts.push(`\nTotal : ${totalProducts} référence(s) · ${totalQty} unité(s)`);
  parts.push(footer.trimStart());

  return parts.join("\n");
}

/** Build a plain text email body */
export function buildEmailText(
  order: OrderState,
  gammes: GammeDef[],
  textileProducts: ProductDef[],
  productNames: Map<string, string>,
  gammeNames: Map<string, string>
): string {
  if (order.size === 0) return "";

  const lines: string[] = ["Bonjour Barbaria Morocco,", "", "Je souhaite commander :", ""];

  gammes.forEach((gamme) => {
    const items = gamme.products.filter((p) => order.has(p.key));
    if (items.length === 0) return;

    const gammeName = gammeNames.get(gamme.key) ?? gamme.key;
    lines.push(`--- ${gammeName} ---`);
    items.forEach((p) => {
      const qty = order.get(p.key) ?? 1;
      const name = productNames.get(p.key) ?? p.key;
      lines.push(`  - ${name} x${qty}`);
    });
    lines.push("");
  });

  const textileItems = textileProducts.filter((p) => order.has(p.key));
  if (textileItems.length > 0) {
    lines.push("--- Textile Artisanal ---");
    textileItems.forEach((p) => {
      const qty = order.get(p.key) ?? 1;
      const name = productNames.get(p.key) ?? p.key;
      lines.push(`  - ${name} x${qty}`);
    });
    lines.push("");
  }

  const totalQty = Array.from(order.values()).reduce((a, b) => a + b, 0);
  lines.push(`Total : ${order.size} référence(s) · ${totalQty} unité(s)`);
  lines.push("", "Merci !");

  return lines.join("\n");
}
