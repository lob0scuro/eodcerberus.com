import styles from "./UserBar.module.css";
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faChartSimple,
  faEllipsisVertical,
  faEye,
  faFileInvoiceDollar,
  faList,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AddEOD from "../routes/Create/AddEOD";
import ReadEOD from "../routes/Read/ReadEOD";
import UserEODs from "../routes/Read/UserEODs";

const paths = {
  add_eod: {
    icon: faSquarePlus,
    component: AddEOD,
  },
  read_eod: {
    icon: faEye,
    component: (props) => <ReadEOD {...props} />,
  },
  user_eods: {
    icon: faList,
    component: (props) => <UserEODs {...props} />,
  },
  view_users: {
    icon: faUsers,
  },
  register_user: {
    icon: faUserPlus,
  },
  user_metrics: {
    icon: faChartSimple,
  },
};

const UserBar = ({ setComponent, component, title, pages }) => {
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
        {pages?.map((page) => (
          <button
            className={component === page ? styles.activeButton : ""}
            onClick={() => setComponent(page)}
          >
            <FontAwesomeIcon icon={paths[page].icon} />
          </button>
        ))}
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
          {user.is_admin && <Link to="/users">Users</Link>}
        </div>
      )}
    </div>
  );
};

export default UserBar;
