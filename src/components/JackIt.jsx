import styles from "./jackit.module.css";
import { useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";

export default function JackIt() {
  const [entries, setEntries] = useState([]);
  const [points, setPoints] = useState(100);

  return (
    <div className={styles.container}>
      <EntryForm
        entries={entries}
        setEntries={setEntries}
        points={points}
        setPoints={setPoints}
      />
      {console.log(entries)}
      <EntryList
        entries={entries}
        setEntries={setEntries}
        points={points}
        setPoints={setPoints}
      />
    </div>
  );
}
