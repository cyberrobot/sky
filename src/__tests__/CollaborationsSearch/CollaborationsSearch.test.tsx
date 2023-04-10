import React from 'react';
import CollaborationsSearch from '@/components/CollaborationsSearch';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

const data = [
  {
    id: 1,
    name: 'Al Pacino',
  },
  {
    id: 2,
    name: 'Robert De Niro',
  },
];

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: data }),
  })
) as jest.Mock;

describe('CollaborationsSearch', () => {
  test('should render two input fields and a button', () => {
    render(<CollaborationsSearch />);
    expect(screen.getByLabelText('Name 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Name 2')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  test('should render error message when form is submitted without values', () => {
    render(<CollaborationsSearch />);
    expect(screen.getByText('Search')).toBeInTheDocument();
    act(() => {
      screen.getByText('Search').click();
    });
    expect(screen.getByText('Please enter Name 1')).toBeInTheDocument();
    expect(screen.getByText('Please enter Name 2')).toBeInTheDocument();
  });

  test('should render error message when form is submitted with only one value', () => {
    render(<CollaborationsSearch />);
    act(() => {
      fireEvent.change(screen.getByLabelText('Name 1'), {
        target: { value: 'Al Pacino' },
      });
      screen.getByText('Search').click();
    });
    expect(screen.queryByText('Please enter Name 1')).not.toBeInTheDocument();
    expect(screen.getByText('Please enter Name 2')).toBeInTheDocument();
    act(() => {
      fireEvent.change(screen.getByLabelText('Name 1'), {
        target: { value: '' },
      });
      fireEvent.change(screen.getByLabelText('Name 2'), {
        target: { value: 'Al Pacino' },
      });
      screen.getByText('Search').click();
    });
    expect(screen.getByText('Please enter Name 1')).toBeInTheDocument();
    expect(screen.queryByText('Please enter Name 2')).not.toBeInTheDocument();
  });

  test('should fire onSearchExternalHandler when form is submitted with values', () => {
    const onSearchExternalHandler = jest
      .fn()
      .mockImplementation(async () => {});
    render(
      <CollaborationsSearch onSearchExternalHandler={onSearchExternalHandler} />
    );
    act(() => {
      fireEvent.change(screen.getByLabelText('Name 1'), {
        target: { value: 'Al Pacino' },
      });
      fireEvent.change(screen.getByLabelText('Name 2'), {
        target: { value: 'Robert De Niro' },
      });
      screen.getByText('Search').click();
    });
    waitFor(() => {
      expect(onSearchExternalHandler).toHaveBeenCalledTimes(1);
    });
  });
});
