import styles from "./finalbuttons.module.css";

export default function FinalButtons({ setLockedIn }) {
  function unlockList() {
    setLockedIn(false);
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={unlockList}>
        GO BACK
      </button>
      <button className={styles.jackItButton}>JACK IT!</button>
    </div>
  );
}
