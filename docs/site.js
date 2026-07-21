const motionButton = document.getElementById("motion-toggle");
const videos = Array.from(document.querySelectorAll("video"));
let motionPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function syncMotion() {
  videos.forEach((video) => {
    if (motionPaused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  });

  motionButton.setAttribute("aria-pressed", String(motionPaused));
  motionButton.innerHTML = motionPaused
    ? '<span aria-hidden="true">▶</span> Hareketi başlat'
    : '<span aria-hidden="true">Ⅱ</span> Hareketi durdur';
}

motionButton.addEventListener("click", () => {
  motionPaused = !motionPaused;
  syncMotion();
});

syncMotion();
