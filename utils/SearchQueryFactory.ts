import { getSteamidByPlayerUrl } from '@/repository/SteamRepository';

enum LINK_TYPES {
  PROFILE_URL = 'profile_url',
  STEAMID = 'steamid',
}

enum PROFILE_LINKS_KEYS {
  PROFILE = 'profiles',
  ID = 'id',
}

export default class SearchQueryFactory {
  private link: string = '';
  private urlType: LINK_TYPES | null = null;
  private linkAsArr: string[] = [];
  private steamid: string | null = null;

  constructor(link: string) {
    this.link = link;
    this.parseLink();
    this.getLinkType();
  }

  /**
   * This function is used to split link to array
   * @private
   */
  private parseLink(): void {
    this.linkAsArr = this.link.split('/');
  }

  /**
   * This function is used to set type of input value
   * @private
   */
  private getLinkType(): void {
    // split link, last index = player_url / steamid
    // ID type - https://steamcommunity.com/id/blocky__/
    // PROFILE type -s https://steamcommunity.com/profiles/76561198041683378

    const isTypePlayerUrl = this.linkAsArr.find(
      (item: string) => item === PROFILE_LINKS_KEYS.ID
    );
    const isTypeSteamid = this.linkAsArr.find(
      (item: string) => item === PROFILE_LINKS_KEYS.PROFILE
    );

    if (isTypePlayerUrl && !isTypeSteamid) {
      this.urlType = LINK_TYPES.PROFILE_URL;
    }

    if (isTypeSteamid && !isTypePlayerUrl) {
      this.urlType = LINK_TYPES.STEAMID;
    }
  }

  /**
   * This function is used to set steamid by different link type
   * @private
   */
  public async setSteamid(): Promise<void> {
    switch (this.urlType) {
      case LINK_TYPES.STEAMID: {
        const index = this.linkAsArr.findIndex(
          (item: string) => item === PROFILE_LINKS_KEYS.PROFILE
        );

        if (index > -1) this.steamid = this.linkAsArr[index + 1];

        break;
      }

      case LINK_TYPES.PROFILE_URL: {
        const index = this.linkAsArr.findIndex(
          (item: string) => item === PROFILE_LINKS_KEYS.ID
        );

        const profileUrl = this.linkAsArr[index + 1];
        const steamid = await getSteamidByPlayerUrl(profileUrl);

        if (steamid) this.steamid = steamid;

        break;
      }

      default: {
        break;
      }
    }
  }

  /**
   * Get steamid
   */
  public getSteamid() {
    return this.steamid;
  }
}
