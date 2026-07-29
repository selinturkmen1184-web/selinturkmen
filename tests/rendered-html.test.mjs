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
  assert.match(html, /T3 Vakfı — Prototipleme Eğitimi/);
  assert.match(html, /T3 Vakfı — Görüntü İşlemeye Giriş Atölyesi/);
  assert.match(html, /Mikronex Cutting Tools — B2B E-Katalog/);
  assert.match(html, /mikronex-cutting-tools-demo\/#catalog/);
  assert.match(html, /ELLS — Otonom Çay Hasat Sistemi/);
  assert.match(html, /selinturkmen1184-web\.github\.io\/ells_\//);
  assert.match(html, /Advent World — Etkileşimli Sürpriz Takvimi/);
  assert.match(html, /selinturkmen1184-web\.github\.io\/cickutu\//);
  assert.match(html, /CİHAN: Tahtın Çağı — Oynanabilir 4X Demo/);
  assert.match(html, /selinturkmen1184-web\.github\.io\/cihan-tahtin-cagi\//);
  assert.match(html, /cihan-tahtin-cagi\/demo\/\?v=a0c9eba/);
  assert.match(html, /Bayemeyc — Mobil Commerce Deneyimi/);
  assert.match(html, /bayemeyc-app-demo\.kullanici209931\.chatgpt\.site/);
  assert.match(html, /Marinef — Marine Systems/);
  assert.match(html, /href="https:\/\/selinturkmen1184-web\.github\.io\/"/);
  assert.match(html, /Orkide Peyzaj — Kurumsal Hizmet Deneyimi/);
  assert.match(html, /selinturkmen1184-web\.github\.io\/orkide-peyzaj\//);
  assert.match(html, /Platinum Oto Galeri — Premium Otomotiv Deneyimi/);
  assert.match(html, /selinturkmen1184-web\.github\.io\/platinum-oto-galeri\//);
  assert.match(html, /Estelena Güzellik Merkezi — Randevu &amp; Bakım Deneyimi/);
  assert.match(html, /selinturkmen1184-web\.github\.io\/estelena-guzellik-merkezi\//);
  assert.match(html, /data-count="16"/);
  assert.match(html, /02 TÜBİTAK çalışması/);
  assert.doesNotMatch(html, /öğrenci/i);
  assert.doesNotMatch(html, /Altınbaş Üniversitesi/i);
  assert.match(html, /class="scroll-progress"/);
  assert.match(html, /class="cinematic-intro"/);
  assert.match(html, />Çalışmalarım<\/a>/);
  assert.match(html, /class="message-button"/);
  assert.match(html, /mailto:selinturkmeny@icloud\.com/);
  assert.match(html, /Kaydır ve keşfet/);
  assert.match(html, /src="\/og\.png"/);
  assert.match(html, /class="hero-work-bridge"/);
  assert.match(html, /<h2 id="work-title">Yapılan işler\.<\/h2>/);
  assert.match(html, /class="kinetic-band"/);
  assert.match(html, /class="proof-grid/);
  assert.match(html, /class="contact-stage/);
  assert.match(html, /class="office-stage/);
  assert.match(html, /<h2 id="office-title">Ofisimiz<span>\.<\/span><\/h2>/);
  assert.match(html, /Halkalı Caddesi No:48\/A/);
  assert.match(html, /google\.com\/maps/);
  assert.match(html, /class="callback-stage/);
  assert.match(html, /Mesaj bırakın/);
  assert.match(html, /formsubmit\.co\/selinturkmeny@icloud\.com/);
  assert.match(html, /name="_replyto"/);
  assert.match(html, /data-reveal/);
  assert.match(html, /data-count="300"/);
  assert.match(html, /<meta[^>]+property="og:image"[^>]+og\.png/i);
  assert.doesNotMatch(html, /codex-preview|starter loading skeleton|stajlara/i);
});

test("keeps the GitHub Pages version, motion system, and project media in sync", async () => {
  const [appPage, staticPage, staticScript, staticStyles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../docs/index.html", import.meta.url), "utf8"),
    readFile(new URL("../docs/site.js", import.meta.url), "utf8"),
    readFile(new URL("../docs/site.css", import.meta.url), "utf8"),
  ]);

  for (const text of [appPage, staticPage]) {
    assert.match(text, /SMG Neural Net/);
    assert.match(text, /TÜBİTAK \/ Yapay Zekâ \/ 3B Simülasyon/);
    assert.match(text, /bütünüyle Selin Türkmen’e aittir/);
    assert.match(text, /rota-tyt-ayt\.kullanici209931\.chatgpt\.site/);
    assert.match(text, /Sabancı Gençlik Hareketi — Sertifika/);
    assert.match(text, /T3 Vakfı — Prototipleme Eğitimi/);
    assert.match(text, /T3 Vakfı — Görüntü İşlemeye Giriş Atölyesi/);
    assert.match(text, /Mikronex Cutting Tools — B2B E-Katalog/);
    assert.match(text, /mikronex-cutting-tools-demo\/#catalog/);
    assert.match(text, /ELLS — Otonom Çay Hasat Sistemi/);
    assert.match(text, /selinturkmen1184-web\.github\.io\/ells_\//);
    assert.match(text, /Advent World — Etkileşimli Sürpriz Takvimi/);
    assert.match(text, /selinturkmen1184-web\.github\.io\/cickutu\//);
    assert.match(text, /CİHAN: Tahtın Çağı — Oynanabilir 4X Demo/);
    assert.match(text, /selinturkmen1184-web\.github\.io\/cihan-tahtin-cagi\//);
    assert.match(text, /cihan-tahtin-cagi\/demo\/\?v=a0c9eba/);
    assert.match(text, /Bayemeyc — Mobil Commerce Deneyimi/);
    assert.match(text, /bayemeyc-app-demo\.kullanici209931\.chatgpt\.site/);
    assert.match(text, /Marinef — Marine Systems/);
    assert.match(text, /https:\/\/selinturkmen1184-web\.github\.io\/"/);
    assert.doesNotMatch(text, /github\.io\/#marine/);
    assert.match(text, /Orkide Peyzaj — Kurumsal Hizmet Deneyimi/);
    assert.match(text, /selinturkmen1184-web\.github\.io\/orkide-peyzaj\//);
    assert.match(text, /Platinum Oto Galeri — Premium Otomotiv Deneyimi/);
    assert.match(text, /selinturkmen1184-web\.github\.io\/platinum-oto-galeri\//);
    assert.match(text, /Estelena Güzellik Merkezi — Randevu (?:&|&amp;) Bakım Deneyimi/);
    assert.match(text, /selinturkmen1184-web\.github\.io\/estelena-guzellik-merkezi\//);
    assert.match(text, /16 seçili proje/);
    assert.match(text, /<b>16<\/b> seçili proje/);
    assert.doesNotMatch(text, /15 seçili proje/);
    assert.doesNotMatch(text, /14 seçili proje/);
    assert.doesNotMatch(text, /10 seçili proje/);
    assert.doesNotMatch(text, /öğrenci/i);
    assert.doesNotMatch(text, /Altınbaş Üniversitesi/i);
    assert.match(text, /cinematic-intro/);
    assert.match(text, /Çalışmalarım/);
    assert.match(text, /message-button/);
    assert.match(text, /mailto:selinturkmeny@icloud\.com/);
    assert.match(text, /Mesaj gönder/);
    assert.match(text, /Kaydır ve keşfet/);
    assert.match(text, /hero-work-bridge/);
    assert.match(text, /Yapılan işler\./);
    assert.match(text, /Bir sonraki fikri/);
    assert.match(text, /office-stage/);
    assert.match(text, /Ofisimiz/);
    assert.match(text, /Süleyman Hastanesi Yanı/);
    assert.match(text, /Halkalı Caddesi No:48\/A/);
    assert.match(text, /Yol tarifi al/);
    assert.match(text, /callback-stage/);
    assert.match(text, /Mesaj bırakın/);
    assert.match(text, /Size dönelim/);
    assert.match(text, /formsubmit\.co\/selinturkmeny@icloud\.com/);
    assert.match(text, /name="_honey"/);
    assert.doesNotMatch(text, /name="_captcha"[\s\S]{0,80}value="false"/);
    assert.match(text, /Yeni fikirlere, ürün ekiplerine ve iş birliklerine açığım/);
    assert.match(text, /rota-live-preview/);
    assert.doesNotMatch(text, /Haftalık ilerleme|Hedefe 3 oturum kaldı|%74/);
    assert.match(text, /ells-live-preview/);
    assert.doesNotMatch(text, /Akıllı hasat|Zorlu araziye hazır|∞/);
  }

  assert.match(staticPage, /<iframe[\s\S]+rota-tyt-ayt\.kullanici209931\.chatgpt\.site/);
  assert.match(staticStyles, /\.rota-live-preview\s*\{/);
  assert.match(appPage, /IntersectionObserver/);
  assert.match(appPage, /--scroll-progress/);
  assert.match(appPage, /--cursor-x/);
  assert.match(staticScript, /IntersectionObserver/);
  assert.match(staticScript, /--tilt-x/);
  assert.match(staticScript, /animateCounter/);
  assert.match(staticScript, /motion-paused/);
  assert.match(staticScript, /--intro-scale/);
  assert.match(staticScript, /--portfolio-opacity/);
  assert.match(
    staticStyles,
    /\.cinematic-intro\s*\{[^}]*pointer-events:\s*none;[^}]*background:\s*transparent;/s,
  );
  assert.match(staticStyles, /\.mikronex-preview\s*\{/);
  assert.match(staticStyles, /\.ells-live-preview\s*\{/);
  assert.match(staticStyles, /\.cici-live-preview\s*\{/);
  assert.match(staticStyles, /\.cihan-live-preview\s*\{/);
  assert.match(staticStyles, /\.bayemeyc-live-preview\s*\{/);
  assert.match(staticStyles, /\.external-live-preview\s*\{/);
  assert.match(staticStyles, /\.external-live-preview--platinum\s*\{/);
  assert.match(staticStyles, /\.external-live-preview--estelena\s*\{/);
  assert.match(staticStyles, /@media \(max-width: 700px\)/);
  assert.match(
    staticStyles,
    /\.js-enhanced \.cinematic-intro\s*\{[^}]*height:\s*100svh;[^}]*min-height:\s*560px;/s,
  );
  assert.match(
    staticStyles,
    /\.external-live-preview iframe\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*transform:\s*none;/s,
  );
  assert.match(
    staticStyles,
    /\.callback-form input,[\s\S]*?\.callback-form textarea\s*\{[^}]*font-size:\s*16px;/,
  );
  assert.match(staticStyles, /\.project-demo\s*\{/);
  assert.match(staticStyles, /\.message-button\s*\{/);
  assert.match(staticStyles, /\.office-map iframe\s*\{/);
  assert.match(staticStyles, /\.callback-form\s*\{/);
  assert.match(staticStyles, /\.callback-success:target\s*\{/);
  assert.match(staticPage, /<iframe[\s\S]+google\.com\/maps\?q=/);
  assert.match(staticPage, /<iframe[\s\S]+selinturkmen1184-web\.github\.io\/cickutu\//);
  assert.match(staticPage, /<iframe[\s\S]+selinturkmen1184-web\.github\.io\/ells_\//);
  assert.match(staticPage, /<iframe[\s\S]+selinturkmen1184-web\.github\.io\/cihan-tahtin-cagi\//);
  assert.match(staticPage, /<iframe[\s\S]+bayemeyc-app-demo\.kullanici209931\.chatgpt\.site/);
  assert.match(
    staticPage,
    /external-live-preview--marine[\s\S]+src="https:\/\/selinturkmen1184-web\.github\.io\/"/,
  );
  assert.match(staticPage, /<iframe[\s\S]+selinturkmen1184-web\.github\.io\/orkide-peyzaj\//);
  assert.match(staticPage, /<iframe[\s\S]+selinturkmen1184-web\.github\.io\/platinum-oto-galeri\//);
  assert.match(staticPage, /<iframe[\s\S]+selinturkmen1184-web\.github\.io\/estelena-guzellik-merkezi\//);
  assert.match(staticPage, /site\.css\?v=mobile-20260729/);

  await Promise.all([
    access(new URL("../public/projects/smg-neural-net.mp4", import.meta.url)),
    access(new URL("../public/projects/smg-neural-net.jpg", import.meta.url)),
    access(new URL("../public/og.png", import.meta.url)),
    access(new URL("../docs/projects/smg-neural-net.mp4", import.meta.url)),
    access(new URL("../docs/projects/smg-neural-net.jpg", import.meta.url)),
    access(new URL("../docs/og.png", import.meta.url)),
  ]);
});
