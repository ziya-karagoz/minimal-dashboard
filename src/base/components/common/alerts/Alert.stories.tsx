import { StoryFn, Meta } from "@storybook/react";
import { Icon } from "@iconify/react";
import Alert from "./Alert";
import { AlertProps } from "./Alert.types";

export default {
  title: "Components/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: [
        "blue",
        "gray",
        "red",
        "green",
        "yellow",
        "indigo",
        "purple",
        "pink",
        "orange",
      ],
    },
    bordered: {
      control: "boolean",
    },
    dismissible: {
      control: "boolean",
    },
  },
} as Meta;

const Template: StoryFn<AlertProps> = (args) => <Alert {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "This is a default alert message.",
  color: "blue",
  bordered: false,
  dismissible: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: "This is an alert message with an icon.",
  color: "green",
  icon: <Icon icon="bi:info-circle-fill" width="20" height="20" />,
  bordered: true,
};

export const Dismissible = Template.bind({});
Dismissible.args = {
  children: "This is a dismissible alert.",
  color: "red",
  bordered: true,
  dismissible: true,
};

export const CustomDismissIcon = Template.bind({});
CustomDismissIcon.args = {
  children: "This alert has a custom dismiss icon.",
  color: "orange",
  bordered: true,
  dismissible: true,
  dismissIcon: <Icon icon="mdi:close-circle-outline" width="24" height="24" />,
};
