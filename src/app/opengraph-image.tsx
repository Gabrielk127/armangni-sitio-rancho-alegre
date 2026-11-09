import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Imagem de prévia de link (WhatsApp, Instagram, LinkedIn...): vista aérea + nome + logo.
export const alt = "Sítio Rancho Alegre · Porto Feliz — SP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function dataUrl(file: string, mime: string) {
  const buf = await readFile(join(process.cwd(), "public", file));
  return `data:${mime};base64,${buf.toString("base64")}`;
}

export default async function OgImage() {
  const [foto, logo] = await Promise.all([
    dataUrl("images/sitio/aerea.jpg", "image/jpeg"),
    dataUrl("brand/logo-branco.png", "image/png"),
  ]);

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex", width: "100%", height: "100%", background: "#17291f" }}>
        <img src={foto} alt="" width={1200} height={630} style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            backgroundImage: "linear-gradient(90deg, rgba(17,32,25,.94) 0%, rgba(17,32,25,.78) 50%, rgba(17,32,25,.15) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 64px", width: "100%" }}>
          <img src={logo} alt="" width={260} height={54} style={{ width: 260, height: 54 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 8, color: "#bfb4aa", textTransform: "uppercase" }}>À venda · Porto Feliz — SP</div>
            <div style={{ fontSize: 84, color: "#ffffff", marginTop: 14, lineHeight: 1 }}>Sítio Rancho Alegre</div>
            <div style={{ fontSize: 30, color: "#f3f0e8", marginTop: 22, opacity: 0.9 }}>
              40.000 m² · 800 m² construídos · infraestrutura completa
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
