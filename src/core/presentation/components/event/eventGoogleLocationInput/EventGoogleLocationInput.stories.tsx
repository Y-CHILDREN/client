import { Meta, StoryObj } from '@storybook/react';
import { EventGoogleLocationInput } from './EventGoogleLocationInput';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { FormValues } from '../../../pages/AddEventPage.tsx';

const EventGoogleLocationInputWrapper = ({
  hasError = false,
  errorMessage = '위치를 입력해 주세요.',
  defaultLocation,
}: {
  hasError?: boolean;
  errorMessage?: string;
  defaultLocation?: string;
}) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      location: '',
    },
    mode: 'onChange',
  });

  const mockErrors: FieldErrors<FormValues> = {};
  if (hasError) {
    mockErrors.location = {
      type: 'required',
      message: errorMessage,
    };
  }

  return (
    <FormProvider {...methods}>
      <div className="max-w-md p-6 bg-white">
        <EventGoogleLocationInput
          setValue={methods.setValue}
          errors={mockErrors}
          defaultLocation={defaultLocation}
        />
      </div>
    </FormProvider>
  );
};

const meta: Meta<typeof EventGoogleLocationInputWrapper> = {
  title: 'components/EventGoogleLocationInput',
  component: EventGoogleLocationInputWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasError: {
      control: 'boolean',
      description: '에러 상태 표시 여부',
    },
    errorMessage: {
      control: 'text',
      description: '에러 메시지',
    },
    defaultLocation: {
      control: 'text',
      description: '기본 위치',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    hasError: false,
    defaultLocation: undefined,
  },
};

export const WithError: Story = {
  args: {
    hasError: true,
    errorMessage: '위치를 입력해 주세요.',
  },
};

export const WithDefaultLocation: Story = {
  args: {
    hasError: false,
    defaultLocation: '서울 강남구 테헤란로',
  },
};

export const WithSpecificLocation: Story = {
  args: {
    hasError: false,
    defaultLocation: '부산 해운대구 해운대해변로',
  },
};
