import { Route, Routes } from "react-router-dom";
import FileBrowser from "./file-manager/FileBrowser";
import Breadcrumb from "@base/components/common/breadcrumbs/BreadCrumb";

const FileManagerPage = () => {
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
                  link: "/dosya-yoneticisi",
                  name: "Dosya Yöneticisi",
                },
              ]}
              color="red"
              style="solid"
            />
            <FileBrowser />
          </>
        }
      ></Route>
    </Routes>
  );
};

export default FileManagerPage;
