import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Progress from './Progress';
import { ProgressProps } from './Progress.types';

export default {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'range',
      min: 0,
      max: 100,
      step: 1,
      description: 'Current progress value as a percentage.',
    },
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'orange'],
      description: 'The color of the progress bar.',
    },
    progressiveColors: {
      control: 'boolean',
      description: 'If true, overrides the color prop with a gradient from red to green based on value.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Sets the size of the progress bar.',
    },
    withLabel: {
      control: 'boolean',
      description: 'Determines whether a label displaying the current value is shown.',
    },
    labelPosition: {
      control: 'select',
      options: ['inside', 'outside'],
      description: 'Sets the position of the label relative to the progress bar.',
    },
  },
} as Meta;

const Template: StoryFn<ProgressProps> = (args) => <Progress {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 50,
  color: 'blue',
  size: 'md',
  withLabel: true,
  labelPosition: 'inside',
};

export const SmallProgress = Template.bind({});
SmallProgress.args = {
  value: 30,
  color: 'red',
  size: 'sm',
};

export const LargeProgress = Template.bind({});
LargeProgress.args = {
  value: 75,
  color: 'green',
  size: 'lg',
  withLabel: true,
  labelPosition: 'outside',
};

export const ProgressiveColor = Template.bind({});
ProgressiveColor.args = {
  value: 65,
  progressiveColors: true,
  size: 'md',
  withLabel: true,
};

export const FullWidthProgress = Template.bind({});
FullWidthProgress.args = {
  value: 100,
  color: 'purple',
  size: 'md',
  withLabel: true,
};
