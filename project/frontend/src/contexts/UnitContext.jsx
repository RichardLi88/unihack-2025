import { createContext, useState } from "react";

// Create UnitContext
export const UnitContext = createContext();

export const UnitProvider = ({ children }) => {
  const [units, setUnits] = useState([]);

  return (
    <UnitContext.Provider value={{ units, setUnits }}>
      {children}
    </UnitContext.Provider>
  );
};
