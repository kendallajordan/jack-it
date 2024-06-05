import styles from "./finalitem.module.css";

export default function FinalItem({ name, rating, min, max }) {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.itemName}>{name}</div>
      <div className={styles.itemRating}>{rating}%</div>
      <div className={styles.itemWinRange}>
        {min == -1 && max == -1 ? "DISQUALIFIED" : `${min} - ${max}`}
      </div>
    </div>
  );
}
