import Image from "next/image";
import { Check } from "lucide-react";
import { HOUSE_FEATURES, IMAGES } from "@/lib/site";

export default function House() {
  return (
    <section id="casa" className="section overflow-hidden bg-taupe-100 text-ink-2">
      <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-20">
        <div className="reveal">
          <p className="kicker !text-taupe-800">Casa principal · 165 m²</p>
          <h2 className="display mt-6 text-[clamp(2.2rem,7vw,4rem)] leading-[0.98]">
            {["Casa-sede", <span key="b" className="italic normal-case tracking-[0.01em] text-terra">com cara de campo.</span>].map((l, i) => (
              <span key={i} className="mask-line" style={{ ["--i" as string]: i }}>
                <span>{l}</span>
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-md text-[1.05rem] text-taupe-800">
            Tijolo aparente, telhado colonial, vigas de madeira e a cozinha gourmet integrada à sala de jantar: uma casa
            feita para receber a família e os amigos.
          </p>
          <div className="rule-tick my-8 text-ink-2" />
          <ul className="grid gap-x-8 sm:grid-cols-2">
            {HOUSE_FEATURES.map((f, i) => (
              <li
                key={f}
                className="reveal flex items-start gap-3 border-b border-ink-2/10 py-3.5 text-[0.98rem]"
                style={{ ["--d" as string]: `${200 + i * 70}ms` }}
              >
                <Check className="mt-1 h-4 w-4 flex-none text-terra" strokeWidth={1.6} />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* fachada + sala sobreposta */}
        <div className="reveal relative pb-16 sm:pb-20" style={{ ["--d" as string]: "150ms" }}>
          <div className="reveal-img relative aspect-[16/10] overflow-hidden">
            <div className="absolute inset-[-8%_0]" data-parallax="0.06">
              <Image src={IMAGES.casaFachada} alt="Fachada principal da casa-sede, em tijolo e telhado colonial" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="reveal-img absolute bottom-0 right-4 w-[56%] border-[6px] border-taupe-100 sm:right-8 lg:-right-10" style={{ ["--d" as string]: "450ms" }}>
            <div className="relative aspect-[4/3]">
              <Image src={IMAGES.salaEstar} alt="Sala de estar da casa-sede" fill sizes="(min-width:1024px) 26vw, 56vw" className="object-cover" />
            </div>
          </div>
          <span className="absolute left-3 top-3 bg-ink-2/90 px-4 py-3 font-display text-[0.55rem] uppercase tracking-[0.24em] text-pearl">
            2 dormitórios · 1 suíte
          </span>
        </div>
      </div>
    </section>
  );
}
