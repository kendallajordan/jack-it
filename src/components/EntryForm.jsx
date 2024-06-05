import { useState, useEffect } from "react";
import styles from "./entryform.module.css";

export default function EntryForm({ entries, setEntries, points, setPoints }) {
  const [entryName, setEntryName] = useState("");
  const [entryRating, setEntryRating] = useState(1);
  const [nameErrorMsg, setNameErrorMsg] = useState(false);
  const [emptyNameErrorMsg, setEmptyNameErrorMsg] = useState(false);
  const [ratingErrorMsg, setRatingErrorMsg] = useState(false);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const message1 = `On a scale of (1 - ${points}), how many points do you rate it?`;
  const message2 = "You are out of points. Can't add anymore entries.";

  // Disable form submission if out of points.
  useEffect(() => {
    if (points === 0) {
      setIsFormDisabled(true);
      setNameErrorMsg(false);
      setEmptyNameErrorMsg(false);
      setRatingErrorMsg(false);
    } else {
      setIsFormDisabled(false);
    }
  }, [points]);

  // Turn name field error messages off when user resumes typing name input.
  useEffect(() => {
    if (entryName !== "") {
      setEmptyNameErrorMsg(false);
      setNameErrorMsg(false);
    }
  }, [entryName]);

  // Turn rating field error message off when user inputs valid number.
  useEffect(() => {
    if (entryRating !== "") {
      setRatingErrorMsg(false);
    }
  }, [entryRating]);

  function handleSubmit(e) {
    e.preventDefault();

    if (points === 0) {
      return;
    }

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
    } else if (numValue > points) {
      setEntryRating(points);
    }
  }

  function decrementNumber() {
    if (entryRating === "") {
      setEntryRating(1);
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
        {isFormDisabled ? message2 : message1}
        <p>
          Points remaining: <span className={styles.points}>{points}/100</span>
        </p>
      </div>

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.nameContainer}>
          <input
            className={styles.nameInput}
            type="text"
            value={entryName}
            onChange={(e) => setEntryName(e.target.value)}
            placeholder="Entry name..."
          />
          {emptyNameErrorMsg && (
            <span className={styles.errorMessage}>
              No name entered. Please fill in entry name.
            </span>
          )}
          {nameErrorMsg && (
            <span className={styles.errorMessage}>
              Name already exists. Try a different name.
            </span>
          )}
        </div>
        <div className={styles.ratingContainer}>
          <div className={styles.ratingRow}>
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
          <button
            className={`${styles.button} ${
              isFormDisabled ? styles.disabledSubmitButton : styles.submitButton
            }`}
            type="submit"
            disabled={isFormDisabled}
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
