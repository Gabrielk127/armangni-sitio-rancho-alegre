import Image from "next/image";
import { Cable, Cctv, DoorOpen, Droplets, Wifi, Zap } from "lucide-react";
import { IMAGES, INFRA } from "@/lib/site";

const ICONES = [Zap, Droplets, Cable, Wifi, DoorOpen, Cctv];

export default function Infra() {
  return (
    <section id="infraestrutura" className="section bg-taupe-50 text-ink-2">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-20">
        <div className="reveal">
          <p className="kicker !text-taupe-800">Infraestrutura</p>
          <h2 className="display mt-6 text-[clamp(2.1rem,6vw,3.4rem)] leading-[1]">
            Tudo pronto
            <br />
            <span className="italic normal-case tracking-[0.01em] text-terra">para chegar e morar.</span>
          </h2>
          <div className="reveal-img relative mt-10 aspect-[16/10] overflow-hidden">
            <Image src={IMAGES.pocoGalinheiro} alt="Poço artesiano, caixa d'água e galinheiro" fill sizes="(min-width:1024px) 40vw, 100vw" className="img-zoom object-cover" />
          </div>
          <p className="mt-3 font-display text-[0.55rem] uppercase tracking-[0.24em] text-taupe-800">Poço artesiano · caixa d&apos;água · galinheiro</p>
        </div>

        <ul className="grid gap-px overflow-hidden border border-ink-2/10 bg-ink-2/10 sm:grid-cols-2">
          {INFRA.map((it, i) => {
            const Icon = ICONES[i];
            return (
              <li
                key={it.title}
                className="reveal group bg-taupe-50 p-6 transition-colors duration-500 hover:bg-white sm:p-7"
                style={{ ["--d" as string]: `${i * 80}ms` }}
              >
                <Icon className="h-6 w-6 text-terra transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.2} />
                <p className="mt-6 font-display text-[0.66rem] uppercase tracking-[0.2em]">{it.title}</p>
                <p className="mt-2 text-taupe-800">{it.detail}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
