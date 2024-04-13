import { Route, Routes } from "react-router";
import BanksPage from "./banks/BanksPage";
import SectorsPage from "./sectors/SectorsPage";
import UnitsPage from "./units/UnitsPage";
import StepsPage from "./steps/StepsPage";

const PredefinitionsPage = () => {
  return (
    <Routes>
      <Route
        path="/bankalar/*"
        element={
          <>
            <BanksPage />
          </>
        }
      />
      <Route
        path="/sektorler/*"
        element={
          <>
            <SectorsPage />
          </>
        }
      />
      <Route
        path="/birimler/*"
        element={
          <>
            <UnitsPage />
          </>
        }
      />
      <Route
        path="/adimlar/*"
        element={
          <>
            <StepsPage />
          </>
        }
      />
    </Routes>
  );
};

export default PredefinitionsPage;
