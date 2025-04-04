import { Meta, StoryObj } from '@storybook/react';
import EventFormDropDown from './EventFormDropDown';
import { useForm, FormProvider } from 'react-hook-form';
import { FormValues } from '../../../pages/AddEventPage.tsx';

const EventFormDropDownWrapper = ({
  index = 0,
  defaultCategory,
}: {
  index: number;
  defaultCategory?: string;
}) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      cost: Array(index + 1).fill({}), // index에 맞게 비용 항목 배열 생성
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="p-6 bg-white">
        <EventFormDropDown
          setValue={methods.setValue}
          index={index}
          defaultCategory={defaultCategory}
        />
      </div>
    </FormProvider>
  );
};

const meta: Meta<typeof EventFormDropDownWrapper> = {
  title: 'components/EventFormDropDown',
  component: EventFormDropDownWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    index: {
      control: { type: 'number' },
      description: '폼 내의 선택 항목의 인덱스',
    },
    defaultCategory: {
      control: { type: 'select' },
      options: ['입장료', '식비', '주차비', '기념품'],
      description: '기본 선택 항목',
    },
  },
};

export default meta;

type Story = StoryObj<typeof EventFormDropDownWrapper>;

export const Default: Story = {
  args: {
    index: 0,
    defaultCategory: undefined,
  },
};

export const WithDefaultCategory: Story = {
  args: {
    index: 0,
    defaultCategory: '식비',
  },
};

export const SecondCostItem: Story = {
  args: {
    index: 1,
    defaultCategory: '주차비',
  },
};
