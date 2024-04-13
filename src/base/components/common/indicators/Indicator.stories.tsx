import { Meta, StoryFn } from '@storybook/react';
import Indicator from './Indicator';
import { IndicatorProps } from './Indicator.types';

export default {
  title: 'Components/Indicator',
  component: Indicator,
  argTypes: {
    color: {
      control: 'select',
      options: ['blue', 'gray', 'red', 'green', 'yellow', 'indigo', 'purple', 'pink', 'orange']
    },
  },
} as Meta;

const Template: StoryFn<IndicatorProps> = (args) => <Indicator {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Default Indicator',
  color: 'blue',
};

