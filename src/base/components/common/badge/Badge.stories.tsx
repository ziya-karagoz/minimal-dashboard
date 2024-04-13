import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Icon } from "@iconify/react";
import Badge from './Badge';
import { BadgeProps } from './Badge.types';

export default {
  title: 'Components/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'orange']
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md']
    },
    bordered: {
      control: 'boolean'
    },
    pill: {
      control: 'boolean'
    },
    link: {
      control: 'text'
    },
    icon: {
      control: 'boolean'
    },
    iconDirection: {
      control: 'select',
      options: ['left', 'right']
    },
  },
} as Meta;

const Template: StoryFn<BadgeProps> = (args) => <Badge {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Badge',
  color: 'blue',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Badge with Icon',
  color: 'green',
  icon: <Icon icon="bi:star-fill" width="16" height="16" />,
  iconDirection: 'left'
};

export const PillShape = Template.bind({});
PillShape.args = {
  children: 'Pill Badge',
  color: 'purple',
  pill: true
};

export const Bordered = Template.bind({});
Bordered.args = {
  children: 'Bordered Badge',
  color: 'red',
  bordered: true
};

export const WithLink = Template.bind({});
WithLink.args = {
  children: 'Link Badge',
  color: 'orange',
  link: 'https://example.com'
};

export const CustomSize = Template.bind({});
CustomSize.args = {
  children: 'Big Size Badge',
  color: 'indigo',
  size: 'md'
};
