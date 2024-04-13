import Alert from "@base/components/common/alerts/Alert";
import { Icon } from "@iconify/react/dist/iconify.js";

const CAlert = () => {
    return (
        <>
            <div className="ms-4 mb-4">
                <h5 className="mb-2 text-gray-600 text-xl">Variants</h5>
                <div>
                    <Alert dismissible >Blue</Alert>
                    <Alert bordered color="gray" icon={<Icon icon="bx:bx-info-circle" />}>Gray</Alert>
                    <Alert dismissible bordered color="red" icon={<Icon icon="bx:bx-info-circle" />}>Red</Alert>
                    <Alert color="green">Green</Alert>
                    <Alert color="yellow">Yellow</Alert>
                    <Alert color="indigo">Indigo</Alert>
                    <Alert color="purple">Purple</Alert>
                    <Alert color="pink">Pink</Alert>
                    <Alert color="orange" >
                        <div className="flex flex-col gap-x-2">
                            <h3 className="text-lg font-bold">Custom Children</h3>
                            <p className="text-sm">This is a custom children</p>

                        </div>
                    </Alert>
                </div>
            </div>

        </>
    );
};

export default CAlert;
