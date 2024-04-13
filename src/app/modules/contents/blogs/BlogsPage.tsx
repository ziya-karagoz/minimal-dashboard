import { Route, Routes } from "react-router";
import BlogList from "./list-blog/BlogList";
import AddBlog from "./add-blog/AddBlog";
import EditBlog from "./edit-blog/EditBlog";
import Breadcrumb from "@base/components/common/breadcrumbs/Breadcrumb";

const BlogsPage = () => {
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
                  link: "/icerikler/bloglar",
                  name: "Bloglar",
                },

              ]}
              color="red"
              style="solid"
            />
            <BlogList />
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
                  link: "/icerikler/bloglar",
                  name: "Bloglar",
                },
                {
                  link: "/icerikler/bloglar/ekle",
                  name: "Blog Ekle",
                },
              ]}
              color="red"
              style="solid"
            />
            <AddBlog />
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
                  link: "/icerikler/bloglar",
                  name: "Bloglar",
                },
                {
                  disabled: true,
                  link: "/icerikler/bloglar/duzenle/:id",
                  name: "Blog Düzenle",
                },
              ]}
              color="red"
              style="solid"
            />
            <EditBlog />
          </>
        }
      />
    </Routes>
  );
};

export default BlogsPage;
