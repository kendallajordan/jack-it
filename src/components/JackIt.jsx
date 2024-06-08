import styles from "./jackit.module.css";
import { useState } from "react";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import EntryButtons from "./EntryButtons";
import FinalWinner from "./FinalWinner";

export default function JackIt() {
  const [entries, setEntries] = useState([]);
  const [points, setPoints] = useState(100);
  const [winner, setWinner] = useState({});
  const [showWinner, setShowWinner] = useState(false);

  return (
    <div className={styles.container}>
      <EntryForm
        entries={entries}
        setEntries={setEntries}
        points={points}
        setPoints={setPoints}
      />

      <EntryList
        entries={entries}
        setEntries={setEntries}
        points={points}
        setPoints={setPoints}
      />

      <EntryButtons
        entries={entries}
        setEntries={setEntries}
        points={points}
        setPoints={setPoints}
        setWinner={setWinner}
        setShowWinner={setShowWinner}
      />

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
