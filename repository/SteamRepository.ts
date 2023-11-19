import HttpClientBuilder from '@/lib/HttpClientBuilder';
import { AxiosInstance } from 'axios';

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
