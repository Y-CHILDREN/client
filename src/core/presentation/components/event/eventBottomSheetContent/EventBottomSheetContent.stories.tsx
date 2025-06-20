import { Meta, StoryObj } from '@storybook/react';
import { EventBottomSheetContent } from './EventBottomSheetContent';
import { useForm, FormProvider } from 'react-hook-form';

const EventBottomSheetContentWrapper = () => {
  const methods = useForm();

  return (
    <div className="max-w-md p-6 mx-auto">
      <FormProvider {...methods}>
        <form>
          <EventBottomSheetContent />
        </form>
      </FormProvider>
    </div>
  );
};

const meta: Meta<typeof EventBottomSheetContentWrapper> = {
  title: 'components/EventBottomSheetContent',
  component: EventBottomSheetContentWrapper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
