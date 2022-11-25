import Link from "next/link";
import Image from "next/image";
import { BiPhone } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import {
  RiMapPinLine,
  RiInstagramFill,
  RiTwitterFill,
  RiFacebookCircleFill,
  RiLinkedinBoxFill,
} from "react-icons/ri";
import styles from "../../styles/footer/Footer.module.css";

const Footer = ({ categories }) => {
  return (
    <div className={styles.container}>
      <div className={styles.navs}>
        <div className={styles.logo}>
          <Image
            src="/images/logo.svg"
            alt="sitelogo"
            width={130}
            height={50}
          />
        </div>

        <div className={styles.nav}>
          <div className={styles.footerNav}>
            <h3 className={styles.h3}>Find Products</h3>
            <h4>Categories</h4>
            <ul className={styles.ul}>
              {categories.map((cat, key) => (
                <Link key={key} href={`/${cat.toLocaleLowerCase()}`}>
                  <li className={styles.li}>{cat}</li>
                </Link>
              ))}
            </ul>
          </div>

          <div className={styles.footerNav}>
            <h3 className={styles.h3}>Company</h3>
            <ul className={styles.ul}>
              <Link href={`/aboutus`}>
                <li className={styles.li}>About us</li>
              </Link>
              <Link href={`/careers`}>
                <li className={styles.li}>Careers</li>
              </Link>
            </ul>
          </div>

          <div className={styles.footerNav}>
            <h3 className={styles.h3}>Contact</h3>
            <ul className={styles.contacts}>
              <li className={styles.contact}>
                <RiMapPinLine className={styles.icon} />
                <p>1234 Vancouver st, Vancouver</p>
              </li>
              <li className={styles.contact}>
                <BiPhone className={styles.icon} />
                <p>123-456-7890</p>
              </li>
              <li className={styles.contact}>
                <HiOutlineMail className={styles.icon} />
                <p>yuki@mail.com</p>
              </li>
            </ul>

            <div className={styles.sns}>
              <RiInstagramFill className={styles.snsIcon} />
              <RiTwitterFill className={styles.snsIcon} />
              <RiFacebookCircleFill className={styles.snsIcon} />
              <RiLinkedinBoxFill className={styles.snsIcon} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <span>&copy; Yuki Hori 2022</span>
      </div>
    </div>
  );
};

export default Footer;
