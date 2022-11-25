import styles from "../../styles/company/Aboutus.module.css";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>About us</h1>
      <div className={styles.img}></div>
      <div className={styles.texts}>
        <p>Our company name means shining, brilliance in French.</p>
        <p>May your life shine with your furniture.</p>
      </div>
    </div>
  );
};

export default AboutUs;
