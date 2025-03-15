import React, { useState } from "react";
import "../css/Timetable.css"; // Ensure your CSS is updated as well

const days = [
  { name: "Monday", date: "9/3" },
  { name: "Tuesday", date: "10/3" },
  { name: "Wednesday", date: "11/3" },
  { name: "Thursday", date: "12/3" },
  { name: "Friday", date: "13/3" },
];

const hours = Array.from({ length: 14 }, (_, i) => 8 + i); // 8 AM to 9 PM

const Timetable = () => {
  // State to track clicked cells
  const [clickedCells, setClickedCells] = useState({});

  // Function to handle cell clicks
  const handleCellClick = (day, hour) => {
    const cellKey = `${day.name}-${hour}`;
    setClickedCells((prev) => ({
      ...prev,
      [cellKey]: !prev[cellKey], 
    }));
  };

  return (
    
    <div className="timetable-container">
       <div className="week-header">← Week 1 →</div>
      <table className="timetable">
        <thead>
          <tr>
            <th></th>
            {days.map((day) => (
              <th key={day.name}>
                {day.name} {day.date}
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
                    onClick={() => handleCellClick(day, hour)}
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