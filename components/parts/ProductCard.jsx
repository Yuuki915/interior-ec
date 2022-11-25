import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/parts/ProductCard.module.css";

const ProductCard = ({ category, product }) => {
  const imgSrc = product.images.edges.map(({ node }) => node.url);
  return (
    <Link href={`/${category}/${product.handle}`}>
      <div className={styles.product}>
        <div className={styles.imageWrapper}>
          <Image
            src={imgSrc[0]}
            alt=""
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>

        <div className={styles.itemInfo}>
          <p className={styles.itemName} suppressHydrationWarning>
            {product.title}
          </p>
          <p className={styles.itemPrice} suppressHydrationWarning>
            ${product.priceRange.minVariantPrice.amount}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
