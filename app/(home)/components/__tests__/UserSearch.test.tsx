import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserSearch from '@/app/(home)/components/UserSearch';
import userEvent from '@testing-library/user-event';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: jest.fn(),
    };
  },
}));

const queryClient = new QueryClient();

describe('UserSearch', () => {
  describe('render', () => {
    it('should have search player input', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <UserSearch />
        </QueryClientProvider>
      ); // ARRANGE

      const input = screen.getByPlaceholderText(
        'Player nickname / steam profile link...'
      ); // ACTION

      expect(input).toBeInTheDocument(); // ASSERT
    });

    it('should have search player input', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <UserSearch />
        </QueryClientProvider>
      ); // ARRANGE

      const input = screen.getByPlaceholderText(
        'Player nickname / steam profile link...'
      ); // ACTION

      expect(input).toBeInTheDocument(); // ASSERT
    });

    it('should have form submit button', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <UserSearch />
        </QueryClientProvider>
      ); // ARRANGE

      const button = screen.getByTestId('submit-button'); // ACTION

      expect(button).toBeInTheDocument(); // ASSERT
    });
  });

  describe('behavior', () => {
    it('should be able to insert text to the input', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <UserSearch />
        </QueryClientProvider>
      ); // ARRANGE

      const input = screen.getByPlaceholderText(
        'Player nickname / steam profile link...'
      ); // ACTION
      await userEvent.type(input, 'TaZ');

      expect(input).toHaveValue('TaZ'); // ASSERT
    });

    it('should display information about to short text', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <UserSearch />
        </QueryClientProvider>
      ); // ARRANGE

      // ACTION
      const input = screen.getByPlaceholderText(
        'Player nickname / steam profile link...'
      );
      await userEvent.type(input, 'T');
      const errorElement = screen.getByTestId('error-message');
      const button = screen.getByTestId('submit-button'); // ACTION
      await userEvent.click(button);

      expect(errorElement).toHaveTextContent(
        'Nickname must be at least 2 characters.'
      ); // ASSERT
    });

    it('should disable button after create request', async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <UserSearch />
        </QueryClientProvider>
      ); // ARRANGE

      // ACTION
      const input = screen.getByPlaceholderText(
        'Player nickname / steam profile link...'
      );
      await userEvent.type(input, 'DODO__X');
      const button = screen.getByTestId('submit-button');
      await userEvent.click(button);
      await waitFor(() => {
        expect(button).toBeDisabled();
      });
    });
  });
});
