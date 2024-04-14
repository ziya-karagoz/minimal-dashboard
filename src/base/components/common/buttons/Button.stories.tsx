import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Icon } from '@iconify/react';
import Button from './Button';
import { ButtonProps } from './Button.types';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'orange']
    },
    gradient: {
      control: 'boolean'
    },
    shadow: {
      control: 'boolean'
    },
    outlined: {
      control: 'boolean'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'base', 'lg', 'xl']
    },
    loader: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click Me',
  type: 'button',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Save',
  icon: <Icon icon="bi:save" className="mr-2" />,
  type: 'button',
  color: 'green',
};

export const Outlined = Template.bind({});
Outlined.args = {
  children: 'Cancel',
  type: 'button',
  color: 'red',
  outlined: true,
};

export const Gradient = Template.bind({});
Gradient.args = {
  children: 'Download',
  type: 'button',
  color: 'purple',
  gradient: true,
};

export const LoadingButton = Template.bind({});
LoadingButton.args = {
  children: 'Loading...',
  type: 'button',
  loader: true,
  disabled: true,
  color: 'blue',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Disabled',
  type: 'button',
  disabled: true,
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  children: 'Large Button',
  type: 'button',
  size: 'lg',
  color: 'orange',
};
