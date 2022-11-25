import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Search from "../parts/Search";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { BsCart3 } from "react-icons/bs";
import Cart from "../parts/Cart";
import Bg from "../parts/Bg";

import styles from "../../styles/header/Header.module.css";

const Header = ({ productsArr, categories }) => {
  const [cart, setCart] = useState({
    id: null,
    lines: [],
  });
  const [menuToggle, setMenuToggle] = useState(true);
  const [cartToggle, setCartToggle] = useState(false);
  const [qty, setQty] = useState(0);

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
  // console.log(cart);

  const closeHandler = () => {
    setMenuToggle(false);
  };
  const onClick = () => {
    setMenuToggle(!menuToggle);
  };

  const HandleCart = () => {
    setCartToggle(!cartToggle);
  };
  const closeCart = () => {
    setCartToggle(false);
  };

  useEffect(() => {
    setQty(cart.lines.length);
  }, [cart.lines.length]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.hamburgermenu} onClick={onClick}>
          {menuToggle ? (
            <BiMenuAltLeft className={styles.menuIcon} size={"2rem"} />
          ) : (
            <>
              <div className={styles.bg} onClick={closeHandler}></div>
              <IoMdClose className={styles.menuIcon} size={"2rem"} />
            </>
          )}
        </div>
        <Image
          className={styles.logo}
          src="/images/logo.svg"
          alt="sitelogo"
          width={130}
          height={50}
        />
        <div className={styles.icons}>
          <BsCart3 className={styles.cartIcon} onClick={HandleCart} />
          {qty === 0 ? <></> : <div className={styles.qty}>{qty}</div>}
        </div>
      </div>

      <Search productsArr={productsArr} />

      <Navbar
        menuToggle={menuToggle}
        setMenuToggle={setMenuToggle}
        categories={categories}
      />

      {cartToggle ? (
        <>
          <Bg close={closeCart} />
          <Cart cart={cart} emptyCart={emptyCart} closeCart={closeCart} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
