"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { DISTANCES, IMAGES, MAPS_EMBED, PROPERTY, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowRight, WhatsAppIcon } from "../icons";

// raio no disco proporcional à distância real (67 km = borda)
const raio = (km: number) => 20 + (km / 67) * 24;
const ANEIS = [10, 30, 60]; // km
const SURROUNDINGS = DISTANCES.map((d) => ({ ...d, detail: `${d.km} km` }));
const AUTO_SPEED = 0.0045; // graus por ms (~4,5°/s)

export default function Location() {
  const rot = useMotionValue(0);
  const counter = useTransform(rot, (v) => -v);
  const [active, setActive] = useState(0);
  const [interagiu, setInteragiu] = useState(false);
  const pausaAte = useRef(0);
  const arrasto = useRef<{ x: number; rot: number } | null>(null);
  const visivel = useRef(false);
  const dialRef = useRef<HTMLDivElement>(null);
  const mapaRef = useRef<HTMLDialogElement>(null);
  const [mapaAberto, setMapaAberto] = useState(false);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = dialRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([en]) => (visivel.current = en.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // giro automático lento enquanto ninguém mexe (para fora da tela)
  useAnimationFrame((_, delta) => {
    if (reduce.current || !visivel.current || arrasto.current || performance.now() < pausaAte.current) return;
    rot.set(rot.get() - delta * AUTO_SPEED);
  });

  function pausar(ms = 6000) {
    pausaAte.current = performance.now() + ms;
  }

  function focar(i: number) {
    setActive(i);
    setInteragiu(true);
    pausar(7000);
    // leva o ponto para o topo do radar pelo caminho mais curto
    const atual = rot.get();
    let alvo = -SURROUNDINGS[i].angle;
    alvo += Math.round((atual - alvo) / 360) * 360;
    animate(rot, alvo, { duration: 1.2, ease: [0.65, 0, 0.35, 1] });
  }

  function onPointerDown(e: React.PointerEvent) {
    arrasto.current = { x: e.clientX, rot: rot.get() };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setInteragiu(true);
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!arrasto.current) return;
    rot.set(arrasto.current.rot + (e.clientX - arrasto.current.x) * 0.45);
  }
  function onPointerUp() {
    arrasto.current = null;
    pausar();
  }

  function abrirMapa() {
    setMapaAberto(true);
    mapaRef.current?.showModal();
  }

  return (
    <section id="localizacao" className="relative overflow-hidden bg-ink-3">
      {/* céu do campo que dissolve no verde */}
      <div className="absolute inset-x-0 -top-16 h-[80vh] min-h-[480px]" data-parallax="0.08">
        <Image src={IMAGES.pastagens} alt="" fill sizes="100vw" className="object-cover object-top opacity-45" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-3/40 via-ink-3/75 to-ink-3" />
      </div>

      <div className="wrap section relative">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="kicker !text-pearl">Localização · Porto Feliz — SP</p>
          <h2 className="mt-5 font-serif text-[clamp(2.1rem,6vw,3.6rem)] leading-[1.05] text-white">
            Perto de tudo.
            <br /> <span className="italic text-taupe">Longe do barulho.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pearl/75">
            {PROPERTY.access}. Arraste o radar e veja a distância até as principais
            cidades da região.
          </p>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:mt-20 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          {/* ---------- radar ---------- */}
          <div className="reveal relative mx-auto w-full max-w-[560px]" style={{ ["--d" as string]: "120ms" }}>
            <div
              ref={dialRef}
              className="relative aspect-square w-full touch-pan-y select-none active:cursor-grabbing md:cursor-grab"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              {/* moldura fixa: régua de graus */}
              <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <circle cx="300" cy="300" r="296" fill="rgba(14,14,14,.35)" stroke="rgba(191,180,170,.35)" />
                {Array.from({ length: 72 }).map((_, i) => {
                  const a = (i * 5 * Math.PI) / 180;
                  const longo = i % 6 === 0;
                  const r1 = 296;
                  const r2 = longo ? 280 : 288;
                  return (
                    <line
                      key={i}
                      x1={(300 + r1 * Math.sin(a)).toFixed(2)}
                      y1={(300 - r1 * Math.cos(a)).toFixed(2)}
                      x2={(300 + r2 * Math.sin(a)).toFixed(2)}
                      y2={(300 - r2 * Math.cos(a)).toFixed(2)}
                      stroke={longo ? "rgba(191,180,170,.7)" : "rgba(255,255,255,.18)"}
                      strokeWidth={longo ? 1.4 : 1}
                    />
                  );
                })}
              </svg>

              {/* disco que gira */}
              <motion.div className="absolute inset-[4%] rounded-full" style={{ rotate: rot }}>
                {/* varredura */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div
                    className="absolute inset-0 animate-sweep rounded-full"
                    style={{ background: "conic-gradient(from 0deg, rgba(191,180,170,.22), rgba(191,180,170,0) 70deg, transparent 360deg)" }}
                  />
                </div>
                <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden="true">
                  {ANEIS.map((km, i) => (
                    <g key={km}>
                      <circle
                        cx="300"
                        cy="300"
                        r={((raio(km) / 46) * 300).toFixed(2)}
                        fill="none"
                        stroke="rgba(255,255,255,.14)"
                        strokeDasharray={i === ANEIS.length - 1 ? "2 6" : undefined}
                      />
                      <text x={(300 + (raio(km) / 46) * 300 * 0.707 + 4).toFixed(2)} y={(300 - (raio(km) / 46) * 300 * 0.707 - 4).toFixed(2)} className="fill-mist font-display text-[11px] tracking-[0.12em]">
                        {km} km
                      </text>
                    </g>
                  ))}
                  <line x1="300" y1="6" x2="300" y2="594" stroke="rgba(255,255,255,.07)" />
                  <line x1="6" y1="300" x2="594" y2="300" stroke="rgba(255,255,255,.07)" />
                  <text x="300" y="34" textAnchor="middle" className="fill-taupe font-display text-[15px] tracking-[0.3em]">
                    N
                  </text>
                </svg>

                {SURROUNDINGS.map((p, i) => {
                  const r = (raio(p.km) / 46) * 50;
                  const a = (p.angle * Math.PI) / 180;
                  const on = active === i;
                  return (
                    <div
                      key={p.name}
                      className={cn("absolute", on && "z-10")}
                      style={{ left: `${(50 + r * Math.sin(a)).toFixed(3)}%`, top: `${(50 - r * Math.cos(a)).toFixed(3)}%` }}
                    >
                      <motion.button
                        type="button"
                        style={{ rotate: counter }}
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => focar(i)}
                        onMouseEnter={() => setActive(i)}
                        aria-label={`${p.name} — ${p.detail}`}
                        className="group relative block -translate-x-1/2 -translate-y-1/2"
                      >
                        <span
                          className={cn(
                            "relative flex h-6 w-6 items-center justify-center rounded-full border font-display text-[0.55rem] transition-all duration-300 sm:h-3 sm:w-3",
                            on
                              ? "scale-110 border-taupe bg-taupe text-ink-2"
                              : "border-white/60 bg-ink-2/80 text-pearl sm:bg-white/80",
                          )}
                        >
                          <span className="sm:hidden">{i + 1}</span>
                        </span>
                        <span
                          className={cn(
                            "pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap border px-2.5 py-1.5 text-left backdrop-blur-md transition-all duration-300",
                            on
                              ? "border-taupe/70 bg-ink-2/90 opacity-100"
                              : "border-white/15 bg-ink-2/70 opacity-0 sm:opacity-100",
                          )}
                        >
                          <small className="block font-display text-[0.48rem] uppercase tracking-[0.22em] text-taupe">
                            {p.detail}
                          </small>
                          <strong className="block text-[0.7rem] font-normal text-white">{p.name}</strong>
                        </span>
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>

              {/* o empreendimento, fixo no centro */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-taupe" />
                <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 animate-pulse-ring rounded-full border border-taupe [animation-delay:1.3s]" />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-taupe bg-ink-2 font-display text-[0.5rem] uppercase leading-tight tracking-[0.14em] text-white shadow-[0_0_40px_rgba(191,180,170,.35)]">
                  <span className="text-center">
                    Rancho
                    <br />
                    <span className="text-taupe">Alegre</span>
                  </span>
                </span>
              </div>

              {/* dica de gesto */}
              <div
                className={cn(
                  "pointer-events-none absolute bottom-[14%] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-700",
                  interagiu ? "opacity-0" : "opacity-100",
                )}
              >
                <svg viewBox="0 0 24 24" className="h-7 w-7 animate-[hand_3s_ease-in-out_infinite] text-white" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden="true">
                  <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.2a5 5 0 0 1-3.9-1.9L4.6 15.9a1.5 1.5 0 0 1 2.3-1.9L9 16" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="whitespace-nowrap font-display text-[0.5rem] uppercase tracking-[0.3em] text-pearl/80">
                  Arraste para explorar
                </span>
              </div>
            </div>
          </div>

          {/* ---------- lista ---------- */}
          <div className="reveal" style={{ ["--d" as string]: "220ms" }}>
            <ol className="divide-y divide-white/10 border-y border-white/10">
              {SURROUNDINGS.map((p, i) => (
                <li key={p.name}>
                  <button
                    type="button"
                    onClick={() => focar(i)}
                    onMouseEnter={() => setActive(i)}
                    className={cn(
                      "group flex w-full items-center gap-4 py-3.5 text-left transition-colors",
                      active === i ? "text-white" : "text-pearl/60 hover:text-white",
                    )}
                  >
                    <span className={cn("w-6 font-display text-[0.6rem] tracking-[0.1em]", active === i ? "text-taupe" : "text-mist")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[0.98rem] font-light">{p.name}</span>
                    <span className="font-display text-[0.52rem] uppercase tracking-[0.22em] text-mist">{p.detail}</span>
                    <span
                      className={cn(
                        "h-px bg-taupe transition-all duration-500",
                        active === i ? "w-6" : "w-0 group-hover:w-3",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ol>

            <p className="mt-3 text-[0.72rem] text-mist/80">Distâncias da apresentação do imóvel; direções aproximadas.</p>

            <div className="mt-10">
              <p className="kicker">Acesso</p>
              <p className="mt-2 text-lg font-light text-white">
                {PROPERTY.access}
                <br />
                <span className="text-pearl/70">{PROPERTY.city}</span>
              </p>
              <button type="button" onClick={abrirMapa} className="link-seta mt-6 text-white">
                Ver localização no mapa <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="reveal mt-16 flex flex-col gap-3 border-t border-white/10 pt-10 sm:flex-row sm:justify-end">
          <a href="#contato" data-interesse="localizacao" className="btn btn-primary">
            Agendar uma visita <ArrowRight />
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <WhatsAppIcon className="h-4 w-4 text-wa" /> Falar no WhatsApp
          </a>
        </div>
      </div>

      <dialog
        ref={mapaRef}
        onClose={() => setMapaAberto(false)}
        onClick={(e) => e.target === mapaRef.current && mapaRef.current?.close()}
        className="m-auto w-[min(960px,calc(100%-24px))] overflow-hidden border border-white/15 bg-ink-2 p-0 text-pearl"
        aria-label="Mapa da localização"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
          <p className="text-sm">
            <span className="kicker mr-3 !text-taupe">{PROPERTY.name}</span>
            {PROPERTY.city}
          </p>
          <button type="button" onClick={() => mapaRef.current?.close()} aria-label="Fechar mapa" className="-mr-2 p-2 text-2xl leading-none text-white">
            ×
          </button>
        </div>
        <div className="aspect-[4/3] w-full bg-ink-3 sm:aspect-[16/9]">
          {mapaAberto && (
            <iframe
              title="Mapa de Porto Feliz — SP"
              src={MAPS_EMBED}
              className="h-full w-full grayscale-[.35] invert-[.9] hue-rotate-180"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </dialog>
    </section>
  );
}
