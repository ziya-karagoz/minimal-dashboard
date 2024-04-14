import { Meta, StoryFn } from '@storybook/react';
import CustomSelect from './CustomSelect';

export default {
  title: 'Components/CustomSelect',
  component: CustomSelect,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <div className="h-[50vh]">
                <Story />
            </div>
        ),
    ],
  argTypes: {
    inactive: {
      control: 'boolean',
      description: 'Controls the inactive state styling of the select component.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the select input when no option is selected.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the select input if true.',
    },
    isSearchable: {
      control: 'boolean',
      description: 'Allows searching through the options if true.',
    },
    options: {
      control: 'object',
      description: 'Options available for selection.',
    },
    isMulti: {
      control: 'boolean',
      description: 'Allows multiple selections if true.',
    },
    value: {
      control: 'object',
      description: 'Currently selected value or values.',
    },
  },
} as Meta;

const Template: StoryFn<typeof CustomSelect> = (args) => <CustomSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Select an option',
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  placeholder: 'Select multiple options',
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
  isMulti: true,
};

export const Searchable = Template.bind({});
Searchable.args = {
  placeholder: 'Type to search',
  isSearchable: true,
  options: [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
    { label: 'Date', value: 'date' },
    { label: 'Elderberry', value: 'elderberry' },
  ],
};
