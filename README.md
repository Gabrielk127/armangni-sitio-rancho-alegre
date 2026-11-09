# Sítio Rancho Alegre · Armangni

Landing page do Sítio Rancho Alegre (Porto Feliz — SP) com a marca da Armangni Negócios Imobiliários. Usa a mesma base
do site do Harbor 360° (`armangni-harbor`): Next.js, Tailwind 4, framer-motion e Resend. As fotos e os dados vêm da
apresentação `SITIO RANCHO ALEGRE.pdf`.

## Rodar

```bash
npm install
npm run dev   # http://localhost:3011
```

## Formulário (Resend)

Segue o padrão dos outros projetos da casa. A rota `src/app/api/contact/route.ts` envia pelo Resend com:

- `RESEND_API_KEY`: a mesma chave dos outros projetos.
- `CONTACT_EMAIL_FROM`: `contato@armangniimoveis.com.br`, o domínio verificado.
- `CONTACT_EMAIL_TO`: `contato.armangni@gmail.com`.

No deploy, cadastre as três variáveis na Vercel (modelo em `.env.example`).

A página tem três pontos de captura, todos nessa rota:

1. Faixa logo após a galeria de fotos (`lead-strip.tsx`).
2. Seção "Valor e condições" no meio da página (`lead-mid.tsx`).
3. "Agende sua visita" no final (`lead.tsx`).

## Onde editar

- **Textos, contatos, imagens e dados do imóvel:** `src/lib/site.ts`.
- **Seções:** `src/components/sections/*`, na ordem de `src/app/page.tsx`.
- **Cores e animações:** `src/app/globals.css`.

## Pendências antes de publicar

- As fotos foram extraídas do PDF e têm cerca de 700 px de largura (só a vista aérea e a sala de estar são maiores).
  Se houver os arquivos originais, troque em `public/images/sitio/` mantendo os nomes.
- A apresentação não tem foto do celeiro; o bloco dele aparece só com texto.
- O PDF não informa valor nem endereço exato. O link "Ver no mapa" abre Porto Feliz — SP.
