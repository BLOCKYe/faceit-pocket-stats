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

interface IPageProps {
  params: { playerId: string };
}

const PlayerPage: React.FC<IPageProps> = async (props) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['player', props.params.playerId],
    queryFn: () => getPlayerById(props.params.playerId),
  });

  await queryClient.prefetchQuery({
    queryKey: ['matches', props.params.playerId],
    queryFn: () => getPlayerMatches(props.params.playerId, 0, 50),
  });

  await queryClient.prefetchQuery({
    queryKey: ['bans', props.params.playerId],
    queryFn: () => getPlayerBans(props.params.playerId, 0, 50),
  });

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
        <PlayerScreen playerId={props.params.playerId} />
      </HydrationBoundary>
    </Suspense>
  );
};
export default PlayerPage;
