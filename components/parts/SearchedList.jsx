import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/parts/SearchedList.module.css";

const SearchedList = ({ searchedLists, setSearchToggle }) => {
  const closeList = () => {
    setSearchToggle(false);
  };
  return (
    <div className={styles.searchedList}>
      <ul>
        {searchedLists.map((list, key) => {
          const img = list.images.edges.map(({ node }) => node.url);
          const category = list.collections.edges.map(
            ({ node }) => node.handle
          );
          const itemHandle = list.handle;

          return (
            <Link key={key} href={`/${category}/${itemHandle}`}>
              <div className={styles.list} onClick={closeList}>
                <div className={styles.listImg}>
                  <Image src={img[0]} alt="" layout="fill" />
                </div>
                <p className={styles.listTitle}>{list.title}</p>
                <p className={styles.listCategory}>{category}</p>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchedList;
