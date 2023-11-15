import React from 'react';
import { MatchDataType, MatchItemType } from '@/types/MatchTypes';
import MatchItem from '@/app/players/(players)/components/MatchItem';
import { paginationMatchesPerPage } from '@/constants/pagination';

interface IMatchesListProps {
  matches?: MatchDataType;
  page: number;
}

const MatchesList: React.FC<IMatchesListProps> = ({ matches, page }) => {
  return (
    <div>
      <div>
        <h3>Matches</h3>
        <p className={'mt-1 text-xs text-muted-foreground'}>
          List of last{' '}
          {page * paginationMatchesPerPage - paginationMatchesPerPage} -{' '}
          {page * paginationMatchesPerPage} matches.
        </p>
      </div>

      <div className={'mt-3 grid gap-3'}>
        {matches?.items?.map((match: MatchItemType) => (
          <MatchItem key={match.stats['Match Id']} match={match} />
        ))}

        {matches?.items?.length === 0 && (
          <p className={'text-xs text-muted-foreground'}>No data.</p>
        )}
      </div>
    </div>
  );
};

export default MatchesList;
