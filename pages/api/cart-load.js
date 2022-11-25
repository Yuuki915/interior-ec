import { storefront } from "../../components/util/shopify";
import { gql } from "graphql-request";

export default async function handler(req, res) {
  const { cartId } = req.query;

  const { data } = await storefront(
    gql`
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          estimatedCost {
            totalAmount {
              amount
            }
          }
          lines(first: 10) {
            edges {
              node {
                quantity
                estimatedCost {
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
