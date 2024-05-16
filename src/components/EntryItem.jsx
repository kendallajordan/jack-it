import styles from "./entryitem.module.css";

export default function EntryItem({
  entries,
  setEntries,
  name,
  rating,
  points,
  setPoints,
}) {
  function handleRatingChange(e) {
    const value = parseInt(e.target.value);

    if (isNaN(value)) {
      return;
    }

    const usedPoints = 100 - points;

    // If you manually assign points that exceed 100, just give entry remaining points.
    if (usedPoints + (value - rating) > 100) {
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
          entry.name === name ? { ...entry, rating: value } : entry
        )
      );
      setPoints((points) => points + (rating - value));
    }
  }

  function decrementNumber() {
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
          value={rating}
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
