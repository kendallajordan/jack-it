import { useState } from "react";
import styles from "./entryitem.module.css";

export default function EntryItem({
  entries,
  setEntries,
  name,
  rating,
  points,
  setPoints,
}) {
  const [ratingIsEmpty, setRatingIsEmpty] = useState(false);

  function handleRatingChange(e) {
    const value = e.target.value;

    // If user leaves rating field empty,
    // treat entry as having 0 rating in regards to points.
    if (value === "") {
      setPoints((points) => points + rating);
      setEntries(
        entries.map((entry) =>
          entry.name === name ? { ...entry, rating: 0 } : entry
        )
      );
      setRatingIsEmpty(true);
      return;
    }
    setRatingIsEmpty(false);

    const numValue = parseInt(value, 10);

    if (isNaN(numValue)) {
      return;
    }

    const usedPoints = 100 - points;

    // If you manually assign points that exceed 100, just give entry remaining points.
    if (usedPoints + (numValue - rating) > 100) {
      const maxPointAllocation = rating + points;
      setEntries(
        entries.map((entry) =>
          entry.name === name ? { ...entry, rating: maxPointAllocation } : entry
        )
      );
      setPoints(0);
    } else {
      setEntries(
        entries.map((entry) =>
          entry.name === name ? { ...entry, rating: numValue } : entry
        )
      );
      setPoints((points) => points + (rating - numValue));
    }
  }

  function decrementNumber() {
    if (ratingIsEmpty) {
      setRatingIsEmpty(false);
    }

    if (rating <= 1) {
      return;
    }

    setEntries(
      entries.map((entry) =>
        entry.name === name ? { ...entry, rating: rating - 1 } : entry
      )
    );
    setPoints((points) => points + 1);
  }

  function incrementNumber() {
    if (ratingIsEmpty) {
      setRatingIsEmpty(false);
    }

    if (points === 0) {
      return;
    }

    setEntries(
      entries.map((entry) =>
        entry.name === name ? { ...entry, rating: rating + 1 } : entry
      )
    );
    setPoints((points) => points - 1);
  }

  function handleDelete() {
    setPoints((points) => points + rating);
    setEntries(entries.filter((entry) => entry.name !== name));
  }

  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemName}>{name}</div>
      <div className={styles.ratingContainer}>
        <button
          className={styles.button}
          type="button"
          onClick={decrementNumber}
        >
          -
        </button>
        <input
          className={styles.itemRating}
          type="number"
          min={1}
          max={points}
          value={ratingIsEmpty ? "" : rating}
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
      <div className={styles.itemActions}>
        <button className={styles.deleteButton} onClick={handleDelete}>
          x
        </button>
      </div>
    </div>
  );
}
