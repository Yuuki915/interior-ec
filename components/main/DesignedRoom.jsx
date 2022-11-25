import Image from "next/image";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

import styles from "../../styles/main/DesignedRoom.module.css";

const DesignedRoom = () => {
  const designedImg = ["designed3", "designed1", "hero-dining", "designed4"];
  const [displayedImg, setdisplayedImg] = useState("");

  const [showImg, setShowImg] = useState(false);
  const showUpImg = (e) => {
    setdisplayedImg(e);
    setShowImg(!showImg);
  };
  const closeImg = () => {
    setShowImg(false);
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.h1}>Designed Room</h1>

      <div className={styles.imgs}>
        {designedImg.map((img, key) => (
          <React.Fragment key={key}>
            <div className={styles.designedImg} onClick={() => showUpImg(img)}>
              <Image
                className={styles.img}
                src={`/images/${img}.jpg`}
                alt=""
                width={290}
                height={200}
                objectFit="cover"
              />
            </div>
            {showImg ? (
              <div className={styles.showImg}>
                <div className={styles.showupImgWrapper}>
                  <Image
                    className={styles.showupImg}
                    src={`/images/${displayedImg}.jpg`}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <IoMdClose
                  className={styles.closeIcon}
                  size={"2rem"}
                  onClick={closeImg}
                />
              </div>
            ) : (
              <></>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default DesignedRoom;
