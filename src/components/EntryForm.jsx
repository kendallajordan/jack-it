import { useState } from "react";
import styles from "./entryform.module.css";

export default function EntryForm({ entries, setEntries, points, setPoints }) {
  const [entryName, setEntryName] = useState("");
  const [entryRating, setEntryRating] = useState(1);
  const [nameErrorMsg, setNameErrorMsg] = useState(false);
  const [emptyNameErrorMsg, setEmptyNameErrorMsg] = useState(false);
  const [ratingErrorMsg, setRatingErrorMsg] = useState(false);

  const message1 = `On a scale of (1 - ${points}), how many points do you rate it?`;
  const message2 = "You are out of points. Can't add anymore entries.";

  function handleSubmit(e) {
    e.preventDefault();

    if (entryName === "") {
      setEmptyNameErrorMsg(true);
      setNameErrorMsg(false);
      return;
    }
    setEmptyNameErrorMsg(false);

    const isNameExist = entries.some((entry) => entry.name === entryName);
    if (isNameExist) {
      setNameErrorMsg(true);
      return;
    }
    setNameErrorMsg(false);

    if (entryRating === "") {
      setRatingErrorMsg(true);
      return;
    }
    setRatingErrorMsg(false);

    setEntries([...entries, { name: entryName, rating: entryRating }]);
    setPoints((points) => points - entryRating);

    setEntryName("");
    setEntryRating(1);
  }

  function handleRatingChange(e) {
    const value = e.target.value;

    if (value === "") {
      setEntryRating("");
      return;
    }

    const numValue = parseInt(value, 10);

    if (!isNaN(numValue) && numValue >= 1 && numValue <= points) {
      setEntryRating(numValue);
      setRatingErrorMsg(false);
    } else if (numValue > points) {
      setEntryRating(points);
      setRatingErrorMsg(false);
    }
  }

  function decrementNumber() {
    if (entryRating === "") {
      setEntryRating(1);
      setRatingErrorMsg(false);
      return;
    }

    if (entryRating <= 1) {
      return;
    }

    setEntryRating((entryRating) => entryRating - 1);
  }

  function incrementNumber() {
    if (entryRating === "") {
      setEntryRating(1);
      setRatingErrorMsg(false);
      return;
    }

    if (entryRating === points) {
      return;
    }
    if (entryRating > points) {
      setEntryRating(points);
      return;
    }
    setEntryRating((entryRating) => entryRating + 1);
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>
        <h2>Add an Entry</h2>
        {points > 0 ? message1 : message2}
        <p>
          Points remaining: <span className={styles.points}>{points}/100</span>
        </p>
      </div>
      {points !== 0 && (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.nameContainer}>
            <input
              className={styles.nameInput}
              type="text"
              value={entryName}
              onChange={(e) => setEntryName(e.target.value)}
              placeholder="Entry name..."
            />
            {nameErrorMsg && (
              <span className={styles.errorMessage}>
                Name already exists. Try a different name.
              </span>
            )}
            {emptyNameErrorMsg && (
              <span className={styles.errorMessage}>
                No name entered. Please fill in entry name.
              </span>
            )}
          </div>
          <div className={styles.ratingContainer}>
            <div>
              <button
                className={styles.button}
                type="button"
                onClick={decrementNumber}
              >
                -
              </button>
              <input
                className={styles.ratingInput}
                type="number"
                min={1}
                max={points}
                value={entryRating}
                onChange={handleRatingChange}
              />
              <button
                className={styles.button}
                type="button"
                onClick={incrementNumber}
              >
                +
              </button>
            </div>
            {ratingErrorMsg && (
              <span className={styles.errorMessage}>
                Rating field blank. Please rate the entry.
              </span>
            )}
          </div>
          <div className={styles.submit}>
            <button className={styles.button} type="submit">
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
