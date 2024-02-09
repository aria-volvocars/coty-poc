import { getDetailCollection } from "@/component/fetch/backend/fetchDetailCollection";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const resp = await getDetailCollection(id);
  const collectionDetail = await resp?.json();

  return new Response(JSON.stringify(collectionDetail), {
    status: resp?.status ?? 500,
    headers: { "Content-Type": "application/json" },
  });
}
