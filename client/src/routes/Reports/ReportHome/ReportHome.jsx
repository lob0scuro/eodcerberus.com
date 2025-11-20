import styles from "./ReportHome.module.css";
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { formatLocationName } from "../../../utils/Helpers";

const ReportHome = () => {
  const { location } = useAuth();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <>
      <div className={styles.reportHomeContainer}>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button>Run daily report for {formatLocationName(location)}</button>
        <button>Run Master Report</button>
      </div>
    </>
  );
};

export default ReportHome;
