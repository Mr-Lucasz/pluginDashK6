import React from "react";
import styles from "./RequestDurationBreakdown.module.css";

const RequestDurationBreakdown = () => (
  <div className={styles.card}>
    <div className={styles.flexBetween}>
      <h3 className={styles.title}>Request Duration Breakdown</h3>
      <div className={styles.badge}>Avg. 1,240ms</div>
    </div>
    <div className={styles.spaceY2}>
      <div className={styles.flexBetween}>
        <span className={styles.label}>Waiting (TTFB)</span>
        <span className={styles.value}>680ms</span>
      </div>
      <div className={styles.barBg}>
        <div className={`${styles.bar} ${styles.barBlue}`} style={{ width: "55%" }}></div>
      </div>
      <div className={styles.flexBetween}>
        <span className={styles.label}>Receiving</span>
        <span className={styles.value}>320ms</span>
      </div>
      <div className={styles.barBg}>
        <div className={`${styles.bar} ${styles.barIndigo}`} style={{ width: "26%" }}></div>
      </div>
      <div className={styles.flexBetween}>
        <span className={styles.label}>Sending</span>
        <span className={styles.value}>120ms</span>
      </div>
      <div className={styles.barBg}>
        <div className={`${styles.bar} ${styles.barPurple}`} style={{ width: "10%" }}></div>
      </div>
      <div className={styles.flexBetween}>
        <span className={styles.label}>Connecting</span>
        <span className={styles.value}>85ms</span>
      </div>
      <div className={styles.barBg}>
        <div className={`${styles.bar} ${styles.barPink}`} style={{ width: "7%" }}></div>
      </div>
      <div className={styles.flexBetween}>
        <span className={styles.label}>Blocked</span>
        <span className={styles.value}>35ms</span>
      </div>
      <div className={styles.barBg}>
        <div className={`${styles.bar} ${styles.barRed}`} style={{ width: "3%" }}></div>
      </div>
    </div>
  </div>
);

export default RequestDurationBreakdown;
