import Image from "next/image";
import { IMAGES, TERRAIN } from "@/lib/site";

export default function Terrain() {
  return (
    <section id="terreno" className="bg-ink-1">
      {/* faixa aérea em tela cheia */}
      <div className="relative isolate flex min-h-[92svh] items-end overflow-hidden md:items-center">
        <div className="absolute inset-[-8%_0] -z-10" data-parallax="0.1">
          <Image src={IMAGES.pastagensAerea} alt="Vista aérea das pastagens e do galpão coberto de hera" fill sizes="100vw" className="object-cover object-[center_30%]" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink-1 via-ink-1/55 to-ink-1/10 md:bg-gradient-to-l md:from-ink-1/95 md:via-ink-1/60 md:to-transparent" />

        <div className="wrap flex justify-end pb-16 pt-40 md:py-24">
          <div className="reveal max-w-md">
            <p className="kicker !text-taupe">Terreno · Área externa</p>
            <h2 className="display mt-6 text-[clamp(2.1rem,6vw,3.4rem)] leading-[1] text-white">
              4 hectares
              <br />
              <span className="italic normal-case tracking-[0.01em] text-taupe">de campo aberto.</span>
            </h2>
            <p className="mt-6 text-pearl/85">
              Relevo levemente ondulado, com bom aproveitamento do terreno, área para pastagem e córrego na divisa da
              propriedade.
            </p>
            <ul className="mt-8 border-t border-white/15">
              {TERRAIN.map((t, i) => (
                <li
                  key={t}
                  className="reveal flex items-center gap-4 border-b border-white/10 py-3 text-pearl/90"
                  style={{ ["--d" as string]: `${200 + i * 80}ms` }}
                >
                  <span className="font-display text-[0.55rem] tracking-[0.2em] text-taupe">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* horta e pastagens */}
      <div className="wrap section grid grid-cols-12 gap-4">
        <figure className="reveal col-span-12 md:col-span-7">
          <div className="reveal-img relative aspect-[16/10] overflow-hidden">
            <Image src={IMAGES.horta} alt="Horta cercada com vista para os morros" fill sizes="(min-width:768px) 58vw, 100vw" className="img-zoom object-cover" />
          </div>
          <figcaption className="mt-3 font-display text-[0.55rem] uppercase tracking-[0.24em] text-mist">Horta cercada</figcaption>
        </figure>
        <figure className="reveal col-span-12 md:col-span-5 md:mt-24" style={{ ["--d" as string]: "160ms" }}>
          <div className="reveal-img relative aspect-[4/3] overflow-hidden">
            <Image src={IMAGES.pastagens} alt="Visão geral das pastagens" fill sizes="(min-width:768px) 42vw, 100vw" className="img-zoom object-cover" />
          </div>
          <figcaption className="mt-3 font-display text-[0.55rem] uppercase tracking-[0.24em] text-mist">Pastagens</figcaption>
        </figure>
      </div>
    </section>
  );
}
