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
        <p className={'mx-auto mt-5 md:max-w-xl md:text-center'}>
          Elevate your Counter-Strike game with Faceit Pocket Stats – the
          essential app for Faceit platform enthusiasts. Analyze real-time
          stats, explore player profiles, and track your progress effortlessly.
          Whether you&apos;re a pro or a rising star, Faceit Pocket Stats
          empowers you to make data-driven decisions, enhancing gameplay and
          dominating the competition.
        </p>
      </section>

      <section className={'mx-auto md:mt-20 md:max-w-xl'}>
        <UserSearch />
      </section>
    </MainWrapper>
  );
};

export default HomeScreen;
