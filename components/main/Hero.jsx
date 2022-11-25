import Image from "next/image";

import styles from "../../styles/main/Hero.module.css";

const Hero = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div className={styles.imgWrapper}>
          <Image
            className={styles.img}
            src="/images/hero.svg"
            alt="hero-img"
            width={1440}
            height={750}
            layout="responsive"
            priority
          />
          <div className={styles.heroTexts}>
            <div className={styles.text}>
              Beautiful life
              <br />
              with
              <br />
              Beautiful Interior
            </div>
            <div className={styles.btn}>
              <p className={styles.btnText}>Find interior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
