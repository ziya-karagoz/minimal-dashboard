import { Route, Routes } from "react-router";
import FaqCategoryList from "./list-faq-category/FaqCategoryList";
import AddFaqCategory from "./add-faq-category/AddFaqCategory";
import EditFaqCategory from "./edit-faq-category/EditFaqCategory";
import Breadcrumb from "@base/components/common/breadcrumbs/BreadCrumb";

const FaqCategoriesPage = () => {
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
                  link: "/icerikler/soru-kategorileri",
                  name: "SSS Kategorileri",
                },

              ]}
              color="red"
              style="solid"
            />
            <FaqCategoryList />
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
                  link: "/icerikler/soru-kategorileri",
                  name: "SSS Kategorileri",
                },
                {
                  link: "/icerikler/soru-kategorileri/ekle",
                  name: "Soru Kategorisi Ekle",
                },
              ]}
              color="red"
              style="solid"
            />
            <AddFaqCategory />
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
                  link: "/icerikler/soru-kategorileri",
                  name: "SSS Kategorileri",
                },
                {
                  disabled: true,
                  link: "/icerikler/soru-kategorileri/duzenle/:id",
                  name: "Soru Kategorisi Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditFaqCategory />
          </>
        }
      />
    </Routes>
  );
};

export default FaqCategoriesPage;
