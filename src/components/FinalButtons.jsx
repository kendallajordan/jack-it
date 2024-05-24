import styles from "./finalbuttons.module.css";

export default function FinalButtons({
  setLockedIn,
  finalists,
  setWinner,
  setShowWinner,
}) {
  function unlockList() {
    setLockedIn(false);
  }

  // RNG roll a number between 1-100 inclusive.
  // Then find the finalist with the win-range the roll falls under.
  function chooseAtRandom() {
    let winnerName;
    const roll = Math.floor(Math.random() * 100) + 1;

    for (let i = 0; i < finalists.length; i++) {
      if (finalists[i].min <= roll && roll <= finalists[i].max) {
        winnerName = finalists[i].name;

        setWinner({
          name: winnerName,
          roll: roll,
          min: finalists[i].min,
          max: finalists[i].max,
        });
        setShowWinner(true);
        return;
      }
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={unlockList}>
        GO BACK
      </button>
      <button className={styles.jackItButton} onClick={chooseAtRandom}>
        JACK IT!
      </button>
    </div>
  );
}
