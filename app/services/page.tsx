"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf, Phone } from "lucide-react";
import Link from "next/link";
import { ServiceCard } from "@/components/service-components/ServiceCard";
import { SERVICE_IMAGES } from "@/app/page";

// ── Register GSAP plugins safely outside component lifecycle ──────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WHATSAPP_URL =
  "https://wa.me/995555123456?text=გამარჯობა!%20მსურს%20სერვისის%20დაჯავშნა.";

const SERVICES = [
  {
    title: "Soft Furniture",
    desc: "Deep enzyme extraction for couches, armchairs, and sectionals. Restores fabric texture and eliminates allergens.",
    img: SERVICE_IMAGES.softFurniture,
    badge: "Most Popular",
    href: "/furniture",
  },
  {
    title: "Pool & Patio",
    desc: "High-pressure restoration, chemical balancing, and tile scrubbing for outdoor spaces.",
    img: SERVICE_IMAGES.poolAndPatio,
    badge: null,
    href: "/pool",
  },
  {
    title: "Mattresses",
    desc: "Sanitization, dust-mite eradication, and UV treatment for a hygienic night's sleep.",
    img: SERVICE_IMAGES.mattresses,
    badge: null,
    href: "/Mattresses",
  },
  {
    title: "Deep House Cleaning",
    desc: "Top-to-bottom residential detailing — every surface, corner, and fixture restored.",
    img: "https://images.unsplash.com/photo-1687840936382-7333b7d26fca?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGVlcGhvdXNlJTIwY2xlYW5pbmd8ZW58MHx8MHx8fDA%3D",
    badge: null,
    href: "/general-cleaning",
  },
  {
    title: "Hardwood & Tile Floors",
    desc: "Professional extraction, polishing, and sealing to restore original luster without damage.",
    img: "https://images.unsplash.com/photo-1778062864730-9cb7e81f9c65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZsb29yJTIwY2xlYW5pbmd8ZW58MHx8MHx8fDA%3D", // Replaced Commercial with Floor
    badge: null,
    href: "/floor",
  },
  {
    title: "Window Cleaning",
    desc: "Streak-free exterior and interior window washing. Lets the natural light pour back in.",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d2luZG93JTIwY2xlYW5pbmd8ZW58MHx8MHx8fDA%3D", // Replaced MoveInOut with Window
    badge: null,
    href: "/window",
  },
  {
    title: "Wood Furniture Cleaning",
    desc: "Craftsman-level cleaning and conditioning to nourish natural wood grain, whether premium walnut, fine veneers, or solid wood.",
    img: "https://images.unsplash.com/photo-1597072689227-8882273e8f6a?q=80&w=900&auto=format&fit=crop",
    badge: null,
    href: "/wood-furniture",
  },
  {
    title: "Metal & Glass Detailing",
    desc: "Streak-free glass purification and meticulous metal detailing to remove tarnish and restore brilliant shine.",
    img: "https://images.unsplash.com/photo-1580130281320-0ef0a54f3fce?q=80&w=900&auto=format&fit=crop",
    badge: null,
    href: "/metal-and-glass",
  },
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // 1. Header stagger reveal
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

      // 2. Service cards stagger reveal
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
            start: "top 85%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-black text-slate-200 pt-28 pb-32"
    >
      {/* ── BACKGROUND ──────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black" />
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] rounded-full pointer-events-none opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── NAVIGATION ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2.5 transition-colors hover:bg-white/10"
        >
          <Leaf className="w-4 h-4 text-white" />
          <span
            className="nav-logo font-bold text-slate-200 tracking-widest uppercase text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Qimwmenda
          </span>
        </Link>
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

      {/* ── HEADER CONTENT ──────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 max-w-7xl mx-auto flex flex-col items-center text-center gap-4 mb-20 mt-10">
        <span className="hero-reveal section-label text-xs tracking-[0.2em] uppercase font-semibold text-white">
          Complete Portfolio
        </span>
        <h1
          className="hero-reveal text-[clamp(3rem,8vw,6rem)] font-bold text-slate-200 leading-[0.92] tracking-tight"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          }}
        >
          Our{" "}
          <em className="italic text-white" style={{ fontStyle: "italic" }}>
            Services
          </em>
        </h1>
        <p className="hero-reveal mt-4 max-w-xl text-lg leading-relaxed text-white/80 font-light">
          Discover our full range of premium deep cleaning disciplines, designed
          to respect your home, health, and environment.
        </p>
      </section>

      {/* ── SERVICES GRID ───────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 max-w-7xl mx-auto services-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            desc={service.desc}
            img={service.img}
            badge={service.badge}
            href={service.href}
            linkText="View Service Details"
          />
        ))}
      </section>
    </div>
  );
}
