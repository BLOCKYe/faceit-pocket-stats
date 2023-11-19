import { AxiosInstance } from 'axios';
import { NextResponse } from 'next/server';
import HttpClientBuilder from '@/utils/HttpClientBuilder';

const httpClient: AxiosInstance = new HttpClientBuilder()
  .baseURL(process.env.NEXT_PUBLIC_API_STEAM_URL)
  .params({ key: process.env.NEXT_PUBLIC_API_STEAM_KEY })
  .build();

export async function GET(request: Request, context: any) {
  try {
    const response = await httpClient.get(
      `/ISteamUser/ResolveVanityURL/v0001/?vanityurl=${context.params.playerUrl}`
    );

    if (response?.data?.response?.steamid) {
      return NextResponse.json({
        status: 200,
        data: response.data.response.steamid,
      });
    } else {
      return NextResponse.json({
        status: 404,
        message: 'Not found',
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: 'Server error',
    });
  }
}
