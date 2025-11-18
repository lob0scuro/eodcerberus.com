import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import styles from "./UserEODs.module.css";
import React, { useEffect, useState } from "react";
import { formatCurrency, formatDate } from "../../utils/Helpers";

const UserEODs = ({ setComponent, setTicket }) => {
  const [eods, setEods] = useState([]);
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  useEffect(() => {
    const fetchEODs = async () => {
      try {
        const response = await fetch(`/api/read/eods_by_user/${user.id}`);
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.message);
        }
        setEods(data.eods);
      } catch (error) {
        console.error("[ERROR]:", error);
        toast.error(error.message);
      }
    };
    fetchEODs();
  }, []);
  return (
    <section>
      <div className={styles.eodListBox}>
        {eods.length === 0 ? (
          <p className={styles.noEODs}>
            [ No EODs found for {user.first_name}. ]
          </p>
        ) : (
          <ul>
            {eods.map(
              ({
                id,
                ticket_number,
                date,
                sub_total,
                card,
                cash,
                checks,
                acima,
                tower_loan,
                extended_warranty,
                salesman,
              }) => (
                <li
                  key={id}
                  onClick={() => {
                    setTicket(ticket_number);
                    setComponent("read_eod");
                  }}
                >
                  <div>
                    <h3>{ticket_number}</h3>
                    <p className={styles.subTotal}>
                      Subtotal: {formatCurrency(sub_total)}
                    </p>
                    <p>{formatDate(date)}</p>
                    <small>
                      {salesman.first_name} {salesman.last_name[0]}.
                    </small>
                  </div>
                  <div>
                    <p>Card: {formatCurrency(card)}</p>
                    <p>Cash: {formatCurrency(cash)}</p>
                    <p>Checks: {formatCurrency(checks)}</p>
                    <p>Acima: {formatCurrency(acima)}</p>
                    <p>Tower Load: {formatCurrency(tower_loan)}</p>
                    <p>
                      Extended Warranty: {formatCurrency(extended_warranty)}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </section>
  );
};

export default UserEODs;
