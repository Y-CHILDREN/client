import type { Meta, StoryObj } from '@storybook/react';
import { BottomSheet } from './BottomSheet.tsx';

const meta: Meta<typeof BottomSheet> = {
  title: 'components/BottomSheet',
  component: BottomSheet,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isOpen: { control: 'boolean' },
  },
  args: {
    isOpen: false,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Control: Story = {};
