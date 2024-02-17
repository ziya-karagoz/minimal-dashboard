import HorizontalTab from "@base/components/common/tabs/HorizontalTab";
import VerticalTab from "@base/components/common/tabs/VerticalTab";

const Components = () => {
    const tabs = [
        {
            title: "Profile",
            icon: "iconamoon:profile-fill",
            content: "This is the content for the Profile tab.",
        },
        {
            title: "Dashboard",
            icon: "ic:round-dashboard",
            content: (
                <div className="text-red-500">
                    This is the content for the Dashboard tab.
                </div>
            ),
        },
        // Add more tabs as needed
    ];


    return (
        <>
            <VerticalTab tabs={tabs} />
            <br />
            <HorizontalTab tabs={tabs} />
        </>
    );
};

export default Components;
