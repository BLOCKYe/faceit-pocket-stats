import * as z from 'zod';

export const GameSchema = z.object({
  appid: z.number(),
  playtime_forever: z.number(),
  playtime_2weeks: z.union([z.number(), z.null()]).optional(),
});
export type GameType = z.infer<typeof GameSchema>;

export const GamesResponseSchema = z.object({
  game_count: z.number(),
  games: z.array(GameSchema),
});
export type GamesResponseType = z.infer<typeof GamesResponseSchema>;
