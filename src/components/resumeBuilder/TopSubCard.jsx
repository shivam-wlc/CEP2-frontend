import React from "react";
import styles from "../../styles/TopSubCard.module.css";

const TopSubCard = ({ currentSection = 1 }) => {
  const circleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className={styles["top-subcard"]}>
      <div className={styles.cardTitle}>Resume Building Blocks</div>
      <ul className={styles.status}>
        {circleValues.map((value, index) => (
          <li
            key={index}
            className={`${styles.statusCircle} ${currentSection >= index + 1 ? styles.statusCircleActive : styles.statusCircleInactive}`}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopSubCard;
