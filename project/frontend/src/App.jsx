import "@mantine/core/styles.css";
import Help from "./pages/Help";
import Login from "./pages/Login";
import Planner from "./pages/Planner";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { PageProvider } from "./contexts/PageContext";
import { FilterProvider } from "./contexts/FilterContext";
function App() {
  return (
    <>
      <PageProvider>
        <Navbar />
        <FilterProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/help" element={<Help />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/planner" element={<Planner />} />
          </Routes>
        </FilterProvider>
      </PageProvider>
    </>
  );
}

export default App;
