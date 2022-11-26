import ProductCard from "../parts/ProductCard";
import styles from "../../styles/main/PickUp.module.css";

const PickUp = ({ products }) => {
  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>Pick Up</h1>

      <div className={styles.itemContainer}>
        {products.map((item, key) => {
          const category = item.collections.edges.map(
            ({ node }) => node.handle
          );
          return <ProductCard key={key} category={category} product={item} />;
        })}
      </div>
    </section>
  );
};

export default Pickup;
