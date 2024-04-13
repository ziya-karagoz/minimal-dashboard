import { Route, Routes } from "react-router";
import FaqList from "./list-faq/FaqList";
import AddFaq from "./add-faq/AddFaq";
import EditFaq from "./edit-faq/EditFaq";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const FaqsPage = () => {
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
                  link: "/icerikler/sorular",
                  name: "SSS",
                },

              ]}
              color="red"
              style="solid"
            />
            <FaqList />
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
                  link: "/icerikler/sorular",
                  name: "SSS",
                },
                {
                  link: "/icerikler/sorular/ekle",
                  name: "Soru Ekle",
                },
              ]}
              color="red"
              style="solid"
            />
            <AddFaq />
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
                  link: "/icerikler/sorular",
                  name: "SSS",
                },
                {
                  disabled: true,
                  link: "/icerikler/sorular/duzenle/:id",
                  name: "Soru Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditFaq />
          </>
        }
      />
    </Routes>
  );
};

export default FaqsPage;
