export const STEAM_URL = 'https://steamcommunity.com/';
export const FLAGS_URL = (countryCode: string, size = 64): string =>
  `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/${size}.png`;
