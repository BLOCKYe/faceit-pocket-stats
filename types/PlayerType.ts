import * as z from 'zod';

export const SettingsSchema = z.object({
  language: z.string(),
});
export type PlayerSettingsType = z.infer<typeof SettingsSchema>;

export const PlatformsSchema = z.object({
  steam: z.string(),
});
export type PlayerPlatformsType = z.infer<typeof PlatformsSchema>;

export const IonsSchema = z.object({});
export type Ions = z.infer<typeof IonsSchema>;

export const Cs2Schema = z.object({
  region: z.string(),
  game_player_id: z.string(),
  skill_level: z.number(),
  faceit_elo: z.number(),
  game_player_name: z.string(),
  skill_level_label: z.string(),
  regions: IonsSchema,
  game_profile_id: z.string(),
});
export type PlayerCs2Type = z.infer<typeof Cs2Schema>;

export const GamesSchema = z.object({
  csgo: Cs2Schema,
  cs2: Cs2Schema,
});
export type PlayerGamesType = z.infer<typeof GamesSchema>;

export const PlayerDataTypeSchema = z.object({
  player_id: z.string(),
  nickname: z.string(),
  avatar: z.string(),
  country: z.string(),
  cover_image: z.string(),
  platforms: PlatformsSchema,
  games: GamesSchema,
  settings: SettingsSchema,
  friends_ids: z.array(z.string()),
  new_steam_id: z.string(),
  steam_id_64: z.string(),
  steam_nickname: z.string(),
  memberships: z.array(z.string()),
  faceit_url: z.string(),
  membership_type: z.string(),
  cover_featured_image: z.string(),
  infractions: IonsSchema,
  verified: z.boolean(),
  activated_at: z.coerce.date(),
});
export type PlayerDataType = z.infer<typeof PlayerDataTypeSchema>;
