import type { Meta, StoryObj } from '@storybook/react';
import { EventCostInput } from './EventCostInput.tsx';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../../pages/AddEventPage.tsx';

const EventCostInputWrapper = ({
  defaultCosts = [{ category: '식비', value: 0 }],
}) => {
  const { register, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      cost: defaultCosts,
    },
  });

  return (
    <div className="max-w-md p-6 mx-auto">
      <form>
        <EventCostInput
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </form>
    </div>
  );
};

const meta: Meta<typeof EventCostInputWrapper> = {
  title: 'components/EventCostInput',
  component: EventCostInputWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof EventCostInputWrapper>;

export const Default: Story = {};

export const WithMultipleCosts: Story = {
  args: {
    defaultCosts: [
      { category: '식비', value: 15000 },
      { category: '교통비', value: 5000 },
      { category: '기타', value: 3000 },
    ],
  },
};
