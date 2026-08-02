"use client";

import { useEffect, useState } from "react";

const projects = [
  {
    index: "01",
    title: "Tarımsal Otonom Robot Simülasyonu",
    kicker: "TÜBİTAK / ROS2 / Gazebo",
    description:
      "Tarımsal saha görevlerini otonomlaştırmak için ROS2 ve Gazebo üzerinde geliştirilen; görev akışı, sensörler ve operasyon arayüzünü birleştiren robotik simülasyon.",
    video: "/projects/nexora.mp4",
    poster: "/projects/nexora.jpg",
    className: "project-card project-card--lead",
  },
  {
    index: "02",
    title: "Yemekgrow Growth Dashboard",
    kicker: "Web / Veri / Büyüme",
    description:
      "Restoranların sipariş, ciro ve kampanya performansını yalın bir yönetim ekranında birleştiren büyüme paneli.",
    video: "/projects/yemekgrow.mp4",
    poster: "/projects/yemekgrow.jpg",
    className: "project-card project-card--wide",
  },
  {
    index: "03",
    title: "Cennet Mobile Companion",
    kicker: "Mobil / Ürün Deneyimi",
    description:
      "Günlük akış, ibadet, dua ve keşif deneyimlerini gece-gündüz arayüzünde buluşturan mobil ürün çalışması.",
    video: "/projects/cennet.mp4",
    poster: "/projects/cennet.jpg",
    className: "project-card project-card--compact",
  },
  {
    index: "04",
    title: "Platinum Auto Service",
    kicker: "Web / Hizmet Tasarımı",
    description:
      "Servis kataloğu, fiyat aralıkları ve randevu akışını güven veren koyu bir arayüzde buluşturan web deneyimi.",
    video: "/projects/platinum.mp4",
    poster: "/projects/platinum.jpg",
    className: "project-card project-card--compact",
  },
  {
    index: "05",
    title: "SMG Neural Net",
    kicker: "TÜBİTAK / Yapay Zekâ / 3B Simülasyon",
    description:
      "300 nöron ve 1.338 bağlantıyı; duyusal girdiler, hipokampus, amigdala, STG ve MTG katmanlarıyla gerçek zamanlı görselleştiren etkileşimli sinir ağı simülasyonu.",
    video: "/projects/smg-neural-net.mp4",
    poster: "/projects/smg-neural-net.jpg",
    className: "project-card project-card--wide",
  },
  {
    index: "06",
    title: "Tarımsal Drone — Tasarım ve Üretim",
    kicker: "Özgün Üretim / Drone / Tarım",
    description:
      "Tarımsal dronun tasarımı, üretimi, uçuş uygulaması ve tanıtım filminin yaratıcı süreci bütünüyle Selin Türkmen’e aittir.",
    video: "/projects/drone.mp4",
    poster: "/projects/drone.jpg",
    className: "project-card project-card--lead",
  },
  {
    index: "07",
    title: "Rota — Kişisel TYT & AYT Çalışma Ajandası",
    kicker: "Eğitim Teknolojisi / Kişisel Planlama / Web",
    description:
      "Konuları, kaynakları, günlük çalışmaları ve saatleri kişiye özel tek bir ajandada birleştiren; ChatGPT ile giriş ve hesap bazlı veri ayrımı sunan TYT & AYT çalışma uygulaması.",
    href: "https://rota-tyt-ayt.kullanici209931.chatgpt.site/",
    preview: "rota",
    className: "project-card project-card--rota",
  },
  {
    index: "08",
    title: "Mikronex Cutting Tools — B2B E-Katalog",
    kicker: "B2B E-Ticaret / Ürün Kataloğu / Web",
    description:
      "Karbür freze, matkap, torna ucu ve takım tutucuları; kategori keşfi, ürün filtreleri, sepet ve teknik teklif akışıyla birleştiren endüstriyel e-ticaret deneyimi.",
    href: "https://selinturkmen1184-web.github.io/mikronex-cutting-tools-demo/#catalog",
    preview: "mikronex",
    className: "project-card project-card--mikronex project-card--full",
  },
  {
    index: "09",
    title: "ELLS — Otonom Çay Hasat Sistemi",
    kicker: "Tarım Teknolojileri / Yapay Zekâ / Otonom Sistem",
    description:
      "Zorlu arazilerde çay hasadını; yapay zekâ destekli algılama, görev planlama ve saha uyumlu mekanik yaklaşımla daha kontrollü, izlenebilir ve ölçeklenebilir kılan ürün deneyimi.",
    href: "https://selinturkmen1184-web.github.io/ells_/",
    preview: "ells",
    className: "project-card project-card--lead project-card--ells",
  },
  {
    index: "10",
    title: "Advent World — Etkileşimli Sürpriz Takvimi",
    kicker: "Etkileşimli Web / Oyunlaştırma / Kişiselleştirme",
    description:
      "24 gün ve 24 sürprizi; Spiritüel, Masal ve Gelişim temaları, mini oyunlar, kupalar, rozetler, galeri ve kişisel anılarla birleştiren etkileşimli advent deneyimi.",
    href: "https://selinturkmen1184-web.github.io/cickutu/",
    preview: "cici",
    className: "project-card project-card--wide project-card--cici",
  },
  {
    index: "11",
    title: "CİHAN: Tahtın Çağı — Oynanabilir 4X Demo",
    kicker: "Oynanabilir Demo / Oyun Tasarımı / Tarihî 4X",
    description:
      "Mobil-first tarihî 4X vizyonunu; başkent yönetimi, beş kararlı sınır kalesi kuşatması, gerçek zamanlı savaş, kaynaklar, kahramanlar ve ittifak ekranlarıyla tarayıcıda oynanabilir bir demoya dönüştüren deneyim.",
    href: "https://selinturkmen1184-web.github.io/cihan-tahtin-cagi/",
    demoHref: "https://selinturkmen1184-web.github.io/cihan-tahtin-cagi/demo/?v=a0c9eba",
    preview: "cihan",
    className: "project-card project-card--full project-card--cihan",
  },
  {
    index: "12",
    title: "Bayemeyc — Mobil Commerce Deneyimi",
    kicker: "Mobil Ticaret / E-Ticaret / Ürün Deneyimi",
    description:
      "Yeni sezon koleksiyonlarını; kategori keşfi, favoriler, hızlı sepete ekleme, kampanyalar, kişiselleştirilmiş seçkiler, Shop the Look ve üyelik avantajlarıyla birleştiren etkileşimli mobil alışveriş deneyimi.",
    href: "https://bayemeyc-app-demo.kullanici209931.chatgpt.site/",
    preview: "bayemeyc",
    className: "project-card project-card--full project-card--bayemeyc",
  },
  {
    index: "13",
    title: "Marinef — Marine Systems",
    kicker: "Denizcilik / Hidrolik Sistemler / Kurumsal Web",
    description:
      "Modern yatlar için tekne mimarisine uyum sağlayan; geri çekilebilir pasarella, hidrolik dış pasarella ve özel kapı sistemlerini keşiften devreye almaya uzanan akışla sunan kurumsal ürün deneyimi.",
    href: "https://selinturkmen1184-web.github.io/",
    preview: "marine",
    className: "project-card project-card--lead project-card--marine",
  },
  {
    index: "14",
    title: "Orkide Peyzaj — Kurumsal Hizmet Deneyimi",
    kicker: "Peyzaj / Hizmet Tasarımı / Dönüşüm Odaklı Web",
    description:
      "Ege ve Akdeniz genelindeki peyzaj planlama, bahçe düzenleme, otomatik sulama, budama, rulo çim ve periyodik bakım hizmetlerini bir araya getiren kurumsal web deneyimi.",
    href: "https://orkidepeyzaj.com.tr/?v=2.2.8",
    preview: "orkide",
    className: "project-card project-card--wide project-card--orkide",
  },
  {
    index: "15",
    title: "Platinum Oto Galeri — Premium Otomotiv Deneyimi",
    kicker: "Otomotiv / Dijital Galeri / Kurumsal Web",
    description:
      "Seçkin otomobil koleksiyonunu; güncel araç vitrini, marka ve yakıt filtreleri, finansman, konsinye satış, kişisel danışmanlık ve Instagram iletişim akışıyla birleştiren premium dijital galeri deneyimi.",
    href: "https://selinturkmen1184-web.github.io/platinum-oto-galeri/",
    preview: "platinum",
    className: "project-card project-card--full project-card--platinum",
  },
  {
    index: "16",
    title: "Estelena Güzellik Merkezi — Randevu & Bakım Deneyimi",
    kicker: "Güzellik / Akıllı Randevu / E-Ticaret",
    description:
      "Uzman müsaitliğine göre akıllı randevuyu; kişisel bakım deneyimi ve seçili güzellik ürünleri mağazasıyla tek bir zarif dijital akışta buluşturan güzellik merkezi platformu.",
    href: "https://selinturkmen1184-web.github.io/estelena-guzellik-merkezi/",
    preview: "estelena",
    className: "project-card project-card--full project-card--estelena",
  },
  {
    index: "17",
    title: "Eda Foto Baskı — Kişiye Özel Baskı Mağazası",
    kicker: "E-Ticaret / Fotoğraf Baskı / Kişiselleştirme",
    description:
      "Buzdolabı magnetleri, 10 × 15 fotoğraf baskıları ve albümlü paketleri; telefondan fotoğraf yükleme, kargo takibi ve güvenli sipariş akışıyla birleştiren kişiselleştirilmiş e-ticaret deneyimi.",
    href: "https://www.edafotobaski.com/?logo_kontrol=1601",
    preview: "eda",
    className: "project-card project-card--full project-card--eda",
  },
  {
    index: "18",
    title: "GLOWROAD — High Visibility Advantage",
    kicker: "Yol Güvenliği / Endüstriyel Ürünler / Kurumsal Web",
    description:
      "Yol çizgi uygulamaları için yüksek performanslı cam kürecikleri ve görünürlük çözümlerini; ürünler, kataloglar, sertifikalar ve çok dilli içerikle sunan kurumsal platform.",
    href: "http://glowroad.com.tr/?v=202608011440",
    preview: "glowroad",
    previewTitle: "GLOWROAD",
    previewTagline: "HIGH VISIBILITY ADVANTAGE",
    previewDomain: "glowroad.com.tr",
    className: "project-card project-card--lead project-card--glowroad",
  },
  {
    index: "19",
    title: "SIGNALIX — Trafik Güvenliğinde Net Yön",
    kicker: "Trafik Sistemleri / Yönlendirme / Kurumsal Web",
    description:
      "Trafik levhaları, yönlendirme sistemleri, taşıyıcı konstrüksiyonlar ve yol güvenliği çözümlerini güçlü bir kurumsal ürün anlatısında birleştiren dijital deneyim.",
    href: "http://signalix.tr/?v=202608011348",
    preview: "signalix",
    previewTitle: "SIGNALIX",
    previewTagline: "TRAFİK GÜVENLİĞİNDE NET YÖN",
    previewDomain: "signalix.tr",
    className: "project-card project-card--wide project-card--signalix",
  },
  {
    index: "20",
    title: "STELLGARD — Çelik Yol Güvenliği Sistemleri",
    kicker: "Çelik Sistemler / Otokorkuluk / Kurumsal Web",
    description:
      "Çelik otokorkuluk, köprü bariyeri ve yol güvenliği sistemlerini dayanım, mühendislik ve ürün odağında sunan endüstriyel kurumsal web deneyimi.",
    href: "http://stellgard.com.tr/?v=202608010730",
    preview: "stellgard",
    previewTitle: "STELLGARD",
    previewTagline: "SOLID STEEL, SMARTER ROADS",
    previewDomain: "stellgard.com.tr",
    className: "project-card project-card--wide project-card--stellgard",
  },
  {
    index: "21",
    title: "LineTech — High Performance Markings",
    kicker: "Yol Teknolojileri / Ürün Kataloğu / Kurumsal Web",
    description:
      "Yol çizgi boyaları, uygulama ekipmanları, yol tabelaları, bariyer ve trafik güvenliği çözümlerini katalog, sertifika ve iletişim akışlarıyla buluşturan kurumsal platform.",
    href: "https://www.line-tech.com.tr/?v=202607312210",
    preview: "linetech",
    className: "project-card project-card--lead project-card--linetech",
  },
  {
    index: "22",
    title: "Pati Studio — B2B Çorap Kataloğu",
    kicker: "B2B / Toptan Katalog / Teklif Akışı",
    description:
      "Özel markalara yönelik çorap koleksiyonlarını; Türkçe ve İngilizce dil seçenekleri, akıllı ürün filtreleri, numune listesi ve hızlı fiyat teklifi akışıyla buluşturan interaktif katalog deneyimi.",
    href: "https://selinturkmen1184-web.github.io/pati-studio-demo/?v=0cc6531#top",
    preview: "pati",
    className: "project-card project-card--full project-card--pati",
  },
];

export default function Home() {
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const projectCards = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
    const navSections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav-section]"));
    const header = document.querySelector<HTMLElement>(".site-header");
    const cinematicIntro = document.querySelector<HTMLElement>(".cinematic-intro");
    const launchScreen = document.querySelector<HTMLElement>(".launch-screen");
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const tiltFrames = new Map<HTMLElement, number>();
    const counterFrames = new Map<HTMLElement, number>();

    root.classList.add("js-enhanced");
    root.classList.toggle("motion-paused", prefersReducedMotion);
    setMotionPaused(prefersReducedMotion);

    const dismissLaunchScreen = () => launchScreen?.classList.add("is-dismissed");
    if (prefersReducedMotion) dismissLaunchScreen();
    const launchDismissTimer = window.setTimeout(dismissLaunchScreen, 2200);

    revealElements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${Math.min((index % 6) * 70, 350)}ms`);
    });

    let revealObserver: IntersectionObserver | null = null;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8%" },
      );
      revealElements.forEach((element) => revealObserver?.observe(element));
    }

    const resetCard = (card: HTMLElement) => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--pointer-x", "50%");
      card.style.setProperty("--pointer-y", "50%");
    };

    const cardHandlers = projectCards.map((card) => {
      resetCard(card);

      const handlePointerMove = (event: PointerEvent) => {
        if (root.classList.contains("motion-paused") || !finePointer) {
          return;
        }

        const rect = card.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
        const previousFrame = tiltFrames.get(card);
        if (previousFrame) window.cancelAnimationFrame(previousFrame);

        const frame = window.requestAnimationFrame(() => {
          card.style.setProperty("--tilt-x", `${(0.5 - y) * 4}deg`);
          card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
          card.style.setProperty("--pointer-x", `${x * 100}%`);
          card.style.setProperty("--pointer-y", `${y * 100}%`);
        });
        tiltFrames.set(card, frame);
      };

      const handlePointerLeave = () => resetCard(card);
      card.addEventListener("pointermove", handlePointerMove);
      card.addEventListener("pointerleave", handlePointerLeave);

      return { card, handlePointerMove, handlePointerLeave };
    });

    let pointerFrame = 0;
    const handlePointerMove = (event: PointerEvent) => {
      if (!finePointer || root.classList.contains("motion-paused")) return;
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      pointerFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--cursor-x", `${event.clientX}px`);
        root.style.setProperty("--cursor-y", `${event.clientY}px`);
        root.style.setProperty("--hero-x", `${(event.clientX / window.innerWidth - 0.5) * 18}px`);
        root.style.setProperty("--hero-y", `${(event.clientY / window.innerHeight - 0.5) * 18}px`);
      });
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const animateCounter = (element: HTMLElement) => {
      const target = Number(element.dataset.count ?? "0");
      if (!Number.isFinite(target)) return;
      const suffix = element.dataset.suffix ?? "";
      const prefix = element.dataset.prefix ?? "";
      const pad = Number(element.dataset.pad ?? "0");

      if (prefersReducedMotion) {
        element.textContent = `${prefix}${String(target).padStart(pad, "0")}${suffix}`;
        return;
      }

      const start = performance.now();
      const duration = 1150;
      const tick = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = Math.round(target * eased);
        element.textContent = `${prefix}${String(value).padStart(pad, "0")}${suffix}`;
        if (progress < 1) {
          counterFrames.set(element, window.requestAnimationFrame(tick));
        }
      };
      counterFrames.set(element, window.requestAnimationFrame(tick));
    };

    let counterObserver: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target as HTMLElement);
            counterObserver?.unobserve(entry.target);
          });
        },
        { threshold: 0.55 },
      );
      counters.forEach((counter) => counterObserver?.observe(counter));
    } else {
      counters.forEach(animateCounter);
    }

    let sectionObserver: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      sectionObserver = new IntersectionObserver(
        (entries) => {
          const current = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
          if (!current) return;
          const id = current.target.id;
          navLinks.forEach((link) => {
            const active = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("is-active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        },
        { rootMargin: "-28% 0px -58%", threshold: [0.08, 0.3, 0.6] },
      );
      navSections.forEach((section) => sectionObserver?.observe(section));
    }

    let scrollFrame = 0;
    const updateScrollEffects = () => {
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
    };
    const handleScroll = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollEffects);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    updateScrollEffects();
    window.requestAnimationFrame(() => root.classList.add("hero-ready"));

    if (prefersReducedMotion) {
      document.querySelectorAll("video").forEach((video) => video.pause());
    }

    return () => {
      revealObserver?.disconnect();
      counterObserver?.disconnect();
      sectionObserver?.disconnect();
      window.clearTimeout(launchDismissTimer);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
      tiltFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      counterFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      cardHandlers.forEach(({ card, handlePointerMove, handlePointerLeave }) => {
        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerleave", handlePointerLeave);
      });
      root.classList.remove("js-enhanced", "hero-ready", "motion-paused");
      root.style.removeProperty("--scroll-progress");
      root.style.removeProperty("--hero-title-shift");
      root.style.removeProperty("--intro-scale");
      root.style.removeProperty("--intro-opacity");
      root.style.removeProperty("--intro-blur");
      root.style.removeProperty("--intro-shift");
      root.style.removeProperty("--intro-copy-shift");
      root.style.removeProperty("--intro-copy-opacity");
      root.style.removeProperty("--portfolio-opacity");
      root.style.removeProperty("--portfolio-y");
      root.style.removeProperty("--cursor-x");
      root.style.removeProperty("--cursor-y");
      root.style.removeProperty("--hero-x");
      root.style.removeProperty("--hero-y");
    };
  }, []);

  const toggleMotion = () => {
    const nextPaused = !motionPaused;
    const videos = document.querySelectorAll("video");
    document.documentElement.classList.toggle("motion-paused", nextPaused);

    if (!nextPaused) {
      videos.forEach((video) => void video.play());
    } else {
      videos.forEach((video) => video.pause());
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) =>
        element.classList.add("is-visible"),
      );
      document.querySelectorAll<HTMLElement>(".project-card").forEach((card) => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    }
    setMotionPaused(nextPaused);
  };

  return (
    <main>
      <div className="grain" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />
      <div className="cursor-aura" aria-hidden="true" />
      <div className="launch-screen" aria-hidden="true">
        <span>ST</span>
        <p>Sistemler hazırlanıyor / 2026</p>
      </div>

      <section
        className="cinematic-intro"
        id="top"
        aria-label="Selin Türkmen sinematik portfolyo girişi"
      >
        <div className="cinematic-intro__sticky">
          <img
            className="cinematic-intro__backdrop"
            src="/og.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="cinematic-intro__image"
            src="/og.png"
            alt="Robotik kol, tarımsal drone ve yapay zekâ ağıyla Selin Türkmen portfolyosu"
          />
          <div className="cinematic-intro__veil" aria-hidden="true" />
          <div className="cinematic-intro__frame" aria-hidden="true">
            <span>ST / SYSTEM 00</span>
            <span>SCROLL TO ENTER</span>
          </div>
          <div className="cinematic-intro__scroll" aria-hidden="true">
            <span>Kaydır ve keşfet</span>
            <i />
          </div>
        </div>
      </section>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Selin Türkmen ana sayfa">
          <span className="status-dot" aria-hidden="true" />
          ST / PORTFOLYO 2026
        </a>
        <nav aria-label="Ana menü">
          <a href="#isler" data-nav>Çalışmalarım</a>
          <a href="#tubitak" data-nav>TÜBİTAK</a>
          <a href="#profil" data-nav>Profil</a>
          <a href="#yetkinlikler" data-nav>Yetkinlikler</a>
        </nav>
        <div className="header-actions">
          <a
            className="message-button"
            href="mailto:selinturkmeny@icloud.com?subject=Portfolyo%20%C3%BCzerinden%20ileti%C5%9Fim"
            aria-label="Selin Türkmen'e e-posta ile mesaj gönder"
          >
            Mesaj gönder
            <span aria-hidden="true">↗</span>
          </a>
          <button
            className="motion-toggle"
            type="button"
            aria-pressed={motionPaused}
            onClick={toggleMotion}
          >
            <span aria-hidden="true">{motionPaused ? "▶" : "Ⅱ"}</span>
            {motionPaused ? "Hareketi başlat" : "Hareketi durdur"}
          </button>
        </div>
      </header>

      <section className="hero" id="portfolio" aria-labelledby="hero-title" data-nav-section>
        <div className="hero-orbit" aria-hidden="true">
          <span />
          <i />
        </div>
        <p className="hero-coordinates" aria-hidden="true">41.0082° N / 28.9784° E</p>
        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden="true" /> Robotik × Yapay zekâ × Dijital ürün
          </p>
          <h1 id="hero-title">
            <span>Selin</span>
            <span className="outline-text">Türkmen</span>
          </h1>
          <a className="hero-work-bridge" href="#isler" aria-label="Yapılan işlere geç">
            <strong>Yapılan işler</strong>
            <span>
              <b>22</b> seçili proje
              <i aria-hidden="true">↓</i>
            </span>
          </a>
          <div className="hero-bottom">
            <p className="hero-intro">
              Yazılım mühendisliği ve yönetim bilişim sistemleri perspektifini;
              robotik, web ve siber güvenlik projelerinde teknik olarak sağlam,
              görsel olarak hatırlanan deneyimlere dönüştürüyorum.
            </p>
            <div className="hero-actions">
              <a href="#isler">Projeleri keşfet <span aria-hidden="true">↓</span></a>
              <a href="/selin-turkmen-cv.pdf" download>Profili indir <span aria-hidden="true">↘</span></a>
            </div>
            <dl className="hero-facts">
              <div>
                <dt>Odak</dt>
                <dd>Robotik / ROS2</dd>
              </div>
              <div>
                <dt>Araştırma</dt>
                <dd>TÜBİTAK / Ar-Ge</dd>
              </div>
              <div>
                <dt>Pratik</dt>
                <dd>Web geliştirme</dd>
              </div>
              <div>
                <dt>Disiplin</dt>
                <dd>Siber güvenlik</dd>
              </div>
            </dl>
          </div>
        </div>

        <article
          className="featured-project reveal reveal--right"
          data-reveal
          aria-label="Öne çıkan proje: Tarımsal Otonom Robot Simülasyonu"
        >
          <div className="featured-meta">
            <span>Öne çıkan sistem / 01</span>
            <span className="availability">Geliştiriliyor</span>
          </div>
          <div className="featured-media">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/projects/nexora.jpg"
              aria-label="Nexora robot operasyon arayüzü ekran kaydı"
            >
              <source src="/projects/nexora.mp4" type="video/mp4" />
            </video>
            <div className="media-hud" aria-hidden="true">
              <span>SYS / ONLINE</span>
              <span>ROS2 · GZ-11</span>
            </div>
            <span className="scan-line" aria-hidden="true" />
          </div>
          <div className="featured-title-row">
            <h2>Tarımsal Otonom Robot Simülasyonu</h2>
            <p>TÜBİTAK<br />ROS2<br />Gazebo</p>
          </div>
        </article>
      </section>

      <section className="kinetic-band" aria-label="Uzmanlık alanları">
        <div>
          <span>ROBOTİK</span><i>×</i><span>YAPAY ZEKÂ</span><i>×</i>
          <span>WEB SİSTEMLERİ</span><i>×</i><span>SİBER GÜVENLİK</span><i>×</i>
          <span>ÜRÜN DENEYİMİ</span><i>×</i><span>ROBOTİK</span><i>×</i>
          <span>YAPAY ZEKÂ</span><i>×</i><span>WEB SİSTEMLERİ</span><i>×</i>
          <span>SİBER GÜVENLİK</span><i>×</i><span>ÜRÜN DENEYİMİ</span><i>×</i>
        </div>
      </section>

      <section className="work" id="isler" aria-labelledby="work-title" data-nav-section>
        <div className="section-heading reveal" data-reveal>
          <div>
            <p className="section-index">22 seçili proje · 02 TÜBİTAK çalışması</p>
            <h2 id="work-title">Yapılan işler.</h2>
          </div>
          <p>2024 — 2026</p>
        </div>

        <aside
          className="research-note reveal"
          data-reveal
          id="tubitak"
          data-nav-section
          aria-label="TÜBİTAK araştırma projeleri"
        >
          <span>TÜBİTAK / Ar-Ge</span>
          <p>Otonom tarım robotlarından gerçek zamanlı sinir ağı simülasyonlarına.</p>
          <strong>02 proje</strong>
        </aside>

        <div className="project-grid">
          {projects.map((project) => (
            <article
              className={`${project.className} reveal`}
              data-reveal
              data-project={project.index}
              key={project.title}
            >
              <div className="project-media">
                {project.preview === "rota" ? (
                  <div
                    className="rota-live-preview"
                    aria-label="Rota kişisel TYT ve AYT çalışma ajandası canlı proje önizlemesi"
                  >
                    <iframe
                      src="https://rota-tyt-ayt.kullanici209931.chatgpt.site/"
                      title="Rota — Kişisel TYT & AYT Çalışma Ajandası canlı önizlemesi"
                      loading="lazy"
                      tabIndex={-1}
                    />
                    <span className="rota-live-preview__badge" aria-hidden="true">
                      Gerçek proje / canlı arayüz
                    </span>
                  </div>
                ) : project.preview === "mikronex" ? (
                  <div
                    className="mikronex-preview"
                    aria-label="Mikronex Cutting Tools B2B e-katalog arayüz önizlemesi"
                  >
                    <div className="mikronex-preview__top">
                      <span aria-hidden="true">M</span>
                      <strong>MIKRONEX</strong>
                      <small>CUTTING TOOLS / B2B</small>
                    </div>
                    <div className="mikronex-preview__body">
                      <p>Kesici takımlarda yeni nesil performans</p>
                      <h4>
                        Hassas işleme.
                        <span>Yüksek performans.</span>
                      </h4>
                      <div className="mikronex-preview__catalog" aria-hidden="true">
                        <span><b>MX-F4-080</b><i>4 Ağızlı Karbür Freze</i><strong>1.290 ₺</strong></span>
                        <span><b>MX-D5-085</b><i>5D Karbür Matkap</i><strong>1.890 ₺</strong></span>
                        <span><b>MX-CNMG-1204</b><i>Çelik Tornalama Ucu</i><strong>590 ₺</strong></span>
                      </div>
                    </div>
                  </div>
                ) : project.preview === "ells" ? (
                  <div
                    className="ells-live-preview"
                    aria-label="ELLS otonom çay hasat sistemi canlı proje önizlemesi"
                  >
                    <iframe
                      src="https://selinturkmen1184-web.github.io/ells_/"
                      title="ELLS — Otonom Çay Hasat Sistemi canlı önizlemesi"
                      loading="lazy"
                      tabIndex={-1}
                    />
                    <span className="ells-live-preview__badge" aria-hidden="true">
                      Gerçek proje / canlı arayüz
                    </span>
                  </div>
                ) : project.preview === "cici" ? (
                  <div
                    className="cici-live-preview"
                    aria-label="Advent World canlı proje önizlemesi"
                  >
                    <iframe
                      src="https://selinturkmen1184-web.github.io/cickutu/"
                      title="Advent World — Etkileşimli Sürpriz Takvimi canlı önizlemesi"
                      loading="lazy"
                      tabIndex={-1}
                    />
                    <span className="cici-live-preview__badge" aria-hidden="true">
                      Gerçek proje / canlı arayüz
                    </span>
                  </div>
                ) : project.preview === "cihan" ? (
                  <div
                    className="cihan-live-preview"
                    aria-label="CİHAN Tahtın Çağı canlı proje önizlemesi"
                  >
                    <iframe
                      src="https://selinturkmen1184-web.github.io/cihan-tahtin-cagi/demo/?v=a0c9eba"
                      title="CİHAN: Sınır Kalesi — Oynanabilir Demo canlı önizlemesi"
                      loading="lazy"
                      tabIndex={-1}
                    />
                    <span className="cihan-live-preview__badge" aria-hidden="true">
                      Gerçek proje / canlı arayüz
                    </span>
                  </div>
                ) : project.preview === "bayemeyc" ? (
                  <div
                    className="bayemeyc-live-preview"
                    aria-label="Bayemeyc mobil uygulama canlı proje önizlemesi"
                  >
                    <iframe
                      src="https://bayemeyc-app-demo.kullanici209931.chatgpt.site/"
                      title="Bayemeyc Mobil Uygulama Demosu canlı önizlemesi"
                      loading="lazy"
                      tabIndex={-1}
                    />
                    <span className="bayemeyc-live-preview__badge" aria-hidden="true">
                      Gerçek proje / canlı arayüz
                    </span>
                  </div>
                ) : project.preview === "marine" ||
                  project.preview === "orkide" ||
                  project.preview === "platinum" ||
                  project.preview === "estelena" ||
                  project.preview === "eda" ||
                  project.preview === "linetech" ||
                  project.preview === "pati" ? (
                  <div
                    className={`external-live-preview external-live-preview--${project.preview}`}
                    aria-label={`${project.title} canlı proje önizlemesi`}
                  >
                    <iframe
                      src={project.href}
                      title={`${project.title} canlı önizlemesi`}
                      loading="lazy"
                      tabIndex={-1}
                    />
                    <span className="external-live-preview__badge" aria-hidden="true">
                      Gerçek proje / canlı arayüz
                    </span>
                  </div>
                ) : project.preview === "glowroad" ||
                  project.preview === "signalix" ||
                  project.preview === "stellgard" ? (
                  <div
                    className={`external-link-preview external-link-preview--${project.preview}`}
                    aria-label={`${project.title} resmi site bağlantısı`}
                  >
                    <span className="external-link-preview__eyebrow">Gerçek proje / resmi site</span>
                    <strong>{project.previewTitle}</strong>
                    <p>{project.previewTagline}</p>
                    <span className="external-link-preview__domain">{project.previewDomain} ↗</span>
                  </div>
                ) : (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster={project.poster}
                    aria-label={`${project.title} proje ekran kaydı`}
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                )}
                <span className="project-number">{project.index}</span>
                {project.href ? (
                  <a
                    className="project-view"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} projesini yeni sekmede aç`}
                  >
                    PROJEYİ AÇ ↗
                  </a>
                ) : (
                  <span className="project-view">CANLI ÖNİZLEME</span>
                )}
                {project.demoHref ? (
                  <a
                    className="project-demo"
                    href={project.demoHref}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} demosunu yeni sekmede oyna`}
                  >
                    DEMOYU OYNA ↗
                  </a>
                ) : null}
              </div>
              <div className="project-copy">
                <p>{project.kicker}</p>
                <h3>{project.title}</h3>
                <span>{project.description}</span>
                <div className="project-signal" aria-hidden="true">
                  <span>CASE / {project.index}</span>
                  <i />
                  <span>SELİN TÜRKMEN</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="proof-grid reveal" data-reveal aria-label="Portfolyo özeti">
          <article>
            <strong data-count="22" data-pad="2">22</strong>
            <span>Seçili dijital ve fiziksel proje</span>
          </article>
          <article>
            <strong data-count="2" data-pad="2">02</strong>
            <span>TÜBİTAK araştırma çalışması</span>
          </article>
          <article>
            <strong data-count="300">300</strong>
            <span>Gerçek zamanlı görselleştirilen nöron</span>
          </article>
          <article>
            <strong data-count="1" data-pad="2">01</strong>
            <span>Tasarımı ve üretimi bana ait drone</span>
          </article>
        </div>
      </section>

      <section className="profile" id="profil" aria-labelledby="profile-title" data-nav-section>
        <div className="profile-lead reveal" data-reveal>
          <p className="section-index">Profil / 02</p>
          <h2 id="profile-title">
            Kodun mantığıyla,<br />tasarımın sezgisini birleştiriyorum.
          </h2>
          <p>
            Yazılım mühendisliği ve yönetim bilişim sistemleri bilgisini; robotik
            simülasyonlardan yönetim panellerine, mobil deneyimlerden görsel anlatıya
            uzanan disiplinler arası projelerde birleştiriyorum. İyi bir ürünün yalnızca
            çalışması değil, kendini açıkça anlatması gerektiğine inanıyorum.
          </p>
          <a className="cv-link" href="/selin-turkmen-cv.pdf" download>
            CV’yi indir <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className="profile-details reveal reveal--right" data-reveal>
          <div className="detail-block">
            <span>01 / Akademik temel</span>
            <p>Yazılım Mühendisliği</p>
            <h3>Anadolu Üniversitesi</h3>
            <p>Yönetim Bilişim Sistemleri — ÇAP</p>
          </div>
          <div className="detail-block">
            <span>02 / Programlar &amp; Sertifikalar</span>
            <p>Dijital Dönüşüm Dinamikleri</p>
            <p>Siber Güvenliğe Giriş</p>
            <p>İSMEK — JavaScript, 2025</p>
            <div className="certificate-stack" aria-label="Öne çıkan program ve sertifikalar">
              <p className="certificate-feature">Sabancı Gençlik Hareketi — Sertifika</p>
              <p className="certificate-feature">T3 Vakfı — Prototipleme Eğitimi</p>
              <p className="certificate-feature">T3 Vakfı — Görüntü İşlemeye Giriş Atölyesi</p>
            </div>
          </div>
          <div className="detail-block">
            <span>03 / Diller</span>
            <p>Türkçe · İngilizce · Almanca</p>
          </div>
        </div>
      </section>

      <section className="skills" id="yetkinlikler" aria-labelledby="skills-title" data-nav-section>
        <div className="reveal" data-reveal>
          <p className="section-index">Araç seti / 03</p>
          <h2 id="skills-title">Merak geniş.<br />Temel sağlam.</h2>
        </div>
        <ul className="reveal reveal--right" data-reveal aria-label="Teknik yetkinlikler">
          {[
            "Java",
            "C",
            "Python",
            "Swift",
            "JavaScript",
            "SQL",
            "PostgreSQL",
            "Linux",
            "Git",
            "Gazebo",
          ].map((skill, index) => (
            <li key={skill}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="contact-stage reveal" data-reveal aria-labelledby="contact-title">
        <div className="contact-kicker">
          <span className="status-dot" aria-hidden="true" />
          Yeni sistemler için açık
        </div>
        <h2 id="contact-title">
          Bir sonraki fikri<br />
          <span>birlikte çalıştıralım.</span>
        </h2>
        <a href="/selin-turkmen-cv.pdf" download>
          <span>Profili keşfet</span>
          <strong aria-hidden="true">↗</strong>
        </a>
        <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div>
      </section>

      <section
        className="office-stage reveal"
        id="ofis"
        data-reveal
        aria-labelledby="office-title"
      >
        <div className="office-copy">
          <p className="office-index">
            <span className="status-dot" aria-hidden="true" />
            İstanbul / Ofis 01
          </p>
          <h2 id="office-title">Ofisimiz<span>.</span></h2>
          <address>
            Süleyman Hastanesi Yanı, Kanuni Sultan Atakent Mah.<br />
            Turgut Özal Bulvarı, Halkalı Caddesi No:48/A<br />
            Küçükçekmece / İstanbul
          </address>
          <a
            className="office-route"
            href="https://www.google.com/maps/search/?api=1&query=S%C3%BCleyman%20Hastanesi%20Yan%C4%B1%2C%20Kanuni%20Sultan%20Atakent%20Mah.%20Turgut%20%C3%96zal%20Bulvar%C4%B1%2C%20Halkal%C4%B1%20Caddesi%20No%3A48%2FA%2C%20K%C3%BC%C3%A7%C3%BCk%C3%A7ekmece%2F%C4%B0stanbul"
            target="_blank"
            rel="noreferrer"
          >
            <span>Yol tarifi al</span>
            <strong aria-hidden="true">↗</strong>
          </a>
        </div>
        <div className="office-map">
          <div className="office-map__label" aria-hidden="true">
            <span>Küçükçekmece / İstanbul</span>
            <span>Canlı harita</span>
          </div>
          <iframe
            title="Selin Türkmen ofis konumu"
            src="https://www.google.com/maps?q=S%C3%BCleyman%20Hastanesi%20Yan%C4%B1%2C%20Kanuni%20Sultan%20Atakent%20Mah.%20Turgut%20%C3%96zal%20Bulvar%C4%B1%2C%20Halkal%C4%B1%20Caddesi%20No%3A48%2FA%2C%20K%C3%BC%C3%A7%C3%BCk%C3%A7ekmece%2F%C4%B0stanbul&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section
        className="callback-stage reveal"
        id="mesaj"
        data-reveal
        aria-labelledby="callback-title"
      >
        <div className="callback-copy">
          <p className="callback-index">
            <span className="status-dot" aria-hidden="true" />
            İletişim / Mesaj 01
          </p>
          <h2 id="callback-title">
            Mesaj bırakın.<br />
            <span>Size dönelim.</span>
          </h2>
          <p>
            Projenizi, fikrinizi veya birlikte çalışma talebinizi kısaca paylaşın.
            Uygun olduğum ilk anda e-posta ile dönüş yapayım.
          </p>
        </div>
        <form
          className="callback-form"
          action="https://formsubmit.co/selinturkmeny@icloud.com"
          method="POST"
          acceptCharset="UTF-8"
        >
          <input type="hidden" name="_subject" value="Portfolyo sitesinden yeni mesaj" />
          <input type="hidden" name="_template" value="table" />
          <input
            type="hidden"
            name="_next"
            value="https://selinturkmen1184-web.github.io/selinturkmen/#mesaj-gonderildi"
          />
          <input
            className="form-honey"
            type="text"
            name="_honey"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <label>
            <span>Adınız</span>
            <input
              type="text"
              name="Ad Soyad"
              autoComplete="name"
              placeholder="Adınızı yazın"
              required
            />
          </label>
          <label>
            <span>E-posta</span>
            <input
              type="email"
              name="_replyto"
              autoComplete="email"
              placeholder="ornek@eposta.com"
              required
            />
          </label>
          <label>
            <span>Telefon <small>İsteğe bağlı</small></span>
            <input
              type="tel"
              name="Telefon"
              autoComplete="tel"
              placeholder="+90 5xx xxx xx xx"
            />
          </label>
          <label className="callback-form__message">
            <span>Mesajınız</span>
            <textarea
              name="Mesaj"
              rows={6}
              placeholder="Nasıl yardımcı olabilirim?"
              required
            />
          </label>
          <div className="callback-form__footer">
            <p>Bilgileriniz yalnızca size geri dönüş yapmak için kullanılır.</p>
            <button type="submit">
              <span>Mesajı gönder</span>
              <strong aria-hidden="true">↗</strong>
            </button>
          </div>
          <p className="callback-success" id="mesaj-gonderildi" tabIndex={-1}>
            <span aria-hidden="true">✓</span>
            Mesajınız iletildi. En kısa sürede size dönüş yapacağız.
          </p>
        </form>
      </section>

      <footer className="reveal" data-reveal>
        <p>Yeni fikirlere, ürün ekiplerine ve iş birliklerine açığım.</p>
        <a href="/selin-turkmen-cv.pdf" download>Özgeçmiş ↘</a>
        <span>İstanbul / TR · 2026</span>
      </footer>
    </main>
  );
}
