import { getDetailProduct } from "@/component/fetch/backend/fetchDetailProduct";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const resp = await getDetailProduct(id);
  const productDetail = await resp?.json();

  return new Response(JSON.stringify(productDetail), {
    status: resp?.status ?? 500,
    headers: { "Content-Type": "application/json" },
  });
}
