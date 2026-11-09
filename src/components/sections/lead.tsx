import Image from "next/image";
import { IMAGES, whatsappLink } from "@/lib/site";
import LeadForm from "../lead-form";

const BENEFICIOS = [
  "Visita guiada pela casa-sede, queijaria, capril e terreno",
  "Valor, condições e documentação do imóvel",
  "Atendimento direto com um consultor da Armangni",
];

export default function Lead() {
  return (
    <section id="contato" data-lead-form className="relative isolate overflow-hidden bg-ink-1">
      <div className="absolute inset-0 -z-10">
        <Image src={IMAGES.aerea} alt="" fill sizes="100vw" className="object-cover object-[60%_center] opacity-25" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-1 via-ink-1/85 to-ink-1" />

      <div className="wrap section grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="reveal lg:pt-6">
          <p className="kicker">Agende sua visita</p>
          <h2 className="display mt-6 text-[clamp(2.1rem,6vw,3.4rem)] leading-[1] text-white">
            Venha conhecer
            <br />
            <span className="italic normal-case tracking-[0.01em] text-taupe">o Rancho Alegre.</span>
          </h2>
          <p className="mt-6 max-w-md font-display text-[0.95rem] font-extralight leading-relaxed tracking-[-0.01em] text-pearl/85">
            Deixe seu contato e um consultor da Armangni fala com você para combinar:
          </p>
          <ul className="mt-8 border-t border-white/12">
            {BENEFICIOS.map((b, i) => (
              <li key={b} className="reveal flex gap-4 border-b border-white/12 py-4 text-pearl/85" style={{ ["--d" as string]: `${200 + i * 110}ms` }}>
                <svg viewBox="0 0 24 24" className="mt-1 h-4 w-4 flex-none text-taupe" fill="none" stroke="currentColor" strokeWidth={1.3} aria-hidden="true">
                  <path d="M3 12h17M14 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-pearl/70">
            Prefere conversar agora?{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-normal text-white underline decoration-taupe underline-offset-4 hover:text-taupe">
              Chamar no WhatsApp →
            </a>
          </p>
        </div>

        <div className="reveal relative border border-white/12 bg-ink-2/80 p-6 backdrop-blur-xl sm:p-10" style={{ ["--d" as string]: "150ms" }}>
          <span className="absolute -top-px left-0 h-px w-24 bg-taupe" />
          <p className="display mb-8 text-[1.4rem] tracking-[0.1em] text-white">Quero visitar o sítio.</p>
          <LeadForm listen />
        </div>
      </div>
    </section>
  );
}
