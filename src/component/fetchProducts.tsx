export const getProducts = async (id = "477399449883") => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SHOPIFY_BACKEND_API}/admin/api/2024-01/products.json?collection_id=${id}`,
    {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": `${process.env.NEXT_PUBLIC_SHOPIFY_TOKEN}`,
      },
    }
  );
  if (resp && resp.ok) {
    return await resp.json();
  }
  return null;
};
