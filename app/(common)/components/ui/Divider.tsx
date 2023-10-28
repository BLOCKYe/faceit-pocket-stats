import React from 'react';

const Divider: React.FC<React.InputHTMLAttributes<HTMLDivElement>> = (
  props
) => {
  return <div className={props.className + ' w-full border'} />;
};

export default Divider;
