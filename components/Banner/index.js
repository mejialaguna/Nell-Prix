import Image from "next/image";
import styles from "./Banner.module.css";
import { useRouter } from "next/router";


const Banner = (props) => {
  const router = useRouter()

  const { title, subtitle, imgUrl , videoId } = props;
  const handleOnPlay = () => {
    router.push(`video/${videoId}`)
  };
  console.log(videoId)
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <div className={styles.nSeriesWrapper}>
            <p className={styles.firstLetter}>N</p>
            <p className={styles.series}>S E R I E S</p>
          </div>

          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subTitle}>{subtitle}</h3>
          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              <Image
                src="https://img.icons8.com/fluency-systems-filled/48/000000/play.png"
                width={20}
                height={20}
                alt="play icon"
              />
              <span className={styles.playText}>Play</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className={styles.Banner}
        style={{
          background: `url(${imgUrl})`,
          width: "100%",
          height: "90%",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "25% 25%",
        }}
      ></div>
    </div>
  );
};

export default Banner;
