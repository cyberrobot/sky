import Ratings from '@/components/Ratings';
import { render, screen } from '@testing-library/react';

describe('RatingsComponent', () => {
  test('should render voteAverage', () => {
    render(<Ratings voteAverage={8.3} />);
    expect(screen.getByText('8.3')).toBeInTheDocument();
  });

  test('should render voteCount', () => {
    render(<Ratings voteAverage={8.3} voteCount={123} />);
    expect(screen.getByText('8.3')).toBeInTheDocument();
    expect(screen.getByText('Votes: 123')).toBeInTheDocument();
  });
});
