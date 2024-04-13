import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { Icon } from "@iconify/react";
import Banner from './Banner';
import { BannerProps } from './Banner.types';

export default {
  title: 'Components/Banner',
  component: Banner,
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'orange']
    },
    dismissible: {
      control: 'boolean'
    },
    icon: {
      control: 'boolean'
    },
  },
} as Meta;

const Template: StoryFn<BannerProps> = (args) => <Banner {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'This is a default banner message.',
  color: 'blue',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'This is a banner message with an icon.',
  color: 'green',
  icon: <Icon icon="bi:info-circle" className="w-4 h-4" />,
};

export const Dismissible = Template.bind({});
Dismissible.args = {
  children: 'This is a dismissible banner.',
  color: 'red',
  dismissible: true,
};

export const CustomDismissIcon = Template.bind({});
CustomDismissIcon.args = {
  children: 'This banner has a custom dismiss icon.',
  color: 'orange',
  dismissible: true,
  dismissIcon: <Icon icon="mdi:close-circle-outline" className="w-6 h-6" />
};