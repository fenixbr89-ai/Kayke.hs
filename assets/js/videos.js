/* ==========================================================
   PORTFÓLIO. Edite só este arquivo para adicionar vídeos.

   1. Coloque o .mp4 (vertical 9:16) e uma capa .jpg em assets/videos/
   2. Adicione um item na lista VIDEOS, por exemplo:

      { segmento: "advocacia", cliente: "Nome do cliente", servico: "Descrição curta",
        video: "assets/videos/advocacia-01.mp4", capa: "assets/videos/advocacia-01.jpg" },

   A aba de um segmento só aparece quando ele tem pelo menos um vídeo.
   ========================================================== */

const WHATSAPP = "5562996821664";
const INSTAGRAM = "kayke.hs";

/* Abas, na ordem em que aparecem */
const SEGMENTOS = [
  { id: "servicos",      nome: "Serviços Gerais" },
  { id: "comercio",      nome: "Comércio e Varejo" },
  { id: "escritorio",    nome: "Escritório" },
  { id: "advocacia",     nome: "Advocacia" },
  { id: "contabilidade", nome: "Contabilidade" },
  { id: "imoveis",       nome: "Corretor de Imóveis" },
  { id: "fitness",       nome: "Fitness" },
];

const VIDEOS = [
  { segmento: "servicos", cliente: "Juliano Pinturas", servico: "Pintura residencial e predial", video: "assets/videos/servicos-pintura.mp4", capa: "assets/videos/servicos-pintura.jpg" },
  { segmento: "servicos", cliente: "Juliano Pinturas", servico: "Limpeza pós-obra", video: "assets/videos/servicos-limpeza-pos-obra.mp4", capa: "assets/videos/servicos-limpeza-pos-obra.jpg" },
  { segmento: "servicos", cliente: "Juliano Pinturas", servico: "Vários serviços", video: "assets/videos/servicos-multiservicos.mp4", capa: "assets/videos/servicos-multiservicos.jpg" },
  { segmento: "servicos", cliente: "Juliano Pinturas", servico: "Elétrica residencial", video: "assets/videos/servicos-eletrica.mp4", capa: "assets/videos/servicos-eletrica.jpg" },

  { segmento: "comercio", cliente: "Mariana Supermercado", servico: "Ofertas do dia", video: "assets/videos/comercio-supermercado.mp4", capa: "assets/videos/comercio-supermercado.jpg" },
  { segmento: "comercio", cliente: "Benatti Frios e Embalagens", servico: "Apresentação da loja", video: "assets/videos/comercio-frios-embalagens.mp4", capa: "assets/videos/comercio-frios-embalagens.jpg" },
];
