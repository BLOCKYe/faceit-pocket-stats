import HttpClientBuilder from '@/utils/HttpClientBuilder';
import { AxiosInstance } from 'axios';
import { GamesResponseType, GameType } from '@/types/GamesTypes';

const httpClient: AxiosInstance = new HttpClientBuilder()
  .baseURL(process.env.NEXT_PUBLIC_BACKEND_API)
  .build();

/**
 * This function is used to get player steamid by his profile url
 * @param urlName
 */
export const getSteamidByPlayerUrl = async (
  urlName: string
): Promise<string> => {
  const response = await httpClient.get(`/api/SteamService/player/${urlName}`);
  return response.data.data;
};

/**
 * This function is used to get player's games owned
 * @param steamid
 */
export const getPlayerGames = async (steamid?: string): Promise<GameType[]> => {
  if (!steamid) return [];

  const response = await httpClient.get<{ data: GameType[] }>(
    `/api/SteamService/player/games/${steamid}`
  );
  return response?.data?.data ?? [];
};
