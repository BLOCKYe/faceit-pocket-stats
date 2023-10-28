import React from 'react';

interface IMainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper: React.FC<IMainWrapperProps> = (props) => {
  return (
    <div className={'flex justify-center'}>
      <div className={'max-w-5xl px-3 py-10'}>{props.children}</div>
    </div>
  );
};

export default MainWrapper;
