import { useAuth } from "@app/modules/auth";
import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const AvatarDropdown = () => {
    const { currentUser } = useAuth();
    const [open, setOpen] = useState(false);


    return (
        <div className="relative inline-block">
            <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src={currentUser?.image}
                alt="Bordered avatar"
                onClick={() => setOpen(prev => !prev)}
            />

            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <div className={`z-20 min-w-42 sm:min-w-96 bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 top-12 transition-[max-height] duration-300 overflow-hidden ${open ? "max-h-screen" : "max-h-0"
                    }`}>
                    <div className="px-4 py-3 text-sm text-gray-900 ">
                        <div>Bonnie Green</div>
                        <div className="font-medium truncate">name@flowbite.com</div>
                    </div>
                    <ul
                        className="py-2 text-sm text-gray-700 "
                        aria-labelledby="avatarButton"
                    >
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 "
                            >
                                Dashboard
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 "
                            >
                                Settings
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block px-4 py-2 hover:bg-gray-100 "
                            >
                                Earnings
                            </a>
                        </li>
                    </ul>
                    <div className="py-1">
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            Sign out
                        </a>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default AvatarDropdown;
