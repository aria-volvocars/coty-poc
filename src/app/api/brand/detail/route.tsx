import { getDetailCollection } from "@/component/fetch/backend/fetchDetailCollection";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const resp = await getDetailCollection(id);
  const brandDetail = await resp?.json();

  return new Response(JSON.stringify(brandDetail), {
    status: resp?.status ?? 500,
    headers: { "Content-Type": "application/json" },
  });
}
