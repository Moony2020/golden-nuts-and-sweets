"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0d2b1a 0%, #1b4332 100%)",
          color: "#fff9ea",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div>
          <h1 style={{ fontSize: "clamp(24px, 5vw, 40px)", margin: "0 0 12px" }}>
            حدث خطأ غير متوقع
          </h1>
          <p style={{ opacity: 0.85, margin: "0 0 24px" }}>
            عذراً، حدث خطأ ما. حاول مرة أخرى.
          </p>
          <button
            onClick={() => reset()}
            style={{
              padding: "14px 32px",
              background: "linear-gradient(135deg, #d4b965, #c9a84c)",
              color: "#0d2b1a",
              border: "none",
              borderRadius: "100px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            إعادة المحاولة
          </button>
        </div>
      </body>
    </html>
  );
}
