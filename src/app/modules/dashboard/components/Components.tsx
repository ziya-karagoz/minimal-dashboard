import VerticalTab from "@base/components/common/tabs/VerticalTab";
import Docs from "./docs";
const Components = () => {
    const tabs = [
        {
            title: "Accordion",
            icon: "vaadin:accordion-menu",
            content: "Not implemented yet."
        },
        {
            title: "Alerts",
            icon: "bx:bx-bell",
            content: "Not implemented yet."
        },
        {
            title: "Avatars",
            icon: "bx:bx-user",
            content: "Not implemented yet."
        },
        {
            title: "Badges",
            icon: "radix-icons:badge",
            content: <Docs.Badge />,
        },
        {
            title: "Banners",
            icon: "bx:bx-message-square-detail",
            content: "Not implemented yet."
        },
        {
            title: "Bottom Navigations",
            icon: "bx:bx-menu",
            content: "Not implemented yet."
        },
        {
            title: "Breadcrumbs",
            icon: "bx:bx-menu",
            content: "Not implemented yet."
        },
        {
            title: "Buttons",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Button Groups",
            icon: "bx:bx-menu",
            content: "Not implemented yet."
        },
        {
            title: "Cards",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Carousels",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Chat Bubbles",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Device Mockups",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Drawers",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Dropdowns",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Footers",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Galleries",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Indicators",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "List Groups",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Modals",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Pagination",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Popover",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Proggress",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Ratings",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Skeletons",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Speed Dials",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Spinners",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Steppers",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Tables",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Tabs",
            icon: "ph:tabs-fill",
            content: <Docs.Tabnav />,
        },
        {
            title: "Timelines",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },
        {
            title: "Tooltips",
            icon: "bx:bx-radio-circle-marked",
            content: "Not implemented yet."
        },


    ];


    return (
        <>
            <VerticalTab tabs={tabs} />
        </>
    );
};

export default Components;
