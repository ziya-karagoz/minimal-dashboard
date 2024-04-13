import { Route, Routes } from "react-router";
import BlogCategoryList from "./blog-category-list/BlogCategoryList.tsx";
import AddBlogCategory from "./add-blog-category/AddBlogCategory.tsx";
import EditBlogCategory from "./edit-blog-category/EditBlogCategory.tsx";
import Breadcrumb from "@base/components/common/breadcrumbs/BreadCrumb.tsx";

const BlogCategoriesPage = () => {
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
                  link: "/icerikler/blog-kategorileri",
                  name: "Blog Kategorileri",
                },

              ]}
              color="red"
              style="solid"
            />
            <BlogCategoryList />
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
                  link: "/icerikler/blog-kategorileri",
                  name: "Blog Kategorileri",
                },
                {
                  link: "/icerikler/blog-kategorileri/ekle",
                  name: "Blog Kategorisi Ekle",
                },
              ]}
              color="red"
              style="solid"
            />
            <AddBlogCategory />
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
                  link: "/icerikler/blog-kategorileri",
                  name: "Blog Kategorileri",
                },
                {
                  disabled: true,
                  link: "/icerikler/blog-kategorileri/duzenle/:id",
                  name: "Blog Kategorisi Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditBlogCategory />
          </>
        }
      />
    </Routes>
  );
};

export default BlogCategoriesPage;
