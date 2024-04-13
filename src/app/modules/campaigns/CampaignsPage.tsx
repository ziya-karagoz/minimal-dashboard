import { Route, Routes } from "react-router";
import CampaignList from "./campaign-list/CampaignList.tsx";
import AddCampaign from "./add-campaign/AddCampaign.tsx";
import EditCampaign from "./edit-campaign/EditCampaign.tsx";
import Breadcrumb from "@base/components/common/breadcrumbs/BreadCrumb.tsx";

const CampaignsPage = () => {
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
                  link: "/kampanyalar",
                  name: "Kampanyalar",
                },

              ]}
              color="red"
              style="solid"
            />
            <CampaignList />
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
                  link: "/kampanyalar",
                  name: "Kampanyalar",
                },
                {
                  link: "/kampanyalar/ekle",
                  name: "Kampanya Ekle",
                },

              ]}
              color="red"
              style="solid"
            />
            <AddCampaign />
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
                  link: "/kampanyalar",
                  name: "Kampanyalar",
                },
                {
                  disabled: true,
                  link: "/kampanyalar/duzenle/:id",
                  name: "Kampanya Düzenle",
                },

              ]}
              color="red"
              style="solid"
            />
            <EditCampaign />
          </>
        }
      />
    </Routes>
  );
};

export default CampaignsPage;
