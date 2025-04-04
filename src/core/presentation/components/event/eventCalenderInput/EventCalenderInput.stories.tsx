import { Meta, StoryObj } from '@storybook/react';
import { EventCalenderInput } from './EventCalenderInput';

const meta: Meta<typeof EventCalenderInput> = {
  title: 'components/EventCalenderInput',
  component: EventCalenderInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EventCalenderInput>;

const Default: Story = {
  args: {
    openBottomSheet: () => alert('Bottom sheet 열림'),
    dateRange: {
      start: null,
      end: null,
    },
    errors: {},
  },
};

const WithDates: Story = {
  args: {
    openBottomSheet: () => alert('Bottom sheet 열림'),
    dateRange: {
      start: new Date('2023-12-15T10:30:00'),
      end: new Date('2023-12-15T12:30:00'),
    },
    errors: {},
  },
};

const WithErrors: Story = {
  args: {
    openBottomSheet: () => alert('Bottom sheet 열림'),
    dateRange: {
      start: null,
      end: null,
    },
    errors: {
      dateRange: {
        type: 'required',
        message: 'Required',
      },
    },
  },
};

const WithCustomError: Story = {
  args: {
    openBottomSheet: () => alert('Bottom sheet opened!'),
    dateRange: {
      start: new Date('2023-12-15T14:30:00'),
      end: new Date('2023-12-15T13:30:00'),
    },
    errors: {
      dateRange: {
        type: 'validate',
        message: '종료 시간은 시작 시간보다 뒤여야 합니다.',
      },
    },
  },
};

export { Default, WithDates, WithErrors, WithCustomError };
