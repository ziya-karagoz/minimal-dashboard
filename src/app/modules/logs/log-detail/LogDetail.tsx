import React, { useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { fetchLogDetail } from "../core/api/log.request";
import OffCanvas from "@base/components/common/OffCanvas/OffCanvas";
import { ILogDetailResponse } from "../core/models/log.interface";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
type logDetailProps = {
  select: number;
  show: boolean;
  handleClose: () => void;
};

const LogDetail = ({ select, show, handleClose }: logDetailProps) => {
  const [jsonStack, setJsonStack] = useState({});
  const [getLog, setGetLog] = useState<ILogDetailResponse | undefined>();
  const [fetchStatus, setFetchStatus] = React.useState<FetchStatus>(
    FetchStatus.IDLE
  );
  useEffect(() => {
    setFetchStatus(FetchStatus.LOADING);
    if (select) {
      fetchLogDetail(select)
        .then((res) => {
          setGetLog(res);
          setJsonStack(JSON.parse(res.stack));
          setFetchStatus(FetchStatus.SUCCEEDED);
        })
        .catch(() => {
          setFetchStatus(FetchStatus.FAILED);
        });
    }
  }, [select]);
  if (fetchStatus === FetchStatus.IDLE)
    return <Loader isComponent />;

  return (
    <>
      {fetchStatus === FetchStatus.SUCCEEDED && (
        <OffCanvas
          show={show}
          onHide={handleClose}
          placement={"end"}
          Title={getLog?.title}
        >
          {jsonStack && <ReactJson src={jsonStack} />}
        </OffCanvas>
      )}
    </>
  );
};

export default LogDetail;
