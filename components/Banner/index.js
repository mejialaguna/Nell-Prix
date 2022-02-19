import styles from "./Banner.module.css";

const Banner = (props) => {
  const { title, subtitle, imgUrl } = props;

  const handleOnPlay = () => {
    console.log("clicked");
  };
  return (
    <div className={styles.container}>
      <div className={styles.leftWrapper}>
        <div className={styles.left}>
          <h3 className={styles.title}>{title}</h3>
          <h3 className={styles.subtitle}>{subtitle}</h3>

          <div className={styles.playBtnWrapper}>
            <button className={styles.btnWithIcon} onClick={handleOnPlay}>
              Play
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
