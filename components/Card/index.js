import styles from "./Card.module.css";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "classnames";

const Card = (props) => {
  const { imgUrl, size = "medium" , id } = props;

  const [ imgSource , setImgSource ] = useState(imgUrl)

  const classMap = {
    small: styles.smItem,
    medium: styles.mdItem,
    large: styles.lgItem,
  };

  const handleError = () => {
    const backUpImg =
      "https://m.media-amazon.com/images/M/MV5BOGZmYjkxMDItNmQ3ZC00YzdlLThjMDktYWJkOGZiOWU1NmY0XkEyXkFqcGdeQXVyMTA3MzQ4MTcw._V1_.jpg";
    setImgSource(backUpImg);
  }

  const scale = String(id) === "0" ? { scaleY: 1.1 } : { scale: 1.1 }; // String is transforming id into a string to be able to strictly compared with the "0"

  return (
    <div className={styles.container} >
      <motion.div
        id={id}
        className={clsx(styles.imgMotionWrapper, classMap[size])}
        whileHover={{ ...scale }}
      >
        <Image
          className={styles.cardImg}
          onError={handleError}
          src={imgSource}
          alt="image"
          layout="fill" // dont need height or width since is getting inherit from the parent div , on line 16 class map css, and we are using layout="fill"
        />
      </motion.div>
    </div>
  );
};

export default Card;
