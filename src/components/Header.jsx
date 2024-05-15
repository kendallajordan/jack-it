import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>JACK-IT APP</div>
      <div className={styles.content}>
        <p>Description:</p>
        <p>An app that selects an entry from a weighted-list at random.</p>
        <p>
          Can't decide on something but feeling a bit more biased on one choice?
        </p>
        <p>Create a weighted-die to help you decide on anything!</p>
        <p>Make your list, create your die, jack-it, and roll!</p>
        <p>How to use:</p>
        <p>1) Add entries to roll for</p>
        <p>
          2) Give each entry a weight value. This will be the number of sides it
          has on the die. The higher the number, the more likely it's chosen.
        </p>
        <p>3) When you're entry list is done, generate your die. </p>
        <p>
          4) A table is also created, telling you what you need to roll for each
          entry.
        </p>
        <p>5) When you're ready, Jack It!</p>
      </div>
    </div>
  );
}
