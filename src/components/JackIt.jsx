import styles from "./jackit.module.css";
import { useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import EntryButtons from "./EntryButtons";
import FinalList from "./FinalList";
import FinalButtons from "./FinalButtons";

export default function JackIt() {
  const [entries, setEntries] = useState([]);
  const [points, setPoints] = useState(100);
  const [finalists, setFinalists] = useState([]);
  const [lockedIn, setLockedIn] = useState(false);

  return (
    <div className={styles.container}>
      <EntryForm
        entries={entries}
        setEntries={setEntries}
        points={points}
        setPoints={setPoints}
      />

      {!lockedIn && (
        <EntryList
          entries={entries}
          setEntries={setEntries}
          points={points}
          setPoints={setPoints}
        />
      )}

      {!lockedIn && (
        <EntryButtons
          entries={entries}
          setEntries={setEntries}
          points={points}
          setPoints={setPoints}
          setFinalists={setFinalists}
          setLockedIn={setLockedIn}
        />
      )}

      {console.log(finalists)}
      {lockedIn && <FinalList finalists={finalists} />}

      {lockedIn && <FinalButtons setLockedIn={setLockedIn} />}
    </div>
  );
}
