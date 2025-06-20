import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { EventNameInput } from '../../src/core/presentation/components/event/eventNameInput/EventNameInput.tsx';
import type { FormValues } from '../../src/core/presentation/pages/AddEventPage.tsx';

const renderWithForm = (
  defaultValues: Partial<FormValues> = {},
  errors: Partial<
    Record<keyof FormValues, { message: string; type: string }>
  > = {},
) => {
  const TestComponent = () => {
    const { register } = useForm<FormValues>({ defaultValues });
    return (
      <EventNameInput
        id={'cost'}
        label="행사명"
        inputText="행사 이름을 입력해 주세요"
        register={register}
        errors={errors}
      />
    );
  };

  render(<TestComponent />);
};

describe('EventNameInput', () => {
  it('renders label, input, and placeholder', () => {
    renderWithForm();

    expect(screen.getByLabelText('행사명')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('행사 이름을 입력해 주세요'),
    ).toBeInTheDocument();
    expect(screen.getByText('행사명')).toBeInTheDocument();
  });

  it('allows typing in the input', () => {
    renderWithForm();

    const input = screen.getByPlaceholderText(
      '행사 이름을 입력해 주세요',
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '축제' } });

    expect(input.value).toBe('축제');
  });

  it('shows an error message when errors are present', () => {
    renderWithForm(
      {},
      {
        cost: {
          type: 'required',
          message: '행사명을 입력해 주세요.',
        },
      },
    );

    expect(screen.getByText('행사명을 입력해 주세요.')).toBeInTheDocument();
  });
});
