import { useState, useEffect } from "react";
import styles from "./entrybuttons.module.css";

export default function EntryButtons({
  entries,
  setEntries,
  points,
  setPoints,
  setWinner,
  setShowWinner,
}) {
  const [isInErrorState, setIsInErrorState] = useState(false);

  useEffect(() => {
    if (points === 0) {
      setIsInErrorState(false);
    }
  }, [points]);

  function clearEntries() {
    setEntries([]);
    setPoints(100);
  }

  function chooseEntryWinner() {
    // Only choose and entry winner if all points have been used.
    if (points !== 0) {
      setIsInErrorState(true);
      return;
    }

    // These 2 helper functions do the main logic of picking a winner.
    const updatedEntries = generateWinRanges();
    const entryWinner = chooseAtRandom(updatedEntries);

    setWinner({
      name: entryWinner.name,
      rating: entryWinner.rating,
    });
    setShowWinner(true);
  }

  // generate the [min,max] win-ranges for each finalist in respect to their rating
  // using a cumulative sum approach.
  function generateWinRanges() {
    let updatedEntries = entries;
    let start = 1;
    let end = 0;

    for (let i = 0; i < entries.length; i++) {
      // Do not give 0 rating entries a win-range.
      if (entries[i].rating === 0) {
        updatedEntries[i].min = -1;
        updatedEntries[i].max = -1;
        continue;
      }

      end = start + entries[i].rating - 1;

      updatedEntries[i].min = start;
      updatedEntries[i].max = end;

      start = end + 1;
    }

    return updatedEntries;
  }

  // RNG roll a number between 1-100 inclusive.
  // Then find the entry with the win-range the roll falls under.
  function chooseAtRandom(updatedEntries) {
    const roll = Math.floor(Math.random() * 100) + 1;

    for (let i = 0; i < updatedEntries.length; i++) {
      if (updatedEntries[i].min <= roll && roll <= updatedEntries[i].max) {
        return updatedEntries[i];
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonSection}>
        <button
          className={`${styles.button} ${
            isInErrorState
              ? styles.invalidLockInButton
              : styles.validLockInButton
          }`}
          onClick={chooseEntryWinner}
          disabled={isInErrorState}
        >
          JACK IT
        </button>
        <button
          className={`${styles.button} ${styles.clearButton}`}
          onClick={clearEntries}
        >
          CLEAR
        </button>
      </div>

      <div className={styles.errorMessage}>
        {isInErrorState && <span>Use all 100 points to continue.</span>}
      </div>
    </div>
  );
}
