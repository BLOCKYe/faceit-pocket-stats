'use client';

import { Input } from '@/components/ui/input';
import React from 'react';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const SearchSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

const UserSearch: React.FC = (props) => {
  const form = useForm<z.infer<typeof SearchSchema>>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      username: '',
    },
  });

  /**
   * This function is used to
   * handle submit
   * @param data
   */
  const handleSubmit = (data: z.infer<typeof SearchSchema>) => {
    alert(data.username);
  };

  return (
    <div className={'mt-10 md:mt-20'}>
      <h3 className={'text-center text-sm text-muted-foreground'}>
        Find players statistics by nickname
      </h3>

      {/* <--- Form ---> */}
      <form
        className={'mt-3 flex items-center'}
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <Input
          type='text'
          placeholder='Player nickname...'
          className={'rounded-r-none'}
          {...form.register('username')}
        />
        <Button type={'submit'} className={'rounded-l-none'}>
          Search
        </Button>
      </form>

      {/* <--- Display error ---> */}
      <p className={'mt-2 text-xs text-pink-600'}>
        {form.formState.errors.username?.message}
      </p>
    </div>
  );
};

export default UserSearch;
