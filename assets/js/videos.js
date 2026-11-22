/* ==========================================================
   DADOS DO SITE — edite SÓ este arquivo para adicionar vídeos e sites
   ----------------------------------------------------------
   VÍDEOS
   1. Coloque o .mp4 (vertical 9:16, até ~15 MB) em  assets/videos/
   2. (opcional) uma capa .jpg na mesma pasta
   3. Preencha "video" (e "capa") no item da lista VIDEOS

   SITES
   1. Coloque um print do site (16:10, .jpg) em  assets/sites/
   2. Preencha "imagem" e "link" no item da lista SITES

   Campo vazio ("") = aparece um card de exemplo no lugar.
   ========================================================== */

const WHATSAPP = "5562996821664";
const INSTAGRAM = "kayke.hs";

/* Abas do catálogo de vídeos (ordem = ordem no site) */
const SEGMENTOS = [
  { id: "escritorio",    nome: "Escritório" },
  { id: "advocacia",     nome: "Advocacia" },
  { id: "contabilidade", nome: "Contabilidade" },
  { id: "imoveis",       nome: "Corretor de Imóveis" },
  { id: "fitness",       nome: "Fitness" },
  { id: "servicos",      nome: "Serviços Gerais" },
];

/* Vídeos. Em "frase", o trecho entre <b></b> fica verde no card de exemplo */
const VIDEOS = [
  { segmento: "escritorio", titulo: "Apresentação da empresa", descricao: "Institucional curto para Reels e site", video: "", capa: "", frase: ["Sua empresa", "em <b>movimento.</b>"] },
  { segmento: "escritorio", titulo: "Anúncio de serviço", descricao: "Motion de oferta para tráfego pago", video: "", capa: "", frase: ["Aqui a gente", "faz <b>isso.</b>"] },

  { segmento: "advocacia", titulo: "Escritório de advocacia", descricao: "Autoridade e confiança em 15 segundos", video: "", capa: "", frase: ["Seu direito", "em <b>boas mãos.</b>"] },
  { segmento: "advocacia", titulo: "Área de atuação", descricao: "Explica um serviço jurídico de forma simples", video: "", capa: "", frase: ["Direito", "<b>trabalhista.</b>"] },

  { segmento: "contabilidade", titulo: "Abertura de empresa", descricao: "Motion para captar novos clientes", video: "", capa: "", frase: ["Abra sua", "empresa <b>hoje.</b>"] },
  { segmento: "contabilidade", titulo: "Imposto de renda", descricao: "Campanha sazonal com chamada no WhatsApp", video: "", capa: "", frase: ["Declare sem", "<b>dor de cabeça.</b>"] },

  { segmento: "imoveis", titulo: "Lançamento de imóvel", descricao: "Apresentação de imóvel com fotos e preço", video: "", capa: "", frase: ["Seu novo", "<b>endereço.</b>"] },
  { segmento: "imoveis", titulo: "Corretor pessoal", descricao: "Posicionamento do corretor nas redes", video: "", capa: "", frase: ["O corretor", "que <b>resolve.</b>"] },

  { segmento: "fitness", titulo: "Academia e studio", descricao: "Motion energético para matrículas", video: "", capa: "", frase: ["Comece", "<b>hoje.</b>"] },
  { segmento: "fitness", titulo: "Personal trainer", descricao: "Apresentação e chamada para avaliação", video: "", capa: "", frase: ["Resultado", "<b>de verdade.</b>"] },

  { segmento: "servicos", titulo: "Prestador de serviço", descricao: "Para clínicas, salões, oficinas e mais", video: "", capa: "", frase: ["Seu serviço", "<b>escolhido.</b>"] },
  { segmento: "servicos", titulo: "Promoção relâmpago", descricao: "Oferta com prazo e urgência", video: "", capa: "", frase: ["Só até", "<b>domingo.</b>"] },
];

/* Tipos de site (abas da página de sites) */
const TIPOS_SITE = [
  { id: "landing",       nome: "Landing page" },
  { id: "institucional", nome: "Site institucional" },
  { id: "portfolio",     nome: "Portfólio" },
];

/* Sites. "link" = endereço do site no ar (abre em nova aba) */
const SITES = [
  { tipo: "institucional", titulo: "Escritório de advocacia", descricao: "Site completo com áreas de atuação e contato", url: "advocacia.com.br", imagem: "", link: "" },
  { tipo: "landing",       titulo: "Contabilidade digital",   descricao: "Página de captação para abertura de empresa", url: "contabil.com.br", imagem: "", link: "" },
  { tipo: "landing",       titulo: "Lançamento imobiliário",  descricao: "Landing page com galeria e simulação", url: "residencial.com.br", imagem: "", link: "" },
  { tipo: "institucional", titulo: "Academia e studio",       descricao: "Planos, horários e matrícula pelo WhatsApp", url: "studiofit.com.br", imagem: "", link: "" },
  { tipo: "portfolio",     titulo: "Profissional liberal",    descricao: "Portfólio pessoal com trabalhos e depoimentos", url: "seunome.com.br", imagem: "", link: "" },
  { tipo: "institucional", titulo: "Prestador de serviços",   descricao: "Serviços, área de atendimento e orçamento", url: "servicos.com.br", imagem: "", link: "" },
];
