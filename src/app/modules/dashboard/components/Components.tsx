import VerticalTab from "@base/components/common/tabs/VerticalTab";
import Docs from "./docs";
import SimpleMap from "@base/components/common/maps/Maps";
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
      title: "Maps",
      icon: "bx:bx-radio-circle-marked",
      content: (
        <SimpleMap
          isRoute={true}
          location={{ lat: 41.0082, lng: 28.9784 }}
          waypoints={[
            { lat: 41.04727686301294, lng: 29.00792220159579 },
            { lat: 41.18117196029784, lng: 29.038661415494584 },
          ]}
        />
      ),
    },
    {
      title: "Modals",
      icon: "bx:bx-radio-circle-marked",
      content: <Docs.Modal />,
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
      content: <Docs.Progress />
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
      content: <Docs.Spinner />
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
      <VerticalTab tabs={tabs} tabClickCallback={
        (_) => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } />
    </>
  );
};

export default Components;
