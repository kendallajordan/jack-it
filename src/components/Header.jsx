import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>JACK-IT APP</div>
      <div className={styles.content}>
        <div className={styles.description}>
          <h3>Description:</h3>
          <p>
            An app that selects an entry from a rating-based list at random.{" "}
          </p>
          <p>
            Can't decide on something but feeling a bit more biased on one
            choice?{" "}
          </p>
          <p>
            Have Jack-It decide for you! <br />
          </p>
          <p>
            Make your list, Jack-it, and roll! <br />
          </p>
        </div>
        <div className={styles.instructions}>
          <h3>How to use:</h3>
          <ol>
            <li>
              You only have 100 points total. Use your points to rate how much
              you like your entries. The higher the number, the more likely it's
              chosen.
            </li>
            <li>Lock in your entry list when done.</li>
            <li>Jack It and get your winner!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
