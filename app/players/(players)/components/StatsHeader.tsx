import React, { useEffect, useRef } from 'react';
import { Badge } from '@/components/ui/badge';
import { PlayerDataType } from '@/types/PlayerType';
import { MatchDataType, MatchItemType } from '@/types/MatchTypes';
import moment from 'moment/moment';
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import SkillLevel from '@/app/(common)/components/badge/SkillLevel';
import GamesEnum from '@/constants/gamesEnum';

interface IStatsHeaderProps {
  player?: PlayerDataType;
  matches?: MatchDataType;
  game: GamesEnum;
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
): {
  loses: number;
  wins: number;
  kills: number;
  deaths: number;
  kdRatio: string;
  summaryComponent: React.ReactNode;
} => {
  let wins = 0;
  let loses = 0;
  let kills = 0;
  let deaths = 0;

  if (!matches) {
    return {
      loses,
      wins,
      kills,
      deaths: deaths,
      kdRatio: '0',
      summaryComponent: `${wins} wins / ${loses} loses`,
    };
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

    kills = kills + parseInt(match.stats.Kills);
    deaths = deaths + parseInt(match.stats.Deaths);
  }

  return {
    loses,
    wins,
    kills,
    deaths: deaths,
    summaryComponent: getMatchesComponents(
      wins,
      loses,
      kills,
      deaths,
      matchesFromRange
    ),
    kdRatio: (kills / deaths).toFixed(2),
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

/**
 *
 * @param wins
 * @param loses
 * @param kills
 * @param deaths
 * @param matchesFromRange
 */
const getMatchesComponents = (
  wins: number,
  loses: number,
  kills: number,
  deaths: number,
  matchesFromRange: MatchItemType[]
): React.ReactNode => {
  if (matchesFromRange.length === 0) {
    return (
      <div className={'text-xs text-muted-foreground'}>
        No match was played during the period.
      </div>
    );
  }

  return (
    <div>
      <div className={'flex flex-wrap items-center'}>
        {getTrendIcon(wins - loses)} {wins} wins / {loses} loses
      </div>
      <div className={'mt-3 text-xs text-muted-foreground'}>
        {(kills / deaths).toFixed(2)} KD Ratio
      </div>
    </div>
  );
};

const StatsHeader: React.FC<IStatsHeaderProps> = ({
  player,
  matches,
  game,
}) => {
  const storedMatches = useRef(matches?.items);

  return (
    <div>
      <h3>{game.toUpperCase()} Statistics</h3>
      <p className={'mt-1 text-xs text-muted-foreground'}>
        Basic player statistics in {game.toUpperCase()}.
      </p>

      <div className={'mt-3 flex flex-wrap items-center gap-3'}>
        <SkillLevel level={player?.games?.[game]?.skill_level} />

        <Badge variant={'outline'} className={'px-3 py-2 font-normal'}>
          {player?.games?.[game]?.faceit_elo} ELO
        </Badge>
      </div>

      <div className={'mt-5 grid gap-3 md:grid-cols-3 '}>
        <div className={'rounded border p-3 text-sm'}>
          <h3 className={'text-xs'}>24h results</h3>
          <div className={'mt-3'}>
            {getSummaryByRange(1, storedMatches.current).summaryComponent}
          </div>
        </div>

        <div className={'rounded border p-3 text-sm'}>
          <h3 className={'text-xs'}>7 days results</h3>
          <div className={'mt-3'}>
            {getSummaryByRange(7, storedMatches.current).summaryComponent}
          </div>
        </div>

        <div className={'rounded border p-3 text-sm'}>
          <h3 className={'text-xs'}>
            {storedMatches.current?.length} matches results
          </h3>
          <div className={'mt-3'}>
            {getSummaryByRange(99999, storedMatches.current).summaryComponent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsHeader;
