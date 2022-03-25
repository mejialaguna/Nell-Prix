import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import styles from "../../styles/video.module.css";
import cls from "classnames";
import { getYouTubeVideoById } from "../../lib/index";
import NavBar from "../../components/NavBar";
import Like from "../../components/icons/like-icons";
import DisLike from "../../components/icons/dislike-icons";

Modal.setAppElement("#__next");

export async function getStaticProps(staticProps) {
  const params = staticProps.params.id;

  const video = await getYouTubeVideoById(params);

  // ISR incremental site regeneration way --- similar to  ssr server side regeneration // fetch data from api from here getStaticProps

  return {
    props: {
      video: video.length > 0 ? video[0] : {},
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
  const paths = listOfVideos.map((videoId) => ({
    params: { id: videoId.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

function videoId({ video }) {
  const [like, setLike] = useState(false);
  const [disLike, setDisLike] = useState(false);

  const { title, publishTime, description, channelTitle, viewCount } = video;
  const router = useRouter();

  const vId = router.query.id;
  console.log({ vId });

  useEffect(async () => {
    const response = await fetch(`/api/stats?videoId=${vId} `, {
      method: "GET", // GET method cant have body , to request info have to come from the query line 56
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.length > 0) {
      const favorite = data[0].favorite;
      if (favorite >= 1) {
        setLike(true)
      } else {
        setDisLike(true)
      }
    }    

    console.log({ data });
    return data;
  }, []);


  async function fetchRequestLikeAndDisliked(favorite) {
    const response = await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        // updating an object into a json object
        favorite: favorite,
        videoId: vId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(await response.json());
    return response;
  }

  
  function handleToggleLike() {
    setLike(true);
    setDisLike(false);
    const favorite = !like ? 1 : 0;
    fetchRequestLikeAndDisliked(favorite);
  }

  function handleToggleDisLike() {
    setDisLike(true);
    setLike(false);
    const favorite = !disLike ? 0 : 1;
    fetchRequestLikeAndDisliked(favorite);
  }

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
          <div className={styles.likeDislikeBtnWrapper}>
            <div className={styles.likeBtnWrapper}>
              <button onClick={handleToggleLike}>
                <div className={styles.btnWrapper}>
                  <Like selected={like} />
                </div>
              </button>
            </div>
            <button onClick={handleToggleDisLike}>
              <div className={styles.btnWrapper}>
                <DisLike selected={disLike} />
              </div>
            </button>
          </div>
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
