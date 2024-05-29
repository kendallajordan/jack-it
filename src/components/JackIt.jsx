import styles from "./jackit.module.css";
import { useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import EntryButtons from "./EntryButtons";
import FinalList from "./FinalList";
import FinalButtons from "./FinalButtons";
import FinalWinner from "./FinalWinner";

export default function JackIt() {
  const [entries, setEntries] = useState([]);
  const [points, setPoints] = useState(100);
  const [finalists, setFinalists] = useState([]);
  const [lockedIn, setLockedIn] = useState(false);
  const [winner, setWinner] = useState({});
  const [showWinner, setShowWinner] = useState(false);

  return (
    <div className={styles.container}>
      {!lockedIn && (
        <EntryForm
          entries={entries}
          setEntries={setEntries}
          points={points}
          setPoints={setPoints}
        />
      )}

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

      {lockedIn && <FinalList finalists={finalists} />}

      {lockedIn && (
        <FinalButtons
          setLockedIn={setLockedIn}
          finalists={finalists}
          setWinner={setWinner}
          setShowWinner={setShowWinner}
        />
      )}

      {showWinner && (
        <FinalWinner
          winner={winner}
          setWinner={setWinner}
          setShowWinner={setShowWinner}
        />
      )}
    </div>
  );
}
