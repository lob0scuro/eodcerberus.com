import { useAuth } from "../../context/AuthContext";
import styles from "./Home.module.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faEye,
  faList,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import AddEOD from "../Create/AddEOD";
import ReadEOD from "../Read/ReadEOD";
import UserEODs from "../Read/UserEODs";
import clsx from "clsx";

const Components = {
  add_eod: AddEOD,
  read_eod: (props) => <ReadEOD {...props} />,
  user_eods: (props) => <UserEODs {...props} />,
};

const Home = () => {
  const { user } = useAuth();
  const [eods, setEods] = useState([]);
  const [component, setComponent] = useState("add_eod");
  const [activeButton, setActiveButton] = useState(0);
  const [ticket, setTicket] = useState(null);

  const SelectedComponent = Components[component];

  return (
    <section>
      <div className={styles.userBar}>
        <h2 className={styles.homeUser}>
          {user.first_name} {user.last_name}
        </h2>
        <div className={styles.userBarButtonBlock}>
          <button
            className={component === "add_eod" ? styles.activeButton : ""}
            onClick={() => setComponent("add_eod")}
          >
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
          <button
            className={component === "read_eod" ? styles.activeButton : ""}
            onClick={() => setComponent("read_eod")}
          >
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button
            className={component === "user_eods" ? styles.activeButton : ""}
            onClick={() => setComponent("user_eods")}
          >
            <FontAwesomeIcon icon={faList} />
          </button>
          <button className={activeButton === 3 ? styles.activeButton : ""}>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </div>
      <div>
        <SelectedComponent
          setComponent={setComponent}
          setTicket={setTicket}
          ticket={ticket}
        />
      </div>
    </section>
  );
};

export default Home;
