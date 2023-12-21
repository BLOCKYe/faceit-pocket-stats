import React from 'react';
import { PlayerDataType } from '@/types/PlayerType';
import Image from 'next/image';
import { Button } from '@/app/(common)/components/shadcn/ui/button';
import { openLink } from '@/utils/openLink';
import { BsSteam } from 'react-icons/bs';
import { SiFaceit } from 'react-icons/si';
import moment from 'moment';
import { defaultDateFormat } from '@/constants/dateFormat';
import { GiJusticeStar } from 'react-icons/gi';
import { MdStars } from 'react-icons/md';
import { FLAGS_URL } from '@/constants/urls';

interface IProfileHeaderProps {
  player: PlayerDataType;
}

const ProfileHeader: React.FC<IProfileHeaderProps> = ({ player }) => {
  return (
    <>
      <div className={'wrap flex items-start justify-between gap-3'}>
        <div className={'flex flex-wrap items-center gap-5'}>
          <Image
            src={player?.avatar || '/default_avatar.png'}
            alt={player?.nickname}
            width={80}
            height={80}
            className={'aspect-square rounded-xl object-cover'}
            priority
          />
          <div>
            <div className={'flex items-center gap-2'}>
              {player.memberships.includes('premium') && (
                <MdStars className={'text-md text-yellow-500'} />
              )}
              <h3 className={'text-3xl font-bold'}>{player?.nickname}</h3>
            </div>

            <p className={'mt-2 text-xs text-muted-foreground'}>
              joined {moment(player.activated_at).fromNow()}
            </p>
            <p className={'mt-1 text-xs'}>
              {player.friends_ids.length} friends
            </p>
          </div>
        </div>

        <Image
          src={FLAGS_URL(player.country)}
          alt={player.country}
          width={24}
          height={24}
        />
      </div>

      <div className={'mt-5 flex flex-wrap gap-3'}>
        <Button
          data-test-id={'steam-button'}
          size={'sm'}
          variant={'outline'}
          onClick={() =>
            openLink(
              `https://steamcommunity.com/profiles/${player?.steam_id_64}`
            )
          }>
          <BsSteam className={'mr-3'} />
          <p className={'text-xs'}>Steam {player.steam_nickname}</p>
        </Button>

        <Button
          size={'sm'}
          data-test-id={'faceit-button'}
          variant={'outline'}
          onClick={() => openLink(player?.faceit_url.replace('{lang}', 'en'))}>
          <SiFaceit className={'mr-3'} />
          <p className={'text-xs'}>Faceit {player.nickname}</p>
        </Button>
      </div>
    </>
  );
};

export default ProfileHeader;
