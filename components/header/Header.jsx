import React, { useState } from "react";
import Image from "next/image";
import Navbar from "./Navbar";
import Search from "../parts/Search";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { TfiShoppingCart } from "react-icons/tfi";
import Cart from "../parts/Cart";
import Fav from "../parts/Fav";
import Bg from "../parts/Bg";

import styles from "../../styles/header/Header.module.css";

const Header = ({ productsArr, categories }) => {
  const [menuToggle, setMenuToggle] = useState(true);
  const [cartToggle, setCartToggle] = useState(false);
  const [favToggle, setFavToggle] = useState(false);

  const closeHandler = () => {
    setMenuToggle(false);
  };
  const onClick = () => {
    setMenuToggle(!menuToggle);
  };

  const HandleCart = () => {
    setCartToggle(!cartToggle);
    setFavToggle(false);
  };
  const closeCart = () => {
    setCartToggle(false);
  };
  const closeFav = () => {
    setFavToggle(false);
  };

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
          <TfiShoppingCart className={styles.cartHeart} onClick={HandleCart} />
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
          <Cart closeCart={closeCart} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
