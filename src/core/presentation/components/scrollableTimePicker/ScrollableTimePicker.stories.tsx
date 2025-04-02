import { Meta, StoryObj } from '@storybook/react';
import ScrollableTimePicker from './ScrollableTimePicker.tsx';

import { useState } from 'react';

// TimePickerDemo wrapper to show selected values
const TimePickerDemo = () => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const handleStartTimeChange = (
    hour: number,
    minute: number,
    time: string,
  ) => {
    setStartTime(`${hour}:${minute.toString().padStart(2, '0')} ${time}`);
  };

  const handleEndTimeChange = (hour: number, minute: number, time: string) => {
    setEndTime(`${hour}:${minute.toString().padStart(2, '0')} ${time}`);
  };

  return (
    <div className="p-6 space-y-4 border rounded-lg shadow-md">
      <ScrollableTimePicker
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange}
      />

      <div className="mt-6 text-center">
        <p className="font-medium">선택된 시간:</p>
        <p>
          시작 시간:{' '}
          <span className="font-semibold">{startTime || '선택되지 않음'}</span>
        </p>
        <p>
          종료 시간:{' '}
          <span className="font-semibold">{endTime || '선택되지 않음'}</span>
        </p>
      </div>
    </div>
  );
};

const meta: Meta<typeof TimePickerDemo> = {
  title: 'Components/ScrollableTimePicker',
  component: TimePickerDemo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TimePickerDemo>;

export const Default: Story = {};
