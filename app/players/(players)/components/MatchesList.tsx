import React from 'react';
import { MatchDataType, MatchItemType } from '@/types/MatchTypes';
import MatchItem from '@/app/players/(players)/components/MatchItem';

interface IMatchesListProps {
  matches?: MatchDataType;
}

const MatchesList: React.FC<IMatchesListProps> = ({ matches }) => {
  return (
    <div>
      <div>
        <h3>Mataches</h3>
        <p className={'mt-1 text-xs text-muted-foreground'}>
          List of last {matches?.items.length} matches.
        </p>
      </div>

      <div className={'mt-3 grid gap-3'}>
        {matches?.items?.map((match: MatchItemType) => (
          <MatchItem key={match.stats['Match Id']} match={match} />
        ))}

        {matches?.items.length === 0 && (
          <p className={'text-xs text-muted-foreground'}>No data.</p>
        )}
      </div>
    </div>
  );
};

export default MatchesList;
