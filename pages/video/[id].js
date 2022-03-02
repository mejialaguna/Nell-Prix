import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import styles from "../../styles/video.module.css"
Modal.setAppElement("#__next");

function videoId() {
  const router = useRouter();

  const vId = router.query.id;
  return (
    <div className={styles.container}>
      video site{vId}
      <Modal
        isOpen={true}
        contentLabel="Watch Video"
        className={styles.modal}
        overlayClassName={styles.overlay}
        onRequestClose={()=>{router.back()}}
      >
        <div>I am a modal</div>
      </Modal>
    </div>
  );
}

export default videoId;
