import { Route, Routes } from "react-router";
import ContractList from "./list-blog/ContractList";
import AddContract from "./add-contract/AddContract";
import EditContract from "./edit-contract/EditContract";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const ContractsPage = () => {
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
                  link: "/icerikler/sozlesmeler",
                  name: "Sözleşmeler",
                },
              ]}
              color="red"
              style="solid"
            />
            <ContractList />
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
                  link: "/icerikler/sozlesmeler",
                  name: "Sözleşmeler",
                },
                {
                  link: "/icerikler/sozlesmeler/ekle",
                  name: "Sözleşme Ekle",
                },
              ]}
              color="red"
              style="solid"
            />
            <AddContract />
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
                  link: "/icerikler/sozlesmeler",
                  name: "Sözleşmeler",
                },
                {
                  disabled: true,
                  link: "/icerikler/sozlesmeler/duzenle/:id",
                  name: "Sözleşme Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditContract />
          </>
        }
      />
    </Routes>
  );
};

export default ContractsPage;
