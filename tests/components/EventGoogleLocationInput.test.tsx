import { render, screen, waitFor } from '@testing-library/react';
import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import React from 'react';
import { EventGoogleLocationInput } from '../../src/core/presentation/components/event/eventGoogleLocationInput/EventGoogleLocationInput.tsx';

const mockSetValue = vi.fn();

vi.mock('react-google-places-autocomplete', async () => {
  const actual = await vi.importActual('react-google-places-autocomplete');
  return {
    ...actual,
    __esModule: true,
    default: ({ selectProps }: any) => (
      <input
        placeholder={selectProps.placeholder}
        onChange={(e) =>
          selectProps.onChange({ label: e.target.value, value: {} })
        }
      />
    ),
  };
});

describe('EventGoogleLocationInput', () => {
  beforeEach(() => {
    globalThis.google = {
      maps: {
        places: {
          PlacesService: vi.fn().mockImplementation(() => ({
            textSearch: vi.fn((_, cb) =>
              cb(
                [
                  {
                    name: 'Test Place',
                    place_id: '123',
                    formatted_address: '서울특별시',
                  },
                ],
                'OK',
              ),
            ),
          })),
          PlacesServiceStatus: { OK: 'OK' },
        },
      },
    } as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders location label and placeholder', async () => {
    render(<EventGoogleLocationInput setValue={mockSetValue} errors={{}} />);

    expect(screen.getByText('장소')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByPlaceholderText('주소 입력')).toBeInTheDocument();
    });
  });

  it('renders error message when location has error', async () => {
    render(
      <EventGoogleLocationInput
        setValue={mockSetValue}
        errors={{
          location: { type: 'manual', message: '위치를 입력해 주세요.' },
        }}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('위치를 입력해 주세요.')).toBeInTheDocument();
    });
  });

  it('loads defaultLocation if provided', async () => {
    render(
      <EventGoogleLocationInput
        setValue={mockSetValue}
        errors={{}}
        defaultLocation="서울"
      />,
    );

    await waitFor(() => {
      expect(mockSetValue).toHaveBeenCalledWith('location', '서울특별시', {
        shouldValidate: true,
      });
    });
  });
});
