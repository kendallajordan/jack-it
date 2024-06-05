import { useState, useEffect } from "react";
import styles from "./entrybuttons.module.css";

export default function EntryButtons({
  entries,
  setEntries,
  points,
  setPoints,
  setFinalists,
  setLockedIn,
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

  function lockInEntries() {
    // Only lock in entries if all points have been used.
    if (points !== 0) {
      setIsInErrorState(true);
      return;
    }

    // generate the [min,max] win-ranges for each finalist in respect to their rating
    // using a cumulative sum approach.
    let updatedEntries = entries;
    let start = 1;
    let end = 0;

    for (let i = 0; i < entries.length; i++) {
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

    setFinalists(updatedEntries);
    setLockedIn(true);
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
          onClick={lockInEntries}
          disabled={isInErrorState}
        >
          LOCK IN
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
