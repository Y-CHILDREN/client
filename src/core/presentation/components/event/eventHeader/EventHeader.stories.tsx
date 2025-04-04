import { Meta, StoryObj } from '@storybook/react';
import { EventHeader } from './EventHeader';
import { BrowserRouter } from 'react-router-dom';

const EventHeaderWrapper = ({ message }: { message: string }) => {
  return (
    <BrowserRouter>
      <EventHeader message={message} />
    </BrowserRouter>
  );
};

const meta: Meta<typeof EventHeaderWrapper> = {
  title: 'components/EventHeader',
  component: EventHeaderWrapper,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: '헤더에 표시될 메시지',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: '이벤트 추가',
  },
};

export const EditMode: Story = {
  args: {
    message: '이벤트 수정',
  },
};
