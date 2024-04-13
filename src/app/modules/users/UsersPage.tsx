import { Route, Routes } from "react-router";
import UserList from "./user-list/UserList";
import AddUser from "./add-user/AddUser";
import EditUser from "./edit-user/EditUser";
import UserSettings from "./user-settings/UserSettings";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const UsersPage = () => {
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
                  link: "/kullanicilar",
                  name: "Üyeler",
                },
              ]}
              color="red"
              style="solid"
            />
            <UserList />
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
                  link: "/kullanicilar",
                  name: "Üyeler",
                },
                {
                  link: "/kullanicilar/ekle",
                  name: "Üye Ekle",
                },
              ]}
              color="red"
              style="solid"
            />
            <AddUser />
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
                  link: "/kullanicilar",
                  name: "Üyeler",
                },
                {
                  disabled: true,
                  link: "/kullanicilar/duzenle/:id",
                  name: "Üye Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditUser />
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
                  link: "/kullanicilar",
                  name: "Üyeler",
                },
                {
                  disabled: true,
                  link: "/kullanicilar/yetki/:id",
                  name: "Üye Yetkileri",
                },
              ]}
              color="red"
              style="solid"
            />
            <UserSettings />
          </>
        }
      />
    </Routes>
  );
};

export default UsersPage;
