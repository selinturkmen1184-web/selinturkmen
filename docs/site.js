const root = document.documentElement;
const motionButton = document.getElementById("motion-toggle");
const videos = Array.from(document.querySelectorAll("video"));
const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const header = document.querySelector(".site-header");
const finePointer = window.matchMedia("(pointer: fine)").matches;
let motionPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let scrollFrame = 0;

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

function updateScrollEffects() {
  scrollFrame = 0;
  const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
  root.style.setProperty("--scroll-progress", String(Math.min(1, window.scrollY / scrollable)));
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
