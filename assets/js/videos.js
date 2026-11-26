/* ==========================================================
   PORTFÓLIO. Edite só este arquivo para adicionar vídeos.

   1. Coloque em assets/videos/ o .mp4 (vertical 9:16) e uma capa .jpg
   2. Coloque em assets/videos/previews/ um trecho curto sem som (opcional)
   3. Adicione o vídeo na lista VIDEOS

   A aba de um segmento só aparece quando ele tem pelo menos um vídeo.
   ========================================================== */

const WHATSAPP = "5562996821664";
const INSTAGRAM = "kayke.hs";

/* Abas, na ordem em que aparecem. A primeira é a que abre por padrão. */
const SEGMENTOS = [
  { id: "aplicativos", nome: "Aplicativos" },
  { id: "tecnologia", nome: "Tecnologia" },
  { id: "educacao",   nome: "Educação" },
  { id: "agencias",   nome: "Agências" },
  { id: "servicos",   nome: "Serviços Gerais" },
  { id: "comercio",   nome: "Comércio e Varejo" },
  { id: "imobiliario", nome: "Imobiliário" },
  { id: "fitness",    nome: "Fitness" },
];

const V = (arquivo) => ({
  video: `assets/videos/${arquivo}.mp4`,
  capa: `assets/videos/${arquivo}.jpg`,
  previa: `assets/videos/previews/${arquivo}.mp4`,
});

const VIDEOS = [
  { segmento: "servicos", cliente: "Juliano Pinturas", servico: "Pintura residencial e predial", ...V("servicos-pintura") },
  { segmento: "servicos", cliente: "WJ Empilhadeira", servico: "Manutenção de empilhadeiras", ...V("servicos-empilhadeira") },

  { segmento: "comercio", cliente: "Drogarias Medclass", servico: "Pedidos pelo WhatsApp", ...V("comercio-medclass") },

  { segmento: "imobiliario", cliente: "Allan Alves", servico: "Financiamento imobiliário", ...V("imobiliario-allan-alves") },

  { segmento: "aplicativos", cliente: "TOUT", servico: "Lançamento de aplicativo", ...V("app-tout") },

  { segmento: "tecnologia", cliente: "Kronic Host", servico: "Hospedagem VPS no Brasil", ...V("tecnologia-kronic-host") },
  { segmento: "tecnologia", cliente: "Nomadix", servico: "eSIM para viagens internacionais", ...V("tecnologia-nomadix") },

  { segmento: "educacao", cliente: "Wayfluency", servico: "Curso de inglês online", ...V("educacao-wayfluency") },

  { segmento: "agencias", cliente: "RYVO", servico: "Estúdio criativo", ...V("agencias-ryvo") },

  { segmento: "fitness", cliente: "Junior Reis", servico: "Consultoria fitness", ...V("fitness-junior-reis") },
];
