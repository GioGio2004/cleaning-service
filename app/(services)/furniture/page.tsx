"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Leaf, Phone, Star, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

// ── Register GSAP plugins safely outside component lifecycle ──────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WHATSAPP_URL = "https://wa.me/995555123456?text=Hello!%20I%20would%20like%20to%20get%20a%20free%20quote%20for%20upholstered%20furniture%20cleaning.";

const PROCESS_STEPS = [
  {
    title: "1. Fabric Analysis & Prep",
    desc: "We identify the specific fabric type of your sofa, armchair, or office chair to determine the safest, most effective cleaning agents.",
  },
  {
    title: "2. Deep Enzyme Extraction",
    desc: "Using advanced equipment, we eliminate embedded dirt, dust mites, and stubborn stains, restoring the original texture of your upholstery.",
  },
  {
    title: "3. Odor Neutralization & Protection",
    desc: "We apply eco-safe deodorizers and an optional stain-guard layer to repel future spills and keep your furniture smelling fresh.",
  },
];

const BLOG_POSTS = [
  {
    title: "5 Signs Your Sofa Needs Professional Deep Cleaning",
    date: "May 20, 2026",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=900&auto=format&fit=crop",
    readTime: "4 min read"
  },
  {
    title: "How to Protect Your Upholstery from Pet Stains and Odors",
    date: "May 02, 2026",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=900&auto=format&fit=crop",
    readTime: "5 min read"
  },
  {
    title: "The Difference Between Steam Cleaning and Enzyme Extraction",
    date: "April 18, 2026",
    img: "https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=900&auto=format&fit=crop",
    readTime: "6 min read"
  }
];

export default function FurnitureCleaningPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  // ── Smooth scrolling and animations ────────────────────────────────────────────
  useGSAP(
    () => {
      // 1. Hero stagger reveal
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

      // 2. Scroll indicator bob
      gsap.to(".scroll-indicator", {
        y: 8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Process section reveal
      gsap.fromTo(
        ".process-step",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-section",
            start: "top 75%",
          },
        },
      );

      // 4. Blog cards stagger
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

  // ── CTA Button Hover ────────────────────────────────────────────────────────
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
          src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=2000&auto=format&fit=crop"
          alt="Premium upholstered furniture"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/90" />
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
          <span className="hidden sm:block">Get a Free Quote</span>
        </a>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center" aria-label="Hero">
        <div className="hero-reveal mb-8">
          <span className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 text-sm font-medium text-slate-200 border border-white/10">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
            Sofas • Armchairs • Office
            <Star className="w-3.5 h-3.5 text-white fill-white" />
          </span>
        </div>

        <h1
          className="hero-reveal max-w-5xl text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.92] tracking-tight text-slate-200"
          style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
        >
          Revitalize Your <br />
          <em className="italic text-white" style={{ fontStyle: "italic" }}>Upholstery.</em>
        </h1>

        <p className="hero-reveal mt-7 max-w-2xl text-lg leading-relaxed text-white/80 font-light">
          Experience our high-end furniture cleaning. We use precision stain-removal and deep-cleaning techniques to breathe new life into your sofas, armchairs, and office seating—without harsh chemicals.
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
            Contact Us
          </a>
        </div>

        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-xs tracking-widest uppercase font-medium text-slate-200">Discover</span>
          <ChevronDown className="w-4 h-4 text-slate-200" />
        </div>
      </section>

      {/* ── PROCESS SECTION ─────────────────────────────────────────────────── */}
      <section className="relative z-10 process-section px-6 py-28 max-w-5xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-white mb-4 block">
              Advanced Techniques
            </span>
            <h2
              className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-slate-200 leading-tight mb-8"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              The Art of <br /> Deep Cleaning
            </h2>
            <p className="text-base text-slate-400 font-light leading-relaxed mb-8">
              Beautiful furniture demands delicate yet powerful care. We rely on top-tier stain extraction methods and hypoallergenic agents to eliminate deep-seated allergens and restore fabric vibrance while ensuring complete material safety.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-slate-300 transition-colors border-b border-white/30 pb-1"
            >
              Ask about your fabric type <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="flex flex-col gap-8 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-white/10 hidden md:flex">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="process-step relative pl-14">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-black border border-white/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Mobile Process Steps */}
          <div className="flex flex-col gap-6 md:hidden">
             {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="process-step glass-card p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-slate-200 mb-2 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG & TIPS SECTION ─────────────────────────────────────────────── */}
      <section className="relative z-10 blog-section px-6 py-28 max-w-7xl mx-auto border-t border-white/10 bg-black/40">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-white">
            Fabric Protection
          </span>
          <h2
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-slate-200 leading-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Upholstery Care Blog
          </h2>
          <p className="max-w-md text-base text-slate-400 font-light">
            Expert insights on how to maintain the beauty and hygiene of your upholstered pieces all year long.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <article key={idx} className="blog-card group cursor-pointer">
              <div className="relative aspect-video overflow-hidden rounded-2xl mb-5">
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
              <span className="text-sm text-slate-500 group-hover:text-slate-300 transition-colors inline-flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ──────────────────────────────────────────────────────── */}
      <footer className="relative z-10 footer-section px-6 py-32 text-center border-t border-white/10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)" }} aria-hidden="true" />
        
        <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-8">
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-slate-200 leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Ready to Refresh<br /> <em className="italic text-white" style={{ fontStyle: "italic" }}>Your Furniture?</em>
          </h2>
          <p className="text-base text-slate-400 max-w-md font-light leading-relaxed">
            Reach out for a personalized estimate based on your specific furniture pieces. No hidden fees, just pristine results.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-white text-black hover:bg-slate-200"
          >
            <MessageCircle className="w-6 h-6" />
            Get a Free Quote
          </a>
        </div>
      </footer>
    </div>
  );
}
