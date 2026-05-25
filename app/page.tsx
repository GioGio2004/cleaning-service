"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { MessageCircle, Leaf, Phone, Star, ChevronDown } from "lucide-react";

// ── Register GSAP plugins safely outside component lifecycle ──────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// ── IMAGE URLS (Edit these with your Cloudinary links) ──────────────────────
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

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: "Soft Furniture",
    desc: "Deep enzyme extraction for couches, armchairs, and sectionals. Restores fabric texture and eliminates allergens.",
    img: SERVICE_IMAGES.softFurniture,
    badge: "Most Popular",
  },
  {
    title: "Pool & Patio",
    desc: "High-pressure restoration, chemical balancing, and tile scrubbing for outdoor spaces.",
    img: SERVICE_IMAGES.poolAndPatio,
    badge: null,
  },
  {
    title: "Mattresses",
    desc: "Sanitization, dust-mite eradication, and UV treatment for a hygienic night's sleep.",
    img: SERVICE_IMAGES.mattresses,
    badge: null,
  },
  {
    title: "Deep House Cleaning",
    desc: "Top-to-bottom residential detailing — every surface, corner, and fixture restored.",
    img: SERVICE_IMAGES.deepHouse,
    badge: null,
  },
  {
    title: "Commercial Spaces",
    desc: "Professional cleaning for offices, restaurants, and retail spaces. Creates a pristine environment for your business.",
    img: SERVICE_IMAGES.commercial,
    badge: null,
  },
  {
    title: "Move-In / Move-Out",
    desc: "Comprehensive deep cleaning for property transitions. Ensures a spotless handover for landlords or new tenants.",
    img: SERVICE_IMAGES.moveInOut,
    badge: null,
  },
];

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

  // ── Smooth scrolling with Lenis ────────────────────────────────────────────
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  // ── GSAP Animations (scoped to containerRef) ───────────────────────────────
  useGSAP(
    () => {
      // 1. Hero stagger reveal: badge → headline → paragraph → cta
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

      // 2. Hero scroll indicator bob
      gsap.to(".scroll-indicator", {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Nav logo slide in
      gsap.fromTo(
        ".nav-logo",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.1 },
      );

      // 4. Services section label
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

      // 5. Service cards stagger reveal
      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // 6. Pricing cards stagger
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

      // 7. Trust row items
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

      // 8. Footer CTA
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
    },
    { scope: containerRef },
  );

  // ─��� CTA Button GSAP hover (separate from scoped context) ──────────────────
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
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            minWidth: "100%",
            minHeight: "100%",
          }}
        >
          <source
            src="https://res.cloudinary.com/voloostore/video/upload/q_auto:low,f_auto,w_1280/v1779669610/cpfuwmzuoohuiojizim1.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
          <source
            src="https://res.cloudinary.com/voloostore/video/upload/q_auto,f_auto,w_1920/v1779669610/cpfuwmzuoohuiojizim1.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark tint overlay */}
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
        {/* Badge */}
        <div className="hero-reveal mb-8">
          <span className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 text-sm font-medium text-slate-200 border border-white/10">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
            Tbilisi&apos;s Premium Care
            <Star className="w-3.5 h-3.5 text-white fill-white" />
          </span>
        </div>

        {/* Headline */}
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

        {/* Subheadline */}
        <p className="hero-reveal mt-7 max-w-xl text-lg leading-relaxed text-white/80 font-light">
          Premium deep cleaning that respects your home, your health, and the
          environment. Est. 2026 in Tbilisi, Georgia.
        </p>

        {/* CTA */}
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

        {/* Scroll indicator */}
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

        {/* Cards */}
        <div className="services-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <article
              key={index}
              className="service-card glass-card rounded-2xl overflow-hidden group cursor-default"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {service.badge && (
                  <span className="absolute top-3 left-3 bg-white text-charcoal-950 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-2xl font-semibold text-slate-200 mb-2 leading-tight"
                  style={{
                    fontFamily:
                      "var(--font-cormorant), 'Cormorant Garamond', serif",
                  }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {service.desc}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-slate-400 transition-colors group/link"
                >
                  Book this service
                  <span className="inline-block transition-transform duration-200 group-hover/link:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </article>
          ))}
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
        {/* Decorative background circle */}
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
