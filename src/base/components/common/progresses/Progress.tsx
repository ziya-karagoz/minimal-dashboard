import clsx from "clsx";
import React from "react";
import { ProgressProps } from "./Progress.types";



const Progress: React.FC<ProgressProps> = ({
    title = undefined,
    value = 45,
    progressiveColors = false,
    color = "blue",
    size = "sm",
    withLabel = false,
    labelPosition = "inside",
}) => {
    return (
        <React.Fragment>
            <div className="flex justify-between mb-1">
                <span className="text-base font-medium text-gray-700">{title}</span>
                {withLabel && labelPosition === "outside" && (
                    <span className="text-sm font-medium text-gray-700">{value}%</span>
                )}
            </div>
            <div
                className={clsx("w-full bg-gray-200 rounded-full ", {
                    "h-2.5": size === "sm",
                    "h-4": size === "md",
                    "h-6": size === "lg",
                })}
            >
                <div
                    className={clsx("rounded-full transition-all flex items-center justify-center duration-200 ease-in-out", {
                        "font-medium text-center p-0.5 leading-none text-white": withLabel && labelPosition === "inside",
                        "h-2.5 text-xxs": size === "sm",
                        "h-4 text-xs": size === "md",
                        "h-6 text-sm": size === "lg",
                        "bg-blue-600": !progressiveColors && color === "blue",
                        "bg-gray-600": !progressiveColors && color === "gray",
                        "bg-red-600": !progressiveColors && color === "red",
                        "bg-green-600": !progressiveColors && color === "green",
                        "bg-yellow-600": !progressiveColors && color === "yellow",
                        "bg-indigo-600": !progressiveColors && color === "indigo",
                        "bg-purple-600": !progressiveColors && color === "purple",
                        "bg-pink-600": !progressiveColors && color === "pink",
                        "bg-orange-600": !progressiveColors && color === "orange",
                        "bg-gradient-to-r from-red-400 to-red-600":
                            progressiveColors && value <= 30,
                        "bg-gradient-to-r from-yellow-400 to-yellow-600":
                            progressiveColors && value > 30 && value <= 70,
                        "bg-gradient-to-r from-green-400 to-green-600":
                            progressiveColors && value > 70 && value <= 100,
                    })}
                    style={{ width: `${value}%` }}
                >
                    {withLabel && labelPosition === "inside" && (
                        <span className="text-white">{value}%</span>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default Progress;
