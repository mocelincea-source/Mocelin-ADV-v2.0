import { MessageCircle } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/auxilio-content";
import { track } from "./auxilioTrack";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origem: "botao_flutuante" })}
      aria-label="Falar com o escritório pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-3 font-display text-sm font-semibold text-whatsapp-foreground shadow-elev transition-transform hover:scale-[1.03] md:bottom-8 md:right-8"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden sm:inline">Falar pelo WhatsApp</span>
    </a>
  );
}
