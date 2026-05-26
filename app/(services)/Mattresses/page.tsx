"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Leaf, Phone, Star, Shield, Wind, Bug, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WHATSAPP_URL = "https://wa.me/995555123456?text=Hello!%20I%20would%20like%20to%20get%20a%20custom%20quote%20for%20mattress%20sanitization.";

const HEALTH_BENEFITS = [
  {
    icon: Bug,
    title: "Dust Mite Eradication",
    desc: "We extract millions of microscopic dust mites that thrive in mattresses, preventing allergic reactions and skin irritation.",
  },
  {
    icon: Wind,
    title: "Allergen Removal",
    desc: "Deep vacuuming and enzymatic treatments neutralize pet dander, pollen, and dead skin cells, improving your breathing overnight.",
  },
  {
    icon: Shield,
    title: "Stain & Odor Neutralization",
    desc: "Targeted bio-enzymes break down sweat, urine, and organic stains at the molecular level without relying on harsh bleaches.",
  },
];

const BLOG_POSTS = [
  {
    title: "How Often Should You Really Deep Clean Your Mattress?",
    date: "May 25, 2026",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop",
    readTime: "4 min read"
  },
  {
    title: "The Connection Between Sleep Hygiene and Air Quality",
    date: "May 14, 2026",
    img: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?q=80&w=900&auto=format&fit=crop",
    readTime: "6 min read"
  },
  {
    title: "Why UV Light Treatments Are Replacing Chemical Sprays",
    date: "April 30, 2026",
    img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=900&auto=format&fit=crop",
    readTime: "5 min read"
  }
];

export default function MattressSanitizationPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

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
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.2,
        },
      );

      // 2. Health benefit cards
      gsap.fromTo(
        ".benefit-card",
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".benefits-section",
            start: "top 80%",
          },
        },
      );

      // 3. Equipment section image reveal
      gsap.fromTo(
        ".equipment-image",
        { opacity: 0, scale: 1.1 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".equipment-section",
            start: "top 70%",
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
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2000&auto=format&fit=crop"
          alt="Clean mattress"
          className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black" />
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
          <span className="hidden sm:block">Custom Quote</span>
        </a>
      </header>

      {/* ── ALTERNATE HERO STRUCTURE (Two Column Style) ────────────────────── */}
      <section className="relative z-10 flex items-center min-h-[100dvh] px-6 max-w-7xl mx-auto pt-24 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col items-start text-left">
            <div className="hero-reveal mb-6">
              <span className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 text-sm font-medium text-slate-200 border border-white/10">
                <Star className="w-3.5 h-3.5 text-white fill-white" />
                Clinical-Grade Sanitization
              </span>
            </div>

            <h1
              className="hero-reveal text-[clamp(3.5rem,7vw,6.5rem)] font-bold leading-[0.9] tracking-tight text-slate-200 mb-8"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Breathe Easy. <br />
              <em className="italic text-white" style={{ fontStyle: "italic" }}>Sleep Deeply.</em>
            </h1>

            <p className="hero-reveal max-w-xl text-lg leading-relaxed text-white/80 font-light mb-10">
              We provide highly specialized, custom-quoted mattress sanitization. Utilizing clinical-grade extraction and UV technology, we completely eradicate biological contaminants from your sleeping environment.
            </p>

            <div className="hero-reveal flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                ref={ctaBtnRef}
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-base tracking-wide shadow-lg transition-colors duration-300 bg-white text-black hover:bg-slate-200 w-full sm:w-auto"
              >
                <MessageCircle className="w-5 h-5" />
                Get Your Custom Quote
              </a>
            </div>
          </div>

          <div className="hero-reveal relative hidden lg:block aspect-square w-full max-w-lg mx-auto">
             <div className="absolute inset-0 rounded-full border border-white/10 animate-[spin_60s_linear_infinite]" />
             <div className="absolute inset-4 rounded-full border border-white/5 animate-[spin_40s_linear_infinite_reverse]" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl border border-white/20 flex flex-col items-center justify-center p-8 text-center shadow-2xl">
                   <Shield className="w-12 h-12 text-white mb-4" strokeWidth={1} />
                   <p className="font-cormorant text-xl font-medium text-white">100% Eco-Safe</p>
                   <p className="text-xs text-white/50 uppercase tracking-widest mt-2">No Harsh Bleaches</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ── HEALTH BENEFITS (Grid Structure instead of vertical list) ───────── */}
      <section className="relative z-10 benefits-section px-6 py-24 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-white mb-4 block">
            Health & Hygiene
          </span>
          <h2
            className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-slate-200 leading-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            The Invisible Threats
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HEALTH_BENEFITS.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="benefit-card glass-card p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-colors duration-500">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-200 mb-4">{benefit.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-light">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SPECIALIZED EQUIPMENT SECTION (Dark/Blue Contrast Block) ────────── */}
      <section className="relative z-10 equipment-section px-6 py-32 bg-slate-950 border-y border-white/5 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden glass-card equipment-image border border-white/10">
             <img 
               src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop" 
               alt="Specialized Extraction Equipment" 
               className="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-80 transition-all duration-700"
             />
             <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent opacity-80" />
             <div className="absolute bottom-8 left-8 right-8">
               <div className="flex items-center gap-3 text-white mb-2">
                 <Zap className="w-5 h-5 text-blue-400" />
                 <span className="font-semibold tracking-wider uppercase text-xs">High-Frequency Technology</span>
               </div>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2
              className="text-[clamp(2.5rem,4vw,3.5rem)] font-bold text-slate-200 leading-tight mb-8"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Precision <br /> Instrumentation
            </h2>
            <p className="text-base text-slate-400 font-light leading-relaxed mb-6">
              Standard vacuums barely scratch the surface of a mattress. We utilize industrial, high-frequency pulsating extractors designed specifically for upholstery and deep foam sanitization.
            </p>
            <p className="text-base text-slate-400 font-light leading-relaxed mb-10">
              Paired with medical-grade UV-C light wands, our process destroys the DNA of bacteria and viruses instantly, ensuring your mattress is clinically sterilized without soaking it in water or toxic chemicals.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white font-medium hover:text-slate-300 transition-colors border-b border-white/30 pb-1"
            >
              Learn more about our equipment <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ── BLOG & TIPS SECTION ─────────────────────────────────────────────── */}
      <section className="relative z-10 blog-section px-6 py-28 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-xl">
            <span className="text-xs tracking-[0.2em] uppercase font-semibold text-white mb-4 block">
              Sleep Hygiene
            </span>
            <h2
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-slate-200 leading-tight"
              style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
            >
              Blog & Articles
            </h2>
          </div>
          <p className="text-base text-slate-400 font-light max-w-sm">
            Read our latest articles on maintaining a clean, healthy sleeping environment for you and your family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <article key={idx} className="blog-card group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 border border-white/10">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-3 text-[10px] text-white/70 uppercase tracking-widest font-semibold mb-3">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3
                    className="text-2xl font-semibold text-white leading-snug"
                    style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
                  >
                    {post.title}
                  </h3>
                </div>
              </div>
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
            Upgrade Your<br /> <em className="italic text-white" style={{ fontStyle: "italic" }}>Quality of Sleep</em>
          </h2>
          <p className="text-base text-slate-400 max-w-md font-light leading-relaxed">
            All mattress sanitization rates are highly negotiable. Let us build a custom cleaning plan specifically for your household.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-white text-black hover:bg-slate-200"
          >
            <MessageCircle className="w-6 h-6" />
            Get Your Custom Quote
          </a>
        </div>
      </footer>
    </div>
  );
}
