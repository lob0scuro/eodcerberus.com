import styles from "./UserReports.module.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { formatLocationName } from "../../../utils/Helpers";
import toast from "react-hot-toast";
import DailyReport from "../../../components/DailyReport";

const UserReports = () => {
  const { user, location } = useAuth();
  const today = new Date().toISOString().split("T")[0];
  const [users, setUsers] = useState([]);
  const [params, setParams] = useState({
    start_date: today,
    end_date: today,
    user_id: user.id,
  });

  const [report, setReport] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams({
      ...params,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/read/get_users");
      const data = await response.json();
      if (!data.success) {
        toast.error(data.message);
      }
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const setToday = () => {
    setParams({
      ...params,
      start_date: today,
      end_date: today,
    });
  };

  useEffect(() => {
    const handleSubmit = async () => {
      try {
        const url =
          params.start_date === params.end_date
            ? `/api/read/run_report/${params.user_id}/${params.end_date}`
            : `/api/read/run_report_by_date_range/${params.user_id}?start_date=${params.start_date}&end_date=${params.end_date}`;

        const response = await fetch(url);
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message || "Something went wrong.");
        }
        setReport(data.totals);
      } catch (error) {
        console.log("[ERROR]: ", error);
      }
    };
    handleSubmit();
  }, [params]);

  return (
    <div className={styles.userReportsBlock}>
      <div className={styles.userReportsControlBar}>
        <div>
          <label
            htmlFor="user_id"
            style={{ fontSize: "14px", marginLeft: "4px" }}
          >
            User
          </label>
          <select
            name="user_id"
            id="user_id"
            value={params.user_id}
            onChange={handleChange}
          >
            <option value="">--Select User--</option>
            {users.map(({ id, first_name, last_name }) => (
              <option value={id} key={id}>
                {first_name} {last_name}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.runToday} onClick={setToday}>
          Run Todays Report
        </button>
        <div className={styles.dateBlock}>
          <div>
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              name="start_date"
              value={params.start_date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="end_date">End Date</label>
            <input
              type="date"
              name="end_date"
              value={params.end_date}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className={styles.eodListBox}>
        {report ? (
          <DailyReport report={report} />
        ) : (
          <h3>Choose to run report</h3>
        )}
      </div>
    </div>
  );
};

export default UserReports;
