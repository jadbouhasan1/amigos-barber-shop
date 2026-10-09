(function () {
  "use strict";
  var C = window.AMIGOS || {};
  var root = document.documentElement;
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o && o[k] != null ? o[k] : null; }, C);
  }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---- Bind config values (HTML already contains safe defaults) ---- */
  document.querySelectorAll("[data-bind]").forEach(function (n) {
    var v = get(n.getAttribute("data-bind")); if (v) n.textContent = v;
  });
  document.querySelectorAll("[data-bind-href]").forEach(function (n) {
    var v = get(n.getAttribute("data-bind-href")); if (v) n.setAttribute("href", v);
  });
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---- Social links (only if genuine) ---- */
  [["socialIg", "links.instagram"], ["socialFb", "links.facebook"]].forEach(function (p) {
    var v = get(p[1]), li = document.getElementById(p[0]);
    if (v && li) { li.hidden = false; li.querySelector("a").href = v; }
  });

  /* ---- Rating (shown only when verified) ---- */
  var r = C.rating;
  if (r && r.verified && r.value && r.count) {
    var hr = document.getElementById("heroRating");
    hr.textContent = r.value + " ★ ON GOOGLE"; hr.hidden = false;
    var rl = document.getElementById("ratingLine");
    rl.textContent = r.value + " ★ · " + r.count + " Google reviews"; rl.hidden = false;
  }

  /* ---- Images: hero / about / cta / services ---- */
  var im = C.images || {};
  if (im.hero) {
    document.getElementById("heroBg").style.backgroundImage = "url('" + im.hero + "')";
    document.getElementById("home").classList.add("hero--photo");
  }
  if (im.about) {
    var arch = document.querySelector("#aboutMedia .arch");
    var img = el("img"); img.src = im.about; img.alt = "Inside Amigos Barber Shop"; img.loading = "lazy";
    arch.appendChild(img); document.getElementById("aboutNote").hidden = true;
  } else {
    document.getElementById("aboutNote").hidden = false;
  }
  if (im.cta) document.getElementById("finalBg").style.backgroundImage =
    "linear-gradient(rgba(11,11,11,.7),rgba(11,11,11,.85)),url('" + im.cta + "')";
  document.querySelectorAll(".svc").forEach(function (c) {
    var src = im.services && im.services[c.getAttribute("data-img")];
    if (src) {
      var m = c.querySelector(".svc__media"), i = el("img");
      i.src = src; i.alt = c.querySelector("h3").textContent + " at Amigos Barber Shop"; i.loading = "lazy";
      m.insertBefore(i, m.firstChild); m.querySelector(".svc__icon").style.display = "none";
    }
  });

  /* ---- Reviews ---- */
  var rg = document.getElementById("reviewGrid");
  (C.reviews || []).forEach(function (rv, i) {
    var f = el("figure", "review glass reveal d" + Math.min(i + 1, 3));
    f.style.margin = 0;
    f.appendChild(el("blockquote", null, rv.quote));
    f.appendChild(el("cite", null, rv.source || "Customer review"));
    rg.appendChild(f);
  });

  /* ---- Gallery + lightbox ---- */
  var gg = document.getElementById("galleryGrid"), gal = C.gallery || [];
  if (!gal.length) {
    var e = el("div", "gallery-empty reveal");
    e.appendChild(el("h3", null, "Photos coming soon"));
    e.appendChild(el("p", null, "We're adding real photos of the shop and our work. In the meantime, see photos from customers and the shop on Google Maps."));
    var a = el("a", "btn btn--ghost", "SEE PHOTOS ON GOOGLE MAPS");
    a.href = get("links.mapsView") || "#"; a.target = "_blank"; a.rel = "noopener noreferrer";
    e.appendChild(a); gg.appendChild(e);
  } else {
    gal.forEach(function (g, i) {
      var b = el("button", "gallery__item reveal " + (g.size || ""));
      b.type = "button"; b.setAttribute("aria-label", "Open photo: " + (g.caption || g.alt));
      var i2 = el("img"); i2.src = g.src; i2.alt = g.alt; i2.loading = "lazy"; i2.decoding = "async";
      b.appendChild(i2);
      if (g.caption) b.appendChild(el("figcaption", null, g.caption));
      b.addEventListener("click", function () { openLb(i); });
      gg.appendChild(b);
    });
  }
  var lb = document.getElementById("lightbox"), lbImg = document.getElementById("lbImg"),
      lbCap = document.getElementById("lbCap"), cur = 0, lastFocus = null;
  function showLb() { lbImg.src = gal[cur].src; lbImg.alt = gal[cur].alt; lbCap.textContent = gal[cur].caption || ""; }
  function openLb(i) { cur = i; lastFocus = document.activeElement; showLb(); lb.hidden = false; document.body.style.overflow = "hidden"; document.getElementById("lbClose").focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  function step(d) { cur = (cur + d + gal.length) % gal.length; showLb(); }
  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbPrev").addEventListener("click", function () { step(-1); });
  document.getElementById("lbNext").addEventListener("click", function () { step(1); });
  lb.addEventListener("click", function (ev) { if (ev.target === lb) closeLb(); });
  document.addEventListener("keydown", function (ev) {
    if (lb.hidden) return;
    if (ev.key === "Escape") closeLb();
    if (ev.key === "ArrowLeft") step(-1);
    if (ev.key === "ArrowRight") step(1);
  });

  /* ---- Opening hours (only if owner-verified in config) ---- */
  var H = C.hours;
  if (H) {
    var days = [["mon", "Monday"], ["tue", "Tuesday"], ["wed", "Wednesday"], ["thu", "Thursday"], ["fri", "Friday"], ["sat", "Saturday"], ["sun", "Sunday"]];
    var todayKey = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][new Date().getDay()];
    var t = el("table"), tb = el("tbody");
    days.forEach(function (d) {
      var tr = el("tr", d[0] === todayKey ? "today" : "");
      tr.appendChild(el("td", null, d[1])); tr.appendChild(el("td", null, H[d[0]] || "Closed"));
      tb.appendChild(tr);
    });
    t.appendChild(tb);
    var body = document.getElementById("hoursBody"); body.textContent = ""; body.appendChild(t);
  }

  /* ---- Map: load only when near viewport ---- */
  var mf = document.getElementById("mapFrame"), mapSrc = get("links.mapEmbed");
  function loadMap() { if (mapSrc && !mf.src) mf.src = mapSrc; }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es, o) { if (es[0].isIntersecting) { loadMap(); o.disconnect(); } }, { rootMargin: "400px" }).observe(mf);
  } else loadMap();

  /* ---- Nav: scrolled state + mobile menu ---- */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 40); }
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  var mb = document.getElementById("menuBtn"), mm = document.getElementById("mobileMenu");
  function setMenu(open) {
    mb.setAttribute("aria-expanded", open); mb.setAttribute("aria-label", open ? "Close menu" : "Open menu"); mm.hidden = !open;
    if (open) nav.classList.add("scrolled"); else onScroll();
  }
  mb.addEventListener("click", function () { setMenu(mb.getAttribute("aria-expanded") !== "true"); });
  mm.addEventListener("click", function (ev) { if (ev.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (ev) { if (ev.key === "Escape" && !mm.hidden) { setMenu(false); mb.focus(); } });
  window.addEventListener("resize", function () { if (window.innerWidth > 860 && !mm.hidden) setMenu(false); });

  /* ---- Reveal on scroll ---- */
  var rv = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    rv.forEach(function (n) { n.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
    rv.forEach(function (n) { io.observe(n); });
    // Safety net: never leave content hidden.
    setTimeout(function () { rv.forEach(function (n) { n.classList.add("in"); }); }, 4000);
  }

  /* ---- Subtle depth: parallax ghost wordmark + panel tilt (desktop, motion allowed) ---- */
  if (!reduce) {
    var ghost = document.getElementById("ghost"), ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking || window.scrollY > 900) return; ticking = true;
      requestAnimationFrame(function () {
        ghost.style.transform = "translate(-50%," + (window.scrollY * -0.08) + "px)"; ticking = false;
      });
    }, { passive: true });
    var tilt = document.getElementById("tilt"), fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    if (fine && tilt) {
      var hero = document.getElementById("home");
      hero.addEventListener("mousemove", function (ev) {
        var x = (ev.clientX / window.innerWidth - .5), y = (ev.clientY / window.innerHeight - .5);
        tilt.style.transform = "perspective(900px) rotateY(" + (x * 8) + "deg) rotateX(" + (-y * 6) + "deg)";
      });
      hero.addEventListener("mouseleave", function () { tilt.style.transform = ""; });
    }
  }

  /* ---- Optional hero video (illustrative footage only; image-first on mobile / data saver) ---- */
  var V = C.video || {};
  var conn = navigator.connection || {};
  if (V.hero && !reduce && !conn.saveData && window.innerWidth > 860) {
    var v = document.getElementById("heroVideo");
    if (V.heroPoster) v.poster = V.heroPoster;
    v.src = V.hero; v.hidden = false;
    v.addEventListener("canplay", function () { v.play().catch(function () { v.hidden = true; }); }, { once: true });
    v.addEventListener("error", function () { v.hidden = true; });
  }
})();
