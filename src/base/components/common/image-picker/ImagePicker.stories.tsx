import { Meta, StoryFn } from '@storybook/react';
import ImagePicker from './ImagePicker';
import { ImagePickerProps } from './ImagePicker.types';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/ImagePicker',
  component: ImagePicker,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Provider store={store}>
                <BrowserRouter>
                    <Story />
                </BrowserRouter>
            </Provider>
        ),
        ],
  argTypes: {
    value: {
      control: 'text',
      description: 'The current selected image URL.',
    },
    onChange: {
      action: 'onChange',
      description: 'Function that handles changes to the selected image.',
    },
    exClass: {
      control: 'text',
      description: 'Extra CSS classes to apply for customization.',
    },
  },
} as Meta;

const Template: StoryFn<ImagePickerProps> = (args) => <ImagePicker {...args} />;

export const NoImageSelected = Template.bind({});
NoImageSelected.args = {
  value: null,
  onChange: (value: string | null) => console.log("Selected Image URL:", value),
};

export const WithImageSelected = Template.bind({});
WithImageSelected.args = {
  value: 'https://via.placeholder.com/150',
  onChange: (value: string | null) => console.log("Selected Image URL:", value),
};
