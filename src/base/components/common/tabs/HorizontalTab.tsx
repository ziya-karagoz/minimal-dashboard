import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";
import { useState } from "react";
import { HorizontalTabProps } from "./Tabs.types";



const HorizontalTab = ({ tabs, decoration = "rounded", onTabChange }: HorizontalTabProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].title);

  const getTabClassNames = (isActive: boolean) => {
    const baseClass = "cursor-pointer inline-flex p-4 ";
    switch (decoration) {
      case "classic":
        return `${baseClass} ${isActive ? "text-gray-900 bg-gray-200" : "hover:text-gray-900 bg-gray-50 hover:bg-gray-100"}`;
      case "underline":
        return `${baseClass} border-b-2 ${isActive ? "border-gray-900" : "hover:border-gray-900"}`;
      case "filled":
        return `${baseClass} ${isActive ? "bg-gray-900 text-white" : "bg-gray-50 hover:bg-gray-100"}`;
      case "rounded":
        return `${baseClass} rounded-lg ${isActive ? "bg-gray-200" : "hover:bg-gray-100"}`;
      case "shadow":
        return `${baseClass} ${isActive ? "shadow-lg" : "hover:shadow-lg"}`;
      case "minimal":
        return `${baseClass} ${isActive ? "text-gray-900" : "hover:text-gray-900"}`;
      case "none":
        return baseClass;
      default:
        return baseClass;
    }
  };

  return (
    <div>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 mb-2 ">
        {tabs.map((tab) => (
          <li
            key={tab.title}
            className={clsx({
              "me-2": decoration !== "underline",
            })}
            onClick={() => onTabChange && onTabChange(tab)}
          >
            <span
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(tab.title);
              }}
              aria-current="page"
              className={getTabClassNames(activeTab === tab.title)}
            >
              {tab.icon && <Icon icon={tab.icon} className="me-2" />}
              {tab.title}
            </span>
          </li>
        ))}
      </ul>
      <div className="p-6 bg-gray-50 text-medium text-gray-500 rounded-lg w-full flex-1">
        {tabs.map(
          (tab) =>
            activeTab === tab.title && (
              <div key={tab.title}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{tab.title}</h3>
                <div>{tab.content}</div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default HorizontalTab;
