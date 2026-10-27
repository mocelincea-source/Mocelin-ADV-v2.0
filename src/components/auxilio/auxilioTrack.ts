type EventName =
  | "quiz_start"
  | "quiz_step"
  | "quiz_complete"
  | "form_submit"
  | "cta_questionario_click"
  | "whatsapp_click"
  | "email_click"
  | "privacy_view";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Envia eventos de conversão para o dataLayer, sem dados sensíveis. */
export function track(event: EventName, payload: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}

/** Lê parâmetros de origem da campanha presentes na URL. */
export function campaignSource() {
  if (typeof window === "undefined") return "";
  const p = new URLSearchParams(window.location.search);
  const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "gclid", "fbclid"];
  const parts = keys
    .map((k) => (p.get(k) ? `${k}=${p.get(k)}` : null))
    .filter(Boolean) as string[];
  return parts.join(" | ");
}
