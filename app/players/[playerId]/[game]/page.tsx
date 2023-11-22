import React, { Suspense } from 'react';
import PlayerScreen from '@/app/players/(players)/PlayerScreen';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import {
  getPlayerBans,
  getPlayerById,
  getPlayerMatches,
} from '@/repository/PlayerRepository';
import Spinner from '@/app/(common)/components/ui/Spinner/Spinner';
import GamesEnum from '@/constants/gamesEnum';
import { paginationMatchesPerPage } from '@/constants/pagination';

interface IPageProps {
  params: { playerId: string; game: GamesEnum };
}

import type { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: IPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.playerId;

  // fetch data
  const player = await getPlayerById(id);

  return {
    title: `${player.nickname} - Player summary ${params.game.toUpperCase()} - Faceit Pocket Stats`,
  };
}

const PlayerPage: React.FC<IPageProps> = async (props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['player' + props.params.game, props.params.playerId],
    queryFn: () => getPlayerById(props.params.playerId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['matches' + props.params.game, props.params.playerId, 1],
    queryFn: () =>
      getPlayerMatches(
        props.params.playerId,
        0,
        paginationMatchesPerPage,
        props.params.game
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ['bans' + props.params.game, props.params.playerId],
    queryFn: () => getPlayerBans(props.params.playerId, 0, 50),
  });

  if (!Object.values(GamesEnum).includes(props.params.game as GamesEnum)) {
    return (
      <div className={'grid min-h-screen w-full place-items-center'}>
        <h1>Game not found!</h1>
      </div>
    );
  }

  return (
    <Suspense
      fallback={
        <div
          className={
            'grid min-h-screen w-full place-content-center place-items-center'
          }>
          <Spinner />
          <div className={'text-sm text-muted-foreground'}>LOADING DATA</div>
        </div>
      }>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PlayerScreen
          playerId={props.params.playerId}
          game={props.params.game}
        />
      </HydrationBoundary>
    </Suspense>
  );
};
export default PlayerPage;
