(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const waLink = (msg) => "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(msg);
  const pad = (n) => String(n).padStart(2, "0");

  /* links de WhatsApp */
  $$("[data-wa]").forEach((a) => {
    a.href = waLink(a.dataset.wa);
    a.target = "_blank";
    a.rel = "noopener";
  });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- títulos palavra por palavra ---------- */
  $$(".split").forEach((el) => {
    let k = 0;
    el.childNodes.forEach((node) => {
      if (node.nodeType !== 3) return;
      const frag = document.createElement("span");
      frag.innerHTML = node.textContent.split(/(\s+)/).map((w) =>
        w.trim() ? `<span class="w"><span style="--i:${k++}">${w}</span></span>` : w
      ).join("");
      node.replaceWith(...frag.childNodes);
    });
  });

  /* entrada */
  requestAnimationFrame(() => document.documentElement.classList.add("ready"));

  function loop() {
    statement();
    requestAnimationFrame(loop);
  }

  /* ---------- frase que acende com a rolagem ---------- */
  const st = $("#statement");
  st.innerHTML = st.textContent.trim().split(/\s+/).map((w) => `<span class="wd">${w}</span>`).join(" ");
  const words = $$(".wd", st);
  let stOn = false, lastLit = -1;
  new IntersectionObserver(([e]) => (stOn = e.isIntersecting)).observe(st);
  function statement() {
    if (!stOn) return;
    const r = st.getBoundingClientRect();
    const p = (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35);
    const lit = Math.floor(Math.max(0, Math.min(1, p)) * words.length);
    if (lit === lastLit) return;
    lastLit = lit;
    words.forEach((w, k) => w.classList.toggle("lit", k < lit));
  }
  requestAnimationFrame(loop);

  /* ---------- revelar ao rolar ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  $$(".split").forEach((el) => io.observe(el));

  /* ---------- trabalhos ---------- */
  const segmentos = SEGMENTOS.filter((s) => VIDEOS.some((v) => v.segmento === s.id));
  const tabsEl = $("#tabs");
  const grid = $("#grid");
  tabsEl.innerHTML = segmentos.map((s) => `<button class="tab" data-id="${s.id}">${s.nome}</button>`).join("");

  function cards(id) {
    const list = VIDEOS.filter((v) => v.segmento === id);
    grid.innerHTML = list.map((v, k) => `
      <button class="card" data-i="${VIDEOS.indexOf(v)}">
        <div class="media" style="transition-delay:${(k % 4) * 90}ms">
          <img src="${v.capa}" alt="${v.cliente}, ${v.servico}" loading="lazy">
        </div>
        <div class="meta"><div><strong>${v.cliente}</strong><span>${v.servico}</span></div><span class="n">${pad(k + 1)}</span></div>
      </button>`).join("");
    $$(".card", grid).forEach((c) => {
      io.observe(c);
      const v = VIDEOS[c.dataset.i];
      c.addEventListener("click", () => openModal(v));
      if (!finePointer || !v.previa) return;
      let vid;
      c.addEventListener("mouseenter", () => {
        if (!vid) {
          vid = document.createElement("video");
          Object.assign(vid, { src: v.previa, muted: true, loop: true, playsInline: true });
          $(".media", c).appendChild(vid);
        }
        vid.play().then(() => c.classList.add("playing")).catch(() => {});
      });
      c.addEventListener("mouseleave", () => { c.classList.remove("playing"); vid && vid.pause(); });
    });
  }

  let current = null;
  function select(id, animate) {
    if (id === current) return;
    current = id;
    const tab = $(`.tab[data-id="${id}"]`, tabsEl);
    $$(".tab", tabsEl).forEach((t) => t.classList.toggle("active", t === tab));
    if (!animate) return cards(id);
    grid.classList.add("out");
    setTimeout(() => { grid.classList.remove("out"); cards(id); }, 320);
  }
  tabsEl.addEventListener("click", (e) => {
    const t = e.target.closest(".tab");
    if (t) { history.replaceState(null, "", "#" + t.dataset.id); select(t.dataset.id, true); }
  });
  const fromHash = () => { const h = location.hash.slice(1); return segmentos.some((s) => s.id === h) ? h : segmentos[0].id; };
  select(fromHash(), false);

  /* ---------- cursor ---------- */
  if (finePointer) {
    const cur = $("#cursor");
    let mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; cur.classList.remove("hide"); });
    document.addEventListener("mouseover", (e) => cur.classList.toggle("big", !!e.target.closest(".card")));
    document.addEventListener("mouseleave", () => cur.classList.add("hide"));
    document.addEventListener("mouseenter", () => cur.classList.remove("hide"));
    (function follow() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cur.style.transform = `translate3d(${cx}px,${cy}px,0)`;
      requestAnimationFrame(follow);
    })();

    /* botões magnéticos */
    $$(".magnet").forEach((m) => {
      m.addEventListener("mousemove", (e) => {
        const r = m.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        m.style.transition = "transform .2s";
        m.style.transform = `translate(${x * 0.3}px,${y * 0.3}px)`;
      });
      m.addEventListener("mouseleave", () => {
        m.style.transition = "transform .8s cubic-bezier(.16,1,.3,1)";
        m.style.transform = "";
      });
    });
  }

  /* ---------- vídeo aberto ---------- */
  const modal = $("#modal");
  const player = $("#modal-player");
  function openModal(v) {
    player.innerHTML = `<video src="${v.video}" poster="${v.capa}" controls autoplay playsinline></video>`;
    $("#modal-cliente").textContent = v.cliente;
    $("#modal-servico").textContent = v.servico;
    $("#modal-cta").href = waLink(`Olá! Vi o vídeo da ${v.cliente} no seu portfólio e quero um vídeo assim.`);
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => (player.innerHTML = ""), 600);
  }
  $(".modal-close").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeModal());
})();
