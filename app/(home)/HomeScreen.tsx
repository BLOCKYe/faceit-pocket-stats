import React from 'react';
import MainWrapper from '@/app/(common)/components/wrappers/MainWrapper';
import UserSearch from '@/app/(home)/components/UserSearch';

const HomeScreen: React.FC = (props) => {
  return (
    <MainWrapper>
      <section>
        <h3
          className={
            'mt-10 text-3xl font-bold md:mt-20 md:text-center md:text-5xl'
          }>
          Faceit Pocket Stats
        </h3>
        <p className={'mx-auto mt-5 text-sm md:max-w-xl md:text-center'}>
          Faceit Pocket Stats is your ultimate gaming data hub. Whether
          you&apos;re a pro or a casual gamer, access key stats, compare
          performance, and challenge yourself. Join now to level up your gaming
          journey through data-driven success.
        </p>
      </section>

      <section className={'mx-auto md:mt-20 md:max-w-xl'}>
        <UserSearch />
      </section>
    </MainWrapper>
  );
};

export default HomeScreen;
