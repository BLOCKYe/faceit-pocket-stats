import React, { useMemo, useRef } from 'react';
import { Badge } from '@/app/(common)/components/shadcn/ui/badge';
import { PlayerDataType } from '@/types/PlayerType';
import { MatchDataType, MatchItemType } from '@/types/MatchTypes';
import moment from 'moment/moment';
import { FiArrowDownRight, FiArrowRight, FiArrowUpRight } from 'react-icons/fi';
import SkillLevel from '@/app/(common)/components/badge/SkillLevel';
import GamesEnum, { SteamGamesAppIds } from '@/constants/gamesEnum';
import { GameType } from '@/types/GamesTypes';
import { Skeleton } from '@/app/(common)/components/schadcn/ui/skeleton';
import { IoTrendingDown, IoTrendingUp } from 'react-icons/io5';
import {
  getLastMatch,
  getLevelRange,
  getPlayedHoursByGameId,
  getSummaryByRange,
} from '@/app/players/(players)/components/StatsHeader.utils';
import { averageEloForMatch } from '@/constants/eloLevels';
import { FaLongArrowAltRight } from 'react-icons/fa';

interface IStatsHeaderProps {
  player?: PlayerDataType;
  matches?: MatchDataType;
  game: GamesEnum;
  games?: GameType[];
  isGamesPending?: boolean;
}

const StatsHeader: React.FC<IStatsHeaderProps> = ({
  player,
  matches,
  game,
  games,
  isGamesPending,
}) => {
  const storedMatches = useRef(matches?.items);
  const lastMatch = useMemo(() => {
    return getLastMatch(storedMatches.current?.[0]);
  }, []);

  const counterStrikeHours = useMemo(() => {
    return getPlayedHoursByGameId(SteamGamesAppIds.CS, games);
  }, [games]);

  const deRankSummary = useMemo(() => {
    const rangeInfo = getLevelRange(player?.games?.[game]?.faceit_elo);
    const toLose = rangeInfo.prevValue
      ? Math.ceil(rangeInfo.prevValue / averageEloForMatch)
      : 0;
    return (
      <>
        <span>{rangeInfo.prevComponent}</span>
        <IoTrendingDown className={'text-base text-red-500'} />
        {!!rangeInfo.prevValue && (
          <span className={'text-muted-foreground'}>
            ~{toLose} lose{toLose > 1 ? 's' : ''}
          </span>
        )}
      </>
    );
  }, [game, player?.games]);

  /**
   *
   */
  const rankUpSummary = useMemo(() => {
    const rangeInfo = getLevelRange(player?.games?.[game]?.faceit_elo);
    const toWin = rangeInfo.nextValue
      ? Math.ceil(rangeInfo.nextValue / averageEloForMatch)
      : 0;
    console.log(toWin);
    return (
      <>
        <span>{rangeInfo.nextComponent}</span>
        <IoTrendingUp
          className={
            toWin > 0 ? 'text-base text-green-500' : 'text-base text-yellow-500'
          }
        />
        {!!rangeInfo.nextValue && (
          <span className={'text-muted-foreground'}>
            ~{toWin} win{toWin > 1 ? 's' : ''}
          </span>
        )}
      </>
    );
  }, [game, player?.games]);

  /**
   *
   */
  return (
    <div>
      <h3>{game.toUpperCase()} Statistics</h3>
      <p className={'mt-1 text-xs text-muted-foreground'}>
        Basic player statistics in {game.toUpperCase()}.
      </p>

      {lastMatch && (
        <p className={'mt-1 text-xs text-muted-foreground'}>
          Last match: {lastMatch}
        </p>
      )}

      <div className={'mt-3 flex flex-wrap items-center gap-3'}>
        <SkillLevel level={player?.games?.[game]?.skill_level} />

        <Badge
          variant={'outline'}
          className={'gap-1 rounded px-3 py-2 font-normal'}>
          <strong> {player?.games?.[game]?.faceit_elo}</strong>{' '}
          <span className={'text-muted-foreground'}>ELO</span>
        </Badge>

        <FaLongArrowAltRight className={'text-muted'} />

        <Badge
          variant={'outline'}
          className={'gap-3 rounded px-3 py-2 font-normal'}>
          {deRankSummary}
        </Badge>

        <Badge
          variant={'outline'}
          className={'gap-3 rounded px-3 py-2 font-normal'}>
          {rankUpSummary}
        </Badge>
      </div>

      {/* <--- summaries by range ---> */}
      <div className={'mt-5 grid gap-3 md:grid-cols-3'}>
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

      {/* <--- played hours ---> */}
      <div className={'mt-3 flex flex-wrap items-center gap-3'}>
        {counterStrikeHours.all_time !== '0' && (
          <Badge
            variant={'outline'}
            className={'w-full gap-1 rounded px-3 py-2 font-normal md:w-auto'}>
            <strong>{counterStrikeHours.all_time}</strong>
            <span className={'text-muted-foreground'}>hours played</span>
          </Badge>
        )}

        {isGamesPending && !games && (
          <>
            <Skeleton className='h-[33px] w-[140px] rounded' />
            <Skeleton className='h-[33px] w-[210px] rounded' />
          </>
        )}

        {counterStrikeHours.two_weeks !== '0' && (
          <Badge
            variant={'outline'}
            className={'w-full gap-1 rounded px-3 py-2 font-normal md:w-auto'}>
            <strong>{counterStrikeHours.two_weeks} </strong>
            <span className={'text-muted-foreground'}>
              hours played in last 14 days
            </span>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default StatsHeader;
