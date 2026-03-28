import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Barbaria Morocco - Textile Artisanal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #2C1A0E 0%, #3D2817 50%, #2C1A0E 100%)",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 18, color: "#C9963A", letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: 16 }}>
          Barbaria Morocco
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, color: "#F7F2EA", letterSpacing: "0.05em" }}>
          Textile Artisanal
        </div>
        <div style={{ width: 80, height: 1, background: "#A0856A", marginTop: 24, marginBottom: 24 }} />
        <div style={{ fontSize: 20, color: "#A0856A", letterSpacing: "0.1em" }}>
          Sacs · Pochettes · Pins
        </div>
      </div>
    ),
    { ...size }
  );
}
