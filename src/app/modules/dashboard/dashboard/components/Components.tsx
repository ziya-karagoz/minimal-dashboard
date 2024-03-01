import VerticalTab from "@base/components/common/tabs/VerticalTab";
import Docs from "./docs";
const Components = () => {
  const tabs = [
    {
      title: "Accordion",
      icon: "vaadin:accordion-menu",
      content: <Docs.Accordion />,
    },
    {
      title: "Alerts",
      icon: "bx:bx-bell",
      content: <Docs.Alert />,
    },
    {
      title: "Avatars",
      icon: "bx:bx-user",
      content: <Docs.Avatar />,
    },
    {
      title: "Badges",
      icon: "radix-icons:badge",
      content: <Docs.Badge />,
    },
    {
      title: "Banners",
      icon: "bx:bx-message-square-detail",
      content: <Docs.Banner />,
    },
    {
      title: "Bottom Navigations",
      icon: "bx:bx-menu",
      content: <Docs.BottomNavigation />,
    },
    {
      title: "Breadcrumbs",
      icon: "tdesign:component-breadcrumb",
      content: <Docs.BreadCrumb />,
    },
    {
      title: "Buttons",
      icon: "bx:bx-radio-circle-marked",
      content: <Docs.Button />,
    },
    {
      title: "Button Groups",
      icon: "bx:bx-menu",
      content: <Docs.ButtonGroup />,
    },
    {
      title: "Cards",
      icon: "bx:bx-radio-circle-marked",
      content: <Docs.Card />,
    },
    {
      title: "Carousels",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Chat Bubbles",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Device Mockups",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Drawers",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Dropdowns",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Footers",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Galleries",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Indicators",
      icon: "ic:round-drag-indicator",
      content: <Docs.Indicator />,
    },
    {
      title: "List Groups",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Modals",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Pagination",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Popover",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Proggress",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Ratings",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Skeletons",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Speed Dials",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Spinners",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Steppers",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Tables",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Tabs",
      icon: "ph:tabs-fill",
      content: <Docs.Tabnav />,
    },
    {
      title: "Timelines",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
    {
      title: "Tooltips",
      icon: "bx:bx-radio-circle-marked",
      content: "Not implemented yet.",
    },
  ];

  return (
    <>
      <VerticalTab tabs={tabs} />
    </>
  );
};

export default Components;
