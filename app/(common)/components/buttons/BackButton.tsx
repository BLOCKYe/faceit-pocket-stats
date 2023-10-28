import React from 'react';
import { Button } from '@/components/ui/button';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';

interface IBackButtonProps {
  text?: string;
  link: string;
}

const BackButton: React.FC<IBackButtonProps> = (props) => {
  const router = useRouter();

  return (
    <Button variant={'link'} onClick={() => router.push(props.link)}>
      <FaArrowLeftLong className={'mr-3'} />
      {props.text ?? 'Back'}
    </Button>
  );
};

export default BackButton;
