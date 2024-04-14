import { Meta, StoryFn } from '@storybook/react';
import { Icon } from "@iconify/react";
import ButtonGroup from './ButtonGroup';
import { ButtonGroupProps } from './ButtonGroup.types';

export default {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'orange']
    },
    outlined: {
      control: 'boolean'
    },
  },
} as Meta;

const Template: StoryFn<ButtonGroupProps> = (args) => <ButtonGroup {...args} />;

export const Default = Template.bind({});
Default.args = {
  buttons: [
    {
      content: 'Button 1',
      onClick: () => alert('Button 1 clicked'),
    },
    {
      content: 'Button 2',
      onClick: () => alert('Button 2 clicked'),
    },
  ],
  color: 'blue',
};

export const WithIcons = Template.bind({});
WithIcons.args = {
  buttons: [
    {
      content: 'Home',
      icon: <Icon icon="mdi:home" className="w-4 h-4 mr-2" />,
      onClick: () => alert('Home clicked'),
    },
    {
      content: 'Favorite',
      icon: <Icon icon="mdi:heart" className="w-4 h-4 mr-2" />,
      onClick: () => alert('Favorite clicked'),
    },
  ],
  color: 'pink',
};

export const Outlined = Template.bind({});
Outlined.args = {
  buttons: [
    {
      content: 'Action 1',
      onClick: () => alert('Action 1 clicked'),
    },
    {
      content: 'Action 2',
      onClick: () => alert('Action 2 clicked'),
    },
  ],
  outlined: true,
  color: 'green',
};

export const MixedButtons = Template.bind({});
MixedButtons.args = {
  buttons: [
    {
      content: 'External Link',
      to: 'https://www.google.com',
    },
    {
      content: 'Click Me',
      onClick: () => alert('Clicked!'),
    },
  ],
  color: 'orange',
};
