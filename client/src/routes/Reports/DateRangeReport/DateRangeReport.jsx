import styles from "./DateRangeReport.module.css";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { formatLocationName } from "../../../utils/Helpers";

const DateRangeReport = () => {
  const { location } = useAuth();

  return (
    <div className={styles.dateRangeContainer}>
      <div className={styles.dateInputContainer}>
        <div className={styles.dateInput}>
          <label htmlFor="start_date">Start Date</label>
          <input type="date" name="start_date" id="start_date" />
        </div>
        <div className={styles.dateInput}>
          <label htmlFor="end_date">End Date</label>
          <input type="date" name="end_date" id="end_date" />
        </div>
      </div>
      <div className={styles.dateRangeButtonBlock}>
        <button>Run daily report for {formatLocationName(location)}</button>
        <button>Run master report</button>
      </div>
    </div>
  );
};

export default DateRangeReport;
