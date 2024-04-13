import { Route, Routes } from "react-router";
import NotificationList from "./notification-list/NotificationList";


const SettingsPage = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <>
                        <NotificationList />
                    </>
                }
            />
        </Routes>
    );
};

export default SettingsPage;
