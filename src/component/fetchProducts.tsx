export const getProducts = async (id = "428380717269") => {
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
              products(first: 20) {
                nodes {
                  id
                  title
                  description
                  featuredImage {
                    id
                    url
                    altText
                    width
                    height
                  }
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                    maxVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                }
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
  return null;
};
