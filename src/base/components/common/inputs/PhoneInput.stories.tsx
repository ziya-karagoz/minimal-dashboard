import { Meta, StoryFn } from '@storybook/react';
import ReactPhoneInput from './PhoneInput';
import { ReactPhoneInputProps } from './PhoneInput.types';

export default {
  title: 'Components/PhoneInput',
  component: ReactPhoneInput,
    tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Current phone number in the input.',
    },
    withCode: {
      control: 'boolean',
      description: 'Determines if the phone number should include the country code.',
    },
  },
} as Meta;

const Template: StoryFn<ReactPhoneInputProps> = (args) => <ReactPhoneInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  onChange: (e: any) => console.log('Phone Number:', e.target.value),
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  value: '+905353563452',
  onChange: (e: any) => console.log('Phone Number:', e.target.value),
};

export const WithCountryCode = Template.bind({});
WithCountryCode.args = {
  withCode: true,
  onChange: (e: any) => console.log('Phone Number:', e.target.value),
};
