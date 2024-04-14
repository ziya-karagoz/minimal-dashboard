import { Meta, StoryFn } from '@storybook/react';
import Skeleton from './Skeleton';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  subcomponents: { Text: Skeleton.Text },
  parameters: {
    controls: {
      include: ['line', 'bar'],
    },
  },
} as Meta;

const Template: StoryFn = (_) => <Skeleton />;

export const DefaultSkeleton = Template.bind({});
DefaultSkeleton.args = {};
