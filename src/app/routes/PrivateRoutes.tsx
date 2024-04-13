import { WithChildren } from "@base/helpers/components/WithChildren";
import TopBarProgress from "react-topbar-progress-indicator";
import React, { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CampaignsPage from "@app/modules/campaigns/CampaignsPage";

const PrivateRoutes = () => {
  // These components are lazy-loaded, meaning that they will be loaded on demand
  const DashboardPage = React.lazy(
    () => import("@app/modules/dashboard/DashboardPage")
  );
  const NotificationsPage = React.lazy(
    () => import("@app/modules/notification/NotificationsPage")
  );

  const ContactPage = React.lazy(
    () => import("@app/modules/contact/ContactPage")
  );
  const UsersPage = React.lazy(() => import("@app/modules/users/UsersPage"));
  const AdminsPage = React.lazy(() => import("@app/modules/admin/AdminsPage"));
  const CustomersPage = React.lazy(
    () => import("@app/modules/customer/CustomersPage")
  );
  const PredefinitionsPage = React.lazy(
    () => import("@app/modules/predefinitions/PredefinitionsPage")
  );
  const VariablesPage = React.lazy(
    () => import("@app/modules/variable/VariablesPage")
  );
  const SettingsPage = React.lazy(
    () => import("@app/modules/settings/SettingsPage")
  );
  const BusinessLinesPage = React.lazy(
    () => import("@app/modules/business-line/BusinessLinesPage")
  );
  const ServiceGroupsPage = React.lazy(
    () => import("@app/modules/service-group/ServiceGroupsPage")
  );

  const ServicesPage = React.lazy(
    () => import("@app/modules/service/ServicesPage")
  );

  const FileManagerPage = React.lazy(
    () => import("@app/modules/file-manager/FileManagerPage")
  );
  const LogsPage = React.lazy(() => import("@app/modules/logs/LogsPage"));

  const ContentsPage = React.lazy(
    () => import("@app/modules/contents/ContentsPage")
  );

  return (
    <Routes>
      <Route path="auth/*" element={<Navigate to="/" />} />
      <Route
        path="anasayfa/*"
        element={
          <SuspensedView>
            <DashboardPage />
          </SuspensedView>
        }
      />
      <Route
        path="bildirimler/*"
        element={
          <SuspensedView>
            <NotificationsPage />
          </SuspensedView>
        }
      />
      <Route
        path="istekler/*"
        element={
          <SuspensedView>
            <ContactPage />
          </SuspensedView>
        }
      />
      <Route
        path="kullanicilar/*"
        element={
          <SuspensedView>
            <UsersPage />
          </SuspensedView>
        }
      />
      <Route
        path="yoneticiler/*"
        element={
          <SuspensedView>
            <AdminsPage />
          </SuspensedView>
        }
      />
      <Route
        path="musteriler/*"
        element={
          <SuspensedView>
            <CustomersPage />
          </SuspensedView>
        }
      />
      <Route
        path="on-tanimlamalar/*"
        element={
          <SuspensedView>
            <PredefinitionsPage />
          </SuspensedView>
        }
      />
      <Route
        path="degiskenler/*"
        element={
          <SuspensedView>
            <VariablesPage />
          </SuspensedView>
        }
      />
      <Route
        path="is-kollari/*"
        element={
          <SuspensedView>
            <BusinessLinesPage />
          </SuspensedView>
        }
      />
      <Route
        path="hizmet-gruplari/*"
        element={
          <SuspensedView>
            <ServiceGroupsPage />
          </SuspensedView>
        }
      />
      <Route
        path="hizmetler/*"
        element={
          <SuspensedView>
            <ServicesPage />
          </SuspensedView>
        }
      />
      <Route
        path="dosya-yoneticisi/*"
        element={
          <SuspensedView>
            <FileManagerPage />
          </SuspensedView>
        }
      />
      <Route
        path="ayarlar/*"
        element={
          <SuspensedView>
            <SettingsPage />
          </SuspensedView>
        }
      />
      <Route
        path="loglar/*"
        element={
          <SuspensedView>
            <LogsPage />
          </SuspensedView>
        }
      />
      <Route
        path="icerikler/*"
        element={
          <SuspensedView>
            <ContentsPage />
          </SuspensedView>
        }
      />
      <Route
        path="kampanyalar/*"
        element={
          <SuspensedView>
            <CampaignsPage />
          </SuspensedView>
        }
      />
      {/* Page Not Found */}
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  TopBarProgress.config({
    barColors: {
      "0": "#e6210f",
    },
    barThickness: 2,
    shadowBlur: 5,
    shadowColor: "#e6210f",
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
