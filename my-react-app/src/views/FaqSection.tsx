import React from "react";
import styles from "../style/FaqSection.module.css"; // Use CSS module

const FaqSection: React.FC = () => {
  return (
    <div className={styles.card}>
      <h1>Frequently Asked Questions</h1>

      <details className={styles.info}>
        <summary>How quickly can you organize a move?</summary>
        <p>
          Depending on the complexity and volume of work, we can organize a move
          within 1–3 days from the order confirmation.
        </p>
      </details>

      <details className={styles.warning}>
        <summary>Do you work on weekends and holidays?</summary>
        <p>
          Yes, we work without days off, including holidays. However, a
          surcharge may apply on holidays.
        </p>
      </details>

      <details className={styles.alert}>
        <summary>Do you provide guarantees for your services?</summary>
        <p>
          Yes, we provide guarantees for all our services. In case of damage to
          items during the move, we compensate according to the contract.
        </p>
      </details>
    </div>
  );
};

export default FaqSection;
