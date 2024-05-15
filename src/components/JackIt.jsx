import styles from "./jackit.module.css";
import { useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";

export default function JackIt() {
  const [entries, setEntries] = useState([]);

  return (
    <div className={styles.container}>
      <EntryForm entries={entries} setEntries={setEntries} />
      {console.log(entries)}
      <EntryList entries={entries} setEntries={setEntries} />
    </div>
  );
}
