import React, { useState } from "react";
import "../filters/filters.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Filters = () => {
  const [dateFlag, setDateFlag] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDropdown, setSelectedDropdown] = useState("Last Day");
  // const BASE_URL = 'http://localhost:3000/';
  const BASE_URL = 'https://yummies-be.onrender.com/';

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
          console.log(res.data,'this is the response data');
        });
    } catch (err) {
      console.log(err);
    }
    setDateFlag(false);
    setSelectedDropdown('lastDay');
  };

  const handleCancelDate = () => {
    setDateFlag(false);
    setSelectedDropdown('lastDay');
  };

  return (
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
  );
};

export default Filters;
