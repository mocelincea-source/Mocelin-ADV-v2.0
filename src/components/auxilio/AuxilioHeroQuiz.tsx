import { useState } from "react";
import { ArrowLeft, MessageCircle, ShieldCheck } from "lucide-react";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/lib/auxilio-content";
import { campaignSource, track } from "./auxilioTrack";

type Q = { id: string; title: string; help: string; options: { value: string; label: string }[] };

const QUESTIONS: Q[] = [
  {
    id: "acidente",
    title: "Você sofreu algum tipo de acidente?",
    help: "Trabalho, trânsito, em casa ou no lazer — todos podem ser analisados.",
    options: [
      { value: "sim", label: "Sim, sofri um acidente" },
      { value: "nao", label: "Não" },
    ],
  },
  {
    id: "sequela",
    title: "Ficou alguma sequela ou limitação depois do acidente?",
    help: "Dor que não passou, força reduzida, movimento limitado, audição ou visão afetada.",
    options: [
      { value: "sim", label: "Sim, ficou alguma limitação" },
      { value: "nao", label: "Não, sarei por completo" },
      { value: "nao_sei", label: "Não sei informar" },
    ],
  },
  {
    id: "vinculo",
    title: "Na época do acidente, você era segurado do INSS?",
    help: "Carteira assinada, trabalho doméstico, avulso ou trabalhador rural.",
    options: [
      { value: "sim", label: "Sim, tinha vínculo" },
      { value: "nao", label: "Não tinha vínculo" },
      { value: "nao_sei", label: "Não tenho certeza" },
    ],
  },
];

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export function HeroQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [aceite, setAceite] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const question = QUESTIONS[step] ?? QUESTIONS[0]!;
  const total = QUESTIONS.length;

  function choose(value: string) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (step === 0) track("quiz_start", { origem: "hero" });
    track("quiz_step", { pergunta: question.id, etapa: step + 1, origem: "hero" });
    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      track("quiz_complete", { origem: "hero" });
      setDone(true);
    }
  }

  function mensagem() {
    const linhas = QUESTIONS.map((q) => {
      const opt = q.options.find((o) => o.value === answers[q.id]);
      return `• ${q.title} ${opt?.label ?? "—"}`;
    }).join("\n");
    const origem = campaignSource();
    return [
      "Olá! Respondi às perguntas iniciais sobre auxílio-acidente no site.",
      "",
      `Nome: ${nome}`,
      `WhatsApp: ${telefone}`,
      "",
      "Respostas:",
      linhas,
      origem ? `\nOrigem: ${origem}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function enviar() {
    const e: Record<string, string> = {};
    if (nome.trim().length < 2) e['nome'] = "Informe como devemos te chamar.";
    if (telefone.replace(/\D/g, "").length < 10) e['telefone'] = "Digite um celular com DDD.";
    if (!aceite) e['aceite'] = "É necessário autorizar o contato.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    track("form_submit", { destino: "whatsapp", origem: "hero" });
    track("whatsapp_click", { origem: "hero_form" });
    window.open(whatsappUrl(mensagem()), "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-elev md:p-8">
      {!done ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow">
              Pergunta {step + 1} de {total}
            </p>
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1 text-base text-muted-foreground transition-colors hover:text-primary"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Voltar
              </button>
            ) : null}
          </div>

          <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>

          <h3 className="mt-6 text-2xl md:text-[1.75rem]">{question.title}</h3>
          <p className="mt-2 text-base text-muted-foreground">{question.help}</p>

          <div className="mt-6 grid gap-3">
            {question.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => choose(opt.value)}
                className="rounded-lg border border-border bg-surface px-5 py-4 text-left font-display text-lg text-surface-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {opt.label}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Três perguntas, sem cadastro e sem custo. O questionário não confirma direito ao
            benefício.
          </p>
        </>
      ) : (
        <>
          <p className="eyebrow">Último passo</p>
          <h3 className="mt-3 text-2xl md:text-[1.75rem]">
            Deixe seu contato para a análise do caso
          </h3>
          <form
            className="mt-6 grid gap-4"
            onSubmit={(ev) => {
              ev.preventDefault();
              enviar();
            }}
          >
            <div>
              <label htmlFor="hero-nome" className="mb-2 block font-display text-base font-medium">
                Como devemos te chamar?
              </label>
              <input
                id="hero-nome"
                autoComplete="name"
                className={inputClass}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              {errors['nome'] ? (
                <p className="mt-1 text-sm text-destructive">{errors['nome']}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="hero-tel" className="mb-2 block font-display text-base font-medium">
                Seu WhatsApp
              </label>
              <input
                id="hero-tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(11) 90000-0000"
                className={inputClass}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              {errors['telefone'] ? (
                <p className="mt-1 text-sm text-destructive">{errors['telefone']}</p>
              ) : null}
            </div>
            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="mt-1 size-5 accent-[oklch(0.62_0.24_349)]"
                checked={aceite}
                onChange={(e) => setAceite(e.target.checked)}
              />
              <span>
                Autorizo o contato pelo WhatsApp e li a{" "}
                <a
                  href="#privacidade"
                  onClick={() => track("privacy_view")}
                  className="text-primary underline underline-offset-4"
                >
                  Política de Privacidade
                </a>
                . O envio não constitui contratação nem garantia de direito.
              </span>
            </label>
            {errors['aceite'] ? (
              <p className="text-sm text-destructive">{errors['aceite']}</p>
            ) : null}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 font-display text-lg font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Falar agora no WhatsApp
            </button>

            <button
              type="button"
              onClick={() => {
                setDone(false);
                setStep(0);
                setAnswers({});
              }}
              className="text-base text-muted-foreground underline underline-offset-4 hover:text-primary"
            >
              Refazer as perguntas
            </button>

            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              Esta é uma triagem inicial e informativa, não um parecer jurídico. Quem concede o
              benefício é o INSS.
            </p>
          </form>
        </>
      )}

      {!done ? (
        <a
          href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { origem: "hero_card" })}
          className="mt-4 block text-center text-base text-primary underline underline-offset-4"
        >
          Prefiro falar direto no WhatsApp
        </a>
      ) : null}
    </div>
  );
}
