import { createContext, useState } from "react";
import { getAllClasses } from "../utility/fetchClasses";

// Create UnitContext
export const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [allClassesForEnrolledUnits, setAllClassesForEnrolledUnits] = useState([]);
  // in the form { unitcode: [class_id], ... }
  const [semesterEnrolment, setSemesterEnrolment] = useState({});

  async function getAllClassesForEnrolledUnits() {
    try {
      // all classes for units that the student is currently enrolled in
      const allClassesForEnrolledUnits = await getAllClasses(10000000, 2025, 1);
      setAllClassesForEnrolledUnits(allClassesForEnrolledUnits);
    } catch (err) {
      console.log("error");
    }
  }

  return (
    <UnitContext.Provider value={{ allClassesForEnrolledUnits, getAllClassesForEnrolledUnits, semesterEnrolment, setSemesterEnrolment }}>
      {children}
    </UnitContext.Provider>
  );
};
