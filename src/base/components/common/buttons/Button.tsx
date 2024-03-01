import React from "react";
import clsx from "clsx";

interface ButtonProps {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    color?:
    | "blue"
    | "gray"
    | "red"
    | "green"
    | "yellow"
    | "indigo"
    | "purple"
    | "pink"
    | "orange";
    gradient?: boolean;
    shadow?: boolean;
    outlined?: boolean;
    size?: "xs" | "sm" | "base" | "lg" | "xl";
    icon?: React.ReactNode;
    loader?: boolean;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button: React.FC<ButtonProps> = ({
    type,
    children,
    color = "blue",
    gradient,
    shadow = false,
    outlined = false,
    size = "base",
    icon,
    loader,
    disabled,
    onClick,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={clsx(
                "inline-flex items-center justify-center font-medium rounded-lg text-center focus:outline-none",
                {

                    "px-3 py-2 text-xs": size === "xs",
                    "px-3 py-2 text-sm": size === "sm",
                    "px-5 py-2.5 text-sm": size === "base",
                    "px-5 py-3 text-base": size === "lg",
                    "px-6 py-3.5 text-base": size === "xl",
                    "text-white": !outlined || (gradient && outlined),
                    "shadow-lg": shadow,
                    "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300":
                        color === "blue" && !gradient && !outlined,
                    "bg-gray-500 hover:bg-gray-600 focus:ring-gray-300":
                        color === "gray" && !gradient && !outlined,
                    "bg-red-500 hover:bg-red-600 focus:ring-red-300":
                        color === "red" && !gradient && !outlined,
                    "bg-green-500 hover:bg-green-600 focus:ring-green-300":
                        color === "green" && !gradient && !outlined,
                    "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-300":
                        color === "yellow" && !gradient && !outlined,
                    "bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-300":
                        color === "indigo" && !gradient && !outlined,
                    "bg-purple-500 hover:bg-purple-600 focus:ring-purple-300":
                        color === "purple" && !gradient && !outlined,
                    "bg-pink-500 hover:bg-pink-600 focus:ring-pink-300":
                        color === "pink" && !gradient && !outlined,
                    "bg-orange-500 hover:bg-orange-600 focus:ring-orange-300":
                        color === "orange" && !gradient && !outlined,
                    "bg-white border-2 text-blue-800 hover:text-white border-blue-500 hover:bg-blue-500 focus:ring-blue-300 ":
                        color === "blue" && !gradient && outlined && color === "blue",
                    "bg-white border-2 text-gray-800 hover:text-white border-gray-500 hover:bg-gray-500 focus:ring-gray-300 ":
                        color === "gray" && !gradient && outlined && color === "gray",
                    "bg-white border-2 text-red-800 hover:text-white border-red-500 hover:bg-red-500 focus:ring-red-300 ":
                        color === "red" && !gradient && outlined && color === "red",
                    "bg-white border-2 text-green-800 hover:text-white border-green-500 hover:bg-green-500 focus:ring-green-300 ":
                        color === "green" && !gradient && outlined && color === "green",
                    "bg-white border-2 text-yellow-800 hover:text-white border-yellow-500 hover:bg-yellow-500 focus:ring-yellow-300 ":
                        color === "yellow" && !gradient && outlined && color === "yellow",
                    "bg-white border-2 text-indigo-800 hover:text-white border-indigo-500 hover:bg-indigo-500 focus:ring-indigo-300 ":
                        color === "indigo" && !gradient && outlined && color === "indigo",
                    "bg-white border-2 text-purple-800 hover:text-white border-purple-500 hover:bg-purple-500 focus:ring-purple-300 ":
                        color === "purple" && !gradient && outlined && color === "purple",
                    "bg-white border-2 text-pink-800 hover:text-white border-pink-500 hover:bg-pink-500 focus:ring-pink-300 ":
                        color === "pink" && !gradient && outlined && color === "pink",
                    "bg-white border-2 text-orange-800 hover:text-white border-orange-500 hover:bg-orange-500 focus:ring-orange-300 ":
                        color === "orange" && !gradient && outlined && color === "orange",
                    "bg-gradient-to-r from-blue-400 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-blue-300":
                        gradient && !outlined && color === "blue",
                    "bg-gradient-to-r from-gray-400 to-gray-700 hover:from-gray-600 hover:to-gray-800 focus:ring-gray-300":
                        gradient && !outlined && color === "gray",
                    "bg-gradient-to-r from-red-400 to-red-700 hover:from-red-600 hover:to-red-800 focus:ring-red-300":
                        gradient && !outlined && color === "red",
                    "bg-gradient-to-r from-green-400 to-green-700 hover:from-green-600 hover:to-green-800 focus:ring-green-300":
                        gradient && !outlined && color === "green",
                    "bg-gradient-to-r from-yellow-400 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 focus:ring-yellow-300":
                        gradient && !outlined && color === "yellow",
                    "bg-gradient-to-r from-indigo-400 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 focus:ring-indigo-300":
                        gradient && !outlined && color === "indigo",
                    "bg-gradient-to-r from-purple-400 to-purple-700 hover:from-purple-600 hover:to-purple-800 focus:ring-purple-300":
                        gradient && !outlined && color === "purple",
                    "bg-gradient-to-r from-pink-400 to-pink-700 hover:from-pink-600 hover:to-pink-800 focus:ring-pink-300":
                        gradient && !outlined && color === "pink",
                    "bg-gradient-to-r from-orange-400 to-orange-700 hover:from-orange-600 hover:to-orange-800 focus:ring-orange-300":
                        gradient && !outlined && color === "orange",
                    "relative overflow-hidden group bg-gradient-to-br px-[2px] py-[2px] hover:text-white focus:ring-4":
                        gradient && outlined,
                    "  from-blue-400 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-400  focus:ring-blue-300":
                        gradient && outlined && color === "blue",
                    "  from-gray-400 to-gray-600 group-hover:from-gray-600 group-hover:to-gray-400  focus:ring-gray-300":
                        gradient && outlined && color === "gray",
                    "  from-red-400 to-red-600 group-hover:from-red-600 group-hover:to-red-400  focus:ring-red-300":
                        gradient && outlined && color === "red",
                    "  from-green-400 to-green-600 group-hover:from-green-600 group-hover:to-green-400  focus:ring-green-300":
                        gradient && outlined && color === "green",
                    "  from-yellow-400 to-yellow-600 group-hover:from-yellow-600 group-hover:to-yellow-400  focus:ring-yellow-300":
                        gradient && outlined && color === "yellow",
                    "  from-indigo-400 to-indigo-600 group-hover:from-indigo-600 group-hover:to-indigo-400  focus:ring-indigo-300":
                        gradient && outlined && color === "indigo",
                    "  from-purple-400 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-400  focus:ring-purple-300":
                        gradient && outlined && color === "purple",
                    "  from-pink-400 to-pink-600 group-hover:from-pink-600 group-hover:to-pink-400  focus:ring-pink-300":
                        gradient && outlined && color === "pink",
                    "  from-orange-400 to-orange-600 group-hover:from-orange-600 group-hover:to-orange-400  focus:ring-orange-300":
                        gradient && outlined && color === "orange",
                    "cursor-not-allowed opacity-50": disabled,
                    "cursor-wait": loader,
                }
            )}
            disabled={disabled}
        >
            {gradient && outlined ? (
                <span
                    className={clsx(
                        "relative  transition-all ease-in duration-75  hover:text-white bg-white rounded-md group-hover:bg-opacity-0",
                        {
                            "px-3 py-2 text-xs": size === "xs",
                            "px-3 py-2 text-sm": size === "sm",
                            "px-5 py-2.5 text-sm": size === "base",
                            "px-5 py-3 text-base": size === "lg",
                            "px-6 py-3.5 text-base": size === "xl",
                            "text-blue-800": color === "blue",
                            "text-gray-800": color === "gray",
                            "text-red-800": color === "red",
                            "text-green-800": color === "green",
                            "text-yellow-800": color === "yellow",
                            "text-indigo-800": color === "indigo",
                            "text-purple-800": color === "purple",
                            "text-pink-800": color === "pink",
                            "text-orange-800": color === "orange",
                        }
                    )}
                >
                    {children}
                </span>
            ) : (
                <>
                    {loader && (
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="inline w-4 h-4 me-3 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                className={"fill-gray-600"}
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                className={"fill-gray-200"}
                            />
                        </svg>
                    )}
                    {icon && icon}
                    {children}
                </>
            )}
        </button>
    );
};

export default Button;