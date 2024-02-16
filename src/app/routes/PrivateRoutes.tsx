import { WithChildren } from "@base/helpers/components/WithChildren";
import TopBarProgress from "react-topbar-progress-indicator";
import React, { FC, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import DashboardPage from "@app/modules/dashboard/DashboardPage";

const PrivateRoutes = () => {
    // These components are lazy-loaded, meaning that they will be loaded on demand
    const AccountsPage = React.lazy(() => import("@app/modules/accounts/AccountsPage"));
    return (
        <Routes>
            <Route path="auth/*" element={<Navigate to="/dashboard" />} />
            <Route
                path="dashboard/*"
                element={
                    <SuspensedView>
                        <DashboardPage />
                    </SuspensedView>
                }
            />
            <Route
                path="account/*"
                element={
                    <SuspensedView>
                        <AccountsPage />
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
            "0": "#24292F",
        },
        barThickness: 1,
        shadowBlur: 5,
        shadowColor: "#24292F",
    });
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
