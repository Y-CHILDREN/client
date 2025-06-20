import { Meta, StoryObj } from '@storybook/react';
import { EventNameInput } from './EventNameInput';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { FormValues } from '../../../pages/AddEventPage.tsx';

const EventNameInputWrapper = ({
  id = 'eventName',
  label = '이벤트 이름',
  inputText = '이벤트 이름을 입력하세요',
  hasError = false,
  errorMessage = '이벤트 이름은 필수입니다',
}: {
  id?: keyof FormValues;
  label?: string;
  inputText?: string;
  hasError?: boolean;
  errorMessage?: string;
}) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      eventName: '',
      location: '',
    },
    mode: 'onChange',
  });

  const mockErrors: FieldErrors = {};
  if (hasError) {
    mockErrors[id] = {
      type: 'required',
      message: errorMessage,
    };
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-md p-6 bg-white">
        <EventNameInput
          id={id}
          label={label}
          inputText={inputText}
          register={methods.register}
          errors={mockErrors}
        />
      </div>
    </FormProvider>
  );
};

const meta: Meta<typeof EventNameInputWrapper> = {
  title: 'components/EventNameInput',
  component: EventNameInputWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      control: { type: 'select' },
      options: ['eventName', 'description', 'location'],
      description: '입력 필드 ID',
    },
    label: {
      control: 'text',
      description: '입력 필드 라벨',
    },
    inputText: {
      control: 'text',
      description: '입력 필드 플레이스홀더',
    },
    hasError: {
      control: 'boolean',
      description: '에러 상태 표시 여부',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 'eventName',
    label: '이벤트 이름',
    inputText: '이벤트 이름을 입력하세요',
    hasError: false,
  },
};

export const WithError: Story = {
  args: {
    id: 'eventName',
    label: '이벤트 이름',
    inputText: '이벤트 이름을 입력하세요',
    hasError: true,
    errorMessage: '이벤트 이름은 필수입니다',
  },
};

export const Location: Story = {
  args: {
    id: 'location',
    label: '위치',
    inputText: '이벤트 위치를 입력하세요',
    hasError: false,
  },
};

export const Description: Story = {
  args: {
    id: undefined,
    label: '설명',
    inputText: '이벤트에 대한 설명을 입력하세요',
    hasError: false,
  },
};
