import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import styles from "../../styles/video.module.css";
import clsx from "classnames"
Modal.setAppElement("#__next");

function videoId() {
  const router = useRouter();

  const vId = router.query.id;

  const videoData = {
    title: "Demon Slayer",
    publishTime: new Date().toLocaleString(),
    description: "bloddy shit",
    channelTitle: "netflix",
    viewCount: 12568895664,
  };

  const {title, publishTime, description, channelTitle, viewCount} = videoData;

  return (
    <div className={styles.container}>
      video site{vId}
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
            frameborder="0"
          ></iframe>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p styles={styles.publishTime}> {publishTime}</p>
              <p styles={styles.title}> {title}</p>
              <p styles={styles.description}> {description}</p>
            </div>
            <div className={styles.col2}>
              <p styles={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast:</span>
                <span className={styles.channelTitle}> {channelTitle}</span>
              </p>
              <p styles={clsx(styles.subText, styles.subTextWrapper)}>
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
