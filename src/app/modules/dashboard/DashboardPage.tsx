import { Route, Routes } from "react-router";
import Dashboard from "./dashboard/Dashboard";
import Components from "./components/Components";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

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
            <Breadcrumb
              items={[
                {
                  link: "/",
                  name: "Anasayfa",
                },
                {
                  link: "/anasayfa/components",
                  name: "Geliştirici Araçları",
                },
              ]}
              color="red"
              style="solid"
            />
            <Components />
          </>
        }
      ></Route>
    </Routes>
  );
};

export default DashboardPage;
