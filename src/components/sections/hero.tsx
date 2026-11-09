import Image from "next/image";
import { IMAGES, PROPERTY, whatsappLink } from "@/lib/site";
import { ArmangniMark, ArrowRight, WhatsAppIcon } from "../icons";
import Marquee from "../marquee";

const rise = (delay: number) => ({ animation: `rise 1.2s cubic-bezier(.2,.65,.25,1) ${delay}s both` });

export default function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink-1">
      {/* vista aérea com zoom lento e parallax */}
      <div className="absolute inset-0 -z-10" data-parallax="-0.14">
        <div className="absolute inset-[-6%] animate-kenburns">
          <Image
            src={IMAGES.aerea}
            alt="Vista aérea do Sítio Rancho Alegre: portão, casa de caseiro, galpão coberto de hera e horta"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[45%_center]"
          />
        </div>
      </div>
      <div className="grain pointer-events-none absolute inset-0 -z-10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink-1/75 via-ink-1/10 to-ink-1" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-1/60 via-ink-1/10 to-transparent" />

      <div className="wrap relative flex flex-1 flex-col justify-end pb-10 pt-32 md:pb-36 lg:justify-center lg:pb-32 lg:pt-40">
        <div className="max-w-2xl">
          <p className="kicker mb-6 flex items-center gap-4 !text-pearl/85" style={rise(0.15)}>
            <ArmangniMark draw className="h-7 w-auto text-taupe" strokeWidth={26} />
            Armangni apresenta
          </p>
          <p className="eyebrow mb-5 whitespace-nowrap text-pearl !tracking-[0.3em] sm:!tracking-[0.5em]" style={rise(0.3)}>
            <span className="h-px w-8 bg-taupe" /> À venda · {PROPERTY.city}
          </p>
          <h1
            className="display text-[clamp(2.6rem,11vw,5.6rem)] leading-[0.95] text-white [text-shadow:0_2px_30px_rgba(10,20,14,.45)]"
            style={rise(0.45)}
          >
            Sítio
            <br />
            <span className="italic normal-case tracking-[0.01em] text-taupe">Rancho Alegre</span>
          </h1>
          <p className="mt-6 max-w-lg text-[1rem] text-pearl/90 md:text-[1.08rem]" style={rise(0.65)}>
            4 hectares de campo com casa-sede, queijaria, capril e infraestrutura completa, a 24 km de Sorocaba e
            67 km de Alphaville. Pronto para moradia, lazer ou atividades no campo.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row" style={rise(0.85)}>
            <a href="#contato" data-interesse="hero" className="btn btn-primary">
              Quero conhecer o sítio <ArrowRight />
            </a>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-glass">
              <WhatsAppIcon className="h-4 w-4 text-wa" /> Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* indicador de rolagem */}
      <div className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex lg:bottom-28" style={rise(1.3)}>
        <span className="relative h-12 w-px overflow-hidden bg-white/20">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scrollcue_2.2s_ease-in-out_infinite] bg-taupe" />
        </span>
      </div>

      <Marquee
        className="relative md:absolute md:inset-x-0 md:bottom-0"
        items={["40.000 m² · 4 hectares", "800 m² construídos", "Porto Feliz — SP", "Km 97 da Castelo Branco", "Poço artesiano · fibra ótica", "Armangni Negócios Imobiliários"]}
      />
    </section>
  );
}
