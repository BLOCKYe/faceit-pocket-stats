import GamesEnum from '@/constants/gamesEnum';

export const PATHS = {
  HOME: '/',
  PLAYERS: {
    PLAYER_ID: (playerId: string, game = GamesEnum.CS2) =>
      `/players/${playerId}/${game}`,
  },
  FACEIT: {
    MATCH_ROOM: (matchId: string) =>
      `https://www.faceit.com/en/cs2/room/${matchId}`,
  },
};

export default PATHS;
