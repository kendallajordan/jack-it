import { useState } from "react";
import styles from "./entrylist.module.css";
import EntryItem from "./EntryItem";

export default function EntryList({ entries, setEntries }) {
  const totalEntries = entries.length;
  const totalDieSides = entries.reduce((sum, entry) => sum + entry.weight, 0);

  return (
    <div className={styles.container}>
      <div className={styles.labelHeader}>
        <div>Entry</div>
        <div>Weight</div>
      </div>

      <div className={styles.list}>
        {entries.map((item) => (
          <EntryItem
            key={item.name}
            item={item}
            entries={entries}
            setEntries={setEntries}
            name={item.name}
            weight={item.weight}
          />
        ))}
      </div>

      <div className={styles.details}>
        <div>Total Entries: {totalEntries}</div>
        <div>Total Sides on Die: {totalDieSides}</div>
      </div>
    </div>
  );
}
