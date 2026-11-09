import CountUp from "../count-up";

const NUMEROS = [
  { value: 40000, suffix: " m²", label: "Área total", note: "4 hectares" },
  { value: 800, suffix: " m²", label: "Área construída", note: "Soma das edificações" },
  { value: 5, suffix: "", label: "Edificações", note: "Casa-sede, queijaria, capril, caseiro e celeiro" },
  { value: 5000, suffix: " L/h", label: "Poço artesiano", note: "120 m de profundidade" },
];

/** Faixa de números logo abaixo do hero. */
export default function Numbers() {
  return (
    <section aria-label="Números do sítio" className="border-b border-ink-2/10 bg-taupe-50 text-ink-2">
      <dl className="wrap grid grid-cols-2 gap-y-10 py-14 md:grid-cols-4 md:py-16">
        {NUMEROS.map((n, i) => (
          <div
            key={n.label}
            className="reveal flex flex-col-reverse border-l border-ink-2/12 pl-4 sm:pl-6 [&:nth-child(odd)]:border-l-0 [&:nth-child(odd)]:pl-0 md:[&:nth-child(odd)]:border-l md:[&:nth-child(odd)]:pl-6 md:first:!border-l-0 md:first:!pl-0"
            style={{ ["--d" as string]: `${i * 110}ms` }}
          >
            <dt className="mt-3">
              <span className="block font-display text-[0.58rem] uppercase tracking-[0.24em] text-ink-2">{n.label}</span>
              <span className="mt-1 block text-[0.8rem] text-taupe-800">{n.note}</span>
            </dt>
            <dd className="font-serif text-[clamp(2rem,6.4vw,3.2rem)] leading-none text-ink-3">
              <CountUp value={n.value} />
              <span className="text-[0.55em] text-taupe-700">{n.suffix}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
