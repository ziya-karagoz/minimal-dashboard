import clsx from "clsx";
import React from "react";

type Props = {
    children?: React.ReactNode;
    color?:
    | "blue"
    | "gray"
    | "red"
    | "green"
    | "yellow"
    | "indigo"
    | "purple"
    | "pink";
    size?: "xs" | "sm" | "md";
    bordered?: boolean;
    pill?: boolean;
    link?: string | undefined;
    icon?: React.ReactNode | undefined;
    iconDirection?: "left" | "right";
};

const Badge = ({
    children,
    color = "blue",
    size = "xs",
    bordered = false,
    pill = false,
    link = undefined,
    icon = undefined,
    iconDirection = "left",
}: Props) => {
    if (!link) {
        return (
            <span
                className={clsx("font medium me-2 px-2.5 py-0.5", {
                    "bg-blue-100 text-blue-800 border-blue-600": color === "blue",
                    "bg-gray-100 text-gray-800 border-gray-600": color === "gray",
                    "bg-red-100 text-red-800 border-red-600": color === "red",
                    "bg-green-100 text-green-800 border-green-600": color === "green",
                    "bg-yellow-100 text-yellow-800 border-yellow-600": color === "yellow",
                    "bg-indigo-100 text-indigo-800 border-indigo-600": color === "indigo",
                    "bg-purple-100 text-purple-800 border-purple-600": color === "purple",
                    "bg-pink-100 text-pink-800 border-pink-600": color === "pink",
                    "border border-blue-600": bordered,
                    "rounded-full": pill,
                    rounded: !pill,
                    "inline-flex items-center": icon,
                    "text-xs": size === "xs",
                    "text-sm": size === "sm",
                    "text-md": size === "md",
                })}
            >
                {iconDirection === "left" && icon}
                {children}
                {iconDirection === "right" && icon}
            </span>
        );
    } else {
        return (
            <a
                href={link}
                className={clsx("font medium me-2 px-2.5 py-0.5", {
                    "bg-blue-100 text-blue-800 border-blue-600": color === "blue",
                    "bg-gray-100 text-gray-800 border-gray-600": color === "gray",
                    "bg-red-100 text-red-800 border-red-600": color === "red",
                    "bg-green-100 text-green-800 border-green-600": color === "green",
                    "bg-yellow-100 text-yellow-800 border-yellow-600": color === "yellow",
                    "bg-indigo-100 text-indigo-800 border-indigo-600": color === "indigo",
                    "bg-purple-100 text-purple-800 border-purple-600": color === "purple",
                    "bg-pink-100 text-pink-800 border-pink-600": color === "pink",
                    "border": bordered,
                    "rounded-full": pill,
                    rounded: !pill,
                    "inline-flex items-center": icon,
                    "text-xs": size === "xs",
                    "text-sm": size === "sm",
                    "text-md": size === "md",
                })}
            >
                {iconDirection === "left" && icon}
                {children}
                {iconDirection === "right" && icon}
            </a>
        );
    }
};

export default Badge;