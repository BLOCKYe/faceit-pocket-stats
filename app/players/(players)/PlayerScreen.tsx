'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlayerDataType } from '@/types/PlayerType';
import MainWrapper from '@/app/(common)/components/wrappers/MainWrapper';
import BackButton from '@/app/(common)/components/buttons/BackButton';
import PATHS from '@/constants/Paths';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BsSteam } from 'react-icons/bs';
import { SiFaceit } from 'react-icons/si';
import { openLink } from '@/lib/openLink';
import { MatchDataType, MatchItemType } from '@/types/MatchTypes';
import MatchItem from '@/app/players/(players)/components/MatchItem';
import Divider from '@/app/(common)/components/ui/Divider';
import { BanDataType, BanItemType } from '@/types/BanTypes';
import BanItem from '@/app/players/(players)/components/BanItem';
import moment from 'moment';
import { defaultDateTimeFormat } from '@/constants/dateFormat';
import UserSearch from '@/app/(home)/components/UserSearch';
import ProfileHeader from '@/app/players/(players)/components/ProfileHeader';
import BansList from '@/app/players/(players)/components/BansList';
import MatchesList from '@/app/players/(players)/components/MatchesList';
import StatsHeader from '@/app/players/(players)/components/StatsHeader';

interface IPlayerScreenProps {
  playerId: string;
}

const PlayerScreen: React.FC<IPlayerScreenProps> = (props) => {
  const player = useQuery<PlayerDataType>({
    queryKey: ['player', props.playerId],
  });

  const matches = useQuery<MatchDataType>({
    queryKey: ['matches', props.playerId],
  });

  const bans = useQuery<BanDataType>({
    queryKey: ['bans', props.playerId],
  });

  if (!player.data) {
    return (
      <MainWrapper>
        <div>
          <BackButton link={PATHS.HOME} text={'Back to home page'} />
        </div>

        {/* <--- Profile header ---> */}
        <section className={'mt-10 rounded-md border p-5'}>
          Player not found!
        </section>

        <UserSearch />
      </MainWrapper>
    );
  }

  return (
    <MainWrapper>
      <div>
        <BackButton link={PATHS.HOME} text={'Back to home page'} />
      </div>

      <UserSearch />

      {/* <--- Profile header ---> */}
      <section className={'mt-3 rounded-md border p-5'}>
        <ProfileHeader player={player.data} />
      </section>

      <section className={'mt-3 rounded-md border p-5'}>
        {/* <--- stats header ---> */}
        <StatsHeader player={player.data} matches={matches.data} />

        <Divider className={'my-5'} />

        {/* <--- bans ---> */}
        <section>
          <BansList bans={bans.data} />
        </section>

        <Divider className={'my-5'} />

        {/* <--- matches ---> */}
        <section>
          <MatchesList matches={matches.data} />
        </section>
      </section>
    </MainWrapper>
  );
};

export default PlayerScreen;
