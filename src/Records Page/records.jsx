import React, { useState } from "react";
import Filters from "../Records Page/filters/filters.jsx";
import "../Records Page/records.css";
import RecordData from "./record data/recordData.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import BackIcon from "../Assests/angle-circle-arrow-left-icon.svg";

const Records = () => {
  const [dateFlag, setDateFlag] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const [recordData, setRecordData] = useState([]);
  const [recordClickFlag, setRecordClickFlag] = useState(false);
  const [clickedRecord, setClickedRecord] = useState([]);
  const [clickedItemList, setClickedItemList] = useState("");
  // const BASE_URL = "http://localhost:3000/";
  const BASE_URL = "https://yummies-be.onrender.com/";

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

  const handleSelect = (selected) => {
    if (selected === "customize") {
      setDateFlag(true);
    }
    setSelectedDropdown(selected);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submitFilter = {
      filter: selectedDropdown,
      startDate: startDate,
      endDate: endDate,
    };
    try {
      await axios
        .post(BASE_URL + "setRecordFilter", submitFilter)
        .then((res) => {
          setRecordData(res.data);
        });
    } catch (err) {
      console.log(err);
    }
    setDateFlag(false);
    setSelectedDropdown("lastDay");
    setStartDate(null);
    setEndDate(null);
  };

  const handleCancelDate = () => {
    setDateFlag(false);
    setSelectedDropdown("");
  };

  const handleRecordClick = (clickedData) => {
    setRecordClickFlag(true);
    setClickedRecord(clickedData);
    setClickedItemList(JSON.parse(clickedData.itemName[0]));
  };

  const calculateTotalValue = (menuArray) => {
    let total = 0;
    menuArray.forEach((Item) => {
      total += parseInt(Item.menuPrice);
    });
    return total;
  };
  const handleBackIconClick = (e) => {
    window.location.href = "/HomePage";
  };


  return (
    <div className="recordsPage">
      <img
        src={BackIcon}
        alt=""
        className="BackIcon"
        onClick={handleBackIconClick}
      />
      <div className="records-header">
        <h1>Yummies Records</h1>
      </div>
      <div className="records-filters">
        <>
          <div className="filters">
            <select
              value={selectedDropdown}
              onChange={(e) => handleSelect(e.target.value)}
            >
              <option value="lastDay">Last Day</option>
              <option value="lastWeek">Last Week</option>
              <option value="lastMonth">Last Month</option>
              <option value="customize">Customize</option>
            </select>

            {dateFlag ? (
              <div className="custom-datepick">
                <div>
                  <label>Start Date: </label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Select start date"
                  />
                </div>
                <div>
                  <label>End Date: </label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="Select end date"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleCancelDate}>Cancel</button>
          </div>
        </>
      </div>
      <div className="records-display">
        {recordData.map((Data) => (
          <div onClick={() => handleRecordClick(Data)}>
            <RecordData Data={Data}></RecordData>
          </div>
        ))}
      </div>
      {recordClickFlag ? (
        <div
          className="singleRecordDataOverlay"
          onClick={() => setRecordClickFlag(false)}
        ></div>
      ) : (
        ""
      )}
      {recordClickFlag ? (
        <div className="singleRecordData">
          <div className="customerDetails">
            <div className="customerName">{clickedRecord.customer.CName}</div>
            <div className="customerNumber">
              {clickedRecord.customer.CNumber}
            </div>
          </div>
          <div className="itemValue">
            <div className="itemTotalValue">
              {calculateTotalValue(clickedItemList)}
            </div>
            <div className="itemCreatedDate">
              {formatDate(clickedRecord.createdDate)}
            </div>
          </div>
          <div className="itemList">
            {clickedItemList.map((Item) => (
              <div className="singleItemList">
                <div className="itemName">{Item.menuName}</div>
                <div className="itemPrice">{Item.menuPrice}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Records;
