import React from 'react';
import { Button } from '@/components/ui/button';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

interface IBackButtonProps {
  text?: string;
  link: string;
  type?: 'left' | 'right';
}

const BackButton: React.FC<IBackButtonProps> = (props) => {
  const router = useRouter();

  return (
    <Button variant={'link'} onClick={() => router.push(props.link)}>
      {props.type !== 'right' && <FaArrowLeftLong className={'mr-3'} />}
      {props.text ?? 'Back'}
      {props.type === 'right' && <FaArrowRightLong className={'ml-3'} />}
    </Button>
  );
};

export default BackButton;
