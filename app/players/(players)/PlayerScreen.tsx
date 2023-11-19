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
import BansList from '@/app/players/(players)/components/bans/BansList';
import MatchesList from '@/app/players/(players)/components/matches/MatchesList';
import StatsHeader from '@/app/players/(players)/components/StatsHeader';
import GamesEnum from '@/constants/gamesEnum';
import { Button } from '@/app/(common)/components/shadcn/ui/button';
import { getPlayerMatches } from '@/repository/PlayerRepository';
import { paginationMatchesPerPage } from '@/constants/pagination';
import { GameType } from '@/types/GamesTypes';
import { getPlayerGames } from '@/repository/SteamRepository';
import HeaderButtons from '@/app/players/(players)/components/HeaderButtons';
import MatchesButtons from '@/app/players/(players)/components/matches/MatchesButtons';

interface IPlayerScreenProps {
  playerId: string;
  game: GamesEnum;
}

const PlayerScreen: React.FC<IPlayerScreenProps> = (props) => {
  const player = useQuery<PlayerDataType>({
    queryKey: ['player' + props.game, props.playerId],
  });

  const games = useQuery<GameType[]>({
    queryKey: ['games', props.playerId],
    queryFn: () => getPlayerGames(player.data?.steam_id_64),
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
      <div
        className={
          'fixed left-[50%] top-0 z-10 w-full max-w-3xl -translate-x-1/2 transform bg-zinc-950 bg-opacity-95 px-3'
        }>
        <UserSearch withoutLabel />
      </div>

      <div className={'mt-20 '}>
        <HeaderButtons playerId={props.playerId} game={props.game} />
      </div>

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
          games={games.data}
          isGamesPending={games.isPending}
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

          {matches.data?.items?.length !== 0 && (
            <MatchesButtons
              getNextPageButtonIsDisabled={getNextPageButtonIsDisabled}
              matchesPage={matchesPage}
              setMatchesPage={setMatchesPage}
            />
          )}
        </section>
      </section>
    </MainWrapper>
  );
};

export default PlayerScreen;
