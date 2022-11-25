import Image from "next/image";
import { useEffect } from "react";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import styles from "../../styles/parts/Cart.module.css";

const Cart = ({ closeCart }) => {
  const [cart, setCart] = useState({
    id: null,
    lines: [],
  });

  const [open, setOpen] = useState(false);
  const toggleCartOpen = () => {
    setOpen(!open);
  };

  const emptyCart = () => {
    window.localStorage.removeItem("eclat:shopify:cart");
    setCart({
      id: null,
      lines: [],
    });
  };

  useEffect(() => {
    async function getCart() {
      let localCartData = JSON.parse(
        window.localStorage.getItem("eclat:shopify:cart")
      );

      if (localCartData) {
        const existingCart = await fetch(
          `/api/cart-load?cartId=${localCartData.cartId}`
        ).then((res) => res.json());

        setCart({
          id: localCartData.cartId,
          checkoutUrl: localCartData.checkoutUrl,
          estimatedCost: existingCart.cart.estimatedCost,
          lines: existingCart.cart.lines.edges,
        });
        return;
      }

      localCartData = await fetch("/api/cart").then((res) => res.json());
      setCart({
        id: localCartData.cartId,
        checkoutUrl: localCartData.checkoutUrl,
        estimatedCost: null,
        lines: [],
      });

      window.localStorage.setItem(
        "eclat:shopify:cart",
        JSON.stringify(localCartData)
      );
    }

    getCart();

    const interval = setInterval(() => {
      const state = window.localStorage.getItem("eclat:shopify:status");

      if (state && state === "dirty") {
        getCart();
        window.localStorage.setItem("eclat:shopify:status", "clean");
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const total = cart?.estimatedCost?.totalAmount.amount;

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.iconContainer}>
          <IoMdClose
            className={styles.closeIcon}
            size={"2rem"}
            onClick={closeCart}
          />
        </div>

        <div>
          <h2 className={styles.h2}>Your cart</h2>
          {cart.lines.length === 0 ? (
            <></>
          ) : (
            <h3 className={styles.h3}>Total: $ {total}</h3>
          )}
        </div>

        {cart.lines.map(({ node }, key) => {
          const imgSrcArr = [];
          const imgSrc = node.merchandise.product.images.edges.map(({ node }) =>
            imgSrcArr.push(node.url)
          );
          return (
            <div key={key} className={styles.itemContainer}>
              <>
                <div className={styles.imageWrapper}>
                  <Image
                    className={styles.img}
                    src={imgSrcArr[0]}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                  <p>image</p>
                </div>
                
                <div className={styles.detailContainer}>
                  <div className={styles.details}>
                    <p className={styles.name}>
                      {node.merchandise.product.title}
                    </p>
                    <p className={styles.price}>
                      $ {node.estimatedCost.totalAmount.amount}
                    </p>
                    <div className={styles.qty}>
                      <span>QTY: {node.quantity}</span>
                      {/* <input
                    className={styles.qtyInput}
                    value={node.quantity}
                    type="number"
                  /> */}
                    </div>
                  </div>
                  {/* <div className={styles.actions}>
                <p>remove</p>
              </div> */}
                </div>
              </>
            </div>
          );
        })}
      </div>
      {cart.lines.length === 0 ? (
        <div className={styles.noitems}>No items</div>
      ) : (
        <div onClick={emptyCart}>Empty Cart</div>
      )}
    </div>
  );
};

export default Cart;
