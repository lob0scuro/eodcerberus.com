import styles from "./DateRangeReport.module.css";
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { formatLocationName } from "../../../utils/Helpers";

const DateRangeReport = () => {
  const { location } = useAuth();

  return (
    <div className={styles.dateRangeContainer}>
      <div>
        <label htmlFor="start_date">Start Date</label>
        <input type="date" name="start_date" id="start_date" />
      </div>
      <div>
        <label htmlFor="end_date">End Date</label>
        <input type="date" name="end_date" id="end_date" />
      </div>
      <p></p>
    </div>
  );
};

export default DateRangeReport;
