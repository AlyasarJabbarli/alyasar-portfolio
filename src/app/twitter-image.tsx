import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#050505",
          color: "#F5F5F7",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 20% 20%, rgba(0,240,255,0.24), transparent 35%), radial-gradient(circle at 80% 75%, rgba(0,240,255,0.18), transparent 30%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "120px 56px 56px",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 900,
            }}
          >
            <div
              style={{
                fontSize: 74,
                lineHeight: 1.04,
                fontWeight: 800,
                letterSpacing: -2,
                marginBottom: 22,
              }}
            >
              Alyasar Jabbarli
            </div>
            <div
              style={{
                fontSize: 36,
                lineHeight: 1.25,
                color: "rgba(245,245,247,0.82)",
                marginBottom: 30,
              }}
            >
              Full-stack engineer building high-performance web experiences with
              modern frontend systems, type-safe architecture, and applied AI.
            </div>
            <div
              style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                fontSize: 22,
                color: "#00F0FF",
              }}
            >
              <div>Next.js 16</div>
              <div>TypeScript</div>
              <div>AI Systems</div>
              <div>Data Science</div>
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
