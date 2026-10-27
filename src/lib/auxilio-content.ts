export const WHATSAPP_NUMBER = "5527997648605";
export const CONTACT_EMAIL = "ma.acidentarios@gmail.com";
export const LAST_UPDATE = "setembro de 2026";

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá! Vim da página sobre auxílio-acidente e gostaria de mais informações.";

export type QuizOption = { value: string; label: string };

export type QuizQuestion = {
  id: string;
  title: string;
  help?: string;
  options: QuizOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "acidente",
    title: "Você sofreu algum acidente?",
    options: [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "Não" },
      { value: "nao_sei", label: "Não sei informar" },
    ],
  },
  {
    id: "natureza",
    title: "O acidente ocorreu durante ou em razão do trabalho?",
    help: "O auxílio-acidente não se limita a acidentes de trabalho.",
    options: [
      { value: "trabalho", label: "Durante ou em razão do trabalho" },
      { value: "fora", label: "Fora do trabalho" },
      { value: "nao_sei", label: "Não sei informar" },
    ],
  },
  {
    id: "vinculo",
    title: "Na época do acidente, qual era a sua condição?",
    options: [
      { value: "empregado", label: "Empregado" },
      { value: "domestico", label: "Empregado doméstico" },
      { value: "avulso", label: "Trabalhador avulso" },
      { value: "rural", label: "Trabalhador rural / segurado especial" },
      { value: "individual", label: "Contribuinte individual" },
      { value: "facultativo", label: "Facultativo" },
      { value: "outro", label: "Outro / não me enquadro nessas opções" },
      { value: "nao_sei", label: "Não sei informar" },
    ],
  },
  {
    id: "sequela",
    title: "Após o acidente, ficou alguma sequela ou limitação permanente?",
    options: [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "Não" },
      { value: "ainda_nao_sei", label: "Ainda não sei" },
      { value: "avaliacao", label: "Estou em avaliação" },
    ],
  },
  {
    id: "capacidade",
    title: "Essa sequela dificulta ou reduziu sua capacidade para o trabalho habitual?",
    options: [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "Não" },
      { value: "nao_sei", label: "Não sei informar" },
    ],
  },
  {
    id: "pericia",
    title: "Você recebeu auxílio por incapacidade temporária ou passou por perícia?",
    options: [
      { value: "sim", label: "Sim" },
      { value: "nao", label: "Não" },
      { value: "nao_sei", label: "Não sei informar" },
    ],
  },
  {
    id: "documentos",
    title: "Você possui documentos médicos, laudos, exames, CAT ou documentos do INSS?",
    options: [
      { value: "sim", label: "Sim" },
      { value: "alguns", label: "Alguns" },
      { value: "nao", label: "Não" },
      { value: "nao_sei", label: "Não sei informar" },
    ],
  },
  {
    id: "preferencia",
    title: "Como prefere continuar?",
    options: [
      { value: "whatsapp", label: "WhatsApp" },
      { value: "email", label: "E-mail" },
      { value: "informacoes", label: "Ainda quero apenas informações" },
    ],
  },
];

export type Outcome = "analise" | "insuficiente" | "atencao";

export const OUTCOME_TEXT: Record<Outcome, { title: string; body: string }> = {
  analise: {
    title: "Há elementos que podem justificar uma análise individualizada",
    body: "Pelas respostas fornecidas, há informações que podem justificar uma análise individualizada. Isso não confirma a existência do direito ao benefício. Envie seus dados de contato para que o escritório possa orientar os próximos passos.",
  },
  insuficiente: {
    title: "As informações ainda não permitem uma conclusão inicial",
    body: "As respostas não permitem uma conclusão inicial. Se desejar, você pode enviar seus dados e explicar brevemente a situação para uma análise individualizada.",
  },
  atencao: {
    title: "Existe um ponto de atenção quanto ao enquadramento",
    body: "Pelas informações fornecidas, pode haver um ponto de atenção quanto ao enquadramento. O questionário não substitui a análise jurídica. Se ainda tiver dúvidas, você pode enviar uma breve descrição do caso.",
  },
};

export function evaluate(answers: Record<string, string>): Outcome {
  const semAcidente = answers['acidente'] === "nao";
  const vinculoFora = answers['vinculo'] === "individual" || answers['vinculo'] === "facultativo";
  const semSequela = answers['sequela'] === "nao";

  if (semAcidente || vinculoFora || semSequela) return "atencao";

  const temSequela = answers['sequela'] === "sim";
  const reduzCapacidade = answers['capacidade'] === "sim";
  const vinculoCompativel = ["empregado", "domestico", "avulso", "rural"].includes(
    answers['vinculo'] ?? "",
  );

  if (answers['acidente'] === "sim" && temSequela && (reduzCapacidade || vinculoCompativel)) {
    return "analise";
  }

  return "insuficiente";
}

export const FAQ_ITEMS = [
  {
    q: "Preciso parar de trabalhar para receber o auxílio-acidente?",
    a: "Não. O benefício tem natureza indenizatória e não exige afastamento do trabalho. Cada situação depende de análise individual.",
  },
  {
    q: "O acidente precisa ter acontecido no trabalho?",
    a: "Sim. É necessário que o acidente tenha nexo de causalidade com o trabalho. Não basta ter sofrido um acidente qualquer: é preciso que ele esteja relacionado ao trabalho e tenha gerado uma sequela que reduziu a capacidade laborativa.",
  },
  {
    q: "Meu acidente foi há muitos anos. Ainda posso buscar orientação?",
    a: "Sim. Como regra geral, valores anteriores ao pedido podem ser alcançados no limite de cinco anos, conforme a legislação previdenciária. O caso concreto precisa ser examinado.",
  },
  {
    q: "Vou precisar passar por perícia médica?",
    a: "Em regra, o INSS avalia a sequela por perícia. O escritório pode orientar sobre a documentação médica relevante, sem promessa de resultado.",
  },
  {
    q: "Preciso ter contribuído por um período mínimo?",
    a: "Não há exigência de carência para esse benefício. Ainda assim, é preciso analisar a qualidade de segurado na época do acidente.",
  },
  {
    q: "Quem é contribuinte individual (MEI ou autônomo) pode receber?",
    a: "Contribuinte individual e facultativo não têm direito a esse benefício nessa modalidade. O vínculo na época do acidente é sempre analisado.",
  },
  {
    q: "Quanto custa dar entrada no pedido?",
    a: "O requerimento administrativo no INSS é gratuito. Eventuais honorários advocatícios são apresentados por escrito e explicados antes de qualquer contratação, conforme as normas da OAB.",
  },
  {
    q: "O INSS já negou meu pedido. Ainda há o que fazer?",
    a: "Uma negativa administrativa não encerra necessariamente a discussão. Os caminhos possíveis dependem do motivo da negativa e da documentação do caso.",
  },
  {
    q: "O questionário confirma se eu tenho direito?",
    a: "Não. Ele apenas organiza informações preliminares para o primeiro contato. Não é análise jurídica nem diagnóstico.",
  },
  {
    q: "Como meus dados serão tratados?",
    a: `Os dados são usados exclusivamente para o contato inicial e a análise preliminar, conforme a Política de Privacidade. Dúvidas: ${CONTACT_EMAIL}.`,
  },
];

