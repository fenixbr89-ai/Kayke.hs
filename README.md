# kayke.hs — Sites e vídeos em motion

Site estático (HTML + CSS + JS puro), sem build. Basta abrir o `index.html`.

- `index.html` — página inicial (serviços, segmentos, como funciona, sobre, contato)
- `catalogo.html` — catálogo de vídeos motion com abas por segmento
- `assets/js/videos.js` — **edite aqui** para adicionar vídeos, abas e o número de WhatsApp
- `assets/videos/` — coloque os arquivos `.mp4` (vertical 9:16) e as capas `.jpg`

## Como adicionar um vídeo
1. Envie o `.mp4` para `assets/videos/` (ex.: `advocacia-01.mp4`)
2. Em `assets/js/videos.js`, preencha `video: "assets/videos/advocacia-01.mp4"` no item desejado
3. Faça commit. O site atualiza sozinho no GitHub Pages.

O link direto para uma aba funciona assim: `catalogo.html#advocacia`, `catalogo.html#fitness`...

## Publicar (GitHub Pages)
Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / root → Save.
