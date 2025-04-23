import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EventSubmitButton } from '../../src/core/presentation/components/event/eventSubmitButton/EventSubmitButton';

describe('EventSubmitButton', () => {
  it('renders with given text', () => {
    render(<EventSubmitButton text="등록하기" disabled={false} />);
    expect(screen.getByRole('button')).toHaveTextContent('등록하기');
  });

  it('is disabled when disabled prop is true', () => {
    render(<EventSubmitButton text="등록하기" disabled={true} />);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
    expect(button).toHaveClass('cursor-not-allowed');
  });

  it('is enabled when disabled prop is false', () => {
    render(<EventSubmitButton text="등록하기" disabled={false} />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    expect(button).not.toHaveClass('opacity-50');
  });

  it('calls submit action on click when enabled', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <EventSubmitButton text="제출" disabled={false} />
      </form>,
    );

    await user.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalled();
  });
});
