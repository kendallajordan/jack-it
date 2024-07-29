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
  const URL = "backend-server-uri/api/entries"; // CHANGE LATER WITH CORRECT URL
  const [isInErrorState, setIsInErrorState] = useState(false);

  useEffect(() => {
    if (points === 0) {
      setIsInErrorState(false);
    }
  }, [points]);

  // Reset entries to empty and points to 100.
  // Also delete previous session's entries from backend.
  // CHECK IF DELETE WORKS LATER
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

  // Saves current entries to the backend
  // and receives from it the winning entry.
  // CHECK IF POST WORKS LATER ALONG WITH LOGIC TO CHOOSE WINNNER.
  // MOVE BELOW CHOOSEENTRYWINNER FUNCTION IF WORKS FOR ORGANIZING!!!
  const saveEntriesAndChooseWinner = async () => {
    let entryWinner = {};

    try {
      const response = await axios.post(URL, { entries }); // Send entries, receive winner entry.
      entryWinner = response.data;
      console.log("SUCCESS: Entries SAVED to backend and winner chosen.");
    } catch (error) {
      console.error("ERROR: Failed to make POST request to backend:", error);
    }

    return entryWinner;
  };

  // REMOVED LOGIC TO CHOOSE WINNER AND REPLACED WITH ABOVE FUNCTION'S LOGIC
  // ADDED POST REQUEST TO SAVE ENTRIES AND RETURN ENTRYWINNER.
  function chooseEntryWinner() {
    // Only choose an entry winner if all points have been used.
    if (points !== 0) {
      setIsInErrorState(true);
      return;
    }

    // These 2 helper functions do the main logic of picking a winner.
    //const updatedEntries = generateWinRanges();
    //const entryWinner = chooseAtRandom(updatedEntries);

    const entryWinner = saveEntriesAndChooseWinner();

    setWinner({
      name: entryWinner.name,
      rating: entryWinner.rating,
    });
    setShowWinner(true);
  }

  // generate the [min,max] win-ranges for each finalist in respect to their rating
  // using a cumulative sum approach.
  // REMOVE LATER IF NEW CODE WORKS!
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
  // REMOVE LATER IF NEW CODE WORKS!
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
