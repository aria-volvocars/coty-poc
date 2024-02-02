export const getDetailProduct = async (id: any = null) => {
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
          query: `query getProductById($id: ID!) {
            product(id: $id) {
              id
              title
              description
              vendor
              productType
              handle
              tags
              images(first: 5) {
                nodes {
                  id
                  url
                  altText
                  width
                  height
                }
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
              variants(first: 10) {
                nodes {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  sku
                  quantityAvailable
                  weight
                  weightUnit
                }
              }
              options {
                id
                name
                values
              }
            }
          }`,
          variables: {
            id: `gid://shopify/Product/${id}`,
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
