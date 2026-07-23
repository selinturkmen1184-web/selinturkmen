const root = document.documentElement;
const motionButton = document.getElementById("motion-toggle");
const videos = Array.from(document.querySelectorAll("video"));
const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const counters = Array.from(document.querySelectorAll("[data-count]"));
const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
const navSections = Array.from(document.querySelectorAll("[data-nav-section]"));
const header = document.querySelector(".site-header");
const cinematicIntro = document.querySelector(".cinematic-intro");
const finePointer = window.matchMedia("(pointer: fine)").matches;
let motionPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let scrollFrame = 0;
let pointerFrame = 0;

root.classList.add("js-enhanced");

function resetCard(card) {
  card.style.setProperty("--tilt-x", "0deg");
  card.style.setProperty("--tilt-y", "0deg");
  card.style.setProperty("--pointer-x", "50%");
  card.style.setProperty("--pointer-y", "50%");
}

function syncMotion() {
  root.classList.toggle("motion-paused", motionPaused);

  videos.forEach((video) => {
    if (motionPaused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  });

  if (motionPaused) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    projectCards.forEach(resetCard);
  }

  motionButton?.setAttribute("aria-pressed", String(motionPaused));
  if (motionButton) {
    motionButton.innerHTML = motionPaused
      ? '<span aria-hidden="true">▶</span> Hareketi başlat'
      : '<span aria-hidden="true">Ⅱ</span> Hareketi durdur';
  }
}

revealElements.forEach((element, index) => {
  element.style.setProperty("--reveal-delay", `${Math.min((index % 6) * 70, 350)}ms`);
});

if (motionPaused || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -8%" },
  );
  revealElements.forEach((element) => revealObserver.observe(element));
}

projectCards.forEach((card) => {
  resetCard(card);
  let tiltFrame = 0;

  card.addEventListener("pointermove", (event) => {
    if (motionPaused || !finePointer) return;

    const rect = card.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    if (tiltFrame) window.cancelAnimationFrame(tiltFrame);

    tiltFrame = window.requestAnimationFrame(() => {
      card.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
      card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
      card.style.setProperty("--pointer-x", `${x * 100}%`);
      card.style.setProperty("--pointer-y", `${y * 100}%`);
    });
  });

  card.addEventListener("pointerleave", () => resetCard(card));
});

window.addEventListener(
  "pointermove",
  (event) => {
    if (!finePointer || motionPaused) return;
    if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
    pointerFrame = window.requestAnimationFrame(() => {
      root.style.setProperty("--cursor-x", `${event.clientX}px`);
      root.style.setProperty("--cursor-y", `${event.clientY}px`);
      root.style.setProperty("--hero-x", `${(event.clientX / window.innerWidth - 0.5) * 18}px`);
      root.style.setProperty("--hero-y", `${(event.clientY / window.innerHeight - 0.5) * 18}px`);
    });
  },
  { passive: true },
);

function animateCounter(element) {
  const target = Number(element.dataset.count || "0");
  const suffix = element.dataset.suffix || "";
  const prefix = element.dataset.prefix || "";
  const pad = Number(element.dataset.pad || "0");

  if (!Number.isFinite(target) || motionPaused) {
    element.textContent = `${prefix}${String(target).padStart(pad, "0")}${suffix}`;
    return;
  }

  const start = performance.now();
  const duration = 1150;
  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = Math.round(target * eased);
    element.textContent = `${prefix}${String(value).padStart(pad, "0")}${suffix}`;
    if (progress < 1) window.requestAnimationFrame(tick);
  };
  window.requestAnimationFrame(tick);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.55 },
  );
  counters.forEach((counter) => counterObserver.observe(counter));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const current = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!current) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${current.target.id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-28% 0px -58%", threshold: [0.08, 0.3, 0.6] },
  );
  navSections.forEach((section) => sectionObserver.observe(section));
} else {
  counters.forEach(animateCounter);
}

function updateScrollEffects() {
  scrollFrame = 0;
  const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
  root.style.setProperty("--scroll-progress", String(Math.min(1, window.scrollY / scrollable)));

  if (cinematicIntro) {
    const introRange = Math.max(1, cinematicIntro.offsetHeight - window.innerHeight);
    const introProgress = Math.min(1, Math.max(0, window.scrollY / introRange));
    const portfolioProgress = Math.min(1, Math.max(0, (introProgress - 0.58) / 0.42));
    const heroScrollStart = Math.max(0, introRange - window.innerHeight * 0.38);
    const heroScroll = Math.max(0, window.scrollY - heroScrollStart);

    root.style.setProperty("--intro-scale", String(1 + introProgress * 0.13));
    root.style.setProperty("--intro-opacity", String(1 - introProgress * 0.97));
    root.style.setProperty("--intro-blur", `${introProgress * 9}px`);
    root.style.setProperty("--intro-shift", `${introProgress * -42}px`);
    root.style.setProperty("--intro-copy-shift", `${introProgress * -74}px`);
    root.style.setProperty("--intro-copy-opacity", String(Math.max(0, 1 - introProgress * 1.7)));
    root.style.setProperty("--portfolio-opacity", String(portfolioProgress));
    root.style.setProperty("--portfolio-y", `${(1 - portfolioProgress) * 54}px`);
    root.style.setProperty("--hero-title-shift", `${Math.min(26, heroScroll * 0.04)}px`);
  } else {
    root.style.setProperty("--hero-title-shift", `${Math.min(26, window.scrollY * 0.04)}px`);
  }

  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function requestScrollUpdate() {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollEffects);
}

motionButton?.addEventListener("click", () => {
  motionPaused = !motionPaused;
  syncMotion();
});

window.addEventListener("scroll", requestScrollUpdate, { passive: true });
window.addEventListener("resize", requestScrollUpdate);
updateScrollEffects();
syncMotion();
window.requestAnimationFrame(() => root.classList.add("hero-ready"));
