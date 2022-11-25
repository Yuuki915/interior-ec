import Image from "next/image";
import Link from "next/link";

import styles from "../../styles/parts/ItemContainer.module.css";

const ItemContainer = ({ products }) => {
  const category = products[0].handle;
  const items = products[0].products.edges.map(({ node }) => node);

  return (
    <div className={styles.container}>
      {items.map((item, key) => {
        const imgSrc = item.images.edges[0].node.url;
        return (
          <Link key={key} href={`/${category}/${item.handle}`}>
            <div className={styles.product}>
              <div className={styles.imageWrapper}>
                <Image
                  src={imgSrc}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
              <div className={styles.itemInfo}>
                <p className={styles.itemName} suppressHydrationWarning>
                  {item.title}
                </p>
                <p className={styles.itemPrice} suppressHydrationWarning>
                  ${item.priceRange.minVariantPrice.amount}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ItemContainer;
