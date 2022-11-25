import { useState } from "react";
import styles from "../../styles/parts/AddToCart.module.css";

const AddToCartBtn = ({ variantId }) => {
  const [id, setId] = useState(variantId);

  const AddCart = async () => {
    const localCartData = JSON.parse(
      window.localStorage.getItem("eclat:shopify:cart")
    );
    if (!localCartData.cartId) {
      console.error("There was error loading your cart");
      return;
    }

    const postData = async () => {
      const data = {
        cartId: localCartData.cartId,
        variantId: id,
      };
      const response = await fetch("/api/add-to-cart", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return response.json();
    };
    postData();

    window.localStorage.setItem("eclat:shopify:status", "dirty");
  };

  return (
    <>
      <div className={styles.btn} onClick={AddCart}>
        <p className={styles.btnText}>Add cart</p>
      </div>
    </>
  );
};

export default AddToCartBtn;
