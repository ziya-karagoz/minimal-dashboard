import { Route, Routes } from "react-router";
import Dashboard from "./dashboard/Dashboard";
import Components from "./dashboard/Components";

const DashboardPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Dashboard />
          </>
        }
      ></Route>
      <Route
        path="components"
        element={
          <>
            <Components />
          </>
        }
      ></Route>
    </Routes>
  );
};

export default DashboardPage;
