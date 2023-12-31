'use client';

import React, { useState } from 'react';
import { Button } from '@/app/(common)/components/shadcn/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { getPlayer, searchPlayers } from '@/repository/PlayerRepository';
import { BiSearch } from 'react-icons/bi';
import PATHS from '@/constants/Paths';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from '@/hooks/useDebouncesCallback';
import { useToast } from '@/app/(common)/components/shadcn/ui/use-toast';
import Autocomplete, {
  AutoCompleteDataType,
} from '@/app/(common)/components/inputs/Autocomplete';
import SkillLevel from '@/app/(common)/components/badge/SkillLevel';
import GamesEnum from '@/constants/gamesEnum';
import { SearchPlayerType } from '@/types/PlayerType';
import Image from 'next/image';
import { Input } from '@/app/(common)/components/shadcn/ui/input';
import SearchQueryFactory from '@/utils/SearchQueryFactory';
import { STEAM_URL } from '@/constants/urls';
import { useLocalStorage } from '@/hooks/useLocalstorage';

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
const searchQueryFactory = async (value: string): Promise<string> => {
  // case for profile url type
  if (value.includes(STEAM_URL)) {
    const searchQueryFactory = new SearchQueryFactory(value);
    await searchQueryFactory.setSteamid();
    const steamid = searchQueryFactory.getSteamid();

    return `game_player_id=${steamid}`;
  }

  // case for nickname type
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

interface IUserSearchProps {
  withoutLabel?: boolean;
}

const UserSearch: React.FC<IUserSearchProps> = (props) => {
  const router = useRouter();
  const [lastSearches, setLastSearches] = useLocalStorage<
    {
      playerId: string;
      nickname: string;
    }[]
  >('lastSearches', []);
  const { toast } = useToast();

  const [playersLists, setPlayersList] = useState<any[]>([]);

  const getInfoMutation = useMutation({
    mutationFn: (nickname: string) => getPlayer(nickname),
    onSuccess: (data) => {
      handleSetLastSearches({
        playerId: data.player_id,
        nickname: data.nickname,
      });
      router.push(PATHS.PLAYERS.PLAYER_ID(data.player_id));
    },
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
          name: <SelectPlayerItem {...item} />,
          nickName: item.nickname,
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
  const handleSubmit = async (data: z.infer<typeof SearchSchema>) => {
    const value = await searchQueryFactory(data.searchValue);
    getInfoMutation.mutate(value);
  };

  /**
   * This function is used search player on debounce
   */
  const handleDebounceSearch = useDebouncedCallback((value) => {
    if (
      (typeof value === 'string' && value.length < 2) ||
      value.includes(STEAM_URL)
    ) {
      setPlayersList([]);
      return;
    }

    searchPlayerMutation.mutate(value);
  }, 700);

  /**
   * This function is used to handle set last searches in localstorage
   * @param data
   */
  const handleSetLastSearches = (data: {
    nickname: string;
    playerId: string;
  }): void => {
    const ITEMS_LIMIT = 10;
    const itemsCountOnLimit = lastSearches.length >= ITEMS_LIMIT;
    setLastSearches((prev) => [
      {
        playerId: data.playerId,
        nickname: data.nickname,
      },
      ...(itemsCountOnLimit ? prev.slice(0, -1) : prev),
    ]);
  };

  return (
    <div className={'mt-10'}>
      {!props.withoutLabel && (
        <h3 className={'text-sm text-muted-foreground'}>
          Find players statistics by nickname or steam profile
        </h3>
      )}

      {/* <--- Form ---> */}
      <form
        className={'mt-2 flex items-start'}
        onSubmit={form.handleSubmit(handleSubmit)}>
        <Autocomplete
          className={'rounded-r-none'}
          onSelect={(data: AutoCompleteDataType) => {
            handleSetLastSearches({
              nickname: data.nickName,
              playerId: data.id,
            });
            router.push(PATHS.PLAYERS.PLAYER_ID(data.id));
          }}
          data={playersLists}
          inputComponent={
            <Input
              data-test-id={'search-input'}
              className={'rounded-r-none'}
              autoComplete={'off'}
              placeholder={'Search player...'}
              type='search'
              {...form.register('searchValue')}
              onChange={(e) => {
                handleDebounceSearch(e.target.value);
                form.register('searchValue').onChange(e);
              }}
            />
          }
        />

        <Button
          variant={'secondary'}
          type={'submit'}
          className={'rounded-l-none'}
          disabled={getInfoMutation.isPending}
          data-testid={'submit-button'}
          data-test-id={'submit-button'}>
          <BiSearch className={'text-xl'} />
        </Button>
      </form>

      {/* <--- Display error ---> */}
      <p className={'mt-2 text-xs text-pink-600'} data-testid={'error-message'}>
        {form.formState.errors.searchValue?.message}
      </p>

      {/* <--- Display last searches ---> */}
      {lastSearches.length > 0 && (
        <div className={'mt-1 flex w-full gap-1 overflow-auto'}>
          {lastSearches.map((item, idx) => (
            <Button
              variant={'link'}
              className={'px-2 text-xs text-muted-foreground'}
              onClick={() =>
                router.push(PATHS.PLAYERS.PLAYER_ID(item.playerId))
              }
              key={item.playerId + idx}>
              {item.nickname}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;

const SelectPlayerItem = (item: SearchPlayerType): React.ReactNode => {
  return (
    <div className={'flex items-center justify-between gap-3 font-bold'}>
      <div className={'flex items-center gap-3 text-xs'}>
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
  );
};
