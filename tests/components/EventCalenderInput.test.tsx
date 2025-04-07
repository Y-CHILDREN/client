import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { EventCalenderInput } from '../../src/core/presentation/components/event/eventCalenderInput/EventCalenderInput';
import type { FieldErrors } from 'react-hook-form';
import { FormValues } from '../../src/core/presentation/pages/AddEventPage';
import '@testing-library/jest-dom';

describe('EventCalenderInput', () => {
  const setup = ({
    dateRange = { start: null, end: null },
    errors = {},
    openBottomSheet = vi.fn(),
  }: {
    dateRange?: { start?: Date | null; end?: Date | null };
    errors?: FieldErrors<FormValues>;
    openBottomSheet?: () => void;
  }) => {
    return render(
      <EventCalenderInput
        openBottomSheet={openBottomSheet}
        dateRange={dateRange}
        errors={errors}
      />,
    );
  };

  it('renders the input buttons and default texts', () => {
    setup({});

    expect(screen.getByText('일정')).toBeInTheDocument();
    expect(screen.getByText('시작 일시')).toBeInTheDocument();
    expect(screen.getByText('종료 일시')).toBeInTheDocument();
  });

  it('renders formatted date values when dateRange is provided', () => {
    const start = new Date('2025-04-07T10:30:00');
    const end = new Date('2025-04-07T12:00:00');

    setup({ dateRange: { start, end } });

    expect(screen.getByText('2025.04.07 10:30')).toBeInTheDocument();
    expect(screen.getByText('2025.04.07 12:00')).toBeInTheDocument();
  });

  it('calls openBottomSheet when buttons are clicked', () => {
    const openBottomSheet = vi.fn();
    setup({ openBottomSheet });

    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);

    expect(openBottomSheet).toHaveBeenCalledTimes(2);
  });

  it('shows error message when dateRange has an error', () => {
    const errors: FieldErrors<FormValues> = {
      dateRange: {
        message: '시작일과 종료일은 반드시 입력되어야 합니다.',
        type: 'required',
      },
    };

    setup({ errors });

    expect(
      screen.getByText('시작일과 종료일은 반드시 입력되어야 합니다.'),
    ).toBeInTheDocument();
  });

  it('shows default error message when error message is "Required"', () => {
    const errors: FieldErrors<FormValues> = {
      dateRange: {
        message: 'Required',
        type: 'required',
      },
    };

    setup({ errors });

    expect(
      screen.getByText('시작일과 종료일 값은 필수입니다.'),
    ).toBeInTheDocument();
  });
});
