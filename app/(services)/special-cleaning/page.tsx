"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Leaf, Phone, Star, ChevronDown, FlaskConical, Wind, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WHATSAPP_URL = "https://wa.me/995555123456?text=Hello!%20I%20would%20like%20to%20get%20a%20free%20assessment%20for%20specialized%20upholstery%20treatments.";

const TREATMENT_BREAKDOWN = [
  {
    icon: FlaskConical,
    title: "Targeted Enzyme Cleaning",
    desc: "The absolute best solution for biological incidents like pet accidents or vomit on fabric upholstery. Active bio-enzymes physically break down the protein structures of stains and odor-causing bacteria at a molecular level, eradicating the source entirely rather than merely masking it.",
  },
  {
    icon: Wind,
    title: "Advanced Dry Deodorizing",
    desc: "For persistent basic household odors, we utilize professional dry baking soda applications. The specialized alkaline powder is allowed to sit for 20-60 minutes to actively absorb and neutralize acidic odor particles, followed by an industrial vacuum extraction that leaves the fabric exceptionally fresh without heavy perfumes.",
  },
];

const BLOG_POSTS = [
  {
    title: "Pet-Friendly Cleaning: How to Eradicate Odors Safely",
    date: "June 05, 2026",
    img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=900&auto=format&fit=crop",
    readTime: "5 min read"
  },
  {
    title: "The Science Behind Enzymatic Cleaners vs Traditional Soap",
    date: "May 28, 2026",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=900&auto=format&fit=crop",
    readTime: "7 min read"
  },
  {
    title: "Tackling Tough Home Odors: When to Call the Professionals",
    date: "May 12, 2026",
    img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?q=80&w=900&auto=format&fit=crop",
    readTime: "4 min read"
  }
];

export default function SpecializedTreatmentsPage() {
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

      // Service cards stagger
      gsap.fromTo(
        ".service-step",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 75%",
          },
        },
      );

      // Blog cards stagger
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
    <div ref={containerRef} className="relative min-h-screen bg-black text-slate-200 selection:bg-white/20">
      {/* ── BACKGROUND ──────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2000&auto=format&fit=crop"
          alt="Clean interior space"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        {/* Deep, somewhat clinical dark gradient to emphasize "scientific" and "effective" */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-black/80 to-black" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-emerald-900/10 rounded-full blur-[150px] pointer-events-none" />
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
          <span className="hidden sm:block">Book Treatment</span>
        </a>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center" aria-label="Hero">
        <div className="hero-reveal mb-8">
          <span className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 text-sm font-medium text-emerald-400/90 border border-emerald-500/20 bg-emerald-950/20 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            Specialized Upholstery Treatments
          </span>
        </div>

        <h1
          className="hero-reveal max-w-5xl text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.92] tracking-tight text-slate-200"
          style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
        >
          Deep Odor & <br />
          <em className="italic text-white" style={{ fontStyle: "italic" }}>Stain Removal.</em>
        </h1>

        <p className="hero-reveal mt-7 max-w-2xl text-lg leading-relaxed text-slate-300 font-light">
          When standard cleaning isn't enough. We utilize advanced scientific treatments—including active bio-enzymes and deep-penetrating deodorizers—to permanently neutralize biological stains and persistent odors from your upholstery.
        </p>

        <div className="hero-reveal mt-10 flex flex-col sm:flex-row gap-4 items-center">
          <a
            ref={ctaBtnRef}
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base tracking-wide shadow-xl transition-colors duration-300 bg-white text-black hover:bg-slate-200"
          >
            <MessageCircle className="w-5 h-5" />
            Get a Free Assessment
          </a>
        </div>

        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-xs tracking-widest uppercase font-medium text-slate-200">The Science</span>
          <ChevronDown className="w-4 h-4 text-slate-200" />
        </div>
      </section>

      {/* ── CORE TREATMENTS BREAKDOWN ───────────────────────────────────────── */}
      <section className="relative z-10 services-section px-6 py-28 max-w-7xl mx-auto border-t border-white/10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-emerald-400 mb-4 block">
            Targeted Solutions
          </span>
          <h2
            className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-slate-200 leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            How We Eradicate It
          </h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            We don't rely on harsh perfumes that merely cover up smells. Our specialized treatments break down the organic compounds responsible for the odors, ensuring a genuinely fresh, sanitized outcome.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {TREATMENT_BREAKDOWN.map((service, idx) => {
             const Icon = service.icon;
             return (
              <div key={idx} className="service-step relative glass-card p-12 rounded-[2rem] border border-white/5 hover:border-emerald-500/20 transition-all duration-500 flex flex-col bg-slate-900/40">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-transparent flex items-center justify-center border border-emerald-500/30 mb-8">
                  <Icon className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-100 mb-4">{service.title}</h3>
                <p className="text-base text-slate-400 leading-relaxed font-light">{service.desc}</p>
              </div>
             );
          })}
        </div>
      </section>

      {/* ── BLOG & TIPS SECTION ─────────────────────────────────────────────── */}
      <section className="relative z-10 blog-section px-6 py-28 max-w-7xl mx-auto border-t border-white/10 bg-black/40">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-emerald-400">
            Expert Insights
          </span>
          <h2
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-slate-200 leading-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Odor & Stain Blog
          </h2>
          <p className="max-w-md text-base text-slate-400 font-light">
            Learn the science of cleanliness and how to handle difficult stains and pet-related incidents safely at home.
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
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-medium mb-3">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span>{post.readTime}</span>
              </div>
              <h3
                className="text-xl font-semibold text-slate-200 mb-3 group-hover:text-emerald-400 transition-colors leading-snug"
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
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)" }} aria-hidden="true" />
        
        <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-8">
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-slate-200 leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Eradicate Odors <br /> <em className="italic text-white" style={{ fontStyle: "italic" }}>Permanently</em>
          </h2>
          <p className="text-base text-slate-400 max-w-md font-light leading-relaxed">
            Due to the specialized nature of biological stain and odor removal, all treatments are custom-quoted after assessing the severity of the issue.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-white text-black hover:bg-slate-200"
          >
            <MessageCircle className="w-6 h-6" />
            Book a Specialized Treatment
          </a>
        </div>
      </footer>
    </div>
  );
}
