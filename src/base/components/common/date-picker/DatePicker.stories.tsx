import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import DatePicker from './DatePicker';
import { DatePickerProps } from './DatePicker.types';

export default {
  title: 'Components/DatePicker',
  component: DatePicker,
    tags: ['autodocs'],
  argTypes: {
    enableTime: {
      control: 'boolean',
      description: 'Enables time selection in the date picker.',
    },
    noCalendar: {
      control: 'boolean',
      description: 'Disables calendar and enables time selection only.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the date picker.',
    },
    value: {
      control: 'date',
      description: 'Current value of the date picker.',
    },
  },
} as Meta;

const Template: StoryFn<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: new Date(),
};

export const WithTime = Template.bind({});
WithTime.args = {
  enableTime: true,
  value: new Date(),
};

export const TimeOnly = Template.bind({});
TimeOnly.args = {
  noCalendar: true,
  enableTime: true,
  value: new Date(),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: new Date(),
};
