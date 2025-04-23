import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import '@testing-library/jest-dom';
import type { FormValues } from '../../src/core/presentation/pages/AddEventPage.tsx';
import EventFormDropDown from '../../src/core/presentation/components/event/eventFormDropDown/EventFormDropDown';

const renderWithForm = (defaultCategory?: string) => {
  const Wrapper = () => {
    const method = useForm<FormValues>({
      defaultValues: {
        cost: [{ category: defaultCategory || '', value: 0 }],
      },
    });
    return (
      <FormProvider {...method}>
        <EventFormDropDown
          index={0}
          setValue={method.setValue}
          defaultCategory={defaultCategory}
        />
      </FormProvider>
    );
  };
  return render(<Wrapper />);
};

describe('EventFormDropDown', () => {
  it('renders with default "항목 선택" when no defaultCategory is provided', () => {
    renderWithForm();
    expect(screen.getByText('항목 선택')).toBeInTheDocument();
  });

  it('shows the defaultCategory if provided', () => {
    renderWithForm('식비');
    expect(screen.getByText('식비')).toBeInTheDocument();
  });

  it('opens dropdown when button is clicked', () => {
    renderWithForm();
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('입장료')).toBeInTheDocument();
    expect(screen.getByText('식비')).toBeInTheDocument();
  });

  it('selects an item and updates the label', () => {
    renderWithForm();
    const button = screen.getByRole('button');
    fireEvent.click(button);

    const item = screen.getByText('기념품');
    fireEvent.click(item);

    expect(screen.getByText('기념품')).toBeInTheDocument();
  });
});
