"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { MessageCircle, Leaf, Phone, Star, ChevronDown } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "@/components/service-components/ServiceCard";

// ── Register GSAP plugins safely outside component lifecycle ──────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ── VIDEO PLAYLIST ──────────────────────────────────────────────────────────
export const HERO_VIDEOS = [
  "https://res.cloudinary.com/voloostore/video/upload/v1779669610/cpfuwmzuoohuiojizim1.mp4",
  "https://res.cloudinary.com/voloostore/video/upload/v1779671031/nuauknjzn5l2s7ygsd6p.mp4",
  "https://res.cloudinary.com/voloostore/video/upload/v1779671024/ydsukjkopuqnfimwukmg.mp4",
];

// ── IMAGE URLS ──────────────────────────────────────────────────────────────
export const SERVICE_IMAGES = {
  softFurniture:
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=900&auto=format&fit=crop",
  poolAndPatio:
    "https://res.cloudinary.com/voloostore/image/upload/v1779670098/i9ghdol2coicanq6gzon.webp",
  mattresses:
    "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=900&auto=format&fit=crop",
  deepHouse:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=900&auto=format&fit=crop",
  commercial:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900&auto=format&fit=crop",
  moveInOut:
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=900&auto=format&fit=crop",
};

// ── Images shown inside the pill collage button ─────────────────────────────
const PILL_IMAGES = [
  SERVICE_IMAGES.softFurniture,
  SERVICE_IMAGES.poolAndPatio,
  SERVICE_IMAGES.mattresses,
  SERVICE_IMAGES.commercial,
];

// ── Data ──────────────────────────────────────────────────────────────────────

const PRICING = [
  {
    title: "Furniture & Auto",
    price: "50",
    currency: "GEL",
    unit: "per item",
    desc: "Enzyme extraction and odor removal per seat or cushion.",
    features: ["Enzyme treatment", "Odor neutralization", "Stain removal"],
    highlight: false,
  },
  {
    title: "House Detailing",
    price: "150",
    currency: "GEL",
    unit: "Studio/1BR",
    desc: "Complete surface, floor, and deep sanitation package.",
    features: ["All surfaces", "Floors & fixtures", "Kitchen & bath"],
    highlight: true,
  },
  {
    title: "Pool & Exterior",
    price: "Custom",
    currency: "",
    unit: "quote",
    desc: "Tailored to square meterage. High-pressure restoration.",
    features: ["Pressure washing", "Chemical balance", "Tile scrubbing"],
    highlight: false,
  },
];

const WHATSAPP_URL =
  "https://wa.me/995555123456?text=გამარჯობა!%20მსურს%20სერვისის%20დაჯავშნა.";

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  // ── Seamless Dual-Video Preloader ──────────────────────────────────────────
  const [globalIndex, setGlobalIndex] = useState(0);
  const videoRef0 = useRef<HTMLVideoElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);

  const activeLayer = globalIndex % 2;
  const nextGlobalIndex = globalIndex + 1;

  const src0 =
    HERO_VIDEOS[
      (activeLayer === 0 ? globalIndex : nextGlobalIndex) % HERO_VIDEOS.length
    ];
  const src1 =
    HERO_VIDEOS[
      (activeLayer === 1 ? globalIndex : nextGlobalIndex) % HERO_VIDEOS.length
    ];

  const handleVideoEnd = () => {
    setGlobalIndex((prev) => prev + 1);
  };

  useEffect(() => {
    const activeRef = activeLayer === 0 ? videoRef0 : videoRef1;
    if (activeRef.current) {
      activeRef.current.play().catch(console.error);
    }
  }, [globalIndex, activeLayer]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const activeRef = activeLayer === 0 ? videoRef0 : videoRef1;
        activeRef.current?.play().catch(console.error);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeLayer]);

  // ── GSAP Animations ────────────────────────────────────────────────────────
  useGSAP(
    () => {
      gsap.fromTo(
        ".hero-reveal",
        { opacity: 0, y: 30, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      gsap.to(".scroll-indicator", {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        ".nav-logo",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.1 },
      );

      gsap.fromTo(
        ".section-label",
        { opacity: 0, letterSpacing: "0.4em" },
        {
          opacity: 1,
          letterSpacing: "0.2em",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
          },
        },
      );

      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 78%",
          },
        },
      );

      gsap.fromTo(
        ".trust-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".trust-row",
            start: "top 85%",
          },
        },
      );

      gsap.fromTo(
        ".footer-cta",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-section",
            start: "top 75%",
          },
        },
      );

      // Pill button scroll reveal
      gsap.fromTo(
        ".pill-collage-btn",
        { opacity: 0, y: 40, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".pill-collage-btn",
            start: "top 88%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const btn = ctaBtnRef.current;
    if (!btn) return;
    const enter = () =>
      gsap.to(btn, { scale: 1.06, duration: 0.3, ease: "power2.out" });
    const leave = () =>
      gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.inOut" });
    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-black text-slate-200"
    >
      {/* ── 1. FIXED CINEMATIC VIDEO BACKGROUND ────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <video
          ref={videoRef0}
          src={src0}
          autoPlay={activeLayer === 0}
          muted
          playsInline
          preload="auto"
          onEnded={activeLayer === 0 ? handleVideoEnd : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeLayer === 0 ? "opacity-100" : "opacity-0"
          }`}
          style={{ minWidth: "100%", minHeight: "100%" }}
        />
        <video
          ref={videoRef1}
          src={src1}
          autoPlay={activeLayer === 1}
          muted
          playsInline
          preload="auto"
          onEnded={activeLayer === 1 ? handleVideoEnd : undefined}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeLayer === 1 ? "opacity-100" : "opacity-0"
          }`}
          style={{ minWidth: "100%", minHeight: "100%" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.50)" }}
        />
      </div>

      {/* ── 2. NAVIGATION ──────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
        <div className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2.5">
          <Leaf className="w-4 h-4 text-white" />
          <span
            className="nav-logo font-bold text-slate-200 tracking-widest uppercase text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Qimwmenda
          </span>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-5 py-2.5 flex items-center gap-2 text-slate-200 text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80"
        >
          <Phone className="w-4 h-4 text-white" />
          <span className="hidden sm:block">Book Now</span>
        </a>
      </header>

      {/* ── 3. HERO SECTION ────────────────────────────────────────────────── */}
      <section
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center"
        aria-label="Hero"
      >
        <div className="hero-reveal mb-8">
          <span className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 text-sm font-medium text-slate-200 border border-white/10">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
            Tbilisi&apos;s Premium Care
            <Star className="w-3.5 h-3.5 text-white fill-white" />
          </span>
        </div>

        <h1
          className="hero-reveal max-w-4xl text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.92] tracking-tight text-slate-200"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          }}
        >
          Revive Your Space.{" "}
          <em
            className="italic text-white not-italic"
            style={{ fontStyle: "italic" }}
          >
            Naturally.
          </em>
        </h1>

        <p className="hero-reveal mt-7 max-w-xl text-lg leading-relaxed text-white/80 font-light">
          Premium deep cleaning that respects your home, your health, and the
          environment. Est. 2026 in Tbilisi, Georgia.
        </p>

        <div className="hero-reveal mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <a
            ref={ctaBtnRef}
            id="hero-whatsapp-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base tracking-wide shadow-lg transition-colors duration-300 bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80"
          >
            <MessageCircle className="w-5 h-5" />
            Book via WhatsApp
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full text-slate-200 font-medium text-base transition-all duration-300 bg-black/60 backdrop-blur-md border border-white/10 hover:bg-black/80"
          >
            Explore Services
          </a>
        </div>

        <div className="hidden scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-xs tracking-widest uppercase font-medium text-slate-200">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-slate-200" />
        </div>
      </section>

      {/* ── 4. TRUST INDICATORS ────────────────────────────────────────────── */}
      <section className="relative z-10 trust-row px-6 py-14 border-y border-white/8">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-6">
          {[
            { label: "Satisfied Clients", value: "500+" },
            { label: "Services Completed", value: "1,200+" },
            { label: "Years in Tbilisi", value: "Est. 2026" },
            { label: "Eco-Safe Products", value: "100%" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="trust-item flex flex-col items-center gap-1 text-center"
            >
              <span
                className="text-3xl font-bold text-slate-200"
                style={{
                  fontFamily:
                    "var(--font-cormorant), 'Cormorant Garamond', serif",
                }}
              >
                {stat.value}
              </span>
              <span className="text-xs tracking-widest uppercase text-slate-400 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. SERVICES GRID ───────────────────────────────────────────────── */}
      <section
        id="services"
        className="relative z-10 services-section px-6 py-28 max-w-7xl mx-auto"
      >
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <span className="section-label text-xs tracking-[0.2em] uppercase font-semibold text-white">
            What We Do
          </span>
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-slate-200 leading-tight"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            }}
          >
            Our Disciplines
          </h2>
          <p className="max-w-md text-base text-slate-400 font-light">
            Every service is executed with precision using professional-grade
            equipment and eco-conscious solutions.
          </p>
        </div>

        {/* ── PILL COLLAGE "VIEW ALL SERVICES" BUTTON ─────────────────────── */}
        <div className="flex justify-center">
          <Link
            href="/services"
            aria-label="View all services"
            className="pill-collage-btn group relative block"
            style={{
              // Prevent the link from stretching to full width
              display: "inline-block",
            }}
          >
            {/*
             * Outer pill shell
             * border-radius: 9999px + overflow: hidden clips all child images
             * into the stadium shape automatically.
             */}
            <div
              className="relative flex overflow-hidden"
              style={{
                borderRadius: "9999px",
                height: "clamp(140px, 20vw, 220px)",
                width: "clamp(360px, 64vw, 800px)",
                maxWidth: "90vw",
                transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
              // Inline hover handled by CSS group below
            >
              {/* Image panels — flex children fill the pill evenly */}
              {PILL_IMAGES.map((src, i) => (
                <div
                  key={i}
                  className="relative flex-1 overflow-hidden"
                  style={{
                    // Thin semi-transparent divider between panels
                    boxShadow:
                      i < PILL_IMAGES.length - 1
                        ? "2px 0 0 0 rgba(255,255,255,0.15)"
                        : "none",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      transition: `transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 50}ms`,
                    }}
                  />
                  {/* Per-panel dark vignette for label legibility */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.50) 100%)",
                    }}
                  />
                </div>
              ))}

              {/* Centre frosted-glass label */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-10">
                <span
                  className="inline-flex items-center gap-2 rounded-full text-white font-semibold tracking-wide"
                  style={{
                    fontSize: "clamp(0.85rem, 1.6vw, 1rem)",
                    padding: "clamp(10px, 1.2vw, 14px) clamp(20px, 3vw, 32px)",
                    background: "rgba(0,0,0,0.68)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    letterSpacing: "0.04em",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                    transition: "background 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  View All Services
                </span>
              </div>

              {/* Subtle overall dark overlay that lifts on hover — CSS trick via
                  a sibling element animated with group-hover */}
              <div
                className="absolute inset-0 z-[5] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: "rgba(0,0,0,0.12)" }}
                aria-hidden="true"
              />
            </div>

            {/*
             * Hover scale — applied directly to the inner div via a CSS custom
             * property trick: we attach the scale via a <style> tag that
             * targets .pill-collage-btn:hover > div.
             * Since Tailwind group-hover only targets children with classes,
             * and inline style can't handle :hover, we use a tiny scoped style.
             */}
            <style>{`
              .pill-collage-btn:hover > div {
                transform: scale(1.035);
              }
              .pill-collage-btn:active > div {
                transform: scale(0.975);
              }
              .pill-collage-btn:hover img {
                transform: scale(1.10);
              }
            `}</style>
          </Link>
        </div>
      </section>

      {/* ── 6. PRICING ─────────────────────────────────────────────────────── */}
      <section className="relative z-10 pricing-section px-6 py-28 max-w-5xl mx-auto">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-white">
            Investment
          </span>
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-slate-200 leading-tight"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            }}
          >
            Transparent Tiers
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING.map((tier, idx) => (
            <div
              key={idx}
              className={`pricing-card rounded-2xl p-8 flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1 ${
                tier.highlight
                  ? "bg-white text-black shadow-2xl shadow-slate-300/25"
                  : "glass-card"
              }`}
            >
              <div>
                <p
                  className={`text-xs tracking-widest uppercase font-semibold mb-2 ${
                    tier.highlight ? "text-black/60" : "text-slate-400"
                  }`}
                >
                  {tier.title}
                </p>
                <div className="flex items-end gap-1.5 leading-none">
                  {tier.currency && (
                    <span
                      className={`text-sm font-medium pb-1 ${
                        tier.highlight ? "text-black/70" : "text-white"
                      }`}
                    >
                      {tier.currency}
                    </span>
                  )}
                  <span
                    className={`text-5xl font-bold ${
                      tier.highlight ? "text-black" : "text-white"
                    }`}
                    style={{
                      fontFamily:
                        "var(--font-cormorant), 'Cormorant Garamond', serif",
                    }}
                  >
                    {tier.price}
                  </span>
                  <span
                    className={`text-sm pb-1.5 ${
                      tier.highlight ? "text-black/60" : "text-slate-500"
                    }`}
                  >
                    / {tier.unit}
                  </span>
                </div>
              </div>

              <p
                className={`text-sm leading-relaxed ${
                  tier.highlight ? "text-black/75" : "text-slate-400"
                }`}
              >
                {tier.desc}
              </p>

              <ul className="flex flex-col gap-2">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2 text-sm ${
                      tier.highlight ? "text-black/85" : "text-white"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        tier.highlight ? "bg-black/60" : "bg-white"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-auto flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-95 ${
                  tier.highlight
                    ? "bg-black text-white hover:bg-black/80 shadow-lg"
                    : "bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80 shadow-md"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Request Booking
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. WHATSAPP FOOTER CTA ─────────────────────────────────────────── */}
      <footer
        className="relative z-10 footer-section px-6 py-36 text-center border-t border-white/8 overflow-hidden"
        aria-label="Contact footer"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(212,168,83,0.08) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="footer-cta relative max-w-3xl mx-auto flex flex-col items-center gap-8">
          <span className="text-xs tracking-[0.25em] uppercase font-semibold text-white">
            Get in Touch
          </span>

          <h2
            className="text-[clamp(3rem,8vw,7rem)] font-bold text-slate-200 leading-[0.92] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            }}
          >
            Ready to
            <br />
            <em className="italic text-white" style={{ fontStyle: "italic" }}>
              Begin?
            </em>
          </h2>

          <p className="text-base text-slate-400 max-w-sm font-light leading-relaxed">
            Send us a message on WhatsApp and we&apos;ll get back to you within
            the hour to schedule your visit.
          </p>

          <a
            id="footer-whatsapp-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-black/80"
          >
            <MessageCircle className="w-6 h-6" />
            Connect via WhatsApp
          </a>

          <p className="text-xs text-slate-500 tracking-widest uppercase">
            Tbilisi, Georgia · Available 7 days a week
          </p>
        </div>
      </footer>
    </div>
  );
}
