import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import QuillEditor from './QuillEditor';
import { QuillEditorProps } from './QuillEditor.types';
import { Provider } from 'react-redux';
import { store } from '@app/store';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/QuillEditor',
  tags: ['autodocs'],
  component: QuillEditor,
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
    editorHtml: {
      control: 'text',
      description: 'The HTML content of the editor.',
    },
    placeholder: {
      control: 'text',
      defaultValue: 'Harika bir şey yaz...',
      description: 'Placeholder text for the editor when empty.',
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes the editor read-only if true.',
    },
  },
} as Meta;

const Template: StoryFn<QuillEditorProps> = (args) => <QuillEditor {...args} />;

export const Editable = Template.bind({});
Editable.args = {
  setEditorHtml: (event, name, value) => console.log(`Content updated (${name}): `, value),
  editorHtml: '',
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  setEditorHtml: (event, name, value) => console.log(`Content updated (${name}): `, value),
  editorHtml: '<p>This is some static content</p>',
  readOnly: true,
};

export const WithInitialContent = Template.bind({});
WithInitialContent.args = {
  setEditorHtml: (event, name, value) => console.log(`Content updated (${name}): `, value),
  editorHtml: '<p>Here is some initial content loaded into the editor</p>',
};
