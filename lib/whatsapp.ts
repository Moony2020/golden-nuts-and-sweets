import { COMPANY } from "./config";

/**
 * Builds a ready-to-use WhatsApp link with an optional prefilled message.
 * Uses wa.me which works on both mobile and desktop.
 */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${COMPANY.whatsapp}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
