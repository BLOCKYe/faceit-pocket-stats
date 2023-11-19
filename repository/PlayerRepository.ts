import { AxiosError, AxiosInstance } from 'axios';
import {
  PlayerDataType,
  SearchPlayerResponseType,
  SearchPlayerType,
} from '@/types/PlayerType';
import { MatchDataType } from '@/types/MatchTypes';
import { BanDataType } from '@/types/BanTypes';
import GamesEnum from '@/constants/gamesEnum';
import HttpClientBuilder from '@/utils/HttpClientBuilder';

const httpClient: AxiosInstance = new HttpClientBuilder()
  .baseURL(process.env.NEXT_PUBLIC_API_FACEIT_URL)
  .headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_FACEIT_KEY}`,
  })
  .build();

/**
 * This function is used to
 * get basic player data
 * by nickname or steam profile
 * @param param
 */
export const getPlayer = async (param: string): Promise<PlayerDataType> => {
  const GAME_ID = 'cs2';
  const response = await httpClient.get<PlayerDataType>(
    `/players?game=${GAME_ID}&${param}`
  );
  return response.data;
};

/**
 * This function is used to
 * get basic plater data
 * by playerId
 * @param playerId
 */
export const getPlayerById = async (
  playerId: string
): Promise<PlayerDataType> => {
  const response = await httpClient.get<PlayerDataType>(`/players/${playerId}`);
  return response.data;
};

/**
 * This function is used to
 * get basic plater data
 * by playerId
 * @param playerId
 * @param start
 * @param limit
 * @param game
 */
export const getPlayerMatches = async (
  playerId: string,
  start: number,
  limit: number,
  game: GamesEnum
): Promise<MatchDataType> => {
  const response = await httpClient.get<MatchDataType>(
    `/players/${playerId}/games/${game}/stats?offset=${start}&limit=${limit}`
  );
  return response.data;
};

/**
 * This function is used to
 * get basic plater data
 * by playerId
 * @param playerId
 * @param start
 * @param limit
 */
export const getPlayerBans = async (
  playerId: string,
  start: number,
  limit: number
): Promise<BanDataType> => {
  const response = await httpClient.get<BanDataType>(
    `/players/${playerId}/bans?offset=${start}&limit=${limit}`
  );
  return response.data;
};

/**
 * This function is used to search players
 * by nickname
 * @param nickname
 * @param start
 * @param limit
 */
export const searchPlayers = async (
  nickname: string,
  start = 0,
  limit = 5
): Promise<SearchPlayerType[]> => {
  const response = await httpClient.get<SearchPlayerResponseType>(
    `/search/players?nickname=${nickname}&offset=${start}&limit=${limit}`
  );
  if (response.data.items && response.data.items.length > 0) {
    return response.data.items;
  } else {
    throw new AxiosError();
  }
};
