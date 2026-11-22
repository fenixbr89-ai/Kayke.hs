/* kayke.hs — scripts do site */
(function () {
  const waLink = (msg) => "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);

  /* ícones de linha (sem emojis) */
  const I = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    escritorio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/></svg>',
    advocacia: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0L5 7zM19 7l-3 7a3 3 0 0 0 6 0l-3-7z"/></svg>',
    contabilidade: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8M8 11h2M12 11h2M16 11h0M8 15h2M12 15h2M8 18h2M12 18h4"/></svg>',
    imoveis: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/></svg>',
    fitness: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12"/></svg>',
    comercio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    servicos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L3 17.8V21h3.2l6.3-6.3a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.5-.6-.6-2.5 2.6-2.6z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
  };

  /* links de WhatsApp */
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
    nav.querySelectorAll(".nav-links a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  /* animação ao rolar */
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
    { threshold: 0.1 }
  );
  const observe = (root) => root.querySelectorAll(".reveal").forEach((el) => io.observe(el));
  observe(document);

  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  const plural = (n, a, b) => `${n} ${n === 1 ? a : b}`;

  /* -------- HTML dos cards -------- */
  const siteCard = (s) => {
    const tipo = TIPOS_SITE.find((t) => t.id === s.tipo);
    const screen = s.imagem
      ? `<img src="${s.imagem}" alt="${s.titulo}" loading="lazy">`
      : `<div class="mock"><div class="mock-nav"><b></b><span><i></i><i></i><i></i></span></div>
           <div class="mock-hero"><div class="mock-text"><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><i class="btn-m"></i></div><div class="mock-img"></div></div>
           <div class="mock-cards"><i></i><i></i><i></i></div></div>`;
    const tag = s.link ? `a href="${s.link}" target="_blank" rel="noopener"` : `a data-wa-site="${s.titulo}"`;
    return `
      <${tag} class="box site-card reveal">
        <div class="browser">
          <div class="browser-bar"><i></i><i></i><i></i><span class="url">${s.url || ""}</span></div>
          <div class="browser-screen">${screen}</div>
        </div>
        <div class="site-info">
          <span class="type">${tipo ? tipo.nome : ""}</span>
          <h3>${s.titulo}</h3>
          <p>${s.descricao || ""}</p>
          <div class="box-foot"><span>${s.link ? "Ver site no ar" : "Quero um assim"}</span><span class="go">${I.arrow}</span></div>
        </div>
      </a>`;
  };
  const bindSiteWa = (root) =>
    root.querySelectorAll("[data-wa-site]").forEach((a) => {
      a.href = waLink(`Olá! Vi o modelo de site "${a.dataset.waSite}" e quero um site para o meu negócio.`);
      a.target = "_blank"; a.rel = "noopener";
    });

  /* -------- HOME: segmentos -------- */
  const segGrid = document.getElementById("segment-grid");
  if (segGrid) {
    segGrid.innerHTML = SEGMENTOS.map((s) => {
      const n = VIDEOS.filter((v) => v.segmento === s.id).length;
      return `
        <a class="box reveal" href="catalogo.html#${s.id}">
          <span class="icon-box">${I[s.id] || I.servicos}</span>
          <h3>${s.nome}</h3>
          <div class="box-foot"><span>${plural(n, "vídeo", "vídeos")}</span><span class="go">Ver ${I.arrow}</span></div>
        </a>`;
    }).join("") + `
        <a class="box reveal" href="${waLink("Olá! Não achei meu segmento no catálogo e quero um vídeo motion personalizado.")}" target="_blank" rel="noopener">
          <span class="icon-box">${I.plus}</span>
          <h3>Outro segmento</h3>
          <div class="box-foot"><span>Sob medida</span><span class="go">Pedir ${I.arrow}</span></div>
        </a>`;
    observe(segGrid);
  }

  /* -------- HOME: prévia de sites -------- */
  const sitePreview = document.getElementById("site-preview");
  if (sitePreview) {
    sitePreview.innerHTML = SITES.slice(0, 3).map(siteCard).join("");
    bindSiteWa(sitePreview); observe(sitePreview);
  }

  /* -------- abas genéricas -------- */
  function setupTabs({ tabsEl, groups, items, key, media, onRender }) {
    const byId = Object.fromEntries(groups.map((g) => [g.id, g]));
    tabsEl.innerHTML =
      groups.map((g) => `<button class="tab" data-id="${g.id}">${g.nome}</button>`).join("");

    const first = (groups.find((g) => items.some((i) => i[key] === g.id && i[media])) || groups[0]).id;
    const current = () => { const h = location.hash.slice(1); return byId[h] ? h : first; };
    function render(id) {
      tabsEl.querySelectorAll(".tab").forEach((t) => {
        const on = t.dataset.id === id;
        t.classList.toggle("active", on);
        if (on && tabsEl.scrollWidth > tabsEl.clientWidth)
          tabsEl.scrollTo({ left: t.offsetLeft - (tabsEl.clientWidth - t.offsetWidth) / 2, behavior: "smooth" });
      });
      onRender(id, items.filter((i) => i[key] === id), byId[id]);
    }
    tabsEl.addEventListener("click", (e) => {
      const t = e.target.closest(".tab"); if (!t) return;
      history.replaceState(null, "", "#" + t.dataset.id);
      render(t.dataset.id);
    });
    window.addEventListener("hashchange", () => render(current()));
    render(current());
  }

  const titleEl = document.getElementById("catalog-title");
  const countEl = document.getElementById("catalog-count");

  /* -------- PÁGINA DE SITES -------- */
  const siteGrid = document.getElementById("site-grid");
  if (siteGrid) {
    setupTabs({
      tabsEl: document.getElementById("tabs"), groups: TIPOS_SITE, items: SITES, key: "tipo", media: "imagem",
      onRender(id, list, g) {
        titleEl.textContent = g.nome;
        countEl.textContent = plural(list.length, "modelo", "modelos");
        siteGrid.innerHTML = list.length ? list.map(siteCard).join("") :
          `<div class="empty">Novos modelos em breve.<br><a class="btn btn-green" href="${waLink("Olá! Quero um site para o meu negócio.")}" target="_blank" rel="noopener">Pedir o meu agora</a></div>`;
        bindSiteWa(siteGrid);
        siteGrid.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      },
    });
  }

  /* -------- CATÁLOGO DE VÍDEOS -------- */
  const grid = document.getElementById("video-grid");
  if (!grid) return;
  const segById = Object.fromEntries(SEGMENTOS.map((s) => [s.id, s]));

  const placeholderHTML = (v) => {
    const [a, b] = v.frase || [v.titulo, ""];
    return `<div class="placeholder${v.fundo ? " has-bg" : ""}">${v.fundo ? `<img class="ph-bg" src="${v.fundo}" alt="" loading="lazy">` : ""}<span class="ph-small">${a}</span><span class="ph-big">${b}</span><span class="ph-bar"></span></div>`;
  };

  setupTabs({
    tabsEl: document.getElementById("tabs"), groups: SEGMENTOS, items: VIDEOS, key: "segmento", media: "video",
    onRender(id, list, g) {
      list = [...list].sort((x, y) => !!y.video - !!x.video);
      titleEl.textContent = g.nome;
      countEl.textContent = plural(list.length, "modelo", "modelos") + " · toque para assistir";
      if (!list.length) {
        grid.innerHTML = `<div class="empty">Novos vídeos desse segmento em breve.<br><a class="btn btn-green" href="${waLink("Olá! Quero um vídeo motion para o meu segmento.")}" target="_blank" rel="noopener">Pedir o meu agora</a></div>`;
        return;
      }
      grid.innerHTML = list.map((v) => {
        const s = segById[v.segmento];
        const media = v.video
          ? (v.capa ? `<img src="${v.capa}" alt="${v.titulo}" loading="lazy">` : `<video src="${v.video}#t=0.1" muted playsinline preload="metadata"></video>`)
          : placeholderHTML(v);
        return `
          <article class="video-card" data-index="${VIDEOS.indexOf(v)}">
            <div class="media">${media}<span class="play">${I.play}</span></div>
            <div class="card-body"><span class="type">${s ? s.nome : ""}</span><h3>${v.titulo}</h3></div>
          </article>`;
      }).join("");

      grid.querySelectorAll(".video-card").forEach((card) => {
        const v = VIDEOS[card.dataset.index];
        card.addEventListener("click", () => openModal(v));
        if (!v.video || !window.matchMedia("(hover: hover)").matches) return;
        let preview;
        const media = card.querySelector(".media");
        card.addEventListener("mouseenter", () => {
          preview = document.createElement("video");
          Object.assign(preview, { src: v.video, muted: true, loop: true, playsInline: true });
          media.insertBefore(preview, media.querySelector(".play"));
          preview.play().catch(() => {});
        });
        card.addEventListener("mouseleave", () => preview && preview.remove());
      });
    },
  });

  /* modal */
  const modal = document.getElementById("modal");
  const player = document.getElementById("modal-player");
  document.querySelectorAll(".modal-side li").forEach((li) => li.insertAdjacentHTML("afterbegin", I.check));

  function openModal(v) {
    const s = segById[v.segmento];
    player.innerHTML = v.video
      ? `<video src="${v.video}" ${v.capa ? `poster="${v.capa}"` : ""} controls autoplay playsinline loop></video>`
      : placeholderHTML(v);
    document.getElementById("modal-tag").textContent = s ? s.nome : "";
    document.getElementById("modal-title").textContent = v.titulo;
    document.getElementById("modal-desc").textContent = (v.descricao || "") + ". Personalizo com a sua marca, cores e informações.";
    document.getElementById("modal-cta").href = waLink(`Olá! Vi no catálogo o vídeo "${v.titulo}" (${s ? s.nome : ""}) e quero um desses para o meu negócio.`);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("open");
    player.innerHTML = "";
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".modal-close")) closeModal(); });
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());
})();
