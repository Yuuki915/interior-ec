import { storefront } from "../../util/shopify";
import { gql } from "graphql-request";

export default async function handler(req, res) {
  const { cartId } = req.query;

  const { data } = await storefront(
    gql`
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          cost {
            totalAmount {
              amount
            }
          }
          lines(first: 10) {
            edges {
              node {
                quantity
                cost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    title
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
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    { cartId }
  );

  res.status(200).json(data);
}
