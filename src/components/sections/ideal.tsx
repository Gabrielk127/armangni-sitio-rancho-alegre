import { Home, Sprout, TreePine } from "lucide-react";
import { BRAND } from "@/lib/site";
import { ArmangniMark } from "../icons";

const USOS = [
  { icon: Home, title: "Moradia", text: "Casa-sede pronta, internet por fibra e acesso fácil pela Castelo Branco." },
  { icon: TreePine, title: "Lazer", text: "Fim de semana no campo com horta, pomar e muito espaço ao ar livre." },
  { icon: Sprout, title: "Atividades no campo", text: "Queijaria, capril e pastagens para quem quer produzir." },
];

export default function Ideal() {
  return (
    <section id="ideal" className="bg-ink-3">
      <div className="wrap section">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="kicker">Ideal para</p>
          <p className="mt-6 font-serif text-[clamp(1.9rem,5.4vw,3.2rem)] italic leading-[1.1] text-white">
            Uma propriedade completa, com infraestrutura e grande potencial.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {USOS.map(({ icon: Icon, title, text }, i) => (
            <article
              key={title}
              className="reveal group relative overflow-hidden border border-white/10 bg-ink-2/60 p-7 transition-colors duration-500 hover:border-taupe/50"
              style={{ ["--d" as string]: `${i * 120}ms` }}
            >
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-taupe transition-transform duration-700 group-hover:scale-x-100" />
              <Icon className="h-6 w-6 text-taupe" strokeWidth={1.1} />
              <h3 className="display mt-8 text-[1.6rem] text-white">{title}</h3>
              <p className="mt-3 text-pearl/70">{text}</p>
            </article>
          ))}
        </div>
      </div>

      {/* faixa Armangni */}
      <div className="border-t border-white/10 bg-ink-2">
        <div className="wrap reveal grid items-center gap-8 py-14 md:grid-cols-[auto_1fr_auto] md:gap-12 md:py-16">
          <ArmangniMark className="h-14 w-auto text-taupe" strokeWidth={20} />
          <div>
            <p className="kicker !text-taupe">Atendimento {BRAND.short}</p>
            <p className="mt-3 max-w-2xl text-[1.05rem] text-pearl/85">
              Da primeira visita à escritura, a {BRAND.name} acompanha cada etapa da sua compra com transparência.
            </p>
          </div>
          <a href="#contato" data-interesse="armangni" className="btn btn-outline">
            Falar com um consultor
          </a>
        </div>
      </div>
    </section>
  );
}
