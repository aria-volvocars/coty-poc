export const getDetailProduct = async (id: any = null) => {
  if (id) {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_SHOPIFY_BACKEND_API}/admin/api/2024-01/products/${id}.json`,
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
  }
  return null;
};
