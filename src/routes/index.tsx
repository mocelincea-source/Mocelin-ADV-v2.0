import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import area1 from "@/assets/lp/rectangle-9-10.jpg";
import area2 from "@/assets/lp/rectangle-9-11.jpg";
import area3 from "@/assets/lp/rectangle-9-12.jpg";
import triangle from "@/assets/lp/vector-2.svg";
import hero1 from "@/assets/lp/rectangle-7.jpg";
import hero2 from "@/assets/lp/rectangle-8.jpg";
import hero3 from "@/assets/lp/rectangle-9-13.jpg";
import arrowDown from "@/assets/lp/vector-3.svg";
import aboutImg from "@/assets/lp/rectangle-8-2.jpg";
import iconEff from "@/assets/lp/vector-4.svg";
import iconInov from "@/assets/lp/vector-5.svg";
import adidas from "@/assets/lp/25-1.png";
import assai from "@/assets/lp/vector-6.svg";
import patria from "@/assets/lp/15-2-1.svg";
import arrowLeft from "@/assets/lp/vector-7.svg";
import arrowRight from "@/assets/lp/vector-8.svg";
import officePhoto from "@/assets/lp/rectangle-11.jpg";
import logoOverlay from "@/assets/lp/logomocelinadvbrancov2-1.png";
import logoNav from "@/assets/lp/logomocelinadvbrancov2-2.png";
import whatsapp from "@/assets/lp/xmlid468.png";
import mail1 from "@/assets/lp/group.png";
import phone from "@/assets/lp/chamada-telefonica-1.png";
import mail2 from "@/assets/lp/group-2.png";
import instagram from "@/assets/lp/instagram-2-1.png";
import linkedin from "@/assets/lp/vector-11.svg";
import footerLogo from "@/assets/lp/group-46.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mocelin Advogadas — Direito Empresarial e Governança" },
      { name: "description", content: "Escritório boutique com soluções jurídicas personalizadas e estratégicas em Direito Empresarial, Governança e Sustentabilidade Corporativa." },
      { property: "og:title", content: "Mocelin Advogadas — Enxergando o futuro para planejar o hoje" },
      { property: "og:description", content: "Atuação estratégica e moderna com soluções jurídicas personalizadas para quem busca resultados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["Home", "#home"], ["Sobre nós", "#sobre"], ["Nossos serviços", "#servicos"], ["Contato", "#contato"],
] as const;

const container = "mx-auto w-full max-w-[1206px] px-6 sm:px-10 xl:px-0";
const hTitle = "font-semibold tracking-[-0.02em] leading-[1.12]";
const linkUnderline =
  "relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-pink after:transition-transform after:duration-500 hover:after:scale-x-100";

function Index() {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-x-clip bg-navy text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-pink/20 bg-navy/80 backdrop-blur-xl">
        <div className={`${container} flex h-20 items-center justify-between`}>
          <Link to="/" className="shrink-0 cursor-pointer transition-opacity hover:opacity-80">
            <img src={logoNav} alt="Mocelin Advogadas" className="h-11 w-auto" />
          </Link>
          <nav className="hidden items-center gap-12 md:flex">
            {nav.map(([l, h], i) => (
              <a key={l} href={h} className={`text-base font-medium transition-colors duration-300 hover:text-pink ${i === 0 ? "text-pink" : ""} ${linkUnderline}`}>
                {l}
              </a>
            ))}
          </nav>
          <button aria-label="Menu" onClick={() => setOpen(!open)} className="p-2 text-pink md:hidden">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <nav className="flex flex-col gap-1 border-t border-pink/20 px-6 py-4 md:hidden">
            {nav.map(([l, h]) => (
              <a key={l} href={h} onClick={() => setOpen(false)} className="py-3 text-lg font-medium transition-colors hover:text-pink">
                {l}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative">
        <img src={triangle} alt="" aria-hidden className="pointer-events-none absolute -top-10 right-[-30%] w-[620px] opacity-60 animate-float lg:right-[-8%] lg:w-[720px]" />
        <div className={`${container} relative grid items-center gap-14 py-16 lg:grid-cols-[1fr_1fr] lg:py-28`}>
          <div>
            <Reveal as="h1" className="text-[44px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-6xl xl:text-[71px]">
              <span className="text-pink">Enxergando<br />o futuro</span> para planejar o hoje!
            </Reveal>
            <div className="mt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between lg:pl-0">
              <img src={arrowDown} alt="" aria-hidden className="hidden h-14 w-11 animate-bob sm:block" />
              <Reveal delay={150} className="flex max-w-80 flex-col gap-8">
                <p className="text-base text-foreground/75">Atuação estratégica e moderna com soluções jurídicas personalizadas para quem busca resultados.</p>
                <a href="#contato" className="group inline-flex w-full max-w-[285px] items-center justify-center border border-pink px-7 py-3 text-lg font-extrabold text-pink transition-all duration-500 hover:-translate-y-0.5 hover:bg-pink hover:text-primary-foreground hover:shadow-soft">
                  Entre em contato
                </a>
              </Reveal>
            </div>
          </div>
          <div className="grid grid-cols-3 items-start gap-3 sm:gap-5">
            {[[hero1, "mt-10"], [hero2, ""], [hero3, "mt-16"]].map(([src, mt], i) => (
              <Reveal key={i} delay={200 + i * 140} className={mt as string}>
                <div className="group overflow-hidden shadow-deep">
                  <img src={src} alt="" className="aspect-[217/541] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className={container}><div className="h-px w-full bg-linear-to-r from-transparent via-pink/60 to-transparent" /></div>
      </section>

      {/* SOBRE */}
      <section id="sobre" className={`${container} grid items-center gap-12 py-20 lg:grid-cols-[563fr_497fr] lg:gap-[108px] lg:py-28`}>
        <Reveal className="group overflow-hidden shadow-deep">
          <img src={aboutImg} alt="Aperto de mãos" className="aspect-[563/541] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
        </Reveal>
        <div className="flex flex-col gap-6">
          <Reveal as="h2" className={`${hTitle} max-w-[432px] text-4xl sm:text-[44px]`}>Sobre a Mocelin Advogadas</Reveal>
          <Reveal delay={120} className="space-y-6 text-lg leading-relaxed text-foreground/90">
            <p>O Mocelin Advogadas é um escritório boutique que rompe com padrões tradicionais para oferecer <strong>soluções jurídicas personalizadas e estratégicas</strong> nas áreas empresarial, administrativa e contenciosa.</p>
            <p>Atuamos com foco na <strong>redução de perdas, agilidade e eficácia</strong>, sempre alinhadas aos objetivos dos nossos clientes e com uma visão holística do negócio, buscando as melhores soluções para cada desafio.</p>
          </Reveal>
          <Reveal delay={240} className="flex flex-wrap gap-2">
            {[[iconEff, "Eficiência no Direito"], [iconInov, "Inovação"]].map(([ic, t]) => (
              <span key={t} className="inline-flex items-center gap-2 border border-pink bg-pink px-5 py-1.5 text-base font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft">
                <img src={ic} alt="" className="h-5 w-5" /> {t}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ÁREAS */}
      <section className="bg-pink py-20 lg:py-28">
        <div className={container}>
          <div className="grid gap-8 lg:grid-cols-[584fr_522fr] lg:gap-[100px]">
            <Reveal as="h2" className={`${hTitle} text-5xl sm:text-6xl xl:text-[71px]`}>Áreas em que trabalhamos</Reveal>
            <Reveal delay={120} as="p" className="text-lg leading-relaxed sm:text-xl">Com especialização em Direito Empresarial e Governança Corporativa, o escritório se dedica a encontrar soluções eficazes e ágeis, priorizando a minimização de perdas e a obtenção de resultados positivos.</Reveal>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {[
              [area1, "Direito Empresarial", <>A Mocelin Advogadas oferece <strong>soluções abrangentes e consolidadas para questões empresariais,</strong> com uma abordagem holística focada na compreensão do negócio do cliente. Atua na resolução de conflitos e na estruturação jurídica de empresas.</>],
              [area2, "Sustentabilidade Corporativa", <>Também nos destacamos em questões de sustentabilidade corporativa. Isso envolve a assessoria às empresas na <strong>implementação de regras empresariais responsáveis</strong> e, claro, visionárias, levando em consideração fatores sociais, ambientais e éticos.</>],
              [area3, "Governança Corporativa", <>Atuação com governança corporativa, de modo a auxiliar as empresas a <strong>estabelecerem e manterem práticas de governança consolidadas,</strong> incluindo assessoria na implementação de políticas, diretrizes e procedimentos internos que alterem a organização.</>],
            ].map(([src, title, body], i) => (
              <Reveal key={i} delay={i * 140} className="group flex flex-col gap-6">
                <div className="overflow-hidden shadow-deep transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-30px_var(--navy)]">
                  <img src={src as string} alt="" className="aspect-square w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
                </div>
                <h3 className="text-3xl font-semibold leading-tight tracking-[-0.02em] text-navy lg:text-[40px]">{title}</h3>
                <p className="text-lg leading-relaxed">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="relative py-20 lg:py-32">
        <img src={triangle} alt="" aria-hidden className="pointer-events-none absolute bottom-0 right-[-40%] w-[620px] opacity-50 lg:right-[-12%] lg:w-[720px]" />
        <div className={`${container} relative`}>
          <Reveal as="h2" className={`${hTitle} text-5xl sm:text-6xl xl:text-[71px]`}>Nossos serviços</Reveal>
          <div className="mt-14 flex flex-col gap-5">
            <ServiceCard num="01" title="Project Management">
              <p>Da escolha e obtenção documental à definição e implementação da estratégia, com suas minúcias.</p>
              <p>Realizamos a gestão do Projeto como um todo, a fim de cobrir todas as frentes jurídicas, administrativas e regulatórias prévias e póstumas, realizando todo interface junto aos Escritórios, Parceiros, Empresa, Instituições e Órgãos envolvidos na operação.</p>
            </ServiceCard>
            <ServiceCard num="02" title="Post Merger" delay={120}>
              <p>O momento pós M&amp;A costuma ser desafiador por envolver stakeholders em processo de alinhamento de suas expertises e sinergias. Nosso intuito, portanto, é o de otimizar essa interação, cuidando da parte burocrática, enquanto a Companhia foca em seu NEGÓCIO.</p>
              <div>
                <p className="font-bold">Algumas das atividades desempenhadas:</p>
                <ul className="mt-2 list-disc space-y-1 pl-6 marker:text-pink">
                  <li>Elaboração de escopo integrado com as atividades chaves – entre os diferentes departamentos e processos envolvidos no projeto;</li>
                  <li>Gestão e Organização da informação, banco de dados, funcionários;</li>
                  <li>Abertura de Contas Bancárias, Atualizações de Procurações e Cartas de Fiança;</li>
                  <li>Registro e Processo na B3;</li>
                  <li>Análise de Crédito, Emissão de Debêntures; Atualização de Cadastros e Contratos;</li>
                  <li>Contratação de Parceiros, Funcionários e Seguros (Patrimoniais, D&amp;O, etc.)</li>
                </ul>
              </div>
            </ServiceCard>
          </div>
        </div>
      </section>

      {/* FOTO + CLIENTES */}
      <section className="relative">
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-pink" />
          <div className={`${container} relative`}>
            <div className="absolute inset-x-6 bottom-[15%] top-[20%] bg-wine sm:inset-x-10 xl:inset-x-0" />
            <Reveal className="group relative mx-auto max-w-[860px] overflow-hidden shadow-deep">
              <img src={officePhoto} alt="Advogada Mocelin" className="aspect-[860/550] w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
              <img src={logoOverlay} alt="Mocelin Advogadas" className="absolute left-1/2 top-1/2 w-28 -translate-x-1/2 -translate-y-1/2 sm:w-[171px]" />
            </Reveal>
          </div>
        </div>
        <div className="bg-pink pb-20 pt-14">
          <div className={`${container} grid items-center gap-10 lg:grid-cols-[386px_1fr]`}>
            <Reveal className="flex flex-col gap-6">
              <h2 className="text-4xl font-bold leading-[1.16] tracking-[-0.02em] sm:text-[44px]">Alguns clientes que atendemos</h2>
              <p className="max-w-[298px] text-lg">Clientes que confiam seus processos na Mocelin:</p>
            </Reveal>
            <Reveal delay={150} className="flex items-center justify-between gap-3">
              <img src={arrowLeft} alt="" aria-hidden className="h-10 w-8 shrink-0 cursor-pointer transition-transform hover:-translate-x-1 sm:h-14 sm:w-11" />
              <div className="flex flex-1 items-center justify-around gap-4">
                {[adidas, patria, assai].map((src, i) => (
                  <img key={i} src={src} alt="Cliente" className="h-14 w-auto max-w-[30%] object-contain opacity-90 transition-all duration-500 hover:scale-110 hover:opacity-100 sm:h-24 lg:h-28" />
                ))}
              </div>
              <img src={arrowRight} alt="" aria-hidden className="h-10 w-8 shrink-0 cursor-pointer transition-transform hover:translate-x-1 sm:h-14 sm:w-11" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className={`${container} pb-20 pt-20 lg:pt-28`}>
        <Reveal as="h2" className="text-5xl font-bold tracking-[-0.02em] sm:text-6xl xl:text-[70px]">Entre em contato</Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            [whatsapp, "(11) 94591-6886", "https://wa.me/5511945916886"],
            [mail1, "equipe@mocelinadvogadas.com", "mailto:equipe@mocelinadvogadas.com"],
            [phone, "(11) 99170-6274", "tel:+5511991706274"],
            [mail2, "larissa@mocelinadvogadas.com", "mailto:larissa@mocelinadvogadas.com"],
          ].map(([ic, t, href], i) => (
            <Reveal key={t} delay={i * 90}>
              <a href={href} className="group flex min-w-0 items-center justify-center gap-3 border border-pink px-4 py-4 text-base font-bold text-pink transition-all duration-500 hover:-translate-y-1 hover:bg-pink/10 hover:shadow-soft sm:text-2xl">
                <img src={ic} alt="" className="h-6 w-6 shrink-0 object-contain transition-transform duration-500 group-hover:scale-110" />
                <span className="truncate">{t}</span>
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-24">
          <img src={footerLogo} alt="Mocelin Advogadas" className="mx-auto w-full max-w-[1146px]" />
        </Reveal>
      </section>

      <footer className="bg-pink py-5">
        <a href="https://instagram.com/mocelinadvogadas" target="_blank" rel="noreferrer" className="group mx-auto flex w-fit items-center gap-3 text-xl font-bold text-navy sm:text-2xl">
          <img src={instagram} alt="Instagram" className="h-7 w-7 transition-transform group-hover:scale-110" />
          <img src={linkedin} alt="LinkedIn" className="h-[26px] w-[26px] transition-transform group-hover:scale-110" />
          <span className="transition-opacity group-hover:opacity-80">@mocelinadvogadas</span>
        </a>
      </footer>
    </div>
  );
}

function ServiceCard({ num, title, children, delay = 0 }: { num: string; title: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <article className="group relative overflow-hidden border border-pink/70 bg-navy/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-pink hover:shadow-soft sm:p-10">
        <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-pink/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <h3 className="relative text-4xl leading-none tracking-[-0.02em] text-pink sm:text-6xl xl:text-[70px]">
          <span className="font-light">{num} _ </span>
          <span className="font-bold">{title}</span>
        </h3>
        <div className="relative mt-8 space-y-6 text-base leading-relaxed sm:text-lg">{children}</div>
      </article>
    </Reveal>
  );
}
