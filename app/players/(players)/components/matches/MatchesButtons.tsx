import React, { Dispatch, SetStateAction } from 'react';
import { Button } from '@/app/(common)/components/shadcn/ui/button';

interface IMatchesButtonsProps {
  matchesPage: number;
  setMatchesPage: Dispatch<SetStateAction<number>>;
  getNextPageButtonIsDisabled: boolean;
}

const MatchesButtons: React.FC<IMatchesButtonsProps> = (props) => {
  return (
    <div className={'mt-3 flex flex-wrap items-center justify-between gap-3'}>
      <Button
        data-test-id={'previous-page-button'}
        disabled={props.matchesPage === 1}
        variant={'outline'}
        size={'sm'}
        onClick={() => props.setMatchesPage((old) => old - 1)}>
        Previous
      </Button>

      <h1 className={'text-xs text-muted-foreground'}>
        Page {props.matchesPage}
      </h1>

      <Button
        data-test-id={'next-page-button'}
        disabled={props.getNextPageButtonIsDisabled}
        variant={'outline'}
        size={'sm'}
        onClick={() => props.setMatchesPage((old) => old + 1)}>
        Next
      </Button>
    </div>
  );
};

export default MatchesButtons;
