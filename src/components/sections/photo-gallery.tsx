"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { DISTANCES, PHOTOS, PROPERTY } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight } from "../icons";

const FILTROS = ["Tudo", "Casa-sede", "Estrutura", "Terreno"] as const;
const MAPA = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(PROPERTY.mapsQuery)}`;

// tamanhos variados no grid (a 1ª foto e algumas outras ocupam mais espaço)
const destaque = (i: number) => i % 7 === 0;

export default function PhotoGallery() {
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Tudo");
  const [aberta, setAberta] = useState<number | null>(null);
  const dlg = useRef<HTMLDialogElement>(null);
  const toque = useRef<number | null>(null);

  const fotos = useMemo(() => (filtro === "Tudo" ? PHOTOS : PHOTOS.filter((f) => f.cat === filtro)), [filtro]);

  function abrir(i: number) {
    setAberta(i);
    dlg.current?.showModal();
  }
  function passo(d: number) {
    setAberta((a) => (a === null ? a : (a + d + fotos.length) % fotos.length));
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (aberta === null) return;
      if (e.key === "ArrowRight") passo(1);
      if (e.key === "ArrowLeft") passo(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const atual = aberta !== null ? fotos[aberta] : null;

  return (
    <section id="fotos" className="section bg-ink-3">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="reveal">
            <p className="kicker">Galeria · {PHOTOS.length} fotos</p>
            <h2 className="display mt-6 text-[clamp(2.2rem,7vw,4rem)] leading-[0.98] text-white">
              {["O sítio", <span key="b" className="italic normal-case tracking-[0.01em] text-taupe">em detalhes.</span>].map((l, i) => (
                <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                  <span>{l}</span>
                </span>
              ))}
            </h2>
          </div>

          <div className="reveal no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0" role="tablist" aria-label="Filtrar fotos" style={{ ["--d" as string]: "150ms" }}>
            {FILTROS.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filtro === f}
                onClick={() => setFiltro(f)}
                className={cn(
                  "flex-none border px-4 py-2.5 font-display text-[0.58rem] uppercase tracking-[0.22em] transition-colors",
                  filtro === f ? "border-taupe bg-taupe text-ink-2" : "border-white/20 text-pearl/80 hover:border-white/60",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <ul key={filtro} className="mt-12 grid grid-flow-dense auto-rows-[150px] grid-cols-2 gap-2 sm:auto-rows-[190px] md:mt-16 md:grid-cols-4 md:gap-3 lg:auto-rows-[220px]">
          {fotos.map((f, i) => (
            <li
              key={f.src}
              className={cn("group relative overflow-hidden bg-ink-4", destaque(i) && "col-span-2 row-span-2")}
              style={{ animation: `rise .8s cubic-bezier(.2,.65,.25,1) ${Math.min(i, 10) * 60}ms both` }}
            >
              <button type="button" onClick={() => abrir(i)} className="absolute inset-0 block h-full w-full" aria-label={`Ampliar: ${f.alt}`}>
                <Image
                  src={f.src}
                  alt={f.alt}
                  fill
                  sizes={destaque(i) ? "(min-width:768px) 50vw, 100vw" : "(min-width:768px) 25vw, 50vw"}
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.65,.25,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink-1/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-3 bottom-3 translate-y-2 text-left opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <small className="block font-display text-[0.5rem] uppercase tracking-[0.24em] text-taupe">{f.cat}</small>
                  <span className="text-[0.85rem] text-white">{f.alt}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* acesso e distâncias */}
        <div className="reveal mt-14 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:items-center">
          <div>
            <p className="kicker">Localização</p>
            <p className="mt-2 text-lg font-light text-white">{PROPERTY.city}</p>
            <p className="text-pearl/70">{PROPERTY.access}</p>
            <a href={MAPA} target="_blank" rel="noopener noreferrer" className="link-seta mt-5 text-white">
              Ver no mapa <ArrowRight />
            </a>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-4">
            {DISTANCES.map((d) => (
              <li key={d.name} className="bg-ink-3 p-4">
                <p className="font-serif text-[1.9rem] leading-none text-white">
                  {d.km}
                  <span className="ml-1 text-[0.55em] text-taupe">km</span>
                </p>
                <p className="mt-2 text-[0.82rem] text-pearl/70">{d.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* foto ampliada */}
      <dialog
        ref={dlg}
        onClose={() => setAberta(null)}
        onClick={(e) => e.target === dlg.current && dlg.current?.close()}
        onTouchStart={(e) => (toque.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (toque.current === null) return;
          const dx = e.changedTouches[0].clientX - toque.current;
          if (Math.abs(dx) > 40) passo(dx < 0 ? 1 : -1);
          toque.current = null;
        }}
        aria-label="Foto ampliada"
        className="m-auto w-[min(1100px,calc(100%-16px))] bg-transparent p-0 text-pearl backdrop:bg-ink-0/90"
      >
        {atual && (
          <figure>
            <div className="relative aspect-[4/3] w-full bg-ink-1 sm:aspect-[16/10]">
              <Image src={atual.src} alt={atual.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="mt-3 flex items-center gap-4 px-1">
              <span className="font-display text-[0.6rem] tracking-[0.2em] text-taupe">
                {String((aberta ?? 0) + 1).padStart(2, "0")} / {fotos.length}
              </span>
              <span className="flex-1 text-[0.95rem]">{atual.alt}</span>
              <button type="button" onClick={() => passo(-1)} aria-label="Foto anterior" className="flex h-10 w-10 items-center justify-center border border-white/25 hover:border-taupe">
                <ArrowRight className="rotate-180" />
              </button>
              <button type="button" onClick={() => passo(1)} aria-label="Próxima foto" className="flex h-10 w-10 items-center justify-center border border-white/25 hover:border-taupe">
                <ArrowRight />
              </button>
              <button type="button" onClick={() => dlg.current?.close()} aria-label="Fechar" className="ml-1 text-2xl leading-none text-white">
                ×
              </button>
            </figcaption>
          </figure>
        )}
      </dialog>
    </section>
  );
}
