import styles from "./entrylist.module.css";
import EntryItem from "./EntryItem";

export default function EntryList({ entries, setEntries, points, setPoints }) {
  const totalEntries = entries.length;

  return (
    <div className={styles.container}>
      <div className={styles.labelHeader}>
        <div>Entry</div>
        <div>Rating</div>
      </div>

      <div className={styles.list}>
        {entries.map((item) => (
          <EntryItem
            key={item.name}
            entries={entries}
            setEntries={setEntries}
            name={item.name}
            rating={item.rating}
            points={points}
            setPoints={setPoints}
          />
        ))}
      </div>

      <div className={styles.details}>
        <div>
          Total Entries:{" "}
          <span className={styles.detailValue}>{totalEntries}</span>
        </div>
        <div>
          Total Points Used:{" "}
          <span className={styles.detailValue}>{100 - points}</span>{" "}
        </div>
      </div>
    </div>
  );
}
