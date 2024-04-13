import { StoryFn, Meta } from '@storybook/react';

import Accordion from './Accordion';
import { AccordionProps } from './Accordion.types';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    style: {
      control: 'select',
      options: ['default', 'flush'],
      description: 'The style of the accordion.',
    },
  },
} as Meta;

const Template: StoryFn<AccordionProps> = (args) => (
  <Accordion {...args}>
    <Accordion.Item eventKey="item1">
      <Accordion.Header>Item 1</Accordion.Header>
      <Accordion.Body>This is the content of Item 1.</Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="item2">
      <Accordion.Header>Item 2</Accordion.Header>
      <Accordion.Body>This is the content of Item 2.</Accordion.Body>
    </Accordion.Item>
    <Accordion.Item eventKey="item3">
      <Accordion.Header>Item 3</Accordion.Header>
      <Accordion.Body>This is the content of Item 3.</Accordion.Body>
    </Accordion.Item>
  </Accordion>
);

export const Default = Template.bind({});
Default.args = {
  defaultActiveKey: 'item1',
  multiExpandable: false,
  alwaysOpen: false,
  style: 'default',
};

export const MultiExpandable = Template.bind({});
MultiExpandable.args = {
  multiExpandable: true,
  style: 'flush',
};

export const AlwaysOpen = Template.bind({});
AlwaysOpen.args = {
  alwaysOpen: true,
  style: 'flush',
};
