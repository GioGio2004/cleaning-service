"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Leaf, Phone, Star, ChevronDown, Droplets, Waves, Activity, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WHATSAPP_URL = "https://wa.me/995555123456?text=Hello!%20I%20would%20like%20to%20request%20a%20pool%20inspection.";

const POOL_SERVICES = [
  {
    icon: Sparkles,
    title: "Surface Skimming & Scrubbing",
    desc: "We manually skim all surface debris and scrub the waterline tiles to prevent calcium buildup and algae growth.",
  },
  {
    icon: Activity,
    title: "Chemical Balancing",
    desc: "Precision testing and adjustment of chlorine, pH, alkalinity, and calcium levels for perfectly safe, crystal-clear water.",
  },
  {
    icon: Droplets,
    title: "Filter & Pump Cleaning",
    desc: "Complete backwashing and breakdown of sand, cartridge, or DE filters to ensure maximum flow and equipment longevity.",
  },
  {
    icon: Waves,
    title: "Deep Vacuuming",
    desc: "Thorough vacuuming of the pool floor and steps to extract sunken debris, leaves, and fine dirt particles.",
  },
];

const BLOG_POSTS = [
  {
    title: "The Ultimate Guide to Spring Pool Openings",
    date: "May 28, 2026",
    img: "https://images.unsplash.com/photo-1576013551627-14ee7899d4aa?q=80&w=900&auto=format&fit=crop",
    readTime: "6 min read"
  },
  {
    title: "Why Chemical Balancing is Crucial for Water Safety",
    date: "May 15, 2026",
    img: "https://images.unsplash.com/photo-1560309990-25816af51600?q=80&w=900&auto=format&fit=crop",
    readTime: "4 min read"
  },
  {
    title: "How to Spot a Failing Pool Filter Early",
    date: "April 22, 2026",
    img: "https://images.unsplash.com/photo-1519307212971-dd9561667ffb?q=80&w=900&auto=format&fit=crop",
    readTime: "5 min read"
  }
];

export default function PoolCleaningPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      // Hero stagger
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

      // Scroll indicator
      gsap.to(".scroll-indicator", {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Service cards
      gsap.fromTo(
        ".service-step",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 75%",
          },
        },
      );

      // Seasonal image reveal
      gsap.fromTo(
        ".seasonal-image",
        { opacity: 0, scale: 1.05 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".seasonal-section",
            start: "top 75%",
          },
        },
      );

      // Blog cards
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".blog-section",
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const btn = ctaBtnRef.current;
    if (!btn) return;
    const enter = () => gsap.to(btn, { scale: 1.06, duration: 0.3, ease: "power2.out" });
    const leave = () => gsap.to(btn, { scale: 1, duration: 0.3, ease: "power2.inOut" });
    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-slate-200">
      {/* ── BACKGROUND ──────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?q=80&w=2000&auto=format&fit=crop"
          alt="Crystal clear pool"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95" />
      </div>

      {/* ── NAVIGATION ──────────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between">
        <Link href="/" className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2.5 transition-colors hover:bg-white/10">
          <Leaf className="w-4 h-4 text-white" />
          <span className="nav-logo font-bold text-slate-200 tracking-widest uppercase text-sm" style={{ fontFamily: "var(--font-inter)" }}>
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
          <span className="hidden sm:block">Request Inspection</span>
        </a>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center" aria-label="Hero">
        <div className="hero-reveal mb-8">
          <span className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 text-sm font-medium text-slate-200 border border-white/10">
            <Star className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
            Residential & Commercial Pools
            <Star className="w-3.5 h-3.5 text-blue-400 fill-blue-400" />
          </span>
        </div>

        <h1
          className="hero-reveal max-w-5xl text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.92] tracking-tight text-slate-200"
          style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
        >
          Pristine Waters. <br />
          <em className="italic text-white" style={{ fontStyle: "italic" }}>Perfect Balance.</em>
        </h1>

        <p className="hero-reveal mt-7 max-w-2xl text-lg leading-relaxed text-white/80 font-light">
          Professional pool cleaning, chemical balancing, and equipment maintenance. We keep your pool crystal clear, perfectly safe, and ready to enjoy at any moment. All services are custom-quoted based on your pool's size and condition.
        </p>

        <div className="hero-reveal mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <a
            ref={ctaBtnRef}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base tracking-wide shadow-lg transition-colors duration-300 bg-white text-black hover:bg-slate-200"
          >
            <MessageCircle className="w-5 h-5" />
            Request a Pool Inspection
          </a>
        </div>

        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-xs tracking-widest uppercase font-medium text-slate-200">Discover</span>
          <ChevronDown className="w-4 h-4 text-slate-200" />
        </div>
      </section>

      {/* ── CORE SERVICES GRID ──────────────────────────────────────────────── */}
      <section className="relative z-10 services-section px-6 py-28 max-w-7xl mx-auto border-t border-white/10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-blue-400 mb-4 block">
            Comprehensive Maintenance
          </span>
          <h2
            className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-slate-200 leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            The Science of Clarity
          </h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            A beautiful pool requires meticulous care. Our specialists handle every aspect of pool health, ensuring water safety and prolonging the life of your equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {POOL_SERVICES.map((service, idx) => {
             const Icon = service.icon;
             return (
              <div key={idx} className="service-step glass-card p-10 rounded-3xl border border-white/5 flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex-shrink-0 flex items-center justify-center border border-white/10">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-200 mb-3">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">{service.desc}</p>
                </div>
              </div>
             );
          })}
        </div>
      </section>

      {/* ── SEASONAL MAINTENANCE PACKAGES ───────────────────────────────────── */}
      <section className="relative z-10 seasonal-section px-6 py-28 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden glass-card seasonal-image">
             <img 
               src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200&auto=format&fit=crop" 
               alt="Seasonal pool care" 
               className="w-full h-full object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-blue-400 mb-4 block">
              Year-Round Care
            </span>
            <h2
              className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-slate-200 leading-tight mb-8"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Seasonal Maintenance <br /> Packages
            </h2>
            <p className="text-base text-slate-400 font-light leading-relaxed mb-6">
              Whether you need to revive your pool for the summer season, winterize it to prevent freezing damage, or require ongoing weekly maintenance, we offer tailored packages to fit your exact needs.
            </p>
            <ul className="flex flex-col gap-4 mb-8">
               <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Spring Opening & Shock Treatments
               </li>
               <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Weekly Summer Chemistry & Cleaning
               </li>
               <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Autumn Debris Management
               </li>
               <li className="flex items-center gap-3 text-slate-300 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Professional Winterization
               </li>
            </ul>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-blue-300 transition-colors border-b border-white/30 pb-1"
            >
              Discuss your seasonal needs <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── BLOG & TIPS SECTION ─────────────────────────────────────────────── */}
      <section className="relative z-10 blog-section px-6 py-28 max-w-7xl mx-auto border-t border-white/10 bg-black/40">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-blue-400">
            Water Safety & Care
          </span>
          <h2
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-slate-200 leading-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Pool Care Blog
          </h2>
          <p className="max-w-md text-base text-slate-400 font-light">
            Stay informed on the best practices for maintaining crystal-clear water and prolonging the lifespan of your pool equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <article key={idx} className="blog-card group cursor-pointer">
              <div className="relative aspect-video overflow-hidden rounded-2xl mb-5 border border-white/5">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span>{post.readTime}</span>
              </div>
              <h3
                className="text-xl font-semibold text-slate-200 mb-3 group-hover:text-white transition-colors leading-snug"
                style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
              >
                {post.title}
              </h3>
              <span className="text-sm text-slate-500 group-hover:text-blue-300 transition-colors inline-flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ──────────────────────────────────────────────────────── */}
      <footer className="relative z-10 footer-section px-6 py-32 text-center border-t border-white/10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(96,165,250,0.05) 0%, transparent 70%)" }} aria-hidden="true" />
        
        <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-8">
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-slate-200 leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Ready for a<br /> <em className="italic text-white" style={{ fontStyle: "italic" }}>Perfect Swim?</em>
          </h2>
          <p className="text-base text-slate-400 max-w-md font-light leading-relaxed">
            All pool cleaning contracts are entirely negotiable based on pool size, equipment condition, and service frequency.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-white text-black hover:bg-slate-200"
          >
            <MessageCircle className="w-6 h-6" />
            Get a Quote
          </a>
        </div>
      </footer>
    </div>
  );
}
