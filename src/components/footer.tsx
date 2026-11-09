import Image from "next/image";
import { BRAND, NAV, PROPERTY, whatsappLink } from "@/lib/site";


const REDES = [
  { label: "Instagram", href: BRAND.social.instagram },
  { label: "Facebook", href: BRAND.social.facebook },
  { label: "YouTube", href: BRAND.social.youtube },
  { label: "LinkedIn", href: BRAND.social.linkedin },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-0 pb-28 pt-20 text-pearl/75 md:pb-12">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src="/brand/logo-branco.png" alt={BRAND.name} width={1400} height={290} className="h-auto w-[210px]" />
            <p className="mt-8 flex items-center gap-4 text-[0.85rem]">
              <span className="kicker">Apresenta</span>
              <span className="font-serif text-[1.6rem] italic text-white">{PROPERTY.name}</span>
            </p>
          </div>

          <nav aria-label="Rodapé">
            <p className="kicker mb-5">Navegação</p>
            <ul className="space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="kicker mb-5">Atendimento</p>
            <ul className="space-y-2.5">
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp {BRAND.phoneFormatted}
                </a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`} className="break-all hover:text-white">
                  {BRAND.email}
                </a>
              </li>
            </ul>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {REDES.map((r) => (
                <li key={r.label}>
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="font-display text-[0.55rem] uppercase tracking-[0.22em] hover:text-taupe">
                    {r.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 space-y-3 border-t border-white/10 pt-8 text-[0.75rem] leading-relaxed text-mist/80">
          <p>
            {PROPERTY.name} · {PROPERTY.city} · {PROPERTY.access}. Área total de 40.000 m² (4 hectares) e 800 m² de
            área construída (soma das edificações).
          </p>
          <p>
            Informações e medidas sujeitas a confirmação na visita e na documentação do imóvel. Atividades de produção e
            processamento sujeitas às adaptações e autorizações aplicáveis ao empreendimento do comprador.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 text-[0.75rem] text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {BRAND.name} · {BRAND.creci} · Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
