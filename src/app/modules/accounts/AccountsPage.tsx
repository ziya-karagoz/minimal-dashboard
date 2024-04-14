import { Route, Routes } from "react-router";
import AccountList from "./account-list/AccountList";

const AccountsPage = () => {
    return (
        <Routes>
            <Route
                path="liste"
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
