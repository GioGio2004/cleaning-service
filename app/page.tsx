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

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: "Soft Furniture",
    desc: "Deep enzyme extraction for couches, armchairs, and sectionals. Restores fabric texture and eliminates allergens.",
    img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=900&auto=format&fit=crop",
    badge: "Most Popular",
  },
  {
    title: "Auto Interiors",
    desc: "Full cabin detailing, stain removal, and odor neutralization using professional-grade equipment.",
    img: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=900&auto=format&fit=crop",
    badge: null,
  },
  {
    title: "Mattresses",
    desc: "Sanitization, dust-mite eradication, and UV treatment for a hygienic night's sleep.",
    img: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=900&auto=format&fit=crop",
    badge: null,
  },
  {
    title: "Deep House Cleaning",
    desc: "Top-to-bottom residential detailing — every surface, corner, and fixture restored.",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=900&auto=format&fit=crop",
    badge: null,
  },
  {
    title: "Post-Renovation",
    desc: "Industrial dust removal, paint splatter cleanup, and site finishing after construction.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356fce?q=80&w=900&auto=format&fit=crop",
    badge: null,
  },
  {
    title: "Pool & Patio",
    desc: "High-pressure restoration, chemical balancing, and tile scrubbing for outdoor spaces.",
    img: "https://images.unsplash.com/photo-1576013551627-8ce9a4fb1f2c?q=80&w=900&auto=format&fit=crop",
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

  // ── CTA Button GSAP hover (separate from scoped context) ──────────────────
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
      className="relative min-h-screen bg-sand-50 text-forest-900"
    >
      {/* ── 1. FIXED CINEMATIC BACKGROUND ──────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source
            src="https://res.cloudinary.com/voloostore/video/upload/q_auto,f_auto,w_1920,h_1080,c_fill/v1779666909/qifi3ams9lrec8axbh6c.mp4"
            type="video/mp4"
          />
        </video>
        {/* Soft warm overlay so video reads as ambient texture, not movie */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(247,245,240,0.72)" }}
        />
        {/* Subtle organic grain texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* ── 2. NAVIGATION ──────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
        <div className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2.5">
          <Leaf className="w-4 h-4 text-pine-600" />
          <span
            className="nav-logo font-bold text-forest-900 tracking-widest uppercase text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Qimwmenda
          </span>
        </div>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2 text-forest-900 text-sm font-medium hover:bg-white/80 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Phone className="w-4 h-4 text-pine-600" />
          <span className="hidden sm:block">Book Now</span>
        </a>
      </header>

      {/* ── 3. HERO SECTION ────────────────────────────────────────────────── */}
      <section
        className="relative flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center"
        aria-label="Hero"
      >
        {/* Badge */}
        <div className="hero-reveal mb-8">
          <span className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 text-sm font-medium text-forest-900 border border-forest-900/10">
            <Star className="w-3.5 h-3.5 text-clay-500 fill-clay-500" />
            Tbilisi&apos;s Premium Care
            <Star className="w-3.5 h-3.5 text-clay-500 fill-clay-500" />
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-reveal max-w-4xl text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.92] tracking-tight text-forest-900"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          }}
        >
          Revive Your Space.{" "}
          <em
            className="italic text-clay-500 not-italic"
            style={{ fontStyle: "italic" }}
          >
            Naturally.
          </em>
        </h1>

        {/* Subheadline */}
        <p className="hero-reveal mt-7 max-w-xl text-lg leading-relaxed text-forest-900/65 font-light">
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
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-pine-600 text-white font-semibold text-base tracking-wide shadow-lg shadow-pine-600/30 hover:bg-pine-700 transition-colors duration-300"
          >
            <MessageCircle className="w-5 h-5" />
            Book via WhatsApp
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-6 py-4 rounded-full glass-card text-forest-900 font-medium text-base hover:bg-white/80 transition-all duration-300"
          >
            Explore Services
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-xs tracking-widest uppercase font-medium text-forest-900">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 text-forest-900" />
        </div>
      </section>

      {/* ── 4. TRUST INDICATORS ────────────────────────────────────────────── */}
      <section className="trust-row px-6 py-14 border-y border-forest-900/8">
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
                className="text-3xl font-bold text-forest-900"
                style={{
                  fontFamily:
                    "var(--font-cormorant), 'Cormorant Garamond', serif",
                }}
              >
                {stat.value}
              </span>
              <span className="text-xs tracking-widest uppercase text-forest-900/50 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. SERVICES GRID ───────────────────────────────────────────────── */}
      <section
        id="services"
        className="services-section px-6 py-28 max-w-7xl mx-auto"
      >
        {/* Section header */}
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <span className="section-label text-xs tracking-[0.2em] uppercase font-semibold text-clay-500">
            What We Do
          </span>
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-forest-900 leading-tight"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            }}
          >
            Our Disciplines
          </h2>
          <p className="max-w-md text-base text-forest-900/60 font-light">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                {service.badge && (
                  <span className="absolute top-3 left-3 bg-clay-500 text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                    {service.badge}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="text-2xl font-semibold text-forest-900 mb-2 leading-tight"
                  style={{
                    fontFamily:
                      "var(--font-cormorant), 'Cormorant Garamond', serif",
                  }}
                >
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-forest-900/60">
                  {service.desc}
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-pine-600 hover:text-pine-700 transition-colors group/link"
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
      <section className="pricing-section px-6 py-28 max-w-5xl mx-auto">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-clay-500">
            Investment
          </span>
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-forest-900 leading-tight"
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
                  ? "bg-pine-600 text-white shadow-2xl shadow-pine-600/25"
                  : "glass-card"
              }`}
            >
              <div>
                <p
                  className={`text-xs tracking-widest uppercase font-semibold mb-2 ${
                    tier.highlight ? "text-white/60" : "text-forest-900/50"
                  }`}
                >
                  {tier.title}
                </p>
                <div className="flex items-end gap-1.5 leading-none">
                  {tier.currency && (
                    <span
                      className={`text-sm font-medium pb-1 ${
                        tier.highlight ? "text-white/70" : "text-clay-500"
                      }`}
                    >
                      {tier.currency}
                    </span>
                  )}
                  <span
                    className={`text-5xl font-bold ${
                      tier.highlight ? "text-white" : "text-clay-500"
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
                      tier.highlight ? "text-white/60" : "text-forest-900/40"
                    }`}
                  >
                    / {tier.unit}
                  </span>
                </div>
              </div>

              <p
                className={`text-sm leading-relaxed ${
                  tier.highlight ? "text-white/75" : "text-forest-900/60"
                }`}
              >
                {tier.desc}
              </p>

              <ul className="flex flex-col gap-2">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-center gap-2 text-sm ${
                      tier.highlight ? "text-white/85" : "text-forest-900/70"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                        tier.highlight ? "bg-white/60" : "bg-clay-500"
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
                    ? "bg-white text-pine-600 hover:bg-sand-50 shadow-lg"
                    : "bg-pine-600 text-white hover:bg-pine-700 shadow-md shadow-pine-600/20"
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
        className="footer-section relative px-6 py-36 text-center border-t border-forest-900/8 overflow-hidden"
        aria-label="Contact footer"
      >
        {/* Decorative background circle */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(42,77,62,0.06) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="footer-cta relative max-w-3xl mx-auto flex flex-col items-center gap-8">
          <span className="text-xs tracking-[0.25em] uppercase font-semibold text-clay-500">
            Get in Touch
          </span>

          <h2
            className="text-[clamp(3rem,8vw,7rem)] font-bold text-forest-900 leading-[0.92] tracking-tight"
            style={{
              fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
            }}
          >
            Ready to
            <br />
            <em
              className="italic text-clay-500"
              style={{ fontStyle: "italic" }}
            >
              Begin?
            </em>
          </h2>

          <p className="text-base text-forest-900/60 max-w-sm font-light leading-relaxed">
            Send us a message on WhatsApp and we&apos;ll get back to you within
            the hour to schedule your visit.
          </p>

          <a
            id="footer-whatsapp-cta"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-pine-600 text-white font-semibold text-lg tracking-wide shadow-xl shadow-pine-600/30 hover:bg-pine-700 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MessageCircle className="w-6 h-6" />
            Connect via WhatsApp
          </a>

          <p className="text-xs text-forest-900/30 tracking-widest uppercase">
            Tbilisi, Georgia · Available 7 days a week
          </p>
        </div>
      </footer>
    </div>
  );
}
