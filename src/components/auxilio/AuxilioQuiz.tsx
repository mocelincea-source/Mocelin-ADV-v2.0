import { useMemo, useState } from "react";
import { ArrowLeft, Check, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import {
  CONTACT_EMAIL,
  OUTCOME_TEXT,
  QUIZ_QUESTIONS,
  evaluate,
  whatsappUrl,
} from "@/lib/auxilio-content";
import { campaignSource, track } from "./auxilioTrack";

type Contact = {
  nome: string;
  telefone: string;
  email: string;
  cidade: string;
  estado: string;
  descricao: string;
  aceite: boolean;
};

const EMPTY: Contact = {
  nome: "",
  telefone: "",
  email: "",
  cidade: "",
  estado: "",
  descricao: "",
  aceite: false,
};

const inputClass =
  "w-full rounded-md border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40";

export function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<"quiz" | "resultado" | "enviado">("quiz");
  const [contact, setContact] = useState<Contact>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[step] ?? QUIZ_QUESTIONS[0]!;
  const outcome = useMemo(() => evaluate(answers), [answers]);

  function choose(value: string) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    if (step === 0) track("quiz_start");
    track("quiz_step", { pergunta: question.id, etapa: step + 1 });

    if (step + 1 < total) {
      setStep(step + 1);
    } else {
      track("quiz_complete", { resultado: evaluate(next) });
      setPhase("resultado");
    }
  }

  function resumo() {
    const linhas = QUIZ_QUESTIONS.map((q) => {
      const opt = q.options.find((o) => o.value === answers[q.id]);
      return `• ${q.title} ${opt?.label ?? "—"}`;
    }).join("\n");
    const origem = campaignSource();
    return [
      "Olá! Respondi ao questionário sobre auxílio-acidente no site.",
      "",
      `Nome: ${contact['nome']}`,
      `Telefone: ${contact['telefone']}`,
      contact['email'] ? `E-mail: ${contact['email']}` : "",
      `Cidade/UF: ${contact['cidade']}/${contact['estado']}`,
      contact['descricao'] ? `Resumo: ${contact['descricao']}` : "",
      "",
      "Respostas:",
      linhas,
      origem ? `\nOrigem: ${origem}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }

  function validar() {
    const e: Record<string, string> = {};
    if (contact['nome'].trim().length < 2) e['nome'] = "Informe seu nome.";
    if (contact['telefone'].replace(/\D/g, "").length < 10)
      e['telefone'] = "Informe um telefone com DDD.";
    if (!contact['cidade'].trim()) e['cidade'] = "Informe sua cidade.";
    if (!contact['estado'].trim()) e['estado'] = "Informe o estado.";
    if (!contact['aceite']) e['aceite'] = "É necessário aceitar a Política de Privacidade.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function enviar(destino: "whatsapp" | "email") {
    if (!validar()) return;
    const texto = resumo();
    track("form_submit", { destino, resultado: outcome });
    if (destino === "whatsapp") {
      track("whatsapp_click", { origem: "questionario" });
      window.open(whatsappUrl(texto), "_blank", "noopener,noreferrer");
    } else {
      track("email_click", { origem: "questionario" });
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
        "Contato pelo site — auxílio-acidente",
      )}&body=${encodeURIComponent(texto)}`;
    }
    setPhase("enviado");
  }

  if (phase === "enviado") {
    return (
      <div className="rounded-xl border border-border bg-card p-6 md:p-10">
        <div className="inline-flex size-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Check className="size-6" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-2xl">Informações enviadas</h3>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          O recebimento do contato não significa aprovação do benefício nem garantia de retorno
          imediato. O escritório fará a análise individualizada e poderá solicitar informações
          complementares.
        </p>
      </div>
    );
  }

  if (phase === "resultado") {
    const texto = OUTCOME_TEXT[outcome];
    return (
      <div className="rounded-xl border border-border bg-card p-6 md:p-10">
        <p className="eyebrow">Resultado preliminar</p>
        <h3 className="mt-3 text-2xl md:text-3xl">{texto.title}</h3>
        <p className="mt-4 max-w-2xl text-muted-foreground">{texto.body}</p>

        <div className="mt-8 rule-brand" />

        <form
          className="mt-8 grid gap-5 md:grid-cols-2"
          onSubmit={(ev) => {
            ev.preventDefault();
            enviar("whatsapp");
          }}
        >
          <div>
            <label htmlFor="nome" className="mb-2 block font-display text-sm font-medium">
              Nome
            </label>
            <input
              id="nome"
              className={inputClass}
              value={contact['nome']}
              autoComplete="name"
              onChange={(e) => setContact({ ...contact, nome: e.target.value })}
            />
            {errors['nome'] ? <p className="mt-1 text-sm text-destructive">{errors['nome']}</p> : null}
          </div>

          <div>
            <label htmlFor="telefone" className="mb-2 block font-display text-sm font-medium">
              Telefone com WhatsApp
            </label>
            <input
              id="telefone"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(11) 90000-0000"
              className={inputClass}
              value={contact['telefone']}
              onChange={(e) => setContact({ ...contact, telefone: e.target.value })}
            />
            {errors['telefone'] ? (
              <p className="mt-1 text-sm text-destructive">{errors['telefone']}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block font-display text-sm font-medium">
              E-mail (opcional)
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className={inputClass}
              value={contact['email']}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-[1fr_5rem] gap-3">
            <div>
              <label htmlFor="cidade" className="mb-2 block font-display text-sm font-medium">
                Cidade
              </label>
              <input
                id="cidade"
                className={inputClass}
                value={contact['cidade']}
                onChange={(e) => setContact({ ...contact, cidade: e.target.value })}
              />
              {errors['cidade'] ? (
                <p className="mt-1 text-sm text-destructive">{errors['cidade']}</p>
              ) : null}
            </div>
            <div>
              <label htmlFor="estado" className="mb-2 block font-display text-sm font-medium">
                UF
              </label>
              <input
                id="estado"
                maxLength={2}
                className={inputClass}
                value={contact['estado']}
                onChange={(e) => setContact({ ...contact, estado: e.target.value.toUpperCase() })}
              />
              {errors['estado'] ? (
                <p className="mt-1 text-sm text-destructive">{errors['estado']}</p>
              ) : null}
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="descricao" className="mb-2 block font-display text-sm font-medium">
              Breve descrição da situação (opcional)
            </label>
            <textarea
              id="descricao"
              rows={3}
              className={inputClass}
              placeholder="Descreva de forma resumida. Não é necessário incluir detalhes médicos."
              value={contact['descricao']}
              onChange={(e) => setContact({ ...contact, descricao: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-start gap-3 text-sm text-muted-foreground">
              <input
                type="checkbox"
                className="mt-1 size-5 accent-[oklch(0.62_0.24_349)]"
                checked={contact['aceite']}
                onChange={(e) => setContact({ ...contact, aceite: e.target.checked })}
              />
              <span>
                Li e aceito a{" "}
                <a
                  href="#privacidade"
                  onClick={() => track("privacy_view")}
                  className="text-primary underline underline-offset-4"
                >
                  Política de Privacidade
                </a>{" "}
                e estou ciente de que o envio destas informações não constitui contratação,
                consulta jurídica nem garantia de direito.
              </span>
            </label>
            {errors['aceite'] ? (
              <p className="mt-1 text-sm text-destructive">{errors['aceite']}</p>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 font-display text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Falar com o escritório
            </button>
            <button
              type="button"
              onClick={() => enviar("email")}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-4 font-display text-base font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="size-5" aria-hidden="true" />
              Enviar informações por e-mail
            </button>
          </div>

          <p className="flex items-start gap-2 text-sm text-muted-foreground md:col-span-2">
            <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            Coletamos apenas o necessário para o primeiro contato. Evite enviar dados médicos
            detalhados por este canal.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6 md:p-10">
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow">
          Pergunta {step + 1} de {total}
        </p>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Voltar
          </button>
        ) : null}
      </div>

      <div
        className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary"
        role="progressbar"
        aria-valuenow={step + 1}
        aria-valuemin={1}
        aria-valuemax={total}
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-300"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <h3 className="mt-7 text-2xl md:text-3xl">{question.title}</h3>
      {question.help ? <p className="mt-2 text-muted-foreground">{question.help}</p> : null}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {question.options.map((opt) => {
          const selected = answers[question.id] === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => choose(opt.value)}
              className={`rounded-lg border px-5 py-4 text-left font-display text-base transition-colors ${
                selected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-surface text-surface-foreground hover:border-primary"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
