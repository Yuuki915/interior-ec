import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/main/Categories.module.css";

const Categories = ({ categories }) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>Categories</h1>

      <div className={styles.catcont}>
        <div className={styles.categories}>
          {categories.map((item, key) => {
            return (
              <Link key={key} href={`/${item.catHandle}`}>
                <div className={styles.category}>
                  <div className={styles.basecat}>
                    <Image
                      className={styles.img.url}
                      src={item.catImg.url}
                      alt=""
                      layout="fill"
                    />
                    <div className={styles.catName}>
                      <p className={styles.itemName}>{item.category}</p>
                    </div>
                  </div>

                  <div className={styles.hoverAct}>
                    {item.category}
                    <p className={styles.point}></p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
