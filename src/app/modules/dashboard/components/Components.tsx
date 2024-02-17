import VerticalTab from "@base/components/common/tabs/VerticalTab";
import Docs from "./docs";
const Components = () => {
    const tabs = [
        {
            title: "Badges",
            icon: "radix-icons:badge",
            content: <Docs.Badge />,
        },
        {
            title: "Accordions",
            icon: "ic:round-dashboard",
            content: (
                <div className="text-red-500">
                    This is the content for the Dashboard tab.
                </div>
            ),
        },
    ];


    return (
        <>
            <VerticalTab tabs={tabs} />
        </>
    );
};

export default Components;
