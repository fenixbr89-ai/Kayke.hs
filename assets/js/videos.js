/* ==========================================================
   CATÁLOGO DE VÍDEOS — edite SÓ este arquivo para adicionar vídeos
   ----------------------------------------------------------
   1. Coloque o arquivo .mp4 na pasta  assets/videos/
      (de preferência vertical 9:16, até ~15 MB)
   2. (opcional) Coloque uma capa .jpg na mesma pasta
   3. Adicione um item na lista VIDEOS lá embaixo, ex.:

      {
        segmento: "advocacia",
        titulo: "Apresentação do escritório",
        descricao: "Motion 9:16 para Reels e anúncios",
        video: "assets/videos/advocacia-01.mp4",
        capa: "assets/videos/advocacia-01.jpg"
      },

   Se "video" ficar vazio (""), aparece um card de exemplo animado.
   ========================================================== */

const WHATSAPP = "5562996821664";
const INSTAGRAM = "kayke.hs";

/* Abas do catálogo (ordem = ordem que aparece no site) */
const SEGMENTOS = [
  { id: "escritorio",    nome: "Escritório",          emoji: "🏢" },
  { id: "advocacia",     nome: "Advocacia",           emoji: "⚖️" },
  { id: "contabilidade", nome: "Contabilidade",       emoji: "📊" },
  { id: "imoveis",       nome: "Corretor de Imóveis", emoji: "🏡" },
  { id: "fitness",       nome: "Fitness",             emoji: "💪" },
  { id: "servicos",      nome: "Serviços Gerais",     emoji: "🛠️" },
];

/* Vídeos — troque os exemplos pelos seus */
const VIDEOS = [
  // ESCRITÓRIO
  { segmento: "escritorio", titulo: "Apresentação da empresa", descricao: "Institucional curto para Reels e site", video: "", capa: "", frase: ["Sua empresa", "em <i>movimento.</i>"] },
  { segmento: "escritorio", titulo: "Anúncio de serviço", descricao: "Motion de oferta para tráfego pago", video: "", capa: "", frase: ["Aqui a gente", "faz <i>isso.</i>"] },

  // ADVOCACIA
  { segmento: "advocacia", titulo: "Escritório de advocacia", descricao: "Autoridade e confiança em 15 segundos", video: "", capa: "", frase: ["Seu direito", "em <i>boas mãos.</i>"] },
  { segmento: "advocacia", titulo: "Área de atuação", descricao: "Explica um serviço jurídico de forma simples", video: "", capa: "", frase: ["Direito", "<i>trabalhista.</i>"] },

  // CONTABILIDADE
  { segmento: "contabilidade", titulo: "Abertura de empresa", descricao: "Motion para captar novos clientes", video: "", capa: "", frase: ["Abra sua", "empresa <i>hoje.</i>"] },
  { segmento: "contabilidade", titulo: "Imposto de renda", descricao: "Campanha sazonal com chamada no WhatsApp", video: "", capa: "", frase: ["Declare sem", "<i>dor de cabeça.</i>"] },

  // CORRETOR DE IMÓVEIS
  { segmento: "imoveis", titulo: "Lançamento de imóvel", descricao: "Apresentação de imóvel com fotos e preço", video: "", capa: "", frase: ["Seu novo", "<i>endereço.</i>"] },
  { segmento: "imoveis", titulo: "Corretor pessoal", descricao: "Posicionamento do corretor nas redes", video: "", capa: "", frase: ["O corretor", "que <i>resolve.</i>"] },

  // FITNESS
  { segmento: "fitness", titulo: "Academia / Studio", descricao: "Motion energético para matrículas", video: "", capa: "", frase: ["Comece", "<i>hoje.</i>"] },
  { segmento: "fitness", titulo: "Personal trainer", descricao: "Apresentação + chamada para avaliação", video: "", capa: "", frase: ["Resultado", "<i>de verdade.</i>"] },

  // SERVIÇOS GERAIS
  { segmento: "servicos", titulo: "Prestador de serviço", descricao: "Para clínicas, salões, oficinas e mais", video: "", capa: "", frase: ["Seu serviço", "<i>escolhido.</i>"] },
  { segmento: "servicos", titulo: "Promoção relâmpago", descricao: "Oferta com contagem e urgência", video: "", capa: "", frase: ["Só até", "<i>domingo.</i>"] },
];
