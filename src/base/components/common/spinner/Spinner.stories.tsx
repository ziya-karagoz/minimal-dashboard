import { Meta, StoryFn } from '@storybook/react';
import Spinner from './Spinner';
import { SpinnerProps } from './Spinner.types';

export default {
  title: 'Components/Spinner',
  component: Spinner,
    tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'orange'],
      description: 'Sets the color of the spinner.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Sets the size of the spinner.',
    },
    exClass: {
      control: 'text',
      description: 'Additional CSS classes to apply for customization.',
    },
  },
} as Meta;

const Template: StoryFn<SpinnerProps> = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  color: 'gray',
  size: 'md',
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
  color: 'blue',
  size: 'xs',
};

export const Small = Template.bind({});
Small.args = {
  color: 'red',
  size: 'sm',
};

export const Large = Template.bind({});
Large.args = {
  color: 'green',
  size: 'lg',
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
  color: 'purple',
  size: 'xl',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  color: 'orange',
  size: 'md',
};
