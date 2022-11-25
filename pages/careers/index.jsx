import styles from "../../styles/company/Careers.module.css";

const Careers = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Careers</h1>
      <div className={styles.img}></div>

      <div className={styles.textContainer}>
        <h2 className={styles.h2}>Work with us?</h2>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          fuga officiis praesentium dignissimos voluptatum ipsam similique, nam,
          dolor adipisci vero, veniam quod. Cumque at tenetur, blanditiis
          delectus sed minus veritatis.
        </p>
        <p className={styles.text}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque
          asperiores excepturi quisquam delectus, architecto ducimus distinctio
          corrupti neque pariatur, porro consequatur optio repellat laboriosam,
          possimus culpa. Porro aliquid amet nihil!
        </p>
      </div>
    </div>
  );
};

export default Careers;
