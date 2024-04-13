import ClearFilterButton from "@base/components/common/dynamic-table/components/ClearFilterButton";
import { ERole } from "@base/enums/role.enum";
import { hasPermission } from "@base/helpers/permissions/permission.helper";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "@base/components/common/buttons/Button";

type Props = {
  handleExport: () => void;
};

const LogListActions = ({ handleExport }: Props) => {
  return (
    <>
      <ClearFilterButton />
      {hasPermission(ERole.LogView) ? (
        <Button
          color="red"
          onClick={handleExport}
          icon={<Icon icon="tio-import-export" />}
          outlined={false}
        >
          Aktar
        </Button>
      ) : (
        <></>
      )}
    </>
  );
};

export default LogListActions;
