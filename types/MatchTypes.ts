import * as z from 'zod';

export const GameSchema = z.enum(['cs2']);
export type MatchGameType = z.infer<typeof GameSchema>;

export const GameModeSchema = z.enum(['5v5']);
export type MatchGameModeType = z.infer<typeof GameModeSchema>;

export const MapSchema = z.enum([
  'de_ancient',
  'de_inferno',
  'de_mirage',
  'de_overpass',
]);
export type MatchMapType = z.infer<typeof MapSchema>;

export const NicknameSchema = z.enum(['DODO__X']);
export type MatchNicknameType = z.infer<typeof NicknameSchema>;

export const RegionSchema = z.enum(['EU']);
export type MatchRegionType = z.infer<typeof RegionSchema>;

export const StatsSchema = z.object({
  'K/D Ratio': z.string(),
  'Best Of': z.string(),
  Winner: z.string(),
  Rounds: z.string(),
  MVPs: z.string(),
  'Second Half Score': z.string(),
  'Updated At': z.coerce.date(),
  'Triple Kills': z.string(),
  'Competition Id': z.string(),
  Map: MapSchema,
  'Created At': z.coerce.date(),
  Headshots: z.string(),
  Assists: z.string(),
  'Final Score': z.string(),
  Nickname: NicknameSchema,
  'Quadro Kills': z.string(),
  Score: z.string(),
  Kills: z.string(),
  'Player Id': z.string(),
  'K/R Ratio': z.string(),
  Team: z.string(),
  'Match Round': z.string(),
  'Game Mode': GameModeSchema,
  'First Half Score': z.string(),
  Game: GameSchema,
  'Overtime score': z.string(),
  Result: z.string(),
  Region: RegionSchema,
  'Match Id': z.string(),
  Deaths: z.string(),
  'Penta Kills': z.string(),
  'Headshots %': z.string(),
});
export type MatchStatsType = z.infer<typeof StatsSchema>;

export const ItemSchema = z.object({
  stats: StatsSchema,
});
export type MatchItemType = z.infer<typeof ItemSchema>;

export const MatchDataTypeSchema = z.object({
  items: z.array(ItemSchema),
  start: z.number(),
  end: z.number(),
});
export type MatchDataType = z.infer<typeof MatchDataTypeSchema>;
