import { Meta, StoryObj } from '@storybook/react';
import { EventSubmitButton } from './EventSubmitButton';

const meta: Meta<typeof EventSubmitButton> = {
  title: 'components/EventSubmitButton',
  component: EventSubmitButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: '저장하기',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    text: '저장하기',
    disabled: true,
  },
};
