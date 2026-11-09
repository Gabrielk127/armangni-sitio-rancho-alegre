/**
 * Conteúdo do site em um só lugar: contatos, textos e imagens.
 * Tudo vem da apresentação "SITIO RANCHO ALEGRE.pdf" (fotos extraídas para
 * /public/images/sitio).
 */

const img = (file: string) => `/images/sitio/${file}`;

export const BRAND = {
  name: "Armangni Negócios Imobiliários",
  short: "Armangni",
  creci: "CRECI 8328",
  phone: "5543991708520",
  phoneFormatted: "(43) 99170-8520",
  email: "contato.armangni@gmail.com",
  social: {
    instagram: "https://www.instagram.com/armangni.imoveis/",
    facebook: "https://www.facebook.com/imoveisarmangni/?locale=pt_BR",
    youtube: "https://www.youtube.com/channel/UC9wtZuavR6-xkmxBVvbyr1g",
    linkedin: "https://www.linkedin.com/company/armangni-neg%C3%B3cios-imobili%C3%A1rios/",
  },
} as const;

export const PROPERTY = {
  name: "Sítio Rancho Alegre",
  conversionIdentifier: "sitio-rancho-alegre",
  city: "Porto Feliz — SP",
  access: "Acesso pelo km 97 da Rodovia Castelo Branco",
  mapsQuery: "Porto Feliz - SP",
  areaTotal: 40000,
  areaConstruida: 800,
} as const;


export function whatsappLink(message = "Olá! Vi o site do Sítio Rancho Alegre, em Porto Feliz, e quero mais informações.") {
  return `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(message)}`;
}

export const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Galeria", href: "#fotos" },
  { label: "Casa-sede", href: "#casa" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Terreno", href: "#terreno" },
  { label: "Contato", href: "#contato" },
] as const;

export const IMAGES = {
  aerea: img("aerea.jpg"),
  casaFachada: img("casa-fachada.jpg"),
  salaEstar: img("sala-estar.jpg"),
  queijaria: img("galpao-queijaria.jpg"),
  capril: img("capril-interior.jpg"),
  caprilFachada: img("capril-fachada.jpg"),
  caseiro: img("casa-caseiro.jpg"),
  pocoGalinheiro: img("poco-galinheiro.jpg"),
  pastagens: img("pastagens.jpg"),
  pastagensAerea: img("pastagens-aerea.jpg"),
  horta: img("horta.jpg"),
  horta2: img("horta-2.jpg"),
} as const;

/** Galeria da casa-sede (carrossel) */
export const HOUSE_GALLERY = [
  { name: "Sala de jantar", tag: "Casa-sede", img: img("sala-jantar.jpg") },
  { name: "Cozinha e área gourmet", tag: "Casa-sede", img: img("cozinha-gourmet.jpg") },
  { name: "Sala de estar", tag: "Casa-sede", img: img("sala-estar.jpg") },
  { name: "Dormitório casal", tag: "Casa-sede", img: img("dormitorio.jpg") },
  { name: "Fachada principal", tag: "Casa-sede", img: img("casa-fachada.jpg") },
  { name: "Sala de estar", tag: "Casa-sede", img: img("sala-estar-2.jpg") },
  { name: "Banheiros", tag: "Casa-sede", img: img("banheiro.jpg") },
] as const;

export const HOUSE_FEATURES = [
  "2 dormitórios, sendo 1 suíte",
  "Sala de estar",
  "Sala de jantar integrada à cozinha gourmet",
  "Banheiro social",
  "Lavanderia",
  "Acesso independente à internet",
] as const;

/** Edificações (soma = 800 m²) */
export const BUILDINGS = [
  {
    id: "casa",
    name: "Casa principal",
    area: 165,
    img: img("casa-fachada.jpg"),
    items: HOUSE_FEATURES,
  },
  {
    id: "queijaria",
    name: "Galpão — Queijaria",
    area: 250,
    img: img("galpao-queijaria.jpg"),
    items: [
      "Piso cerâmico e paredes revestidas com azulejos",
      "Instalações elétricas trifásicas",
      "Escritório, cozinha, expedição e depósitos",
      "2 banheiros",
      "Aquecimento solar de água",
      "Instalações elétricas e hidráulicas aparentes, facilitando a manutenção",
    ],
  },
  {
    id: "capril",
    name: "Galpão — Capril",
    area: 225,
    img: img("capril-interior.jpg"),
    items: ["Estrutura metálica", "Piso ripado de madeira", "Baias em alvenaria e madeira", "Utilizado para criação de cabras"],
  },
  {
    id: "caseiro",
    name: "Casa de caseiro",
    area: 90,
    img: img("casa-caseiro.jpg"),
    items: ["2 quartos", "Sala", "Cozinha", "Banheiro"],
  },
  {
    id: "celeiro",
    name: "Celeiro e apoio",
    area: 70,
    img: null, // a apresentação não tem foto do celeiro
    items: ["Construção em blocos de concreto", "Piso de concreto", "Quarto fechado para ferramentas", "Banheiro de serviço"],
  },
] as const;

export const INFRA = [
  { title: "Energia trifásica", detail: "Entrada de energia trifásica / 220 V" },
  { title: "Poço artesiano", detail: "120 m de profundidade, 5.000 litros/hora" },
  { title: "Redes enterradas", detail: "Rede elétrica e rede de água em toda a propriedade" },
  { title: "Fibra ótica", detail: "Internet via fibra ótica" },
  { title: "Portão automatizado", detail: "Entrada com portão automatizado" },
  { title: "Câmeras", detail: "Monitoramento por câmeras via internet" },
] as const;

export const TERRAIN = [
  "Horta cercada",
  "Galinheiro",
  "Pomar em formação",
  "Área para pastagem",
  "Córrego na divisa da propriedade",
  "Relevo levemente ondulado, com bom aproveitamento do terreno",
] as const;

/** Distâncias de Porto Feliz (apresentação do imóvel). */
export const DISTANCES = [
  { name: "Fazenda Boa Vista", km: 10 },
  { name: "Sorocaba", km: 24 },
  { name: "Campinas", km: 58 },
  { name: "Alphaville / Barueri", km: 67 },
] as const;

/** Galeria completa (todas as fotos da apresentação) */
export const PHOTOS = [
  { src: img("aerea.jpg"), alt: "Vista aérea da propriedade", cat: "Terreno" },
  { src: img("casa-fachada.jpg"), alt: "Fachada principal da casa-sede", cat: "Casa-sede" },
  { src: img("sala-jantar.jpg"), alt: "Sala de jantar", cat: "Casa-sede" },
  { src: img("cozinha-gourmet.jpg"), alt: "Cozinha e área gourmet", cat: "Casa-sede" },
  { src: img("galpao-queijaria.jpg"), alt: "Vista geral do galpão / queijaria", cat: "Estrutura" },
  { src: img("sala-estar.jpg"), alt: "Sala de estar", cat: "Casa-sede" },
  { src: img("pastagens.jpg"), alt: "Visão geral das pastagens", cat: "Terreno" },
  { src: img("capril-interior.jpg"), alt: "Interior do capril", cat: "Estrutura" },
  { src: img("dormitorio.jpg"), alt: "Dormitório casal", cat: "Casa-sede" },
  { src: img("horta.jpg"), alt: "Horta cercada", cat: "Terreno" },
  { src: img("capril-fachada.jpg"), alt: "Fachada do capril", cat: "Estrutura" },
  { src: img("sala-estar-2.jpg"), alt: "Sala de estar", cat: "Casa-sede" },
  { src: img("pastagens-aerea.jpg"), alt: "Vista aérea das pastagens", cat: "Terreno" },
  { src: img("casa-caseiro.jpg"), alt: "Fachada da casa de caseiro", cat: "Estrutura" },
  { src: img("banheiro.jpg"), alt: "Banheiro", cat: "Casa-sede" },
  { src: img("horta-2.jpg"), alt: "Horta cercada", cat: "Terreno" },
  { src: img("poco-galinheiro.jpg"), alt: "Poço artesiano, caixa d'água e galinheiro", cat: "Estrutura" },
] as const;
