import { Route, Routes } from "react-router";
import CustomerList from "./customer-list/CustomerList";
import AddCustomer from "./add-customer/AddCustomer";
import EditCustomer from "./edit-customer/EditCustomer";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const CustomersPage = () => {
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
                  link: "/musteriler",
                  name: "Müşteriler",
                },
              ]}
              color="red"
              style="solid"
            />
            <CustomerList />
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
                  link: "/musteriler",
                  name: "Müşteriler",
                },
                {
                  link: "/musteriler/ekle",
                  name: "Müşteri Ekle",
                },
              ]}
              color="red"
              style="solid"
            />
            <AddCustomer />
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
                  link: "/musteriler",
                  name: "Müşteriler",
                },
                {
                  disabled: true,
                  link: "/musteriler/duzenle/:id",
                  name: "Müşteri Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditCustomer />
          </>
        }
      />
    </Routes>
  );
};

export default CustomersPage;
