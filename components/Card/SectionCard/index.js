import styles from "./SectionCard.module.css";
import Card from "../index";
import Link from "next/link";

const SectionCard = (props) => {
  const { title, videos = [], size } = props; // if videos doesn't exist or is undefined , just assign  an empty array. (app wont break )
  // console.log({ videos });

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => { 
          return (
            <Link href={`/video/${idx}`} >
              <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCard;
