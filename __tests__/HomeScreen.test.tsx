import { render, screen } from '@testing-library/react';
import HomeScreen from '@/app/(home)/HomeScreen';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const queryClient = new QueryClient();

describe('HomeScreen', () => {
  it('should have a heading', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    ); // ARRANGE

    const header = screen.getByRole('heading', { name: 'Faceit Pocket Stats' }); // ACTION

    expect(header).toBeInTheDocument(); // ASSERT
  });

  it('should have search player input', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    ); // ARRANGE

    const input = screen.getByPlaceholderText('Search player...'); // ACTION

    expect(input).toBeInTheDocument(); // ASSERT
  });

  it('should have form submit button', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    ); // ARRANGE

    const button = screen.getByTestId('submit-button'); // ACTION

    expect(button).toBeInTheDocument(); // ASSERT
  });
});
