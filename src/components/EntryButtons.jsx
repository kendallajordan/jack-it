import { useState } from "react";
import styles from "./entrybuttons.module.css";

export default function EntryButtons({
  entries,
  setEntries,
  points,
  setPoints,
  setFinalists,
  setLockedIn,
}) {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  let lockInStyle = styles.validLockInButton;

  function clearEntries() {
    setEntries([]);
    setPoints(100);
  }

  function lockInEntries() {
    // Only lock in entries if all points have been used.
    if (points !== 0) {
      setShowErrorMessage(true);
      lockInStyle = styles.invalidLockInButton;
      return;
    }
    setShowErrorMessage(false);
    lockInStyle = styles.validLockInButton;

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
        <button className={styles.clearButton} onClick={clearEntries}>
          CLEAR
        </button>
        <button className={lockInStyle} onClick={lockInEntries}>
          LOCK IN
        </button>
      </div>

      <div className={styles.errorMessage}>
        {showErrorMessage && <span>Use all 100 points to continue.</span>}
      </div>
    </div>
  );
}
