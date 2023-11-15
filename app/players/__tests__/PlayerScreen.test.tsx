import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PlayerScreen from '../(players)/PlayerScreen';
import GamesEnum from '@/constants/gamesEnum';

// Mock useRouter:
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const queryClient = new QueryClient();
const props = {
  playerId: "4aaa1a9c-5469-4724-89c1-e5649b6e3011'",
};

describe('PlayerScreen', () => {
  it('should render information about not existing player', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PlayerScreen {...props} game={GamesEnum.CS2} />
      </QueryClientProvider>
    ); // ARRANGE

    const element = screen.getByText('Player not found!');
    expect(element).toBeInTheDocument();
  });
});
