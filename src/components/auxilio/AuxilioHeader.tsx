import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import logo from "@/assets/auxilio/logo-mocelin.svg";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/auxilio-content";
import { track } from "./auxilioTrack";

const LINKS = [
  { href: "#beneficio", label: "O benefício" },
  { href: "#enquadramento", label: "Quem pode ter direito" },
  { href: "#questionario", label: "Questionário" },
  { href: "#duvidas", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

const linkUnderline =
  "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-pink after:transition-transform after:duration-500 hover:after:scale-x-100";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-pink/20! bg-navy/80 font-sans backdrop-blur-xl [--radius:0rem]">
      <div className="mx-auto flex h-20 w-full max-w-[1206px] items-center justify-between px-6 sm:px-10 xl:px-0">
        <Link
          to="/"
          className="shrink-0 cursor-pointer transition-opacity hover:opacity-80"
          aria-label="Mocelin Advogadas"
        >
          <img src={logo} alt="Mocelin Advogadas" className="h-11 w-auto" />
        </Link>

        <div className="hidden items-center gap-10 min-[1100px]:flex">
          <nav className="flex items-center gap-12" aria-label="Seções da página">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                className={`whitespace-nowrap text-base font-medium transition-colors duration-300 hover:text-pink ${i === 0 ? "text-pink" : "text-white"} ${linkUnderline}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { origem: "cabecalho" })}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm border border-pink! px-5 py-2.5 text-sm font-semibold text-pink transition-all duration-300 hover:bg-pink hover:text-primary-foreground hover:shadow-soft"
          >
            Fale conosco
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="p-2 text-pink min-[1100px]:hidden"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-pink/20! px-6 py-4 min-[1100px]:hidden" aria-label="Menu">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-lg font-medium transition-colors hover:text-pink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              track("whatsapp_click", { origem: "cabecalho" });
              setOpen(false);
            }}
            className="mt-3 inline-flex items-center justify-center rounded-sm border border-pink! px-5 py-3 text-base font-semibold text-pink transition-colors duration-300 hover:bg-pink hover:text-primary-foreground"
          >
            Fale conosco
          </a>
        </nav>
      ) : null}
    </header>
  );
}
