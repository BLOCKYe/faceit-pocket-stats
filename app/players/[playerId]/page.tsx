import React from 'react';
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

interface IPageProps {
  params: { playerId: string };
}

const Page: React.FC<IPageProps> = async (props) => {
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
      <PlayerScreen playerId={props.params.playerId} />
    </HydrationBoundary>
  );
};
export default Page;
