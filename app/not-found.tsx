import Link from "next/link";

export default function NotFound() {
  return (
    <div
      lang="ar"
      dir="rtl"
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
        <p style={{ color: "#c9a84c", fontWeight: 700, letterSpacing: "0.2em", margin: 0 }}>
          404
        </p>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 44px)", margin: "12px 0" }}>
          الصفحة غير موجودة
        </h1>
        <p style={{ opacity: 0.85, margin: "0 0 28px" }}>
          عذراً، الصفحة التي تبحث عنها غير متوفّرة.
        </p>
        <Link
          href="/ar"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "linear-gradient(135deg, #d4b965, #c9a84c)",
            color: "#0d2b1a",
            borderRadius: "100px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          العودة للرئيسية
        </Link>
      </div>
    </div>
  );
}
