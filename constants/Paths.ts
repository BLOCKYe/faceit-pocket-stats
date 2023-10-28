export const PATHS = {
  HOME: '/',
  PLAYERS: {
    PLAYER_ID: (playerId: string) => `/players/${playerId}`,
  },
  FACEIT: {
    MATCH_ROOM: (matchId: string) =>
      `https://www.faceit.com/en/cs2/room/${matchId}`,
  },
};

export default PATHS;
