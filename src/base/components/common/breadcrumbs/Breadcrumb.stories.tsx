import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { NavLink, BrowserRouter } from 'react-router-dom';
import { Icon } from "@iconify/react";
import Breadcrumb from './Breadcrumb';
import { BreadcrumbProps } from './Breadcrumb.types';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'orange']
    },
    style: {
      control: 'select',
      options: ['default', 'solid']
    },
  },
} as Meta;

const Template: StoryFn<BreadcrumbProps> = (args) => <Breadcrumb {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' }
  ]
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  items: [
    { name: 'Home', link: '/', icon: <Icon icon="bi:house-door-fill" /> },
    { name: 'About', link: '/about', icon: <Icon icon="bi:info-circle" /> },
    { name: 'Contact', link: '/contact', icon: <Icon icon="bi:telephone-fill" /> }
  ],
  color: 'blue'
};

export const DisabledLink = Template.bind({});
DisabledLink.args = {
  items: [
    { name: 'Home', link: '/', icon: <Icon icon="bi:house-door-fill" /> },
    { name: 'About', link: '/about', disabled: true },
    { name: 'Contact', link: '/contact' }
  ],
  color: 'gray'
};

export const Colored = Template.bind({});
Colored.args = {
  items: [
    { name: 'Home', link: '/' },
    { name: 'About', link: '/about' },
    { name: 'Services', link: '/services' },
    { name: 'Contact', link: '/contact' }
  ],
  color: 'red'
};

