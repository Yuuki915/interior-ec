import React, { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import SearchedList from "./SearchedList";
import styles from "../../styles/parts/Search.module.css";

const Search = ({ productsArr }) => {
  const [searchToggle, setSearchToggle] = useState(false);

  const [value, setValue] = useState(0);
  const onChange = (e) => {
    setValue(e.target.value);
    if (value.length <= 1) {
      setSearchToggle(false);
    } else if (value.length >= 2) {
      setSearchToggle(true);
    }
  };
  const searchedLists = productsArr.filter((product) =>
    product.title.toLowerCase().includes(value)
  );

  return (
    <>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          onChange={onChange}
          placeholder="Search"
        />
        <HiOutlineSearch size={"1.5rem"} className={styles.icon} />
      </div>
      <ul>
        {searchToggle ? (
          <>
            <SearchedList
              searchedLists={searchedLists}
              setSearchToggle={setSearchToggle}
            />
          </>
        ) : (
          <></>
        )}
      </ul>
    </>
  );
};

export default Search;
