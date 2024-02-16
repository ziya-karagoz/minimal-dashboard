import { FC, Suspense, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { PrivateRoutes } from "./PrivateRoutes";
import App from "../../App";
import PermissionWrapper from "@base/helpers/permissions/PermissionWrapper";
import { WithChildren } from "@base/helpers/components/WithChildren";
import { AuthPage, Logout, useAuth } from "@app/modules/auth";

function AppRoutes() {
    const { currentUser } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<App />}>
                    <Route path="error/*" element={<div>Error Page</div>} />
                    <Route path="logout" element={<Logout />} />
                    {currentUser ? (
                        <>
                            <Route
                                path="/*"
                                element={
                                    <PermissionWrapper>
                                        <PrivateRoutes />
                                    </PermissionWrapper>
                                }
                            />
                            <Route index element={<Navigate to="/dashboard" />} />
                        </>
                    ) : (
                        <>
                            <Route path="auth/*" element={<AuthPage />} />
                            <Route path="*" element={<Navigate to="/auth" />} />
                        </>
                    )}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const SuspensedView: FC<WithChildren> = ({ children }) => {
    TopBarProgress.config({
        barColors: {
            "0": "#fff",
        },
        barThickness: 1,
        shadowBlur: 5,
    });
    return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export default AppRoutes;
