import { Route, Routes } from "react-router";
import DynamicPageList from "./dynamic-page-list/DynamicPageList";
import AddDynamicPage from "./add-dynamic-page/AddDynamicPage";
import EditDynamicPage from "./edit-dynamic-page/EditDynamicPage";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const DynamicPagesPage = () => {
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
                  link: "/icerikler/sayfalar",
                  name: "Sayfalar",
                },
              ]}
              color="red"
              style="solid"
            />
            <DynamicPageList />
          </>
        }
      />
      <Route
        path="/ekle"
        element={
          <>
            <Breadcrumb
              items={[
                {
                  link: "/",
                  name: "Anasayfa",
                },
                {
                  link: "/icerikler/sayfalar",
                  name: "Sayfalar",
                },
                {
                  link: "/icerikler/sayfalar/ekle",
                  name: "Sayfa Ekle",
                },
              ]}
              color="red"
              style="solid"
            />
            <AddDynamicPage />
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
                  link: "/icerikler/sayfalar",
                  name: "Sayfalar",
                },
                {
                  disabled: true,
                  link: "/icerikler/sayfalar/duzenle/:id",
                  name: "Sayfa Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditDynamicPage />
          </>
        }
      />
    </Routes>
  );
};

export default DynamicPagesPage;
