import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>JACK-IT APP</div>
      <div className={styles.content}>
        <p>Description:</p>
        <p>An app that selects an entry from a rating-based list at random.</p>
        <p>
          Can't decide on something but feeling a bit more biased on one choice?
        </p>
        <p>Create a die to help you decide on anything!</p>
        <p>Make your list, create your die, jack-it, and roll!</p>
        <p>How to use:</p>
        <p>
          1) You only have 100 points total. Use your points to rate how much
          you like your entries. The higher the number, the more likely it's
          chosen.
        </p>
        <p>2) When you're entry list is done, generate your die. </p>
        <p>
          4) A table is also created, telling you what you need to roll for each
          entry.
        </p>
        <p>5) When you're ready, Jack It!</p>
      </div>
    </div>
  );
}
