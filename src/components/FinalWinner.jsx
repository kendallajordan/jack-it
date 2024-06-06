import styles from "./finalwinner.module.css";

export default function FinalWinner({ winner, setWinner, setShowWinner }) {
  function closeModal() {
    setShowWinner(false);
    setWinner({});
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalOverlay} onClick={closeModal}></div>
      <div className={styles.modalCard}>
        <div className={styles.header}>The Winner is:</div>
        <div className={styles.modalContent}>
          <div className={styles.resultName}>{winner.name}</div>
          <div className={styles.resultInfo}>
            <p>With a rating of {winner.rating}%</p>
            <p>
              You rolled a {winner.roll} which is in range [{winner.min} -{" "}
              {winner.max}]
            </p>
          </div>

          <div className={styles.modalActions}>
            <button className={styles.closeButton} onClick={closeModal}>
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
