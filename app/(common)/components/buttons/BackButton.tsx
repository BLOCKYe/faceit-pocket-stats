import React from 'react';
import { Button } from '@/app/(common)/components/shadcn/ui/button';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

interface IBackButtonProps {
  text?: string;
  shortText?: string;
  link: string;
  type?: 'left' | 'right';
}

const BackButton: React.FC<IBackButtonProps> = (props) => {
  const router = useRouter();

  return (
    <Button variant={'link'} onClick={() => router.push(props.link)}>
      {props.type !== 'right' && <FaArrowLeftLong className={'mr-3'} />}

      {!props.shortText && <p>{props.text ?? 'Back'}</p>}

      {props.shortText && (
        <>
          <p className={'hidden md:block'}>{props.text ?? 'Back'}</p>
          <p className={'md:hidden'}>{props.shortText ?? 'Back'}</p>
        </>
      )}

      {props.type === 'right' && <FaArrowRightLong className={'ml-3'} />}
    </Button>
  );
};

export default BackButton;
