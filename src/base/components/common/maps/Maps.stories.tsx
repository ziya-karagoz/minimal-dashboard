import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { SimpleMapProps } from './Maps.types';
import SimpleMap from './Maps';

export default {
  title: 'Components/SimpleMap',
  component: SimpleMap,
  tags: ['autodocs'],
  argTypes: {
    isRoute: {
      control: 'boolean',
      description: 'If true, adds a route based on waypoints; if false, adds a single marker based on location.',
    },
    location: {
      control: 'object',
      description: 'Location for the single marker.',
    },
    waypoints: {
      control: 'object',
      description: 'List of waypoints for route creation.',
    },
    additionalMarkers: {
      control: 'object',
      description: 'Additional markers with custom icons.',
    },
    size: {
      control: 'object',
      description: 'Specifies the dimensions of the map.',
    },
  },
} as Meta;

const Template: StoryFn<SimpleMapProps> = (args) => <SimpleMap {...args} />;

export const DefaultLocation = Template.bind({});
DefaultLocation.args = {
  isRoute: false,
  location: { lat: 40.712776, lng: -74.005974 }, // Example coordinates (New York)
};

export const RouteWithWaypoints = Template.bind({});
RouteWithWaypoints.args = {
  isRoute: true,
  waypoints: [
    { lat: 40.712776, lng: -74.005974 }, // New York
    { lat: 39.952583, lng: -75.165222 }, // Philadelphia
    { lat: 38.907192, lng: -77.036871 }, // Washington D.C.
  ],
};

export const WithAdditionalMarkers = Template.bind({});
WithAdditionalMarkers.args = {
  isRoute: false,
  location: { lat: 40.712776, lng: -74.005974 }, // New York
  additionalMarkers: [
    {
      location: { lat: 40.71427, lng: -74.00597 },
      icon: {
        url: 'https://example.com/custom-marker.png',
        scaledSize: 30,
      },
      title: 'Custom Marker',
    },
  ],
};
