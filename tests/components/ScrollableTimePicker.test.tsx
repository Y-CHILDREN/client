import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import ScrollableTimePicker from '../../src/core/presentation/components/scrollableTimePicker/ScrollableTimePicker.tsx';

describe('ScrollableTimePicker', () => {
  it('renders start time picker initially', () => {
    render(
      <ScrollableTimePicker
        onStartTimeChange={vi.fn()}
        onEndTimeChange={vi.fn()}
      />,
    );

    expect(screen.getByText('시작 시간')).toBeInTheDocument();
  });

  it('calls onStartTimeChange on first save, then onEndTimeChange on second', () => {
    const mockStart = vi.fn();
    const mockEnd = vi.fn();

    render(
      <ScrollableTimePicker
        onStartTimeChange={mockStart}
        onEndTimeChange={mockEnd}
      />,
    );

    const saveBtn = screen.getByRole('button', { name: '저장' });

    // 첫 번째 저장 → 시작 시간 저장
    fireEvent.click(saveBtn);
    expect(mockStart).toHaveBeenCalledWith(0, 0, 'AM');

    // 두 번째 저장 → 종료 시간 저장
    fireEvent.click(saveBtn);
    expect(mockEnd).toHaveBeenCalledWith(0, 0, 'AM');
  });

  it('updates selected hour when scrolled', () => {
    render(
      <ScrollableTimePicker
        onStartTimeChange={vi.fn()}
        onEndTimeChange={vi.fn()}
      />,
    );

    const hourScroll = screen.getByTestId('hour-scroll');

    // 스크롤 위치를 한 칸 아래로 (40px per item)
    fireEvent.scroll(hourScroll, { target: { scrollTop: 40 } });

    const saveBtn = screen.getByRole('button', { name: '저장' });
    fireEvent.click(saveBtn);

    // hour가 1로 바뀌었는지 확인
    expect(hourScroll.querySelector('.font-bold')).toHaveTextContent('1');
  });
});
