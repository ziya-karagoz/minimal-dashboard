import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import AvatarDropdown from "./AvatarDropdown";
import clsx from "clsx";
import { hasPermissionMany } from "@base/helpers/permissions/permission.helper";
import { Menus } from "../../data";
import { NavLink, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

const Header = () => {
    const navigate = useNavigate();
    // const { currentUser } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState(null);

    const toggleMenu = (index: any) => {
        if (activeMenu === index) {
            setActiveMenu(null);
        } else {
            setActiveMenu(index);
            if (!open && Menus[index].children) {
                setOpen(true);
            }
        }
    };



    return (
        <header >
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 border-b border-b-gray-100 shadow-none h-16">
                <div className="flex flex-wrap justify-between items-center mx-auto ">

                    <div className="flex items-center gap-x-2 lg:order-1">
                        <a href="#" className="flex items-center gap-x-2 lg:hidden">
                        <svg
              className="w-12 h-12 mr-2"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#303030"
                stroke-width="6"
              />
              <circle
                cx="50"
                cy="17.6768"
                r="15.6768"
                fill="none"
                stroke="#303030"
                stroke-width="4"
              />
              <path
                d="M58.596 26.7677C58.596 30.9042 55.0282 34.3536 50.505 34.3536C45.9819 34.3536 42.4141 30.9042 42.4141 26.7677C42.4141 22.6313 45.9819 19.1819 50.505 19.1819C55.0282 19.1819 58.596 22.6313 58.596 26.7677Z"
                fill="none"
                stroke="#303030"
                stroke-width="2"
              />
            </svg>

                            <span className="hidden sm:block self-center text-xl font-semibold whitespace-nowrap ">
                                Minimal Dashboard
                            </span>
                        </a>
                        <button
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        {/* Go Back Button Start */}
                        <div
                            className="items-center gap-x-2 flex bg-gray-50 hover:bg-gray-100 p-2.5 rounded-lg cursor-pointer text-red-500"
                            onClick={() => navigate(-1)}
                        >
                            <Icon icon="lets-icons:refund-back" />
                            <span className="hidden md:block me-2 text-sm font-semibold">Geri Dön</span>
                        </div>
                        {/* Go Back Button End */}
                    </div>



                    <div className="flex items-center lg:order-2 gap-x-2">
                        <Notifications />
                        <AvatarDropdown />
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"></div>
                </div>
            </nav>
            <div
                className={clsx(
                    "navbar-menu relative z-50 transition-[max-width] duration-300 overflow-hidden",
                    {
                        hidden: !open,
                    }
                )}
            >
                <div
                    className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
                    onClick={() => setOpen(false)}
                ></div>
                <nav
                    className={clsx(
                        "fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto"
                    )}
                >
                    <div className="flex items-center mb-8">
                        <a className="mr-auto text-3xl font-bold leading-none" href="#">
                        <svg
              className="w-12 h-12 me-2"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#303030"
                stroke-width="6"
              />
              <circle
                cx="50"
                cy="17.6768"
                r="15.6768"
                fill="none"
                stroke="#303030"
                stroke-width="4"
              />
              <path
                d="M58.596 26.7677C58.596 30.9042 55.0282 34.3536 50.505 34.3536C45.9819 34.3536 42.4141 30.9042 42.4141 26.7677C42.4141 22.6313 45.9819 19.1819 50.505 19.1819C55.0282 19.1819 58.596 22.6313 58.596 26.7677Z"
                fill="none"
                stroke="#303030"
                stroke-width="2"
              />
            </svg>

                        </a>
                        <button
                            onClick={() => setOpen(false)}
                            className="ml-auto lg:hidden"
                        >
                            <svg
                                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul className="pt-6">
                            {Menus.map((Menu, index) => {
                                if (Menu?.roles) {
                                    return hasPermissionMany(Menu.roles) ? (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                Menu.to && setOpen(false);
                                            }}
                                        >
                                            {Menu.to ? (
                                                <NavLink
                                                    to={Menu.to}
                                                    className={clsx(
                                                        "flex justify-between p-3 cursor-pointer hover:bg-gray-100 text-gray-900 text-sm items-center",


                                                    )}
                                                    onClick={() => toggleMenu(index)}
                                                >
                                                    <div className="flex items-center gap-x-4">
                                                        <Icon icon={Menu.icon} />
                                                        <span
                                                            className={clsx("origin-left duration-200", {
                                                                hidden: !open,
                                                            })}
                                                        >
                                                            {Menu.title}
                                                        </span>
                                                    </div>
                                                    {Menu.children && (
                                                        <Icon
                                                            icon="mingcute:down-fill"
                                                            className={clsx(
                                                                "transition-transform duration-200",
                                                                {
                                                                    "rotate-180": activeMenu === index,
                                                                }
                                                            )}
                                                        />
                                                    )}
                                                </NavLink>
                                            ) : (
                                                <div
                                                    className={clsx(
                                                        "flex justify-between p-3 cursor-pointer hover:bg-gray-100 text-gray-900 text-sm items-center",
                                                        {
                                                            active: activeMenu === index,
                                                        }
                                                    )}
                                                    onClick={() => toggleMenu(index)}
                                                >
                                                    <div className="flex items-center gap-x-4">
                                                        <Icon icon={Menu.icon} />
                                                        <span
                                                            className={clsx("origin-left duration-200", {
                                                                hidden: !open,
                                                            })}
                                                        >
                                                            {Menu.title}
                                                        </span>
                                                    </div>
                                                    {Menu.children && (
                                                        <Icon
                                                            icon="mingcute:down-fill"
                                                            className={clsx(
                                                                "transition-transform duration-200",
                                                                {
                                                                    "rotate-180": activeMenu === index,
                                                                }
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            )}

                                            {Menu.children && (
                                                <ul
                                                    className={clsx(
                                                        "pl-4 transition-[max-height] duration-300 overflow-hidden",
                                                        {
                                                            "max-h-40": activeMenu === index,
                                                            "max-h-0": activeMenu !== index,
                                                        }
                                                    )}
                                                >
                                                    {Menu.children.map((child, childIndex) =>
                                                        hasPermissionMany(child.roles) ? (
                                                            child.to ? (
                                                                <li
                                                                    onClick={() => setOpen(false)}
                                                                    key={childIndex}
                                                                >
                                                                    <NavLink
                                                                        to={child.to}
                                                                        key={childIndex}
                                                                        className="flex p-2 cursor-pointer hover:bg-gray-100 text-gray-900 text-sm items-center gap-x-4 mt-2"
                                                                    >
                                                                        <Icon icon="radix-icons:dot-filled" />
                                                                        <span
                                                                            className={`${!open && "hidden"
                                                                                } origin-left duration-200`}
                                                                        >
                                                                            {child.title}
                                                                        </span>
                                                                    </NavLink>
                                                                </li>
                                                            ) : null
                                                        ) : null
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    ) : null
                                }
                            }
                            )}
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <div className="pt-6"></div>
                        <p className="my-4 text-xs text-center text-gray-400">
                            <span>Copyright © {new Date().getFullYear()}</span>
                        </p>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
