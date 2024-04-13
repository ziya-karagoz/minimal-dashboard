import { Route, Routes } from "react-router";
import DynamicComponentList from "./list-dynamic-component/DynamicComponentList";
import EditDynamicComponent from "./edit-dynamic-component/EditDynamicComponent";
import Breadcrumb from "@base/components/common/breadcrumbs/BreadCrumb";

const DynamicComponentsPage = () => {
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
                  link: "/icerikler/bilesenler",
                  name: "Bileşenler",
                },

              ]}
              color="red"
              style="solid"
            />
            <DynamicComponentList />
          </>
        }
      />
      <Route
        path="/duzenle/:id"
        element={
          <>
            <Breadcrumb
              items={[
                {
                  link: "/",
                  name: "Anasayfa",
                },
                {
                  link: "/icerikler/bilesenler",
                  name: "Bileşenler",
                },
                {
                  disabled: true,
                  link: "/icerikler/bilesenler/duzenle/:id",
                  name: "Bileşen Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditDynamicComponent />
          </>
        }
      />
    </Routes>
  );
};

export default DynamicComponentsPage;
