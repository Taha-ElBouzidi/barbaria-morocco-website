import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Barbaria Morocco";
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: "#F7F2EA",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Barbaria
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#C9963A",
              letterSpacing: "0.5em",
              textTransform: "uppercase",
            }}
          >
            Morocco
          </div>
        </div>
        <div
          style={{
            width: 80,
            height: 1,
            background: "#C9963A",
            marginTop: 32,
            marginBottom: 32,
          }}
        />
        <div
          style={{
            fontSize: 20,
            color: "#F7F2EA",
            opacity: 0.7,
            letterSpacing: "0.1em",
          }}
        >
          Cosmetiques · Textile · Alimentaire
        </div>
      </div>
    ),
    { ...size }
  );
}
