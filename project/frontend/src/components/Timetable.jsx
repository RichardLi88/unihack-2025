import React, { useState, useEffect } from "react";
import "../css/Timetable.css"; 

// Function to get the dates for the current week
const getCurrentWeekDates = (startDate) => {
  const dates = [];
  for (let i = 0; i < 5; i++) { // Only Monday to Friday
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0"); // Pad day with zero
  const month = date.getMonth() + 1; 
  return `${day}/${month}`;
};

const hours = Array.from({ length: 14 }, (_, i) => 8 + i); // 8AM to 9PM

const Timetable = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date()); // Start of the current week (Monday)
  const [days, setDays] = useState([]); // Dynamically generated days array
  const [clickedCells, setClickedCells] = useState({}); // State to track clicked cells
  const [isDragging, setIsDragging] = useState(false); // State to track if mouse is being dragged

  // Update the days array whenever the current week changes
  useEffect(() => {
    const startOfWeek = new Date(currentWeekStart);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); // Set to Monday of the current week
    const weekDates = getCurrentWeekDates(startOfWeek);
    const updatedDays = weekDates.map((date, index) => ({
      name: ["MON", "TUE", "WED", "THU", "FRI"][index],
      date: formatDate(date),
    }));
    setDays(updatedDays);
  }, [currentWeekStart]);

  // Function to handle cell clicks
  const handleCellClick = (day, hour) => {
    const cellKey = `${day.name}-${hour}`;
    setClickedCells((prev) => ({
      ...prev,
      [cellKey]: !prev[cellKey],
    }));
  };

  // Function to handle mouse down event
  const handleMouseDown = (day, hour) => {
    setIsDragging(true);
    handleCellClick(day, hour);
  };

  // Function to handle mouse over event
  const handleMouseOver = (day, hour) => {
    if (isDragging) {
      handleCellClick(day, hour);
    }
  };

  // Function to handle mouse up event
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Function to navigate to the previous week
  const goToPreviousWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(newStartDate.getDate() - 7);
    setCurrentWeekStart(newStartDate);
  };

  // Function to navigate to the next week
  const goToNextWeek = () => {
    const newStartDate = new Date(currentWeekStart);
    newStartDate.setDate(newStartDate.getDate() + 7);
    setCurrentWeekStart(newStartDate);
  };

  return (
    <div className="timetable-container">
      <div className="week-header">
        <p onClick={goToPreviousWeek}><svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg></p>
        <span>Week {formatDate(currentWeekStart)}</span>
        <p onClick={goToNextWeek}><svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg></p>
      </div>
      <table className="timetable">
        <thead>
          <tr>
            <th></th>
            {days.map((day) => (
              <th key={day.name}>
                {day.name} <br /> {day.date}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td>{hour <= 11 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}</td>
              {days.map((day) => {
                const cellKey = `${day.name}-${hour}`;
                const isClicked = clickedCells[cellKey];
                return (
                  <td
                    key={cellKey}
                    className={`empty-slot ${isClicked ? "clicked" : ""}`}
                    onMouseDown={() => handleMouseDown(day, hour)}
                    onMouseOver={() => handleMouseOver(day, hour)}
                    onMouseUp={handleMouseUp}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;