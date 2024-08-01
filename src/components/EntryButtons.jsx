import styles from "./entrybuttons.module.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function EntryButtons({
  entries,
  setEntries,
  points,
  setPoints,
  setWinner,
  setShowWinner,
}) {
  const URL = "http://localhost:8080/entries";
  const [isInErrorState, setIsInErrorState] = useState(false);

  useEffect(() => {
    if (points === 0) {
      setIsInErrorState(false);
    }
  }, [points]);

  // Reset entries to empty and points to 100.
  // Also delete previous session's entries from backend.
  const clearEntries = async () => {
    try {
      await axios.delete(URL);
      console.log("SUCCESS: Entries DELETED from backend.");
    } catch (error) {
      console.error("ERROR: Failed to make DELETE request to backend:", error);
    }

    setEntries([]);
    setPoints(100);
  };

  const saveEntriesAndChooseWinner = async () => {
    // Only choose an entry winner if all points have been used.
    if (points !== 0) {
      setIsInErrorState(true);
      return;
    }

    // Saves current entries to the backend
    // and receives from it the winning entry.
    try {
      const response = await axios.post(URL, entries); // Send entries, receive winner entry.
      console.log("SUCCESS: Entries SAVED to backend and winner chosen.");
      console.log(response.data);
      setWinner(response.data);
    } catch (error) {
      console.error("ERROR: Failed to make POST request to backend:", error);
    }

    setShowWinner(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.buttonSection}>
        <button
          className={`${styles.button} ${
            isInErrorState
              ? styles.invalidLockInButton
              : styles.validLockInButton
          }`}
          onClick={saveEntriesAndChooseWinner}
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
