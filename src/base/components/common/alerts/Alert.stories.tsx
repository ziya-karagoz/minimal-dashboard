import Alert from "./Alert";
import { AlertProps } from "./Alert.types";

export default {
  component: Alert,
  title: 'Alert',
  tags: ['autodocs', 'alert'],
};

export const Default = {
    args: {
       bordered: false,
       children: "This is an alert message.",
       color: "gray",
       dismissible: false,
       dismissIcon: undefined,
       icon: undefined,
       onDismiss: () => {}
    } as AlertProps
  };