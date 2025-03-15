import React from "react";
import "../css/Timetable.css"; // Add styles

const days = [
  { name: "Monday", date: "9/3" },
  { name: "Tuesday", date: "10/3" },
  { name: "Wednesday", date: "11/3" },
  { name: "Thursday", date: "12/3" },
  { name: "Friday", date: "13/3" },
];

const hours = Array.from({ length: 14 }, (_, i) => 8 + i); // 8 AM to 9 PM

const Timetable = () => {
  return (
    <div className="timetable-container">
      <table className="timetable">
        <thead>
          <tr>
            <th>← Week 1 →</th>
            {days.map((day) => (
              <th key={day.name}>{day.name} {day.date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td>{hour <= 11 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}</td>
              {days.map((day) => (
                <td key={`${day.name}-${hour}`} className="empty-slot"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;