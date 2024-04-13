import Button from "@base/components/common/buttons/Button";
import ClearFilterButton from "@base/components/common/dynamic-table/components/ClearFilterButton";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
    handleExport: () => void;
};

const StepListActions = ({
    handleExport,
}: Props) => {

    return (
        <>
            <ClearFilterButton />
            <Button
                color="green"
                onClick={handleExport}
                icon={<Icon icon="la:file-download" />}
            >
                Dışa Aktar
            </Button>
        </>
    );
};

export default StepListActions;
