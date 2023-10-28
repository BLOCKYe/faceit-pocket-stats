import React from 'react';

interface IMainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper: React.FC<IMainWrapperProps> = (props) => {
  return (
    <main className={'flex justify-center'}>
      <div className={'w-full max-w-3xl px-3 py-10'}>{props.children}</div>
    </main>
  );
};

export default MainWrapper;
