import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Modal from "./Modal";
import { ModalProps } from "./Modal.types";
import Button from "../buttons/Button";

export default {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: [
        "sm",
        "md",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
        "6xl",
        "7xl",
      ],
      description: "Sets the size of the modal.",
    },
    open: {
      control: "boolean",
      description: "Controls the visibility of the modal.",
    },
    align: {
      control: "select",
      options: ["center", "default"],
      description: "Sets the alignment of the modal.",
    },
    backdrop: {
      control: "select",
      options: ["default", "static"],
      description: "Determines the behavior of the backdrop.",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

const Template: StoryFn<ModalProps> = (args) => {
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <Modal.Header>Modal Title</Modal.Header>
        <Modal.Body>
          <p>
            This is the content of your modal. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={args.onClose}>Close</button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export const Default = Template.bind({});
Default.args = {
};

export const LargeModal = Template.bind({});
LargeModal.args = {
  size: "lg",
};

export const CenteredModal = Template.bind({});
CenteredModal.args = {
  size: "md",
  align: "center",
};

export const StaticBackdrop = Template.bind({});
StaticBackdrop.args = {
  size: "sm",
  backdrop: "static",
};
