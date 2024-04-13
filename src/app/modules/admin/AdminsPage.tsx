import { Route, Routes } from "react-router";
import AdminList from "./admin-list/AdminList";
import AddAdmin from "./add-admin/AddAdmin";
import EditAdmin from "./edit-admin/EditAdmin";
import AdminSettings from "./admin-settings/AdminSettings";
import Breadcrumb from "@base/components/common/breadcrumbs/BreadCrumb";

const AdminsPage = () => {
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
                  link: "/yoneticiler",
                  name: "Yöneticiler",
                },
              ]}
              color="red"
              style="solid"
            />
            <AdminList />
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
                  link: "/yoneticiler",
                  name: "Yöneticiler",
                },
                {
                  link: "/yoneticiler/ekle",
                  name: "Yönetici Ekle",
                },
              ]}
              color="red"
              style="solid"
            />
            <AddAdmin />
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
                  link: "/yoneticiler",
                  name: "Yöneticiler",
                },
                {
                  disabled: true,
                  link: "/yoneticiler/duzenle/:id",
                  name: "Yönetici Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditAdmin />
          </>
        }
      />
      <Route
        path="/yetki/:id"
        element={
          <>
            <Breadcrumb
              items={[
                {
                  link: "/",
                  name: "Anasayfa",
                },
                {
                  link: "/yoneticiler",
                  name: "Yöneticiler",
                },
                {
                  disabled: true,
                  link: "/yoneticiler/yetki/:id",
                  name: "Yönetici Yetkileri",
                },
              ]}
              color="red"
              style="solid"
            />
            <AdminSettings />
          </>
        }
      />
    </Routes>
  );
};

export default AdminsPage;
