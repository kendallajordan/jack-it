import styles from "./finalwinner.module.css";

export default function FinalWinner({ winner, setWinner, setShowWinner }) {
  function closeModal() {
    setShowWinner(false);
    setWinner({});
  }

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalHeader}>The Winner is:</div>
      <div className={styles.resultName}>{winner.name}</div>
      <div className={styles.resultInfo}>
        You rolled a {winner.roll} which is in range [{winner.min} -{" "}
        {winner.max}]
      </div>

      <div className={styles.modalActions}>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
}
