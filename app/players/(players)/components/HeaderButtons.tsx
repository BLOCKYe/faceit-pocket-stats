import React from 'react';
import BackButton from '@/app/(common)/components/buttons/BackButton';
import PATHS from '@/constants/Paths';
import GamesEnum from '@/constants/gamesEnum';

interface IHeaderButtonsProps {
  playerId: string;
  game: GamesEnum;
}

const HeaderButtons: React.FC<IHeaderButtonsProps> = (props) => {
  return (
    <div className={'flex flex-wrap items-center justify-between gap-3'}>
      <BackButton
        link={PATHS.HOME}
        text={'Back to home page'}
        type={'left'}
        shortText={'Home'}
      />
      <BackButton
        shortText={
          props.game === GamesEnum.CS2
            ? GamesEnum.CSGO.toUpperCase()
            : GamesEnum.CS2.toUpperCase()
        }
        link={PATHS.PLAYERS.PLAYER_ID(
          props.playerId,
          props.game === GamesEnum.CS2 ? GamesEnum.CSGO : GamesEnum.CS2
        )}
        text={`${
          props.game === GamesEnum.CS2
            ? GamesEnum.CSGO.toUpperCase()
            : GamesEnum.CS2.toUpperCase()
        } Statistics`}
        type={'right'}
      />
    </div>
  );
};

export default HeaderButtons;
