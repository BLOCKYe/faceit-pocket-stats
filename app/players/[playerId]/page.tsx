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
import MainWrapper from '@/app/(common)/components/wrappers/MainWrapper';

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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <MainWrapper>
            <h3 className={'mt-10 text-center text-3xl'}>Loading...</h3>
          </MainWrapper>
        }>
        <PlayerScreen playerId={props.params.playerId} />
      </Suspense>
    </HydrationBoundary>
  );
};
export default PlayerPage;
