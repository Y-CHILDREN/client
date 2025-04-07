import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import '@testing-library/jest-dom';
import type { FormValues } from '../../src/core/presentation/pages/AddEventPage.tsx';
import { EventCostInput } from '../../src/core/presentation/components/event/eventCostInput/EventCostInput';

const renderWithForm = () => {
  const Wrapper = () => {
    const method = useForm<FormValues>({
      defaultValues: {
        cost: [],
      },
    });
    return (
      <FormProvider {...method}>
        <EventCostInput
          register={method.register}
          setValue={method.setValue}
          getValues={method.getValues}
        />
      </FormProvider>
    );
  };
  return render(<Wrapper />);
};

describe('EventCostInput', () => {
  it('renders one cost input initially', () => {
    renderWithForm();
    const inputs = screen.getAllByRole('spinbutton'); // number input type
    expect(inputs.length).toBe(1);
    expect(screen.getByText('경비')).toBeInTheDocument();
  });

  it('adds a new cost input when "경비 추가" button is clicked', () => {
    renderWithForm();

    const addButton = screen.getByRole('button', { name: /경비 추가/i });
    fireEvent.click(addButton);

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBe(2); // should have two inputs now
  });

  it('removes a cost input when trash icon is clicked', () => {
    renderWithForm();

    const addButton = screen.getByRole('button', { name: /경비 추가/i });
    fireEvent.click(addButton); // add second input

    let inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBe(2);

    const trashButtons = screen.getAllByRole('button', {
      name: /쓰레기통 아이콘/i,
    });
    fireEvent.click(trashButtons[0]); // remove first input

    inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBe(1);
  });

  it('resets input if last remaining field is deleted', () => {
    renderWithForm();

    const trashButton = screen.getByRole('button', {
      name: /쓰레기통 아이콘/i,
    });
    fireEvent.click(trashButton);

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBe(1);
  });
});
