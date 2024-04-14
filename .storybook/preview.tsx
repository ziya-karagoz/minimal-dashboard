import React from "react";
import type { Preview } from "@storybook/react";
import "../src/index.css";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
const preview: Preview = {
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
