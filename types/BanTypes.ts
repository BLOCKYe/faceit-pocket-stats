import * as z from 'zod';

export const ItemSchema = z.object({
  nickname: z.string(),
  type: z.string(),
  reason: z.string(),
  game: z.string(),
  starts_at: z.coerce.date(),
  ends_at: z.coerce.date(),
  user_id: z.string(),
});
export type BanItemType = z.infer<typeof ItemSchema>;

export const BanDataTypeSchema = z.object({
  items: z.array(ItemSchema),
  start: z.number(),
  end: z.number(),
});
export type BanDataType = z.infer<typeof BanDataTypeSchema>;
