import { Icon } from "@iconify/react/dist/iconify.js";
import Badge from "./Badge";
import { BadgeProps } from "./Badge.types";

export default {
  component: Badge,
  title: 'Badge',
  tags: ['autodocs'],
};

export const Default = {
    args: {
        bordered: false,
        children: "Badge",
        className: "",
        color: "blue",
        icon: <Icon icon="humbleicons:crown" />,
        iconDirection: "left",
        link: undefined,
        pill: false,
        size: "xs",
    } as BadgeProps,
  };