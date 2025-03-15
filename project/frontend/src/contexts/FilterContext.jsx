import { createContext, useContext, useState } from "react";

// Create FilterContext
export const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [hours, setHours] = useState(4);

  return (
    <FilterContext.Provider value={{ hours, setHours }}>
      {children}
    </FilterContext.Provider>
  );
};
