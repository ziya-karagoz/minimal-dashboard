import React from "react";
import Indicator from "@base/components/common/indicators/Indicator";
import clsx from "clsx";
import { AvatarProps } from "./Avatar.types";

const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  shape = "circle",
  src,
  initial,
  alt,
  className,
  bordered,
  indicator,
}) => {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-20 h-20",
    xl: "w-36 h-36",
    "2xl": "w-48 h-48",
  };

  const shapeClasses = {
    rounded: "rounded-lg",
    circle: "rounded-full",
  };

  const borderClass = bordered
    ? `ring-2 p-1 ring-gray-300 ${
        indicator
          ? clsx({
              "ring-blue-300": indicator.color === "blue",
              "ring-gray-300": indicator.color === "gray",
              "ring-primary-300": indicator.color === "red",
              "ring-green-300": indicator.color === "green",
              "ring-yellow-300": indicator.color === "yellow",
              "ring-indigo-300": indicator.color === "indigo",
              "ring-purple-300": indicator.color === "purple",
              "ring-pink-300": indicator.color === "pink",
              "ring-orange-300": indicator.color === "orange",
            })
          : ""
      }`
    : "";

  const avatarClass = `${sizeClasses[size]} ${shapeClasses[shape]} ${borderClass} ${className || ""}`;

  const renderIndicator = () => {
    if (indicator && indicator.color) {
      return <Indicator color={indicator.color} />;
    }
    return null;
  };

  return (
    <div className="relative inline-block">
      {src ? (
        <img className={avatarClass} src={src} alt={alt || "Avatar"} />
      ) : (
        <div
          className={`${avatarClass} flex items-center justify-center bg-gray-100`}
        >
          <span className="font-medium text-gray-600">{initial}</span>
        </div>
      )}
      <div
        className={clsx("absolute", {
          "top-0 left-0": indicator?.position === "top-left",
          "top-0 right-0": indicator?.position === "top-right",
          "bottom-0 left-0": indicator?.position === "bottom-left",
          "bottom-0 right-0": indicator?.position === "bottom-right",
        })}
      >
        {renderIndicator()}
      </div>
    </div>
  );
};

export default Avatar;
