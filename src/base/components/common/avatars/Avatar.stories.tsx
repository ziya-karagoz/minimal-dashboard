import Avatar from "./Avatar";
import { AvatarProps } from "./Avatar.types";

export default {
  component: Avatar,
  title: 'Avatar',
  tags: ['autodocs'],
};

export const Default = {
    args: {
        size: 'md',
        initial: 'ZK',
        shape: 'circle',
        src: "/media/avatars/300-2.jpg",
        alt: "User's Name"
    } as AvatarProps,
  };