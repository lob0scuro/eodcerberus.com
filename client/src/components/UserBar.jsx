import styles from "./UserBar.module.css";
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faEllipsisVertical,
  faEye,
  faFileInvoiceDollar,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserBar = ({ setComponent, component, title }) => {
  const [activeButton, setActiveButton] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.userBar}>
      <h2 className={styles.homeUser}>{title}</h2>
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
        <button
          className={menuOpen ? styles.activeButton : ""}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <FontAwesomeIcon icon={faCaretDown} />
          ) : (
            <FontAwesomeIcon icon={faEllipsisVertical} />
          )}
        </button>
      </div>
      {menuOpen && (
        <div className={styles.userMenu} ref={menuRef}>
          <Link to={"/"}>Home</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/settings">Settings</Link>
          {user.is_admin && <Link to="/register">Register User</Link>}
        </div>
      )}
    </div>
  );
};

export default UserBar;
