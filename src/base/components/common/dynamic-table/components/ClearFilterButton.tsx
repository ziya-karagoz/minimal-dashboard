import React from "react";
import { Icon } from "@iconify/react";
import { Tooltip } from "react-tooltip";
import { useLocation, useNavigate } from "react-router-dom";
const ClearFilterButton = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleFilterClear = () => {
    navigate(pathname);
  };
  return (
    <React.Fragment>
      <Tooltip id="tooltip-update-v" place="top" content="Filtreleri Temizle" />
      <span
        data-tooltip-id="tooltip-update-v"
        className="btn btn-icon btn-sm btn-soft-primary mr-1"
        onClick={handleFilterClear}
      >
        <Icon icon="tabler:filter-x" />
      </span>
    </React.Fragment>
  );
};

export default ClearFilterButton;
