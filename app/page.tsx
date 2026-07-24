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
    kicker: "Eğitim Teknolojisi / Planlama / Web",
    description:
      "TYT ve AYT hazırlığını hedefler, dersler ve günlük çalışma akışlarıyla tek yerde planlamayı kolaylaştıran kişisel çalışma ajandası.",
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
    title: "CİHAN: Tahtın Çağı — Oyun Vizyonu",
    kicker: "Oyun Tasarımı / Ürün Stratejisi / Tarihî 4X",
    description:
      "Mobil-first tarihî 4X strateji oyunu için; yaşayan şehir, sadakat ve entrika, ticaret cephesi, ittifak savaşları ve aşamalı üretim yaklaşımını birleştiren özgün oyun vizyonu.",
    href: "https://selinturkmen1184-web.github.io/cihan-tahtin-cagi/",
    preview: "cihan",
    className: "project-card project-card--full project-card--cihan",
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
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const tiltFrames = new Map<HTMLElement, number>();
    const counterFrames = new Map<HTMLElement, number>();

    root.classList.add("js-enhanced");
    root.classList.toggle("motion-paused", prefersReducedMotion);
    setMotionPaused(prefersReducedMotion);

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
          <a href="#isler" data-nav>Seçili işler</a>
          <a href="#tubitak" data-nav>TÜBİTAK</a>
          <a href="#profil" data-nav>Profil</a>
          <a href="#yetkinlikler" data-nav>Yetkinlikler</a>
        </nav>
        <button
          className="motion-toggle"
          type="button"
          aria-pressed={motionPaused}
          onClick={toggleMotion}
        >
          <span aria-hidden="true">{motionPaused ? "▶" : "Ⅱ"}</span>
          {motionPaused ? "Hareketi başlat" : "Hareketi durdur"}
        </button>
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
              <b>10</b> seçili proje
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
            <p className="section-index">11 seçili proje · 02 TÜBİTAK çalışması</p>
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
                    className="rota-preview"
                    aria-label="Rota kişisel TYT ve AYT çalışma ajandası arayüz önizlemesi"
                  >
                    <div className="rota-preview__top">
                      <strong>ROTA</strong>
                      <span>Kişisel çalışma alanı</span>
                    </div>
                    <div className="rota-preview__body">
                      <div className="rota-preview__week" aria-hidden="true">
                        {[
                          ["PZT", "20"],
                          ["SAL", "21"],
                          ["ÇAR", "22"],
                          ["PER", "23"],
                          ["CUM", "24"],
                        ].map(([day, date], index) => (
                          <span className={index === 2 ? "is-today" : ""} key={day}>
                            <small>{day}</small>
                            <b>{date}</b>
                          </span>
                        ))}
                      </div>
                      <div className="rota-preview__focus">
                        <span>Bugünün rotası</span>
                        <strong>TYT Matematik</strong>
                        <small>90 dakika · 32 soru</small>
                        <i aria-hidden="true"><span /></i>
                      </div>
                      <div className="rota-preview__score">
                        <span>Haftalık ilerleme</span>
                        <strong>%74</strong>
                        <small>Hedefe 3 oturum kaldı</small>
                      </div>
                    </div>
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
                    className="ells-preview"
                    aria-label="ELLS otonom çay hasat sistemi arayüz önizlemesi"
                  >
                    <div className="ells-preview__top">
                      <strong>ELLS</strong>
                      <span>Autonomous Tea Harvest System</span>
                    </div>
                    <div className="ells-preview__body">
                      <p>Tarım teknolojileri için otonom çözüm</p>
                      <h4>Akıllı hasat.<span>Zorlu araziye hazır.</span></h4>
                      <div className="ells-preview__metrics" aria-hidden="true">
                        <span><b>AI</b><small>Destekli algılama</small></span>
                        <span><b>01</b><small>Otonom görev akışı</small></span>
                        <span><b>∞</b><small>Tarla uyumu</small></span>
                      </div>
                    </div>
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
                      src="https://selinturkmen1184-web.github.io/cihan-tahtin-cagi/"
                      title="CİHAN: Tahtın Çağı — Oyun Vizyonu canlı önizlemesi"
                      loading="lazy"
                      tabIndex={-1}
                    />
                    <span className="cihan-live-preview__badge" aria-hidden="true">
                      Gerçek proje / canlı arayüz
                    </span>
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
            <strong data-count="11" data-pad="2">11</strong>
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
            <span>02 / Sertifikalar</span>
            <p>Dijital Dönüşüm Dinamikleri</p>
            <p>Siber Güvenliğe Giriş</p>
            <p>İSMEK — JavaScript, 2025</p>
            <p className="certificate-feature">Sabancı Gençlik Hareketi — Sertifika</p>
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

      <footer className="reveal" data-reveal>
        <p>Yeni fikirlere, ürün ekiplerine ve iş birliklerine açığım.</p>
        <a href="/selin-turkmen-cv.pdf" download>Özgeçmiş ↘</a>
        <span>İstanbul / TR · 2026</span>
      </footer>
    </main>
  );
}
