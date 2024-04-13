import { Route, Routes } from "react-router";
import BlogCategoriesPage from "./blog-categories/BlogCategoriesPage";
import BlogsPage from "./blogs/BlogsPage";
import ContractsPage from "./contracts/ContractsPage";
import DynamicComponentsPage from "./dynamic-components/DynamicComponentsPage";
import DynamicPagesPage from "./dynamic-pages/DynamicPagesPage";
import FaqCategoriesPage from "./faq-categories/FaqCategoriesPage";
import FaqsPage from "./faq/FaqsPage";

const ContentsPage = () => {
  return (
    <Routes>
      <Route
        path="/blog-kategorileri/*"
        element={
          <>
            <BlogCategoriesPage />
          </>
        }
      />
      <Route
        path="/bloglar/*"
        element={
          <>
            <BlogsPage />
          </>
        }
      />
      <Route
        path="/sozlesmeler/*"
        element={
          <>
            <ContractsPage />
          </>
        }
      />
      <Route
        path="/bilesenler/*"
        element={
          <>
            <DynamicComponentsPage />
          </>
        }
      />
      <Route
        path="/sayfalar/*"
        element={
          <>
            <DynamicPagesPage />
          </>
        }
      />
      <Route
        path="/soru-kategorileri/*"
        element={
          <>
            <FaqCategoriesPage />
          </>
        }
      />
      <Route
        path="/sorular/*"
        element={
          <>
            <FaqsPage />
          </>
        }
      />
    </Routes>
  );
};

export default ContentsPage;
