import UserBar from "../../components/UserBar";
import styles from "./Analytics.module.css";
import React, { useState } from "react";
import AddEOD from "../Create/AddEOD";
import ReadEOD from "../Read/ReadEOD";
import UserEODs from "../Read/UserEODs";

const components = {
  add_eod: AddEOD,
  read_eod: (props) => <ReadEOD {...props} />,
  user_eods: (props) => <UserEODs {...props} />,
};

const Analytics = () => {
  const title = "Analytics";
  const [component, setComponent] = useState("");
  return (
    <>
      <UserBar
        component={component}
        setComponent={setComponent}
        title={title}
      />
    </>
  );
};

export default Analytics;
