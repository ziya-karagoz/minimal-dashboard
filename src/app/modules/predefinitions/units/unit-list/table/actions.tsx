import Button from "@base/components/common/buttons/Button";
import ClearFilterButton from "@base/components/common/dynamic-table/components/ClearFilterButton";
import { ERole } from "@base/enums/role.enum";
import { hasPermission } from "@base/helpers/permissions/permission.helper";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

type Props = {
};

const UnitListActions = ({
}: Props) => {

    return (
        <>
            <ClearFilterButton />

            {hasPermission(ERole.UnitCreate) ? (
                <div className="list-head-item">
                    <Link to="/on-tanimlamalar/birimler/ekle" >
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

export default UnitListActions;
