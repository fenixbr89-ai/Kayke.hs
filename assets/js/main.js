/* kayke.hs — scripts do site */
(function () {
  const waLink = (msg) =>
    "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);

  /* links de WhatsApp genéricos */
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa || "Olá! Vim pelo site e quero um orçamento.");
    a.target = "_blank";
    a.rel = "noopener";
  });

  /* menu mobile */
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".menu-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll(".nav-links a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  /* animação ao rolar */
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ano no rodapé */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* -------- cards de segmento na home -------- */
  const segGrid = document.getElementById("segment-grid");
  if (segGrid) {
    segGrid.innerHTML = SEGMENTOS.map((s) => {
      const n = VIDEOS.filter((v) => v.segmento === s.id).length;
      return `
        <a class="segment reveal" href="catalogo.html#${s.id}">
          <span class="emoji">${s.emoji}</span>
          <div>
            <h3>${s.nome}</h3>
            <div class="meta"><span>${n} ${n === 1 ? "vídeo" : "vídeos"}</span>
              <span class="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
            </div>
          </div>
        </a>`;
    }).join("");
    segGrid.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  }

  /* -------- catálogo -------- */
  const grid = document.getElementById("video-grid");
  if (!grid) return;

  const tabsEl = document.getElementById("tabs");
  const titleEl = document.getElementById("catalog-title");
  const countEl = document.getElementById("catalog-count");
  const segById = Object.fromEntries(SEGMENTOS.map((s) => [s.id, s]));

  const placeholderHTML = (v) => {
    const [a, b] = v.frase || [v.titulo, ""];
    return `<div class="placeholder"><span class="ph-small">${a}</span><span class="ph-big">${b.replace(/<i>/g, '<span class="serif">').replace(/<\/i>/g, "</span>")}</span><span class="ph-bar"></span></div>`;
  };

  tabsEl.innerHTML =
    `<button class="tab" data-seg="todos">Todos <span class="count">${VIDEOS.length}</span></button>` +
    SEGMENTOS.map((s) => {
      const n = VIDEOS.filter((v) => v.segmento === s.id).length;
      return `<button class="tab" data-seg="${s.id}">${s.emoji} ${s.nome} <span class="count">${n}</span></button>`;
    }).join("");

  function render(seg) {
    const list = seg === "todos" ? VIDEOS : VIDEOS.filter((v) => v.segmento === seg);
    tabsEl.querySelectorAll(".tab").forEach((t) => {
      const on = t.dataset.seg === seg;
      t.classList.toggle("active", on);
      if (on && tabsEl.scrollWidth > tabsEl.clientWidth) tabsEl.scrollTo({ left: t.offsetLeft - (tabsEl.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
    });
    titleEl.innerHTML = seg === "todos" ? 'Todos os <span class="serif green">vídeos</span>' : `${segById[seg].emoji} ${segById[seg].nome}`;
    countEl.textContent = `${list.length} ${list.length === 1 ? "modelo" : "modelos"} • toque para assistir`;

    if (!list.length) {
      grid.innerHTML = `<div class="empty">Novos vídeos desse segmento em breve.<br><br><a class="btn btn-green" href="${waLink("Olá! Quero um vídeo motion para o meu segmento.")}" target="_blank" rel="noopener">Pedir o meu agora</a></div>`;
      return;
    }

    grid.innerHTML = list.map((v, i) => {
      const s = segById[v.segmento];
      const media = v.video
        ? (v.capa
            ? `<img class="poster" src="${v.capa}" alt="${v.titulo}" loading="lazy">`
            : `<video src="${v.video}#t=0.1" muted playsinline preload="metadata"></video>`)
        : placeholderHTML(v);
      return `
        <article class="video-card" data-index="${VIDEOS.indexOf(v)}" style="animation-delay:${i * 50}ms">
          ${media}
          <div class="shade"></div>
          <span class="tag">${s ? s.nome : ""}</span>
          <span class="play"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span>
          <div class="info"><h3>${v.titulo}</h3><p>${v.descricao || ""}</p></div>
        </article>`;
    }).join("");

    /* prévia ao passar o mouse (desktop) */
    grid.querySelectorAll(".video-card").forEach((card) => {
      const v = VIDEOS[card.dataset.index];
      card.addEventListener("click", () => openModal(v));
      if (!v.video || !window.matchMedia("(hover: hover)").matches) return;
      let preview;
      card.addEventListener("mouseenter", () => {
        preview = document.createElement("video");
        Object.assign(preview, { src: v.video, muted: true, loop: true, playsInline: true });
        preview.style.cssText = "position:absolute;inset:0;width:100%;height:100%;object-fit:cover";
        card.insertBefore(preview, card.querySelector(".shade"));
        preview.play().catch(() => {});
      });
      card.addEventListener("mouseleave", () => preview && preview.remove());
    });
  }

  function current() {
    const h = location.hash.replace("#", "");
    return segById[h] ? h : "todos";
  }

  tabsEl.addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (!t) return;
    history.replaceState(null, "", t.dataset.seg === "todos" ? location.pathname : "#" + t.dataset.seg);
    render(t.dataset.seg);
  });
  window.addEventListener("hashchange", () => render(current()));
  render(current());

  /* -------- modal -------- */
  const modal = document.getElementById("modal");
  const player = document.getElementById("modal-player");

  function openModal(v) {
    const s = segById[v.segmento];
    player.innerHTML = v.video
      ? `<video src="${v.video}" ${v.capa ? `poster="${v.capa}"` : ""} controls autoplay playsinline loop></video>`
      : placeholderHTML(v);
    document.getElementById("modal-tag").textContent = s ? s.nome : "";
    document.getElementById("modal-title").textContent = v.titulo;
    document.getElementById("modal-desc").textContent =
      (v.descricao || "") + ". Personalizo com a sua marca, cores e informações.";
    document.getElementById("modal-cta").href = waLink(
      `Olá! Vi no catálogo o vídeo "${v.titulo}" (${s ? s.nome : ""}) e quero um desses para o meu negócio.`
    );
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("open");
    player.innerHTML = "";
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", (e) => {
    if (e.target === modal || e.target.closest(".modal-close")) closeModal();
  });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());
})();
