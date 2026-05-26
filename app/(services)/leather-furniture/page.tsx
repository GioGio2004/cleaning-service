"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MessageCircle, Leaf, Phone, Star, ChevronDown, Droplets, Shield, Sparkles, Wind, ArrowRight } from "lucide-react";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const WHATSAPP_URL = "https://wa.me/995555123456?text=Hello!%20I%20would%20like%20to%20request%20a%20specialized%20quote%20for%20leather%20and%20suede%20cleaning.";

const SERVICE_BREAKDOWN = [
  {
    icon: Sparkles,
    title: "Material Analysis & Spot Testing",
    desc: "We identify the exact grade of your leather or suede, performing invisible spot tests to determine the safest pH-balanced cleaning agents.",
  },
  {
    icon: Droplets,
    title: "Deep Conditioning & Grain Restoration",
    desc: "For leather surfaces, we apply premium conditioning creams that penetrate the hide, restoring natural oils, preventing cracks, and bringing back its original suppleness.",
  },
  {
    icon: Wind,
    title: "Suede Brushing & Nap Rejuvenation",
    desc: "Delicate suede requires specialized dry-cleaning methods and precise brushing to lift the nap and remove embedded dust without water damage.",
  },
  {
    icon: Shield,
    title: "Protective Finishing",
    desc: "We seal the material with an invisible, breathable barrier that repels liquid spills, resists UV fading, and extends the life of your furniture.",
  },
];

const BLOG_POSTS = [
  {
    title: "5 Ways to Prevent Sun Damage on Leather Sofas",
    date: "June 02, 2026",
    img: "https://images.unsplash.com/photo-1512212621149-107ffe572d2f?q=80&w=900&auto=format&fit=crop",
    readTime: "4 min read"
  },
  {
    title: "Why Suede Needs Immediate Attention After Spills",
    date: "May 20, 2026",
    img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=900&auto=format&fit=crop",
    readTime: "5 min read"
  },
  {
    title: "The Difference Between Leather Cleaning and Conditioning",
    date: "May 05, 2026",
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=900&auto=format&fit=crop",
    readTime: "6 min read"
  }
];

export default function LeatherSuedeCleaningPage() {
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
          src="https://images.unsplash.com/photo-1512212621149-107ffe572d2f?q=80&w=2000&auto=format&fit=crop"
          alt="Premium leather interior"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/95" />
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
          <span className="hidden sm:block">Request a Quote</span>
        </a>
      </header>

      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-6 text-center" aria-label="Hero">
        <div className="hero-reveal mb-8">
          <span className="inline-flex items-center gap-2 glass-card rounded-full px-5 py-2 text-sm font-medium text-slate-200 border border-white/10">
            <Star className="w-3.5 h-3.5 text-white fill-white" />
            Premium Material Care
            <Star className="w-3.5 h-3.5 text-white fill-white" />
          </span>
        </div>

        <h1
          className="hero-reveal max-w-5xl text-[clamp(3.5rem,8vw,7rem)] font-bold leading-[0.92] tracking-tight text-slate-200"
          style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
        >
          Restore the <br />
          <em className="italic text-white" style={{ fontStyle: "italic" }}>Natural Grain.</em>
        </h1>

        <p className="hero-reveal mt-7 max-w-2xl text-lg leading-relaxed text-white/80 font-light">
          Specialized cleaning and conditioning for fine leather and delicate suede furniture. We preserve the suppleness, color, and finish of your luxury materials with meticulous, tailored treatments.
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
            Book a Material Assessment
          </a>
        </div>

        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
          <span className="text-xs tracking-widest uppercase font-medium text-slate-200">Our Techniques</span>
          <ChevronDown className="w-4 h-4 text-slate-200" />
        </div>
      </section>

      {/* ── METHODOLOGY GRID ──────────────────────────────────────────────── */}
      <section className="relative z-10 services-section px-6 py-28 max-w-7xl mx-auto border-t border-white/10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-white mb-4 block">
            Meticulous Care
          </span>
          <h2
            className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-slate-200 leading-tight mb-6"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            The Art of Preservation
          </h2>
          <p className="text-base text-slate-400 font-light leading-relaxed">
            Standard upholstery cleaning can irreparably damage natural hides. We use specialized conditioning creams, strict pH balancing, and dry-cleansing methods to ensure your premium furniture ages beautifully.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICE_BREAKDOWN.map((service, idx) => {
             const Icon = service.icon;
             return (
              <div key={idx} className="service-step glass-card p-10 rounded-3xl border border-white/5 hover:border-white/20 transition-colors duration-500 flex flex-col sm:flex-row gap-6 items-start">
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

      {/* ── BLOG & TIPS SECTION ─────────────────────────────────────────────── */}
      <section className="relative z-10 blog-section px-6 py-28 max-w-7xl mx-auto border-t border-white/10 bg-black/40">
        <div className="mb-16 flex flex-col items-center text-center gap-4">
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-white">
            Material Knowledge
          </span>
          <h2
            className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-slate-200 leading-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Leather & Suede Blog
          </h2>
          <p className="max-w-md text-base text-slate-400 font-light">
            Expert insights on how to maintain the beauty, texture, and value of your delicate furniture over time.
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
              <span className="text-sm text-slate-500 group-hover:text-white transition-colors inline-flex items-center gap-1">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* ── FOOTER CTA ──────────────────────────────────────────────────────── */}
      <footer className="relative z-10 footer-section px-6 py-32 text-center border-t border-white/10 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)" }} aria-hidden="true" />
        
        <div className="relative max-w-3xl mx-auto flex flex-col items-center gap-8">
          <h2
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-slate-200 leading-[0.92] tracking-tight"
            style={{ fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif" }}
          >
            Protect Your <br /> <em className="italic text-white" style={{ fontStyle: "italic" }}>Investment</em>
          </h2>
          <p className="text-base text-slate-400 max-w-md font-light leading-relaxed">
            All premium leather and suede treatments are exclusively custom-quoted to ensure your pieces receive the exact specialized care they require.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-semibold text-lg tracking-wide shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 bg-white text-black hover:bg-slate-200"
          >
            <MessageCircle className="w-6 h-6" />
            Request a Specialized Quote
          </a>
        </div>
      </footer>
    </div>
  );
}
