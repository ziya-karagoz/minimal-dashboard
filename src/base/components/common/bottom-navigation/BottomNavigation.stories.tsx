import { Meta, StoryFn } from '@storybook/react';
import { Icon } from "@iconify/react";
import BottomNavigation from './BottomNavigation';
import { BottomNavigationProps } from './BottomNavigation.types';
import { MemoryRouter } from 'react-router';

export default {
  title: 'Components/BottomNavigation',
  component: BottomNavigation,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'orange']
    },
    bordered: {
      control: 'boolean'
    },
    type: {
      control: 'select',
      options: ['default', 'appbar']
    },
  },
} as Meta;

const items = [
  { icon: <Icon icon="bi:house-fill" className="w-5 h-5" />, content: 'Home', to: '/' },
  { icon: <Icon icon="bi:gear-fill" className="w-5 h-5" />, content: 'Settings', to: '/settings' },
  { icon: <Icon icon="bi:people-fill" className="w-5 h-5" />, content: 'Profile', to: '/profile' },
];

const Template: StoryFn<BottomNavigationProps> = (args) => <BottomNavigation {...args} items={items} />;

export const Default = Template.bind({});
Default.args = {
  color: 'blue',
  type: 'default'
};

export const AppBarStyle = Template.bind({});
AppBarStyle.args = {
  color: 'red',
  type: 'appbar'
};

export const Bordered = Template.bind({});
Bordered.args = {
  color: 'indigo',
  bordered: true
};