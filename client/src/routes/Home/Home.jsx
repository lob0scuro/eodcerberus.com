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
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const [eods, setEods] = useState([]);
  const navigate = useNavigate();

  const handleNavClick = (endpoint) => {
    navigate(endpoint);
  };

  return (
    <section>
      <div className={styles.userBar}>
        <h2 className={styles.homeUser}>
          {user.first_name} {user.last_name}
        </h2>
        <div className={styles.userBarButtonBlock}>
          <button onClick={() => handleNavClick("/add_eod")}>
            <FontAwesomeIcon icon={faSquarePlus} />
          </button>
          <button>
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button>
            <FontAwesomeIcon icon={faList} />
          </button>
          <button>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
