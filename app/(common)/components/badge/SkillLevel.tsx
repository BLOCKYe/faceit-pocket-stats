import React from 'react';

interface ISkillLevelProps {
  level?: number;
  className?: string;
}

/**
 *
 * @param level
 */
const getLevelStyles = (level: number): string => {
  if (level >= 10) {
    return 'border-red-500 bg-red-900';
  } else if (level < 10 && level > 7) {
    return 'border-orange-500 bg-orange-900';
  } else if (level < 8 && level > 3) {
    return 'border-yellow-500 bg-yellow-900';
  } else if (level < 4 && level > 1) {
    return 'border-green-500 bg-green-900';
  }

  return 'border-zinc-500 bg-zinc-900';
};

const SkillLevel: React.FC<ISkillLevelProps> = (props) => {
  return (
    <div
      className={
        'flex h-8 w-8 items-center justify-center overflow-hidden rounded border-2 bg-opacity-30 p-2 text-xs font-bold ' +
        getLevelStyles(props.level ?? 0) +
        ` ${props.className} `
      }>
      {props.level}
    </div>
  );
};

export default SkillLevel;
