import styles from "./jackit.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import EntryForm from "./EntryForm";
import EntryList from "./EntryList";
import EntryButtons from "./EntryButtons";
import FinalWinner from "./FinalWinner";

export default function JackIt() {
  const [entries, setEntries] = useState([]);
  const [points, setPoints] = useState(100);
  const [winner, setWinner] = useState({});
  const [showWinner, setShowWinner] = useState(false);
  const URL = "backend-server-uri/api/entries"; // CHANGE LATER WITH CORRECT URL

  // Initialize entries using previous session's entries stored in backend.
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(URL);
        setEntries(response.data); // MAY NEED TO CHANGE LATER
      } catch (error) {
        console.error("ERROR: Failed to make GET request to backend:", error);
      }
    };

    fetchEntries();
  }, []);

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
