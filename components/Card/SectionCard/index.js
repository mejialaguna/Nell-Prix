import styles from "./SectionCard.module.css";
import Card from "../index";

const SectionCard = (props) => {
  const { title, videos ,size } = props;
  // console.log({ videos });

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video , idx) => { 
          return (
            <Card
              key={idx}
              id={idx}
              imgUrl={video.snippet.thumbnails.high.url}
              size={size}
            />
          );
        })}
      </div>
    </section>
  );
};

export default SectionCard;
