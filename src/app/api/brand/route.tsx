import { getProducts } from "@/component/fetch/backend/fetchProducts";

export async function GET() {
  const resp = await getProducts();
  const brandList = await resp.json();

  return new Response(JSON.stringify(brandList), {
    status: resp.status,
    headers: { "Content-Type": "application/json" },
  });
}
