'use client';

import React, { useMemo, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { PlayerDataType } from '@/types/PlayerType';
import MainWrapper from '@/app/(common)/components/wrappers/MainWrapper';
import BackButton from '@/app/(common)/components/buttons/BackButton';
import PATHS from '@/constants/Paths';
import { MatchDataType } from '@/types/MatchTypes';
import Divider from '@/app/(common)/components/ui/Divider';
import { BanDataType } from '@/types/BanTypes';
import UserSearch from '@/app/(home)/components/UserSearch';
import ProfileHeader from '@/app/players/(players)/components/ProfileHeader';
import BansList from '@/app/players/(players)/components/BansList';
import MatchesList from '@/app/players/(players)/components/MatchesList';
import StatsHeader from '@/app/players/(players)/components/StatsHeader';
import GamesEnum from '@/constants/gamesEnum';
import { Button } from '@/components/ui/button';
import { getPlayerMatches } from '@/repository/PlayerRepository';
import { paginationMatchesPerPage } from '@/constants/pagination';

interface IPlayerScreenProps {
  playerId: string;
  game: GamesEnum;
}

const PlayerScreen: React.FC<IPlayerScreenProps> = (props) => {
  const player = useQuery<PlayerDataType>({
    queryKey: ['player' + props.game, props.playerId],
  });

  const [matchesPage, setMatchesPage] = useState(1);
  const matches = useQuery<MatchDataType>({
    enabled: matchesPage > 1,
    queryKey: ['matches' + props.game, props.playerId, matchesPage],
    queryFn: () =>
      getPlayerMatches(
        props.playerId,
        matchesPage * paginationMatchesPerPage - paginationMatchesPerPage,
        paginationMatchesPerPage,
        props.game
      ),
    placeholderData: keepPreviousData,
  });

  const bans = useQuery<BanDataType>({
    queryKey: ['bans' + props.game, props.playerId],
  });

  /**
   * Status of next page button
   */
  const getNextPageButtonIsDisabled = useMemo(() => {
    if (matches.isPlaceholderData) {
      return true;
    }

    if ((matches.data?.items?.length ?? 0) < paginationMatchesPerPage) {
      return true;
    }

    return false;
  }, [matches.data?.items?.length, matches.isPlaceholderData]);

  /**
   * Render 404
   */
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
      <div className={'flex flex-wrap items-center justify-between gap-3'}>
        <BackButton
          link={PATHS.HOME}
          text={'Back to home page'}
          type={'left'}
          shortText={'Home'}
        />
        <BackButton
          shortText={'CSGO'}
          link={PATHS.PLAYERS.PLAYER_ID(
            props.playerId,
            props.game === GamesEnum.CS2 ? GamesEnum.CSGO : GamesEnum.CS2
          )}
          text={`${
            props.game === GamesEnum.CS2
              ? GamesEnum.CSGO.toUpperCase()
              : GamesEnum.CS2.toUpperCase()
          } Statistics`}
          type={'right'}
        />
      </div>

      <UserSearch />

      {/* <--- Profile header ---> */}
      <section
        className={'relative mt-3 overflow-hidden rounded-md border p-5'}>
        <ProfileHeader player={player.data} />
        <div
          className={'absolute left-0 top-0 -z-10 h-full w-full opacity-20'}
          style={{
            backgroundImage: `url(${player.data.cover_image})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        />
      </section>

      <section className={'mt-3 rounded-md border p-5'}>
        {/* <--- stats header ---> */}
        <StatsHeader
          player={player.data}
          matches={matches.data}
          game={props.game}
        />

        <Divider className={'my-5'} />

        {/* <--- bans ---> */}
        <section>
          <BansList bans={bans.data} />
        </section>

        <Divider className={'my-5'} />

        {/* <--- matches ---> */}
        <section>
          <MatchesList matches={matches.data} page={matchesPage} />

          <div
            className={
              'mt-3 flex flex-wrap items-center justify-between gap-3'
            }>
            <Button
              disabled={matchesPage === 1}
              variant={'outline'}
              size={'sm'}
              onClick={() => setMatchesPage((old) => old - 1)}>
              Previous
            </Button>

            <h1 className={'text-xs text-muted-foreground'}>
              Page {matchesPage}
            </h1>

            <Button
              disabled={getNextPageButtonIsDisabled}
              variant={'outline'}
              size={'sm'}
              onClick={() => setMatchesPage((old) => old + 1)}>
              Next
            </Button>
          </div>
        </section>
      </section>
    </MainWrapper>
  );
};

export default PlayerScreen;
