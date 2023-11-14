import React from 'react';
import { Badge } from '@/components/ui/badge';
import { PlayerDataType } from '@/types/PlayerType';
import { MatchDataType, MatchItemType } from '@/types/MatchTypes';
import moment from 'moment/moment';
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import SkillLevel from '@/app/(common)/components/badge/SkillLevel';

interface IStatsHeaderProps {
  player?: PlayerDataType;
  matches?: MatchDataType;
}

/**
 * This function is used to
 * get loses and wins
 * summary from range
 * @param days
 * @param matches
 */
const getSummaryByRange = (
  days: number,
  matches?: MatchItemType[]
): { loses: number; wins: number; text: React.ReactNode } => {
  let wins = 0;
  let loses = 0;

  if (!matches) {
    return { loses, wins, text: `${wins} wins / ${loses} loses` };
  }

  const today = new Date();
  const matchesFromRange = matches.filter((item: MatchItemType) =>
    moment(item.stats['Updated At']).isSameOrAfter(
      moment(today).subtract(days, 'days')
    )
  );

  for (const match of matchesFromRange) {
    if (parseInt(match.stats.Result) === 0) {
      loses = loses + 1;
    } else if (parseInt(match.stats.Result) === 1) {
      wins = wins + 1;
    }
  }

  return {
    loses,
    wins,
    text: (
      <div className={'flex flex-wrap items-center'}>
        {getTrendIcon(wins - loses)} {wins} wins / {loses} loses
      </div>
    ),
  };
};

/**
 *
 * @param value
 */
const getTrendIcon = (value: number): React.ReactNode => {
  if (value > 1) {
    return <FiArrowUpRight className={'mr-2 text-green-500'} />;
  } else if (value < 1 && value !== 0) {
    return <FiArrowDownRight className={'mr-2 text-red-500'} />;
  } else {
    return <FiArrowRight className={'mr-2'} />;
  }
};

const StatsHeader: React.FC<IStatsHeaderProps> = ({ player, matches }) => {
  return (
    <div>
      <h3>CS2 Statistics</h3>
      <p className={'mt-1 text-xs text-muted-foreground'}>
        Basic player statistics in Counter Strike 2.
      </p>

      <div className={'mt-3 flex flex-wrap items-center gap-3'}>
        <SkillLevel level={player?.games?.cs2?.skill_level} />

        <Badge variant={'outline'} className={'px-3 py-2 font-normal'}>
          {player?.games?.cs2?.faceit_elo} ELO
        </Badge>
      </div>

      <div className={'mt-5 grid gap-3 md:grid-cols-3 '}>
        <div className={'rounded border p-3 text-sm'}>
          <h3 className={'text-xs'}>Today results</h3>
          <div className={'mt-3'}>
            {getSummaryByRange(1, matches?.items).text}
          </div>
        </div>

        <div className={'rounded border p-3 text-sm'}>
          <h3 className={'text-xs'}>7 days results</h3>
          <div className={'mt-3'}>
            {getSummaryByRange(7, matches?.items).text}
          </div>
        </div>

        <div className={'rounded border p-3 text-sm'}>
          <h3 className={'text-xs'}>{matches?.items.length} matches results</h3>
          <div className={'mt-3'}>
            {getSummaryByRange(99999, matches?.items).text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;
