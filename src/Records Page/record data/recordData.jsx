import React, { useEffect, useState } from "react";
import "../record data/recordData.css";

const RecordData = ({ Data }) => {
  const [totalValue, setTotalValue] = useState("");
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const calculateTotalValue = (menuArray) => {
    let total = 0;
    menuArray.forEach(itemString => {
      const items = JSON.parse(itemString);
      items.forEach(item => {
        total += parseFloat(item.menuPrice);
      });
    });
    return total;
  }

  // Data.itemName[0].map((item) =>
  //   setTotalValue(totalValue + parseInt(item.menuPrice))
  // );

  useEffect(() => {
    setTotalValue(calculateTotalValue(Data.itemName))
  });

  return (
    <div className="recordData">
      <div className="customerRecord">
        <div className="customerName">
          Name:- <span>{Data.customer.CName}</span>
        </div>
        <div className="customerCreatedDate">
          <span>Date:- </span>
          {formatDate(Data.createdDate)}
        </div>
      </div>
      <div className="itemRecord">
        <div className="customerName">
          Total:- <span>Rs.{totalValue}/-</span>
        </div>
        <div className="customerNumber"><span>Phone. </span>{Data.customer.CNumber}</div>
      </div>
    </div>
  );
};

export default RecordData;
