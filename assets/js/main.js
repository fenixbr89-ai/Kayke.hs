(function () {
  const waLink = (msg) => "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
  const PLAY = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';

  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
  });
  document.getElementById("year").textContent = new Date().getFullYear();

  const tabsEl = document.getElementById("tabs");
  const grid = document.getElementById("grid");
  const segmentos = SEGMENTOS.filter((s) => VIDEOS.some((v) => v.segmento === s.id));

  tabsEl.innerHTML = segmentos.map((s) => `<button class="tab" data-id="${s.id}">${s.nome}</button>`).join("");

  function render(id) {
    tabsEl.querySelectorAll(".tab").forEach((t) => t.classList.toggle("active", t.dataset.id === id));
    const list = VIDEOS.filter((v) => v.segmento === id);
    grid.innerHTML = list.map((v) => `
      <button class="card" data-i="${VIDEOS.indexOf(v)}">
        <div class="media">
          ${v.capa ? `<img src="${v.capa}" alt="${v.cliente}" loading="lazy">` : `<video src="${v.video}#t=0.1" muted playsinline preload="metadata"></video>`}
          <span class="play">${PLAY}</span>
        </div>
        <div class="info"><strong>${v.cliente}</strong><span>${v.servico}</span></div>
      </button>`).join("");
    grid.querySelectorAll(".card").forEach((c) => c.addEventListener("click", () => open(VIDEOS[c.dataset.i])));
  }

  const current = () => {
    const h = location.hash.slice(1);
    return segmentos.some((s) => s.id === h) ? h : segmentos[0].id;
  };
  tabsEl.addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (!t) return;
    history.replaceState(null, "", "#" + t.dataset.id);
    render(t.dataset.id);
  });
  window.addEventListener("hashchange", () => render(current()));
  render(current());

  /* janela do vídeo */
  const modal = document.getElementById("modal");
  const player = document.getElementById("modal-player");
  function open(v) {
    player.innerHTML = `<video src="${v.video}" poster="${v.capa || ""}" controls autoplay playsinline></video>`;
    document.getElementById("modal-cliente").textContent = v.cliente;
    document.getElementById("modal-servico").textContent = v.servico;
    document.getElementById("modal-cta").href = waLink(`Olá! Vi o vídeo da ${v.cliente} no seu portfólio e quero um vídeo assim.`);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function close() {
    modal.classList.remove("open");
    player.innerHTML = "";
    document.body.style.overflow = "";
  }
  modal.addEventListener("click", (e) => { if (e.target === modal || e.target.closest(".modal-close")) close(); });
  document.addEventListener("keydown", (e) => e.key === "Escape" && close());
})();
