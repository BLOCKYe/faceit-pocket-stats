import { MatchItemType } from '@/types/MatchTypes';
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import { SteamGamesAppIds } from '@/constants/gamesEnum';
import { GameType } from '@/types/GamesTypes';
import moment from 'moment';
import { eloLevels } from '@/constants/eloLevels';
import React from 'react';
import { FaCrown, FaWheelchairMove } from 'react-icons/fa6';

/**
 * This function is used to get hours for counterstrike
 * @param games
 * @param gameId
 */
export const getPlayedHoursByGameId = (
  gameId: SteamGamesAppIds,
  games?: GameType[]
): {
  two_weeks: string;
  all_time: string;
} => {
  if (!games || !Array.isArray(games)) {
    return {
      two_weeks: '0',
      all_time: '0',
    };
  }

  const counterStrikeHours = games?.find(
    (game: GameType) => game.appid === gameId
  );

  const two_weeks = counterStrikeHours?.playtime_2weeks ?? 0;
  const all_time = counterStrikeHours?.playtime_forever ?? 0;

  return {
    two_weeks: two_weeks ? (two_weeks / 60).toFixed(1) : '0',
    all_time: all_time ? (all_time / 60).toFixed(1) : '0',
  };
};

/**
 * Returns last match date from now as string ex: 3 days ago
 * @param match
 */
export const getLastMatch = (match?: MatchItemType): string | null => {
  if (!match) return null;

  return moment(match.stats['Updated At']).fromNow();
};

/**
 * This function is used to
 * get loses and wins
 * summary from range
 * @param days
 * @param matches
 */
export const getSummaryByRange = (
  days: number,
  matches?: MatchItemType[]
): {
  summaryComponent: React.ReactNode;
} => {
  let wins = 0;
  let loses = 0;
  let kills = 0;
  let deaths = 0;

  if (!matches) {
    return {
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
    summaryComponent: getMatchesComponents(
      wins,
      loses,
      kills,
      deaths,
      matchesFromRange
    ),
  };
};

/**
 *
 * @param value
 */
export const getTrendIcon = (value: number): React.ReactNode => {
  if (value >= 1) {
    return <FiArrowUpRight className={'mr-2 text-green-500'} />;
  } else if (value < 0) {
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
export const getMatchesComponents = (
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
        {getTrendIcon(wins - loses)} {wins} W / {loses} L{' '}
        <span className={'ml-2 text-xs text-muted-foreground mt-1'}>
          {' '}
          {((wins / (wins + loses)) * 100).toFixed(0)}% WR
        </span>
      </div>
      <div className={'mt-3 text-xs text-muted-foreground'}>
        {(kills / matchesFromRange.length).toFixed(1)} AVG,{' '}
        {(kills / deaths).toFixed(2)} KD
      </div>
    </div>
  );
};

/**
 * This function is used to get next and previous elo levels
 * @param currentElo
 */
export const getLevelRange = (
  currentElo?: number
): {
  prevComponent: React.ReactNode;
  nextComponent: React.ReactNode;
  prevValue: number | null;
  nextValue: number | null;
} => {
  if (!currentElo) {
    return {
      prevComponent: <></>,
      nextComponent: <></>,
      prevValue: null,
      nextValue: null,
    };
  }

  let nextLevelValue;
  let prevLevelValue;

  for (const level of eloLevels) {
    if (level > currentElo && !nextLevelValue) {
      nextLevelValue = level;
    }

    if (level <= currentElo) {
      prevLevelValue = level;
    }
  }

  // max available level
  if (!nextLevelValue && prevLevelValue) {
    return {
      prevComponent: prevLevelValue - 1 - currentElo,
      nextComponent: <FaCrown className={'text-base text-yellow-500'} />,
      prevValue: Math.abs(prevLevelValue - 1 - currentElo),
      nextValue: null,
    };
  }

  // min available level
  if (!prevLevelValue && nextLevelValue) {
    return {
      prevComponent: <FaWheelchairMove className={'text-base text-pink-500'} />,
      nextComponent: '+' + (nextLevelValue - currentElo),
      prevValue: null,
      nextValue: nextLevelValue - currentElo,
    };
  }

  return {
    prevComponent: (prevLevelValue ?? 0) - 1 - currentElo,
    nextComponent: '+' + ((nextLevelValue ?? 0) - currentElo),
    prevValue: prevLevelValue ? Math.abs(prevLevelValue - 1 - currentElo) : null,
    nextValue: nextLevelValue ? nextLevelValue - currentElo : null,
  };
};
