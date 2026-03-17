import { ImageResponse } from "next/og";

export const alt = "Voxr - Anonymous internal feedback software";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at top left, rgba(34,211,238,0.35), transparent 30%), radial-gradient(circle at 80% 20%, rgba(59,130,246,0.35), transparent 24%), linear-gradient(180deg, #060816 0%, #0b1327 55%, #080b14 100%)",
          color: "#f8fafc",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            maxWidth: "860px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              color: "#67e8f9",
              fontSize: 28,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            Anonymous Internal Feedback
          </div>
          <div
            style={{
              fontSize: 78,
              lineHeight: 1.05,
              fontWeight: 700,
            }}
          >
            Voxr
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.3,
              color: "#cbd5e1",
            }}
          >
            Give employees a safer way to share honest feedback, ideas, praise,
            and concerns inside a private workspace.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "#94a3b8",
          }}
        >
          <div>Private workspace visibility</div>
          <div>Posts, comments, reactions, and forms</div>
        </div>
      </div>
    ),
    size
  );
}
