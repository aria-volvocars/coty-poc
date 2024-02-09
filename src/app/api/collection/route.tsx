import { getProducts } from "@/component/fetch/backend/fetchProducts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const resp = await getProducts(id ?? "");
  const collectionList = await resp.json();

  return new Response(JSON.stringify(collectionList), {
    status: resp.status,
    headers: { "Content-Type": "application/json" },
  });
}
