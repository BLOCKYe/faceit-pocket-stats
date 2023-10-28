import React from 'react';
import MainWrapper from '@/app/(common)/components/wrappers/MainWrapper';
import UserSearch from '@/app/(home)/components/UserSearch';

const HomeScreen: React.FC = (props) => {
  return (
    <MainWrapper>
      <section>
        <h3 className={'mt-10 text-center text-5xl font-bold'}>
          Faceit Pocket Stats
        </h3>
        <p className={'mx-auto mt-5 max-w-xl text-center text-sm'}>
          Faceit Pocket Stats is your ultimate gaming data hub. Whether
          you&apos;re a pro or a casual gamer, access key stats, compare
          performance, and challenge yourself. Join now to level up your gaming
          journey through data-driven{' '}
          <b className={'text-amber-400'}>success</b>.
        </p>
      </section>

      <section>
        <UserSearch />
      </section>
    </MainWrapper>
  );
};

export default HomeScreen;
