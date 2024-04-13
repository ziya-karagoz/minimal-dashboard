import { Route, Routes } from "react-router";
import LogList from "./log-list/LogList";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const LogsPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Breadcrumb
              items={[
                {
                  link: "/",
                  name: "Anasayfa",
                },
                {
                  link: "/loglar",
                  name: "Log Kayıtları",
                },

              ]}
              color="red"
              style="solid"
            />
            <LogList />
          </>
        }
      />
    </Routes>
  );
};

export default LogsPage;
