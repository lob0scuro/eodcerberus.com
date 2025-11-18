import styles from "./AddEOD.module.css";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddEOD = () => {
  const [formData, setFormData] = useState({
    ticket_number: "",
    units: "",
    new: "",
    used: "",
    extended_warranty: "",
    diagnostic_fees: "",
    in_shop_repairs: "",
    ebay_sales: "",
    service: "",
    parts: "",
    delivery: "",
    cash_deposits: "",
    misc_deductions: "",
    refunds: "",
    ebay_returns: "",
    card: "",
    cash: "",
    check: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirm("Submit Values?")) return;

    try {
      const response = await fetch("/api/create/submit_eod", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message);
      }
      toast.success(data.message);
      if (confirm("Submit another ticket?")) {
        setFormData({
          ticket_number: "",
          units: "",
          new: "",
          used: "",
          extended_warranty: "",
          diagnostic_fees: "",
          in_shop_repairs: "",
          ebay_sales: "",
          service: "",
          parts: "",
          delivery: "",
          cash_deposits: "",
          misc_deductions: "",
          refunds: "",
          ebay_returns: "",
          card: "",
          cash: "",
          check: "",
        });
        return;
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("[ERROR]: ", error);
      toast.error(error.message);
    }
  };
  return (
    <section>
      <h2>Add EOD</h2>
    </section>
  );
};

export default AddEOD;
