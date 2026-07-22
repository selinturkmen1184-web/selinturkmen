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
    className: "project-card project-card--wide",
  },
];

export default function Home() {
  const [motionPaused, setMotionPaused] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const projectCards = Array.from(document.querySelectorAll<HTMLElement>(".project-card"));
    const header = document.querySelector<HTMLElement>(".site-header");
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const tiltFrames = new Map<HTMLElement, number>();

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

    let scrollFrame = 0;
    const updateScrollEffects = () => {
      scrollFrame = 0;
      const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty("--scroll-progress", String(Math.min(1, window.scrollY / scrollable)));
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
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
      tiltFrames.forEach((frame) => window.cancelAnimationFrame(frame));
      cardHandlers.forEach(({ card, handlePointerMove, handlePointerLeave }) => {
        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerleave", handlePointerLeave);
      });
      root.classList.remove("js-enhanced", "hero-ready", "motion-paused");
      root.style.removeProperty("--scroll-progress");
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

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Selin Türkmen ana sayfa">
          <span className="status-dot" aria-hidden="true" />
          ST / PORTFOLYO 2026
        </a>
        <nav aria-label="Ana menü">
          <a href="#isler">Seçili işler</a>
          <a href="#tubitak">TÜBİTAK</a>
          <a href="#profil">Profil</a>
          <a href="#yetkinlikler">Yetkinlikler</a>
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

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span aria-hidden="true" /> Fikirleri çalışan sistemlere dönüştürüyorum
          </p>
          <h1 id="hero-title">
            <span>Selin</span>
            <span className="outline-text">Türkmen</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-intro">
              Yazılım Mühendisliği ve Yönetim Bilişim Sistemleri öğrencisiyim.
              Robotik, web ve siber güvenlik arasında; teknik olarak sağlam,
              görsel olarak hatırlanan deneyimler üretiyorum.
            </p>
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
            <span className="scan-line" aria-hidden="true" />
          </div>
          <div className="featured-title-row">
            <h2>Tarımsal Otonom Robot Simülasyonu</h2>
            <p>TÜBİTAK<br />ROS2<br />Gazebo</p>
          </div>
        </article>
      </section>

      <section className="work" id="isler" aria-labelledby="work-title">
        <div className="section-heading reveal" data-reveal>
          <div>
            <p className="section-index">06 seçili proje · 02 TÜBİTAK çalışması</p>
            <h2 id="work-title">Sistemler, hikâyeler, deneyimler.</h2>
          </div>
          <p>2024 — 2026</p>
        </div>

        <aside
          className="research-note reveal"
          data-reveal
          id="tubitak"
          aria-label="TÜBİTAK araştırma projeleri"
        >
          <span>TÜBİTAK / Ar-Ge</span>
          <p>Otonom tarım robotlarından gerçek zamanlı sinir ağı simülasyonlarına.</p>
          <strong>02 proje</strong>
        </aside>

        <div className="project-grid">
          {projects.map((project) => (
            <article className={`${project.className} reveal`} data-reveal key={project.title}>
              <div className="project-media">
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
                <span className="project-number">{project.index}</span>
                <span className="project-view">CANLI ÖNİZLEME</span>
              </div>
              <div className="project-copy">
                <p>{project.kicker}</p>
                <h3>{project.title}</h3>
                <span>{project.description}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile" id="profil" aria-labelledby="profile-title">
        <div className="profile-lead reveal" data-reveal>
          <p className="section-index">Profil / 02</p>
          <h2 id="profile-title">
            Kodun mantığıyla,<br />tasarımın sezgisini birleştiriyorum.
          </h2>
          <p>
            Çift ana dal eğitimimi; robotik simülasyonlardan yönetim panellerine,
            mobil deneyimlerden görsel anlatıya uzanan disiplinler arası projelerle
            besliyorum. İyi bir ürünün yalnızca çalışması değil, kendini açıkça
            anlatması gerektiğine inanıyorum.
          </p>
          <a className="cv-link" href="/selin-turkmen-cv.pdf" download>
            CV’yi indir <span aria-hidden="true">↘</span>
          </a>
        </div>

        <div className="profile-details reveal reveal--right" data-reveal>
          <div className="detail-block">
            <span>01 / Eğitim</span>
            <h3>Altınbaş Üniversitesi</h3>
            <p>Yazılım Mühendisliği</p>
            <h3>Anadolu Üniversitesi</h3>
            <p>Yönetim Bilişim Sistemleri — ÇAP</p>
          </div>
          <div className="detail-block">
            <span>02 / Sertifikalar</span>
            <p>Dijital Dönüşüm Dinamikleri</p>
            <p>Siber Güvenliğe Giriş</p>
            <p>İSMEK — JavaScript, 2025</p>
          </div>
          <div className="detail-block">
            <span>03 / Diller</span>
            <p>Türkçe · İngilizce · Almanca</p>
          </div>
        </div>
      </section>

      <section className="skills" id="yetkinlikler" aria-labelledby="skills-title">
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

      <footer className="reveal" data-reveal>
        <p>Yeni fikirlere, stajlara ve iş birliklerine açığım.</p>
        <a href="/selin-turkmen-cv.pdf" download>Özgeçmiş ↘</a>
        <span>İstanbul / TR · 2026</span>
      </footer>
    </main>
  );
}
