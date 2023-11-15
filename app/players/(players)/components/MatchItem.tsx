import React from 'react';
import { MatchItemType } from '@/types/MatchTypes';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';
import { defaultDateTimeFormat } from '@/constants/dateFormat';
import { openLink } from '@/lib/openLink';
import PATHS from '@/constants/Paths';
import { FiArrowDownRight, FiArrowUpRight } from 'react-icons/fi';

interface IMatchItemProps {
  match: MatchItemType;
}

/**
 * This factory is used to render
 * result score in result color
 * 0 - lose
 * 1 - win
 * @param result
 * @param score
 */
const getResultBadge = (result: string, score: string) => {
  switch (result) {
    case '0': {
      return <p className={'text-red-500'}>{score}</p>;
    }

    case '1': {
      return <p className={'text-green-500'}>{score}</p>;
    }

    default: {
      return <></>;
    }
  }
};

/**
 * This function is used to
 * render color badge by result
 * KD >= 1 = GOOD
 * KD < 1 = BAD
 * @param kills
 * @param deaths
 * @param kd
 */
const getKDBadge = (kills: string, deaths: string, kd: string) => {
  if (parseFloat(kd) >= 1) {
    return (
      <Badge
        variant={'outline'}
        className={'py-1 font-normal md:py-2 md:text-center'}>
        <FiArrowUpRight className={'mr-2 text-green-500'} /> {kills} / {deaths}{' '}
        ({kd})
      </Badge>
    );
  } else {
    {
      return (
        <Badge
          variant={'outline'}
          className={'py-1 font-normal md:py-2 md:text-center'}>
          <FiArrowDownRight className={'mr-2 text-red-500'} /> {kills} /{' '}
          {deaths} ({kd})
        </Badge>
      );
    }
  }
};

const MatchItem: React.FC<IMatchItemProps> = ({ match }) => {
  return (
    <div
      onClick={() => openLink(PATHS.FACEIT.MATCH_ROOM(match.stats['Match Id']))}
      className={
        'grid cursor-pointer grid-cols-2 items-center gap-3 rounded border bg-zinc-900 p-3 text-xs transition-all hover:border-zinc-600 md:grid-cols-4 md:py-2'
      }>
      <p className={'md:text-md text-xs'}>
        {moment(match.stats['Updated At']).format(defaultDateTimeFormat)}
      </p>
      <p className={'text-end text-muted-foreground md:text-center'}>
        {match.stats.Map}
      </p>
      <div className={'flex md:justify-center'}>
        {getKDBadge(
          match.stats.Kills,
          match.stats.Deaths,
          match.stats['K/D Ratio']
        )}
      </div>
      <div className={'flex justify-end'}>
        {getResultBadge(match.stats.Result, match.stats.Score)}
      </div>
    </div>
  );
};

export default MatchItem;
