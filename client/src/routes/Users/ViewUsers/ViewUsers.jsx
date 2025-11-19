import styles from "./ViewUsers.module.css";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/read/get_users");
      const data = await response.json();
      if (!data.success) {
        toast.error(data.error);
        return;
      }
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  return (
    <section>
      {users.length > 0 ? (
        <ul className={styles.userList}>
          {users.map(({ id, first_name, last_name, email, department }) => (
            <li key={id}>
              <div>
                <h2>
                  {first_name} {last_name}
                </h2>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div>
                <p>
                  {department.charAt(0).toUpperCase() + department.slice(1)}
                </p>
                <p>{email}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <h1>Users not found.</h1>
      )}
    </section>
  );
};

export default ViewUsers;
