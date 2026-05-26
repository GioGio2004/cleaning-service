import Link from "next/link";

interface ServiceCardProps {
  title: string;
  desc: string;
  img: string;
  badge?: string | null;
  href: string;
  linkText?: string;
  isExternal?: boolean;
}

export function ServiceCard({
  title,
  desc,
  img,
  badge,
  href,
  linkText = "Book this service",
  isExternal = false,
}: ServiceCardProps) {
  const content = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {badge && (
          <span className="absolute top-3 left-3 bg-white text-black text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3
          className="text-2xl font-semibold text-slate-200 mb-2 leading-tight"
          style={{
            fontFamily: "var(--font-cormorant), 'Cormorant Garamond', serif",
          }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-400 flex-grow mb-5">
          {desc}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-slate-400 transition-colors">
          {linkText}
          <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </>
  );

  const className =
    "service-card glass-card rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full";

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
