import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import { ERole } from "../../enums/role.enum";
import { Route, Routes } from "react-router-dom";
import { getRoleForCurrentPath } from "./permission.helper";
import { useCurrentPath } from "@base/hooks/route/useCurrentPath";
import { Logout, useAuth } from "@app/modules/auth";
const AUTH_LOCAL_STORAGE_KEY =
    import.meta.env.VITE_AUTH_LOCAL_STORAGE_KEY || "accessToken";
type Props = {
    children: React.ReactNode;
};
export default function PermissionWrapper({ children }: Props) {
    const currentPath = useCurrentPath();
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <Routes>
                <Route path="*" element={<Logout />} />
            </Routes>
        );
    }

    const token = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY) ?? sessionStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
    if (!token) {
        return (
            <Routes>
                <Route path="*" element={<Navigate to="auth/login" />} />
            </Routes>
        );
    }
    const jwtdecode = jwtDecode(token);
    const roleForCurrentPath = getRoleForCurrentPath(currentPath);

    //@ts-ignore
    if (!jwtdecode?.user?.roles) {
        return (
            <Routes>
                <Route path="*" element={<Navigate to="auth/login" />} />
            </Routes>
        );
    } else if (
        //@ts-ignore
        jwtdecode?.user?.roles?.includes(roleForCurrentPath) ||
        roleForCurrentPath === ERole.Public
    ) {
        return children;
    }

    return <div>Permission Denied</div>;
}
