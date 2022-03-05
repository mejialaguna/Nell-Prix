import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import styles from "../../styles/video.module.css";
import cls from "classnames";
import { getYouTubeVideoById } from "../../lib/index";
import NavBar from "../../components/NavBar";
Modal.setAppElement("#__next");

export async function getStaticProps(staticProps) {
  const params = staticProps.params.id;

  const video = await getYouTubeVideoById(params);
  
  // ISR incremental site regeneration way --- similar to  ssr server side regeneration // fetch data from api from here getStaticProps
  
  return {
    props: {
      video: video[0],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["jiJu4K2jems", "1VIZ89FEjYI", "TcMBFSGVi1c"];

  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((id) => ({
    params: { id: id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

function videoId({ video }) {
  const { title, publishTime, description, channelTitle, viewCount } = video;

  const router = useRouter();

  const vId = router.query.id;
  console.log({ vId });
  return (
      <div className={styles.container}>
        <NavBar />
        <Modal
          isOpen={true}
          contentLabel="Watch Video"
          className={styles.modal}
          overlayClassName={styles.overlay}
          onRequestClose={() => {
            router.back();
          }}
        >
          <div>
            <iframe
              className={styles.videoPlayer}
              id="ytplayer"
              type="text/html"
              width="100%"
              height="360"
              src={`https://www.youtube.com/embed/${vId}?autoplay=1&controls=0&rel=1`}
              frameBorder="0"
            />
          </div>
          <div className={styles.modalBody}>
            <div className={styles.modalBodyContent}>
              <div className={styles.col1}>
                <p className={styles.publishTime}> {publishTime}</p>
                <p className={styles.title}> {title}</p>
                <p className={styles.description}> {description}</p>
              </div>
              <div className={styles.col2}>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>Cast:</span>
                  <span className={styles.channelTitle}> {channelTitle}</span>
                </p>
                <p className={cls(styles.subText, styles.subTextWrapper)}>
                  <span className={styles.textColor}>viewCount :</span>
                  <span className={styles.channelTitle}> {viewCount}</span>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      </div>
  );
}

export default videoId;
