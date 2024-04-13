import { useAuth } from "@app/modules/auth";
import Avatar from "@base/components/common/avatars/Avatar";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const AvatarDropdown = () => {
    const { currentUser, logout } = useAuth();
    const [open, setOpen] = useState(false);


    return (
        <div className="relative inline-block">

            <div onClick={() => setOpen(prev => !prev)}>
                <Avatar className="cursor-pointer" alt="User's Name" size="md" src={currentUser?.image} initial={`${currentUser?.first_name[0].toUpperCase()}${currentUser?.last_name[0].toUpperCase()}`} indicator={{ color: "green", position: "top-left" }} />
            </div>

            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
                <div className={`z-20 min-w-42 sm:min-w-96 bg-white divide-y divide-gray-100 rounded-lg shadow absolute right-0 top-12 transition-[max-height] duration-300 overflow-hidden ${open ? "max-h-screen" : "max-h-0"
                    }`}>
                    <div className="px-4 py-3 text-sm text-gray-900 ">
                        <div>{currentUser?.first_name} {currentUser?.last_name}</div>
                        <div className="font-medium truncate">{currentUser?.email}</div>
                    </div>
                    <ul
                        className="py-2 text-sm text-gray-700 "
                        aria-labelledby="avatarButton"
                    >
                        <li>
                            <a
                                href={`/yoneticiler/duzenle/${currentUser?.id}`}
                                className="block px-4 py-2 hover:bg-gray-100 "
                            >
                                Hesabım
                            </a>
                        </li>
                    </ul>
                    <div className="py-1">
                        <span
                            onClick={() => {
                                logout({
                                    alert: true
                                })
                            }}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        >
                            Sign out
                        </span>
                    </div>
                </div>
            </OutsideClickHandler>
        </div>
    );
};

export default AvatarDropdown;
