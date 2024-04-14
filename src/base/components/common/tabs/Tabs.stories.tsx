import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import HorizontalTab from './HorizontalTab';
import VerticalTab from './VerticalTab';

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  component: HorizontalTab,
  subcomponents: { VerticalTab },
} as Meta;

const horizontalTabs = [
  { title: 'Tab 1', icon: 'mdi:home', content: 'Content of Tab 1' },
  { title: 'Tab 2', icon: 'mdi:account', content: 'Content of Tab 2' },
  { title: 'Tab 3', icon: 'mdi:settings', content: 'Content of Tab 3' },
];

const verticalTabs = [
  { title: 'First', icon: 'mdi:camera', content: <p>First tab content</p> },
  { title: 'Second', icon: 'mdi:heart', content: <p>Second tab content</p> },
  { title: 'Third', icon: 'mdi:star', content: <p>Third tab content</p> },
];

const HorizontalTemplate: StoryFn<typeof HorizontalTab> = (args) => <HorizontalTab {...args} />;
const VerticalTemplate: StoryFn<typeof VerticalTab> = (args) => <VerticalTab {...args} />;

export const HorizontalDefault = HorizontalTemplate.bind({});
HorizontalDefault.args = {
  tabs: horizontalTabs,
  decoration: 'rounded',
  onTabChange: (tab) => console.log('Selected tab:', tab),
};

export const HorizontalClassic = HorizontalTemplate.bind({});
HorizontalClassic.args = {
  tabs: horizontalTabs,
  decoration: 'classic',
  onTabChange: (tab) => console.log('Selected tab:', tab),
};

export const VerticalDefault = VerticalTemplate.bind({});
VerticalDefault.args = {
  tabs: verticalTabs,
  tabClickCallback: (tab) => console.log('Clicked tab:', tab),
};
