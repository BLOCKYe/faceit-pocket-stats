import { Input } from '@/components/ui/input';
import React from 'react';

const UserSearch: React.FC = (props) => {
  return (
    <div className={'mt-10'}>
      <h3>Search player nickname</h3>

      <Input className={'mt-3'} type='text' placeholder='Player nickname' />
    </div>
  );
};

export default UserSearch;
