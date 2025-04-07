import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import { EventBottomSheetContent } from '../../src/core/presentation/components/event/eventBottomSheetContent/EventBottomSheetContent';
import '@testing-library/jest-dom';

vi.mock(
  '../../src/core/presentation/components/datePicker/DatePickerComponent.tsx',
  () => ({
    default: ({ onChange }: any) => (
      <div
        data-testid="datepicker"
        onClick={() =>
          onChange([new Date('2025-01-01'), new Date('2025-01-02')])
        }
      />
    ),
  }),
);

vi.mock(
  '../../src/core/presentation/components/scrollableTimePicker/ScrollableTimePicker.tsx',
  () => ({
    default: ({ onStartTimeChange, onEndTimeChange }: any) => (
      <div>
        <button
          data-testid="start-time"
          onClick={() => onStartTimeChange(3, 30, 'PM')}
        />
        <button
          data-testid="end-time"
          onClick={() => onEndTimeChange(6, 45, 'AM')}
        />
      </div>
    ),
  }),
);

describe('EventBottomSheetContent with mocks', () => {
  const renderWithForm = (ui: React.ReactNode, mockSetValue = vi.fn()) => {
    const Wrapper = () => {
      const methods = useForm();
      // mock setValue
      const methodsWithMock = { ...methods, setValue: mockSetValue };
      return <FormProvider {...methodsWithMock}>{ui}</FormProvider>;
    };
    render(<Wrapper />);
    return { mockSetValue };
  };

  it('renders mocked DatePickerComponent and ScrollableTimePicker', () => {
    renderWithForm(<EventBottomSheetContent />);
    expect(screen.getByTestId('datepicker')).toBeInTheDocument();
    expect(screen.getByTestId('start-time')).toBeInTheDocument();
    expect(screen.getByTestId('end-time')).toBeInTheDocument();
  });

  it('calls setValue when a date range is selected', () => {
    const { mockSetValue } = renderWithForm(<EventBottomSheetContent />);
    fireEvent.click(screen.getByTestId('datepicker'));

    expect(mockSetValue).toHaveBeenCalledWith('dateRange', {
      start: new Date('2025-01-01'),
      end: new Date('2025-01-02'),
    });
  });

  it('calls setValue when start time is selected', () => {
    const { mockSetValue } = renderWithForm(<EventBottomSheetContent />);
    fireEvent.click(screen.getByTestId('start-time'));

    expect(mockSetValue).toHaveBeenCalledWith(
      'dateRange',
      expect.objectContaining({
        start: expect.any(Date),
      }),
    );
  });

  it('calls setValue when end time is selected', () => {
    const { mockSetValue } = renderWithForm(<EventBottomSheetContent />);
    fireEvent.click(screen.getByTestId('end-time'));

    expect(mockSetValue).toHaveBeenCalledWith(
      'dateRange',
      expect.objectContaining({
        end: expect.any(Date),
      }),
    );
  });
});
