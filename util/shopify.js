const storefrontAccessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
const URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMEIN}/api/2022-10/graphql.json`;

export async function storefront(query, variables = {}) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  return res.json();
}
