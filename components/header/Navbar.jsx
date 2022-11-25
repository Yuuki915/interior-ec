import Link from "next/link";
import React from "react";
import styles from "../../styles/header/Navbar.module.css";

const Navbar = ({ menuToggle, setMenuToggle, categories }) => {
  const cliced = () => {
    setMenuToggle(true);
  };

  return (
    <>
      <div
        className={
          menuToggle
            ? `${styles.nonContainer} ${styles.container}`
            : `${styles.container}`
        }
      >
        {categories.map((cat, key) => (
          <Link key={key} href={`/${cat.toLocaleLowerCase()}`}>
            <p className={styles.category} onClick={cliced}>
              {cat}
            </p>
          </Link>
        ))}
      </div>
    </>
  );
};
export default Navbar;
