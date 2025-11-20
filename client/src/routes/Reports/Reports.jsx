import UserBar from "../../components/UserBar";
import styles from "./Reports.module.css";
import React, { useState } from "react";
import AddEOD from "../Create/AddEOD";
import ReadEOD from "../Read/ReadEOD";
import UserEODs from "../Read/UserEODs";
import { useAuth } from "../../context/AuthContext";
import DateRangeReport from "./DateRangeReport/DateRangeReport";
import ReportHome from "./ReportHome/ReportHome";

const Components = {
  report_home: ReportHome,
  date_range_report: DateRangeReport,
};

const Reports = () => {
  const title = "Reports";
  const [component, setComponent] = useState("report_home");
  const pages = ["report_home", "date_range_report"];

  const SelectedComponent = Components[component];

  return (
    <>
      <UserBar
        component={component}
        setComponent={setComponent}
        title={title}
        pages={pages}
      />
      <SelectedComponent />
    </>
  );
};

export default Reports;
