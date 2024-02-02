export const getDetailCollection = async (id: any = null) => {
  if (id) {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_SHOPIFY_BACKEND_API}/api/2024-01/graphql.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Storefront-Access-Token": `${process.env.NEXT_PUBLIC_SHOPIFY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `query Collections($first: Int!, $query: String!) {
            collections(first: $first, query: $query) {
              nodes {
                id
                title
                description
                image {
                  id
                  url
                  width
                  height
                }
              }
            }
          }`,
          variables: {
            first: 1,
            query: `id:${id}`,
          },
        }),
      }
    );
    if (resp && resp.ok) {
      return await resp.json();
    }
  }
  return null;
};
