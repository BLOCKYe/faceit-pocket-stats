import React from 'react';
import { BanDataType, BanItemType } from '@/types/BanTypes';
import BanItem from '@/app/players/(players)/components/BanItem';
import moment from 'moment/moment';
import { defaultDateTimeFormat } from '@/constants/dateFormat';

interface IBansListProps {
  bans?: BanDataType;
}

const BansList: React.FC<IBansListProps> = ({ bans }) => {
  console.log(bans);
  return (
    <div>
      <h3>Bans</h3>
      <p className={'mt-1 text-xs text-muted-foreground'}>
        History of user bans (imposed by the administrator).
      </p>

      <div className={'mt-3 grid gap-3'}>
        {bans?.items?.map((ban: BanItemType) => (
          <BanItem
            key={moment(ban.starts_at).format(defaultDateTimeFormat)}
            ban={ban}
          />
        ))}

        {bans?.items.length === 0 && (
          <p className={'text-xs text-muted-foreground'}>No data.</p>
        )}
      </div>
    </div>
  );
};

export default BansList;
