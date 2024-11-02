import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DropDown, { DropDownProps } from './DropDown';

// Meta configuration
const meta: Meta<DropDownProps> = {
  title: 'Components/DropDown',
  component: DropDown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    options: {
      control: 'object',
      description: 'Options for the dropdown',
    },
  },
};
export default meta;

// Custom handler for demonstration
const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(`Selected value: ${event.target.value}`);
};

// Template for stories
const Template: StoryObj<DropDownProps> = {
  args: {
    placeholder: 'Select an option',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
    onChange: onChangeHandler,
  },
};

// Primary story
export const Primary: StoryObj<DropDownProps> = {
  ...Template,
  args: {
    ...Template.args,
    value: 'option1',
  },
};

// Disabled Dropdown
export const Disabled: StoryObj<DropDownProps> = {
  ...Template,
  args: {
    ...Template.args,
  },
};

// Error state Dropdown
export const WithError: StoryObj<DropDownProps> = {
  ...Template,
  args: {
    ...Template.args,
    className: 'border-red-500',
    placeholder: 'Error State',
  },
};
