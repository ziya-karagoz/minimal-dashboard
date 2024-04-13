import Button from "@base/components/common/buttons/Button";
import ClearFilterButton from "@base/components/common/dynamic-table/components/ClearFilterButton";
import { ERole } from "@base/enums/role.enum";
import { hasPermission } from "@base/helpers/permissions/permission.helper";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const FaqListActions = () => {
  return (
    <>
      <ClearFilterButton />
      {hasPermission(ERole.ArticleCreate) ? (
        <div className="list-head-item">
          <Link to="/icerikler/sorular/ekle">
            <Button color="red" icon={<Icon icon="tabler:plus" />}>
              Yeni Oluştur
            </Button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default FaqListActions;
