import React from "react";
import type { Preview } from "@storybook/react";
import "../src/index.css";
import { MemoryRouter, Routes, Route } from "react-router";



const preview: Preview = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
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
