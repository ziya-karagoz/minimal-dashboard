import { Meta, StoryFn } from '@storybook/react';
import Avatar from './Avatar';
import { AvatarProps } from './Avatar.types';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl']
    },
    shape: {
      control: 'select',
      options: ['rounded', 'circle']
    },
    bordered: {
      control: 'boolean',
    },
  },
} as Meta;

const Template: StoryFn<AvatarProps> = (args) => <Avatar {...args} />;

const StackedTemplate: StoryFn<AvatarProps> = () => (
  <div className='ms-4 mb-4'>
                <h5 className="mb-2 text-gray-600 text-xl">Stacked</h5>
                <div className="flex items-center space-x-4">
                    <div className="flex -space-x-4">
                        <Avatar
                            size="lg"
                            initial='ZK'
                            shape="circle"
                            src="/media/avatars/300-8.jpg"
                            alt="User's Name"

                        />
                        <Avatar
                            size="lg"
                            initial='ZK'
                            shape="circle"
                            src="/media/avatars/300-9.jpg"
                            alt="User's Name"

                        />
                        <Avatar
                            size="lg"
                            initial='ZK'
                            shape="circle"
                            src="/media/avatars/300-10.jpg"
                            alt="User's Name"

                        />
                        <Avatar
                            size="lg"
                            initial='+91'
                            shape="circle"
                            alt="User's Name"
                        />
                    </div>

                </div>
            </div>
);

export const Default = Template.bind({});
Default.args = {
  src: '/media/avatars/300-1.jpg',
  alt: 'Avatar',
  size: 'md',
  shape: 'circle'
};

export const WithInitials = Template.bind({});
WithInitials.args = {
  initial: 'AB',
  size: 'lg',
  shape: 'rounded'
};

export const Bordered = Template.bind({});
Bordered.args = {
  src: '/media/avatars/300-11.jpg',
  bordered: true,
  size: 'xl',
  shape: 'circle'
};

export const WithIndicator = Template.bind({});
WithIndicator.args = {
  src: '/media/avatars/300-12.jpg',
  size: '2xl',
  shape: 'circle',
  indicator: {
    color: 'green',
    position: 'bottom-right'
  }
};

export const Stacked = StackedTemplate.bind({});