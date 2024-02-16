import { Navigate, Route, Routes } from "react-router";
import AccountList from "./account-list/AccountList";

const AccountsPage = () => {
    return (
        <Routes>
            <Route
                path="list"
                element={
                    <>
                        <AccountList />
                    </>
                }
            ></Route>
            <Route path="test" element={<>asdasd</>}></Route>
        </Routes>
    );
};

export default AccountsPage;
