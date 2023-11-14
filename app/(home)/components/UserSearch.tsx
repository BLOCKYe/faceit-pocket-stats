'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { getPlayer, searchPlayers } from '@/repository/PlayerRepository';
import { BiSearch } from 'react-icons/bi';
import PATHS from '@/constants/Paths';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from '@/hooks/useDebouncesCallback';
import { useToast } from '@/components/ui/use-toast';
import Autocomplete, {
  AutoCompleteDataType,
} from '@/app/(common)/components/inputs/Autocomplete';
import SkillLevel from '@/app/(common)/components/badge/SkillLevel';
import GamesEnum from '@/constants/gamesEnum';
import { SearchPlayerType } from '@/types/PlayerType';
import Image from 'next/image';
import { Input } from '@/components/ui/input';

const SearchSchema = z.object({
  searchValue: z.string().min(2, {
    message: 'Nickname must be at least 2 characters.',
  }),
});

/**
 * This function is used to
 * build query from search input
 * @param value
 */
const searchQueryFactory = (value: string): string => {
  if (value.includes('https://steamcommunity.com/')) {
    const PROFILE_LINKS_KEYS = ['profiles', 'id'];
    const valueAsArr = value.split('/');
    const profileIdIndex =
      valueAsArr.findIndex((item: string) =>
        PROFILE_LINKS_KEYS.includes(item)
      ) + 1;
    return `game_player_id=${valueAsArr[profileIdIndex]}`;
  }

  return `nickname=${value}`;
};

/**
 * This function is used to get user level
 * @param player
 * @param gameName
 */
const getSkillLevel = (player: SearchPlayerType, gameName: string): number => {
  const game = player.games.find((game) => game.name === gameName);
  return parseInt(game?.skill_level ?? '0');
};

const UserSearch: React.FC = (props) => {
  const router = useRouter();
  const { toast } = useToast();

  const [playersLists, setPlayersList] = useState<AutoCompleteDataType[]>([]);

  const getInfoMutation = useMutation({
    mutationFn: (nickname: string) => getPlayer(nickname),
    onSuccess: (data) => router.push(PATHS.PLAYERS.PLAYER_ID(data.player_id)),
    onError: () =>
      form.setError('searchValue', {
        message: 'A player with the specified name was not found.',
      }),
  });

  const searchPlayerMutation = useMutation({
    mutationFn: (nickname: string) => searchPlayers(nickname),
    onSuccess: (data) =>
      setPlayersList(
        data.map((item) => ({
          id: item.player_id,
          name: (
            <div
              className={'flex items-center justify-between gap-3 font-bold'}>
              <div className={'flex items-center gap-3'}>
                <Image
                  src={item?.avatar || '/default_avatar.png'}
                  alt={item?.nickname}
                  width={30}
                  height={30}
                  className={'aspect-square rounded object-cover'}
                  priority
                />
                {item.nickname}
              </div>
              <SkillLevel
                className={'h-8 w-8'}
                level={getSkillLevel(item, GamesEnum.CS2)}
              />
            </div>
          ),
        }))
      ),
    onError: () => {
      toast({ title: 'Player not found' });
      setPlayersList([]);
    },
  });

  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      searchValue: '',
    },
  });

  /**
   * This function is used to
   * handle submit
   * @param data
   */
  const handleSubmit = (data: z.infer<typeof SearchSchema>) => {
    const value = searchQueryFactory(data.searchValue);
    getInfoMutation.mutate(value);
  };

  /**
   * This function is used search player on debounce
   */
  const handleDebounceSearch = useDebouncedCallback((value) => {
    if (typeof value === 'string' && value.length < 2) {
      setPlayersList([]);
      return;
    }

    searchPlayerMutation.mutate(value);
  }, 500);

  return (
    <div className={'mt-10'}>
      <h3 className={'text-sm text-muted-foreground'}>
        Find players statistics by nickname or steam profile
      </h3>

      {/* <--- Form ---> */}
      <form
        className={'mt-2 flex items-start'}
        onSubmit={form.handleSubmit(handleSubmit)}>
        <Autocomplete
          className={'rounded-r-none'}
          placeholder={'Search player...'}
          onSelect={(playerId: any) =>
            router.push(PATHS.PLAYERS.PLAYER_ID(playerId))
          }
          data={playersLists}
          type='search'
          {...form.register('searchValue')}
          onChange={async (e) => {
            handleDebounceSearch(e.target.value);
            await form.register('searchValue').onChange(e);
          }}
        />
        <Button
          variant={'secondary'}
          type={'submit'}
          className={'rounded-l-none'}
          disabled={getInfoMutation.isPending}
          data-testid={'submit-button'}>
          <BiSearch className={'mr-1'} />
          {getInfoMutation.isPending ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {/* <--- Display error ---> */}
      <p className={'mt-2 text-xs text-pink-600'} data-testid={'error-message'}>
        {form.formState.errors.searchValue?.message}
      </p>
    </div>
  );
};

export default UserSearch;
