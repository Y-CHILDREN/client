import React from 'react';
import { describe, it, vi, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EventHeader } from '../../src/core/presentation/components/event/eventHeader/EventHeader.tsx';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('EventHeader', () => {
  it('renders the passed message', () => {
    renderWithRouter(<EventHeader message="일정 추가" />);
    expect(screen.getByText('일정 추가')).toBeInTheDocument();
  });

  it('navigates to /trip-detail when close icon is clicked', () => {
    renderWithRouter(<EventHeader message="일정 추가" />);
    const icon = screen.getByAltText('닫기 아이콘');
    fireEvent.click(icon);
    expect(mockNavigate).toHaveBeenCalledWith('/trip-detail');
  });
});
