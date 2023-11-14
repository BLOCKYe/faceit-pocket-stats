import { AxiosError } from 'axios';
import httpClient from '@/lib/apiClient';
import {
  PlayerDataType,
  SearchPlayerResponseType,
  SearchPlayerType,
} from '@/types/PlayerType';
import { MatchDataType } from '@/types/MatchTypes';
import { BanDataType } from '@/types/BanTypes';

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
 */
export const getPlayerMatches = async (
  playerId: string,
  start: number,
  limit: number
): Promise<MatchDataType> => {
  const GAME_ID = 'cs2';
  const response = await httpClient.get<MatchDataType>(
    `/players/${playerId}/games/${GAME_ID}/stats?offset=${start}&limit=${limit}`
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
  limit = 10
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
