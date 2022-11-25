import { storefront } from "../../util/shopify";
import { gql } from "graphql-request";

export default async function handler(req, res) {
  const data = await storefront(
    gql`
      mutation CreateCart {
        cartCreate {
          cart {
            checkoutUrl
            id
          }
        }
      }
    `,
    {}
  );
  if (!data) {
    return res.status(500).json({
      message: "Something went wrong creating a cart.",
    });
  }
  const jsonData = {
    cartId: data.data.cartCreate?.cart?.id,
    checkoutUrl: data.data.cartCreate?.cart?.checkoutUrl,
  };

  return res.status(200).json(jsonData);
}