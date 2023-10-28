import React from 'react';
import { BanItemType } from '@/types/BanTypes';
import moment from 'moment';
import { defaultDateTimeFormat } from '@/constants/dateFormat';

interface IBanItemProps {
  ban: BanItemType;
}

const BanItem: React.FC<IBanItemProps> = ({ ban }) => {
  return (
    <div className={'rounded border bg-zinc-900 p-3 text-xs'}>
      {ban.reason}

      <p className={'mt-2 text-muted-foreground'}>
        {moment(ban.starts_at).format(defaultDateTimeFormat)} -{' '}
        {ban.ends_at && moment(ban.ends_at).format(defaultDateTimeFormat)}
        {!ban.ends_at && <>???</>}
      </p>
    </div>
  );
};

export default BanItem;
