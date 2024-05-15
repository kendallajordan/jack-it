import { useState } from "react";
import styles from "./entryform.module.css";

export default function EntryForm({ entries, setEntries }) {
  const [entryName, setEntryName] = useState("");
  const [entryWeight, setEntryWeight] = useState(1);
  const [nameErrorMsg, setNameErrorMsg] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const isNameExist = entries.some((entry) => entry.name === entryName);
    if (isNameExist) {
      setNameErrorMsg(true);
      return;
    }

    setEntries([...entries, { name: entryName, weight: entryWeight }]);
    setEntryName("");
    setEntryWeight(1);
    setNameErrorMsg(false);
  }

  function handleWeightChange(e) {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setEntryWeight(value);
    }
  }

  function decrementNumber() {
    if (entryWeight <= 1) {
      return;
    }

    setEntryWeight((entryWeight) => entryWeight - 1);
  }

  function incrementNumber() {
    setEntryWeight((entryWeight) => entryWeight + 1);
  }

  return (
    <div className={styles.outerContainer}>
      <div className={styles.header}>Add an Entry</div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div>
          <input
            className={styles.nameInput}
            type="text"
            value={entryName}
            onChange={(e) => setEntryName(e.target.value)}
            placeholder="Entry name..."
          />
          {nameErrorMsg && (
            <span style={{ color: "red" }}>
              Entry name already exists. Try another name.
            </span>
          )}
        </div>
        <div className={styles.weightContainer}>
          <input
            className={styles.weightInput}
            type="number"
            min={1}
            value={entryWeight}
            onChange={handleWeightChange}
          />
          <button
            className={styles.button}
            type="button"
            onClick={decrementNumber}
          >
            -
          </button>
          <button
            className={styles.button}
            type="button"
            onClick={incrementNumber}
          >
            +
          </button>
        </div>
        <div className={styles.submit}>
          <button className={styles.button} type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
