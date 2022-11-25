import { AiFillMoneyCollect } from "react-icons/ai";
import { FaTruck, FaTools } from "react-icons/fa";

import styles from "../../styles/main/News.module.css";

const News = () => {
  return (
    <section className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.content}>
          <h3>Free delivery </h3>
          <FaTruck className={styles.icon} />
          <p>Order $100+</p>
        </div>

        <div className={styles.line}></div>

        <div className={styles.content}>
          <h3>Get 30% off</h3>
          <AiFillMoneyCollect className={styles.icon} />
          <p>Order 2+ items</p>
        </div>

        <div className={styles.line}></div>

        <div className={styles.content}>
          <h3>Assenbly service</h3>
          <FaTools className={styles.icon} />
          <p>Starting at $9.99</p>
        </div>
      </div>
    </section>
  );
};

export default News;
