'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { getPlayer } from '@/repository/PlayerRepository';
import { BiSearch } from 'react-icons/bi';
import PATHS from '@/constants/Paths';
import { useRouter } from 'next/navigation';

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

const UserSearch: React.FC = (props) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: (nickname: string) => getPlayer(nickname),
    onSuccess: (data) => router.push(PATHS.PLAYERS.PLAYER_ID(data.player_id)),
    onError: () =>
      form.setError('searchValue', {
        message: 'A player with the specified name was not found.',
      }),
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
    mutation.mutate(value);
  };

  return (
    <div className={'mt-10'}>
      <h3 className={'text-sm text-muted-foreground'}>
        Find players statistics by nickname or steam profile
      </h3>

      {/* <--- Form ---> */}
      <form
        className={'mt-2 flex items-center'}
        onSubmit={form.handleSubmit(handleSubmit)}>
        <Input
          type='search'
          placeholder='Player nickname / steam profile link...'
          className={'rounded-r-none'}
          {...form.register('searchValue')}
        />
        <Button
          variant={'secondary'}
          type={'submit'}
          className={'rounded-l-none'}
          disabled={mutation.isPending}
          data-testid={'submit-button'}>
          <BiSearch className={'mr-1'} />
          {mutation.isPending ? 'Searching...' : 'Search'}
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
