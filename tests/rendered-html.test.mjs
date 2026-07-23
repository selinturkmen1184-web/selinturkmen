import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://selin-turkmen-portfolio.kullanici209931.chatgpt.site/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished portfolio and research projects", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Selin Türkmen — Robotik, TÜBİTAK ve Dijital Deneyimler<\/title>/i);
  assert.match(html, /Tarımsal Otonom Robot Simülasyonu/);
  assert.match(html, /SMG Neural Net/);
  assert.match(html, /Tarımsal Drone — Tasarım ve Üretim/);
  assert.match(html, /Rota — Kişisel TYT &amp; AYT Çalışma Ajandası/);
  assert.match(html, /Sabancı Gençlik Hareketi — Sertifika/);
  assert.match(html, /02 TÜBİTAK çalışması/);
  assert.doesNotMatch(html, /öğrenci/i);
  assert.match(html, /class="scroll-progress"/);
  assert.match(html, /class="cinematic-intro"/);
  assert.match(html, /Kaydır ve keşfet/);
  assert.match(html, /src="\/og\.png"/);
  assert.match(html, /class="hero-work-bridge"/);
  assert.match(html, /<h2 id="work-title">Yapılan işler\.<\/h2>/);
  assert.match(html, /class="kinetic-band"/);
  assert.match(html, /class="proof-grid/);
  assert.match(html, /class="contact-stage/);
  assert.match(html, /data-reveal/);
  assert.match(html, /data-count="300"/);
  assert.match(html, /<meta[^>]+property="og:image"[^>]+og\.png/i);
  assert.doesNotMatch(html, /codex-preview|starter loading skeleton|stajlara/i);
});

test("keeps the GitHub Pages version, motion system, and project media in sync", async () => {
  const [appPage, staticPage, staticScript] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../docs/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/site.js", import.meta.url), "utf8"),
  ]);

  for (const text of [appPage, staticPage]) {
    assert.match(text, /SMG Neural Net/);
    assert.match(text, /TÜBİTAK \/ Yapay Zekâ \/ 3B Simülasyon/);
    assert.match(text, /bütünüyle Selin Türkmen’e aittir/);
    assert.match(text, /rota-tyt-ayt\.kullanici209931\.chatgpt\.site/);
    assert.match(text, /Sabancı Gençlik Hareketi — Sertifika/);
    assert.doesNotMatch(text, /öğrenci/i);
    assert.match(text, /cinematic-intro/);
    assert.match(text, /Kaydır ve keşfet/);
    assert.match(text, /hero-work-bridge/);
    assert.match(text, /Yapılan işler\./);
    assert.match(text, /Bir sonraki fikri/);
    assert.match(text, /Yeni fikirlere, ürün ekiplerine ve iş birliklerine açığım/);
  }

  assert.match(appPage, /IntersectionObserver/);
  assert.match(appPage, /--scroll-progress/);
  assert.match(appPage, /--cursor-x/);
  assert.match(staticScript, /IntersectionObserver/);
  assert.match(staticScript, /--tilt-x/);
  assert.match(staticScript, /animateCounter/);
  assert.match(staticScript, /motion-paused/);
  assert.match(staticScript, /--intro-scale/);
  assert.match(staticScript, /--portfolio-opacity/);

  await Promise.all([
    access(new URL("../public/projects/smg-neural-net.mp4", import.meta.url)),
    access(new URL("../public/projects/smg-neural-net.jpg", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../docs/projects/smg-neural-net.mp4", import.meta.url)),
    access(new URL("../docs/projects/smg-neural-net.jpg", import.meta.url)),
    access(new URL("../docs/og.png", import.meta.url)),
  ]);
});
