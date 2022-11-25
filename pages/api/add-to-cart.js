import { storefront } from "../../util/shopify";
import { gql } from "graphql-request";

export default async function handler(req, res) {
  const { cartId, variantId } = JSON.parse(req.body);

  const data = await storefront(
    gql`
      mutation AddToCart($cartId: ID!, $variantId: ID!) {
        cartLinesAdd(
          cartId: $cartId
          lines: [{ quantity: 1, merchandiseId: $variantId }]
        ) {
          cart {
            lines(first: 100) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      product {
                        title
                        images(first: 1) {
                          edges {
                            node {
                              url
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    { cartId, variantId }
  );

  return res.status(200).json(data);
}
