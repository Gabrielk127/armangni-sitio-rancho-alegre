import Image from "next/image";
import { BUILDINGS, PROPERTY } from "@/lib/site";
import { cn } from "@/lib/utils";

const CORES = ["bg-terra", "bg-taupe", "bg-[#8fa58a]", "bg-[#d9c9a8]", "bg-mist"];

export default function Structure() {
  const outras = BUILDINGS.filter((b) => b.id !== "casa");

  return (
    <section id="estrutura" className="bg-ink-2">
      <div className="wrap section">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
          <div className="reveal">
            <p className="kicker">Estrutura · Edificações</p>
            <h2 className="display mt-6 text-[clamp(2.2rem,7vw,4rem)] leading-[0.98] text-white">
              {[<span key="a">{PROPERTY.areaConstruida} <span className="normal-case">m²</span></span>, <span key="b" className="italic normal-case tracking-[0.01em] text-taupe">prontos para produzir.</span>].map((l, i) => (
                <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                  <span>{l}</span>
                </span>
              ))}
            </h2>
            <p className="mt-6 max-w-md text-pearl/75">
              Além da casa-sede, o sítio tem queijaria, capril, casa de caseiro e celeiro: uma base pronta para moradia
              com produção no campo.
            </p>
          </div>

          {/* composição dos 800 m² */}
          <div className="reveal" style={{ ["--d" as string]: "150ms" }}>
            <div className="flex h-3 w-full gap-0.5 overflow-hidden">
              {BUILDINGS.map((b, i) => (
                <span
                  key={b.id}
                  className={cn("reveal-img h-full", CORES[i])}
                  style={{ width: `${(b.area / PROPERTY.areaConstruida) * 100}%`, ["--d" as string]: `${300 + i * 120}ms` }}
                />
              ))}
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {BUILDINGS.map((b, i) => (
                <li key={b.id} className="flex items-baseline gap-2.5 text-[0.85rem] text-pearl/85">
                  <span className={cn("h-2 w-2 flex-none translate-y-[-1px] rounded-full", CORES[i])} />
                  <span>
                    {b.name} <span className="text-mist">· {b.area} m²</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* blocos alternados por edificação */}
        <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
          {outras.map((b, i) => {
            const inverte = i % 2 === 1;
            if (!b.img) {
              return (
                <article key={b.id} className="reveal grid gap-6 border border-white/12 bg-ink-3/60 p-7 sm:p-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-14">
                  <div>
                    <span className="font-display text-[0.6rem] tracking-[0.2em] text-taupe">{String(i + 2).padStart(2, "0")}</span>
                    <h3 className="display mt-3 text-[clamp(1.7rem,4.4vw,2.6rem)] text-white">{b.name}</h3>
                    <p className="mt-2 font-display text-[0.6rem] uppercase tracking-[0.22em] text-mist">{b.area} m² de área construída</p>
                  </div>
                  <ul className="grid gap-x-8 sm:grid-cols-2">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 border-b border-white/10 py-3 text-pearl/85">
                        <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-taupe" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            }
            return (
              <article key={b.id} className="grid gap-8 md:grid-cols-2 md:items-center md:gap-14">
                <div className={cn("reveal", inverte && "md:order-2")}>
                  <div className="reveal-img relative aspect-[16/10] overflow-hidden">
                    <Image src={b.img} alt={b.name} fill sizes="(min-width:768px) 50vw, 100vw" className="img-zoom object-cover" />
                    <span className="absolute left-4 top-4 bg-ink-2/85 px-3 py-2 font-display text-[0.55rem] uppercase tracking-[0.22em] text-pearl backdrop-blur">
                      {b.area} m²
                    </span>
                  </div>
                </div>
                <div className={cn("reveal", inverte && "md:order-1")} style={{ ["--d" as string]: "150ms" }}>
                  <span className="font-display text-[0.6rem] tracking-[0.2em] text-taupe">{String(i + 2).padStart(2, "0")}</span>
                  <h3 className="display mt-3 text-[clamp(1.7rem,4.4vw,2.6rem)] text-white">{b.name}</h3>
                  <p className="mt-2 font-display text-[0.6rem] uppercase tracking-[0.22em] text-mist">{b.area} m² de área construída</p>
                  <ul className="mt-6 border-t border-white/10">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-3 border-b border-white/10 py-3 text-pearl/85">
                        <span className="mt-2.5 h-1 w-1 flex-none rounded-full bg-taupe" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  {b.id === "queijaria" && (
                    <p className="mt-6 border-l border-taupe/60 pl-4 text-[0.92rem] text-pearl/70">
                      <strong className="font-medium text-taupe">Diferencial:</strong> estrutura física com características
                      adequadas para a implantação de atividades de produção e processamento, sujeitas às adaptações e às
                      autorizações aplicáveis ao empreendimento do comprador.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
