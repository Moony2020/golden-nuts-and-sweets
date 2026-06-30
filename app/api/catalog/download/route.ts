import { connectDB } from "@/lib/db";
import { Product, type ProductType } from "@/models/Product";
import { COMPANY, CATEGORIES } from "@/lib/config";

export const dynamic = "force-dynamic";

/**
 * GET /api/catalog/download
 * Generates the company catalog from MongoDB products and returns it as a
 * downloadable, print-ready HTML document (open it and "Save as PDF").
 * The route is intentionally self-contained so it can later be swapped for
 * a server-side PDF generator without changing the frontend.
 */
export async function GET() {
  let products: ProductType[] = [];
  try {
    await connectDB();
    products = await Product.find({ available: true }).sort({ category: 1, name: 1 }).lean<ProductType[]>();
  } catch (err) {
    console.error("GET /api/catalog/download", err);
  }

  const byCategory = CATEGORIES.map((cat) => ({
    cat,
    items: products.filter((p) => p.category === cat.slug),
  })).filter((g) => g.items.length > 0);

  const esc = (s: string) =>
    String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c] || c));

  const toc = byCategory
    .map((g) => `<li>${esc(g.cat.en)} <span>(${g.items.length})</span></li>`)
    .join("");

  const sections = byCategory
    .map(
      (g) => `
      <section class="cat">
        <h2>${esc(g.cat.en)} — ${esc(g.cat.ar)}</h2>
        <div class="items">
          ${g.items
            .map(
              (p) => `
            <div class="item">
              ${p.image ? `<img src="${esc(p.image)}" alt="${esc(p.name)}"/>` : `<div class="noimg"></div>`}
              <div class="meta">
                <h3>${esc(p.name)}</h3>
                <p class="d">${esc(p.shortDescription || p.description || "")}</p>
                <p class="s"><b>Origin:</b> ${esc(p.originCountry || "-")} &nbsp; <b>Packaging:</b> ${esc(p.packaging || "-")}</p>
              </div>
            </div>`
            )
            .join("")}
        </div>
      </section>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${esc(COMPANY.nameEn)} — Product Catalog</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: "Segoe UI", system-ui, sans-serif; color: #1d1c13; }
  .cover { height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;
    background: linear-gradient(135deg, #0d2b1a, #1b4332); color: #fff; page-break-after: always; }
  .cover .logo { font-size: 30px; font-weight: 800; color: #c9a84c; letter-spacing: 1px; }
  .cover h1 { font-size: 40px; margin: 24px 0 10px; }
  .cover p { color: #a8c5b5; }
  .page { padding: 40px; max-width: 900px; margin: 0 auto; }
  .toc { page-break-after: always; }
  .toc h2 { color: #0d2b1a; border-bottom: 3px solid #c9a84c; padding-bottom: 10px; margin-bottom: 18px; }
  .toc ul { list-style: none; }
  .toc li { padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600; }
  .toc li span { color: #c9a84c; }
  .cat { margin-bottom: 36px; }
  .cat h2 { color: #0d2b1a; border-bottom: 2px solid #c9a84c; padding-bottom: 8px; margin-bottom: 16px; }
  .items { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .item { display: flex; gap: 12px; border: 1px solid #e8e2d3; border-radius: 10px; padding: 10px; page-break-inside: avoid; }
  .item img, .item .noimg { width: 90px; height: 90px; object-fit: cover; border-radius: 8px; background: #f3edde; flex-shrink: 0; }
  .item h3 { font-size: 15px; color: #0d2b1a; }
  .item .d { font-size: 12px; color: #555; margin: 4px 0; }
  .item .s { font-size: 11px; color: #777; }
  .contact { background: #0d2b1a; color: #fff; padding: 30px 40px; text-align: center; }
  .contact a { color: #c9a84c; }
  @media print { .cover { height: 95vh; } }
</style>
</head>
<body>
  <div class="cover">
    <div class="logo">${esc(COMPANY.nameEn)}</div>
    <h1>Product Catalog</h1>
    <p>${esc(COMPANY.sloganEn)}</p>
    <p>${esc(COMPANY.addressEn)}</p>
  </div>
  <div class="page toc">
    <h2>Table of Contents</h2>
    <ul>${toc || "<li>No products available</li>"}</ul>
  </div>
  <div class="page">
    ${sections}
  </div>
  <div class="contact">
    <h2>Contact Us</h2>
    <p>${esc(COMPANY.phone)} &nbsp;|&nbsp; <a href="mailto:${esc(COMPANY.email)}">${esc(COMPANY.email)}</a></p>
    <p>${esc(COMPANY.addressEn)}</p>
  </div>
</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": 'attachment; filename="royal-harvest-catalog.html"',
    },
  });
}
