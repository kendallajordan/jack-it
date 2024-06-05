import styles from "./finallist.module.css";
import FinalItem from "./FinalItem";

export default function FinalList({ finalists }) {
  const totalEntries = finalists.length;

  return (
    <div className={styles.container}>
      <div className={styles.labelHeader}>
        <div className={styles.labelEntry}>Entry</div>
        <div className={styles.labelRating}>Rating (%)</div>
        <div className={styles.labelWinRange}>
          Win
          <br />
          Range
        </div>
      </div>

      <div className={styles.list}>
        {finalists.map((item) => (
          <FinalItem
            key={item.name}
            name={item.name}
            rating={item.rating}
            min={item.min}
            max={item.max}
          />
        ))}
      </div>

      <div className={styles.details}>
        <div>
          Total Entries:{" "}
          <span className={styles.detailValue}>{totalEntries}</span>
        </div>
      </div>
    </div>
  );
}
