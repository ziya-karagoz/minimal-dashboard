import { Meta, StoryFn } from '@storybook/react';
import { Icon } from '@iconify/react';
import Card from './Card';
import { CardProps } from './Card.types';

export default {
  title: 'Components/Card',
  component: Card,
  subcomponents: { CardHeader: Card.Header, CardBody: Card.Body, CardFooter: Card.Footer },
  tags: ['autodocs'],
  argTypes: {
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
        description: 'Shadow size for the card.',
    },
    dismissible: {
      control: 'boolean',
        description: 'Enable dismissible behavior for the card.',
    },
    collapsible: {
      control: 'boolean',
      description: 'Enable collapsible behavior for the card.',
    },
    floatingFooter: {
      control: 'boolean',
      description: 'Show the footer at the bottom of the viewport when the original footer is out of view.',
    },
  },
} as Meta;

const Template: StoryFn<CardProps> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo.
      </Card.Body>
      <Card.Footer>
        Card Footer
      </Card.Footer>
    </>
  ),
  shadow: 'md',
};

export const Dismissible = Template.bind({});
Dismissible.args = {
  dismissible: true,
  children: (
    <>
      <Card.Header>Dismissible Card</Card.Header>
      <Card.Body>
        Click the close icon to dismiss the card.
      </Card.Body>
    </>
  ),
};

export const Collapsible = Template.bind({});
Collapsible.args = {
  collapsible: true,
  children: (
    <>
      <Card.Header>Collapsible Card</Card.Header>
      <Card.Body>
        This section can be collapsed. Click the chevron icon in the header.
      </Card.Body>
    </>
  ),
};

export const WithFloatingFooter = Template.bind({});
WithFloatingFooter.args = {
  children: (
    <>
      <Card.Header>Card with Floating Footer</Card.Header>
      <Card.Body>
        Scroll down to see the floating footer when the original footer is out of view.
      </Card.Body>
      <Card.Footer floating>
        Floating Footer
      </Card.Footer>
    </>
  ),
};

export const CustomIcons = Template.bind({});
CustomIcons.args = {
  dismissible: true,
  collapsible: true,
  children: (
    <>
      <Card.Header dismissIcon={<Icon icon="bi:trash-fill" />}>
        Card with Custom Icons
      </Card.Header>
      <Card.Body>
        This card uses custom icons for dismiss and collapse actions.
      </Card.Body>
    </>
  ),
};
