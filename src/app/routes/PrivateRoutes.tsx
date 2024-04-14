import { WithChildren } from "@base/helpers/components/WithChildren";
import TopBarProgress from "react-topbar-progress-indicator";
import React, { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // These components are lazy-loaded, meaning that they will be loaded on demand
  const DashboardPage = React.lazy(
    () => import("@app/modules/dashboard/DashboardPage")
  );
  const AccountsPage = React.lazy(
    () => import("@app/modules/accounts/AccountsPage")
  );
  const FileManagerPage = React.lazy(
    () => import("@app/modules/file-manager/FileManagerPage")
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
        path="hesaplar/*"
        element={
          <SuspensedView>
            <AccountsPage />
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
