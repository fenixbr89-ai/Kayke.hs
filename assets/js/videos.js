/* ==========================================================
   PORTFÓLIO. Edite só este arquivo para adicionar vídeos.

   1. Coloque em assets/videos/ o .mp4 (vertical 9:16) e uma capa .jpg
   2. Coloque em assets/videos/previews/ um trecho curto sem som (opcional)
   3. Adicione o vídeo na lista VIDEOS

   A aba de um segmento só aparece quando ele tem pelo menos um vídeo.
   ========================================================== */

const WHATSAPP = "5562996821664";
const INSTAGRAM = "kayke.hs";

/* Abas, na ordem em que aparecem */
const SEGMENTOS = [
  { id: "servicos",   nome: "Serviços Gerais" },
  { id: "comercio",   nome: "Comércio e Varejo" },
  { id: "aplicativos", nome: "Aplicativos" },
  { id: "tecnologia", nome: "Tecnologia" },
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

  { segmento: "comercio", cliente: "Mariana Supermercado", servico: "Ofertas do dia", ...V("comercio-supermercado") },
  { segmento: "comercio", cliente: "Benatti Frios e Embalagens", servico: "Apresentação da loja", ...V("comercio-frios-embalagens") },

  { segmento: "aplicativos", cliente: "TOUT", servico: "Lançamento de aplicativo", ...V("app-tout") },

  { segmento: "tecnologia", cliente: "Kronic Host", servico: "Hospedagem VPS no Brasil", ...V("tecnologia-kronic-host") },

  { segmento: "fitness", cliente: "Junior Reis", servico: "Consultoria fitness", ...V("fitness-junior-reis") },
];
