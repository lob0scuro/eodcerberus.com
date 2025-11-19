import styles from "./Settings.module.css";
import React, { useState } from "react";
import AddEOD from "../Create/AddEOD";
import ReadEOD from "../Read/ReadEOD";
import UserEODs from "../Read/UserEODs";
import UserBar from "../../components/UserBar";

const components = {
  add_eod: AddEOD,
  read_eod: (props) => <ReadEOD {...props} />,
  user_eods: (props) => <UserEODs {...props} />,
};
const Settings = () => {
  const title = "Settings";
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

export default Settings;
