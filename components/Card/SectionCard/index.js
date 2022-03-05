import styles from "./SectionCard.module.css";
import Card from "../index";
import Link from "next/link";

const SectionCard = (props) => {
  const { title, videos = [], size } = props; // if videos doesn't exist or is undefined , just assign  an empty array. (app wont break )

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => {
          const id = video.id.videoId;
          return (
            <Link key={idx} href={`/video/${id}`}>
              <a>
                <Card id={id} imgUrl={video.imgUrl} size={size} />
              </a>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCard;
