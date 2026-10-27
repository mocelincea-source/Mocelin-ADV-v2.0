import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  CheckCircle2,
  Mail,
  MessageCircle,
  Minus,
  Plus,
  ScrollText,
  ShieldCheck,
  Wallet,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import bgContato from "@/assets/auxilio/bg-contato.jpg";
import bgSequelas from "@/assets/auxilio/bg-sequelas.jpg";
import bgTexture from "@/assets/auxilio/bg-texture.jpg";
import heroImage from "@/assets/auxilio/hero-worker.jpg";
import logo from "@/assets/auxilio/logo-mocelin.svg";
import { Header } from "@/components/auxilio/AuxilioHeader";
import { HeroQuiz } from "@/components/auxilio/AuxilioHeroQuiz";
import { Quiz } from "@/components/auxilio/AuxilioQuiz";
import { track } from "@/components/auxilio/auxilioTrack";
import {
  CONTACT_EMAIL,
  DEFAULT_WHATSAPP_MESSAGE,
  FAQ_ITEMS,
  LAST_UPDATE,
  whatsappUrl,
} from "@/lib/auxilio-content";

const TITLE = "Auxílio-acidente do INSS: quem tem direito | Mocelin Advogadas";
const DESCRIPTION =
  "Ficou com sequela após um acidente? Entenda em poucos minutos o auxílio-acidente do INSS: requisitos, valores e dúvidas frequentes. Questionário inicial gratuito.";

export const Route = createFileRoute("/auxilio-acidente")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function SectionTitle({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-3xl leading-tight md:text-[2.5rem]">{children}</h2>
    </div>
  );
}

function CtaQuiz({ origem, label = "Responder ao questionário gratuito" }: { origem: string; label?: string }) {
  return (
    <a
      href="#questionario"
      onClick={() => track("cta_questionario_click", { origem })}
      className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 font-display text-lg font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
    >
      {label}
    </a>
  );
}

function CtaWhatsApp({ origem }: { origem: string }) {
  return (
    <a
      href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origem })}
      className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-primary px-8 py-4 font-display text-lg font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      Falar no WhatsApp
    </a>
  );
}

function Index() {
  return (
    <div id="topo" className="auxilio-scope min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Garantias />
        <Beneficio />
        <Requisitos />
        <Sequelas />
        <Valores />
        <Questionario />
        <ComoFunciona />
        <Duvidas />
        <Contato />
      </main>
      <Rodape />
    </div>
  );
}

const HERO_BULLETS = [
  "Pago todo mês",
  "Vale para acidente de trabalho, típico ou de trajeto",
  "Não é preciso parar de trabalhar",
];

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroImage}
        alt="Trabalhador com a mão enfaixada apoiado em uma bengala"
        width={1536}
        height={1024}
        className="absolute inset-0 size-full object-cover object-right"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/92 to-background/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
      <div className="grid-lines absolute inset-0" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div>
          <p className="eyebrow">Direito previdenciário · Conteúdo informativo</p>
          <h1 className="mt-5 text-4xl leading-[1.05] md:text-[3.5rem]">
            Sofreu um acidente e <span className="text-primary">ficou com uma sequela?</span>
          </h1>
          <p className="mt-6 max-w-xl text-xl leading-relaxed text-muted-foreground">
            O auxílio-acidente do INSS é uma indenização mensal para quem ficou com uma limitação
            permanente e passou a trabalhar com mais dificuldade. Descubra em 1 minuto se faz
            sentido analisar o seu caso.
          </p>

          <ul className="mt-8 grid gap-3">
            {HERO_BULLETS.map((b) => (
              <li key={b} className="flex items-center gap-3 text-lg">
                <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="analise" className="section-light overflow-hidden rounded-2xl shadow-elev">
          <div className="rounded-t-2xl bg-primary px-6 py-4 text-center">
            <p className="font-display text-lg font-semibold text-primary-foreground">
              Responda 3 perguntas e entenda o seu caso
            </p>
          </div>
          <HeroQuiz />
        </div>
      </div>
    </section>
  );
}

const GARANTIAS = [
  { i: ShieldCheck, t: "Primeira orientação sem custo", d: "O contato inicial serve para entender a situação e explicar os caminhos." },
  { i: Wallet, t: "Pedido no INSS é gratuito", d: "O requerimento administrativo não tem taxa cobrada pelo órgão." },
  { i: MessageCircle, t: "Atendimento à distância", d: "Todo o primeiro contato pode ser feito por WhatsApp ou e-mail." },
];

function Garantias() {
  return (
    <section className="border-y border-border bg-surface py-8">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3">
        {GARANTIAS.map((g) => (
          <div key={g.t} className="flex gap-4">
            <g.i className="mt-1 size-6 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <h3 className="text-lg">{g.t}</h3>
              <p className="mt-1 text-base text-muted-foreground">{g.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const PILARES = [
  {
    t: "Soma-se ao salário",
    d: "Não substitui a renda. Por ser indenizatório, pode ser recebido enquanto você continua trabalhando.",
  },
  {
    t: "Não exige afastamento",
    d: "Não é preciso estar parado. O que se analisa é a sequela que permaneceu depois do acidente.",
  },
  {
    t: "O que conta é a sequela",
    d: "Um acidente pequeno pode gerar direito; um grande, sem sequela, não. A limitação é o que importa.",
  },
];

function Beneficio() {
  return (
    <section id="beneficio" className="section-light section-pad">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="O que é">
          Não é aposentadoria nem auxílio-doença: é uma indenização mensal
        </SectionTitle>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-muted-foreground">
          Muita gente que se enquadra nunca pediu — porque ninguém explicou. A existência do
          direito depende da análise do acidente, do vínculo, da sequela e dos documentos.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PILARES.map((p) => (
            <div key={p.t} className="card-elev p-6 md:p-8">
              <h3 className="text-xl">{p.t}</h3>
              <p className="mt-3 text-lg text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <CtaQuiz origem="secao_beneficio" />
        </div>
      </div>
    </section>
  );
}

const REQUISITOS = [
  {
    n: "01",
    t: "Houve um acidente",
    d: "Com nexo de causalidade ao trabalho — durante ou em razão da atividade laboral.",
  },
  {
    n: "02",
    t: "Ficou uma sequela permanente",
    d: "Força que diminuiu, movimento que travou, audição ou visão reduzida.",
  },
  {
    n: "03",
    t: "Você era segurado do INSS",
    d: "Na data do acidente: empregado urbano ou rural, doméstico, trabalhador avulso ou segurado especial.",
  },
];

function Requisitos() {
  return (
    <section id="enquadramento" className="relative overflow-hidden section-pad">
      <img
        src={bgTexture}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1536}
        height={1024}
        className="bg-fade-dark absolute inset-0 size-full object-cover opacity-70"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Quem pode ter direito">
          Três pontos precisam estar presentes ao mesmo tempo
        </SectionTitle>
        <p className="mt-5 max-w-3xl text-xl text-muted-foreground">
          Se os três aparecem no seu caso, há motivo para uma análise individualizada. Quem decide
          a concessão é o INSS.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {REQUISITOS.map((r) => (
            <div key={r.n} className="border-t-2 border-primary/50 pt-6">
              <span className="font-display text-4xl font-bold text-primary/60">{r.n}</span>
              <h3 className="mt-3 text-xl">{r.t}</h3>
              <p className="mt-3 text-lg text-muted-foreground">{r.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <CtaQuiz origem="secao_enquadramento" />
          <CtaWhatsApp origem="secao_enquadramento" />
        </div>
      </div>
    </section>
  );
}

const SEQUELAS = [
  "Fratura que consolidou torta ou com pino",
  "Ombro, joelho ou punho que perdeu movimento",
  "Amputação de dedo, mão ou pé",
  "Perda parcial de audição ou de visão",
  "Sequela neurológica pós-traumática",
];

const NAO_CABE = [
  "Nenhum vínculo com o INSS na data do acidente",
  "A lesão sarou por completo, sem limitação",
  "Contribuinte individual (MEI, autônomo) e facultativo",
  "A pessoa já estava aposentada na data do acidente",
];

function Sequelas() {
  return (
    <section className="section-light relative overflow-hidden section-pad">
      <img
        src={bgSequelas}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1536}
        height={1024}
        className="absolute right-0 top-0 hidden h-full w-1/2 object-cover opacity-20 [mask-image:linear-gradient(to_left,black,transparent)] lg:block"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Situações">
          Sequelas que costumam ser analisadas — e o que, em regra, não cabe
        </SectionTitle>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="card-elev p-6 md:p-8">
            <h3 className="text-xl">Exemplos que costumam ser analisados</h3>
            <ul className="mt-5 grid gap-3">
              {SEQUELAS.map((s) => (
                <li key={s} className="flex gap-3 text-lg text-muted-foreground">
                  <CheckCircle2 className="mt-1.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card-elev p-6 md:p-8">
            <div className="flex items-center gap-3">
              <AlertTriangle className="size-5 text-primary" aria-hidden="true" />
              <h3 className="text-xl">Quando, em regra, não cabe</h3>
            </div>
            <ul className="mt-5 grid gap-3">
              {NAO_CABE.map((s) => (
                <li key={s} className="flex gap-3 text-lg text-muted-foreground">
                  <XCircle className="mt-1.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-base text-muted-foreground">
              Se o seu caso estiver nessa lista, você será avisado na análise — e, havendo outro
              caminho possível, ele será apontado.
            </p>
          </div>
        </div>

        <div className="mt-10">
          <CtaQuiz origem="secao_situacoes" />
        </div>
      </div>
    </section>
  );
}

const NUMEROS = [
  { n: "50%", d: "do salário de benefício, conforme a lei" },
  { n: "12x", d: "por ano, somado à renda que você já recebe" },
  { n: "5 anos", d: "limite geral para valores anteriores ao pedido" },
  { n: "0", d: "dias de afastamento exigidos" },
];

function Valores() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Quanto e até quando">
          Um valor mensal somado à renda — e o que pode ter ficado para trás
        </SectionTitle>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {NUMEROS.map((x) => (
            <div key={x.n} className="card-elev p-6">
              <p className="font-display text-4xl font-bold text-primary">{x.n}</p>
              <p className="mt-3 text-lg text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-base text-muted-foreground">
          Os percentuais decorrem da legislação previdenciária e não representam promessa de valor
          ou de resultado. O valor exato depende do histórico de contribuições.
        </p>

        <div className="mt-8">
          <CtaWhatsApp origem="secao_valores" />
        </div>
      </div>
    </section>
  );
}

function Questionario() {
  return (
    <section id="questionario" className="section-light section-pad">
      <div className="mx-auto max-w-4xl px-5">
        <SectionTitle eyebrow="Questionário">
          Responda algumas perguntas sobre a sua situação
        </SectionTitle>
        <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
          Perguntas curtas e gratuitas. O questionário organiza informações iniciais e não confirma
          direito ao benefício.
        </p>
        <div className="mt-9">
          <Quiz />
        </div>
      </div>
    </section>
  );
}

const PASSOS = [
  { t: "Você responde às perguntas", d: "Leva menos de um minuto e já organiza as informações do seu caso." },
  { t: "O escritório analisa", d: "A equipe verifica os dados e o histórico de vínculos e pode pedir complementos." },
  { t: "Reunimos os documentos", d: "Você recebe a orientação sobre laudos, exames, CAT e documentos do INSS." },
  { t: "Pedido e acompanhamento", d: "Havendo contratação, o requerimento é apresentado e você acompanha as movimentações." },
];

function ComoFunciona() {
  return (
    <section className="relative overflow-hidden section-pad">
      <img
        src={bgTexture}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1536}
        height={1024}
        className="bg-fade-dark absolute inset-0 size-full object-cover opacity-60"
      />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionTitle eyebrow="Como funciona">Do primeiro contato ao pedido protocolado</SectionTitle>
        <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
          Você não precisa entender de INSS. Precisa apenas contar o que aconteceu.
        </p>
        <ol className="mt-10 grid gap-6 md:grid-cols-4">
          {PASSOS.map((p, i) => (
            <li key={p.t} className="border-t-2 border-primary/40 pt-5">
              <span className="font-display text-4xl font-bold text-primary/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-xl">{p.t}</h3>
              <p className="mt-2 text-lg text-muted-foreground">{p.d}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10">
          <CtaWhatsApp origem="secao_como_funciona" />
        </div>
      </div>
    </section>
  );
}

function Duvidas() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="duvidas" className="section-light section-pad">
      <div className="mx-auto max-w-4xl px-5">
        <SectionTitle eyebrow="Dúvidas">O que as pessoas mais perguntam</SectionTitle>
        <div className="mt-9 grid gap-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="rounded-xl border border-border bg-card px-5">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-5 py-5 text-left"
                >
                  <span className="font-display text-lg font-semibold md:text-xl">{item.q}</span>
                  {isOpen ? (
                    <Minus className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  ) : (
                    <Plus className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  )}
                </button>
                {isOpen ? (
                  <p className="pb-6 text-lg leading-relaxed text-muted-foreground">{item.a}</p>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="mt-10">
          <CtaQuiz origem="secao_duvidas" />
        </div>
      </div>
    </section>
  );
}

function Contato() {
  return (
    <section id="contato" className="relative overflow-hidden section-pad">
      <img
        src={bgContato}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1536}
        height={1024}
        className="bg-fade-dark absolute inset-0 size-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
      <div className="relative mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Contato</p>
            <h2 className="mt-3 text-3xl md:text-4xl">Fale com o Mocelin Advogadas</h2>
            <p className="mt-4 text-xl text-muted-foreground">
              O contato inicial serve para compreender a situação e orientar os próximos passos,
              sem constituir contratação ou garantia de resultado.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { origem: "secao_contato" })}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 font-display text-lg font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Falar pelo WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              onClick={() => track("email_click", { origem: "secao_contato" })}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border px-6 py-4 font-display text-lg font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              <Mail className="size-5" aria-hidden="true" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Rodape() {
  return (
    <footer id="privacidade" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <img src={logo} alt="Mocelin Advogadas" className="h-10 w-auto" />
            <p className="mt-5 text-base text-muted-foreground">
              Mocelin Advogadas — escritório de advocacia.
              <br />
              E-mail: {CONTACT_EMAIL}
            </p>
          </div>

          <div className="space-y-4 text-base text-muted-foreground">
            <div className="flex gap-3">
              <ScrollText className="mt-1 size-4 shrink-0 text-primary" aria-hidden="true" />
              <p>
                <strong className="text-foreground">Aviso.</strong> O conteúdo desta página tem
                caráter meramente informativo, em conformidade com o Código de Ética e Disciplina
                da OAB e o Provimento nº 205/2021. Não há oferta de serviços, promessa de resultado
                ou captação de clientela.
              </p>
            </div>
            <p>
              O preenchimento do questionário e o envio de dados não constituem contratação,
              consulta jurídica nem garantia de direito ao benefício.
            </p>
            <p>
              <strong className="text-foreground">Privacidade.</strong> Os dados informados são
              utilizados exclusivamente para o contato inicial e a análise preliminar do caso. Para
              acesso, correção ou exclusão dos seus dados, escreva para {CONTACT_EMAIL}.
            </p>
            <p>Conteúdo atualizado em {LAST_UPDATE}.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
