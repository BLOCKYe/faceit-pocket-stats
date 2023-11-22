import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

export type AutoCompleteDataType = {
  name: React.ReactNode;
  id: any;
  nickName: string
};

interface IAutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  data: AutoCompleteDataType[];
  inputComponent: React.ReactNode;
  onSelect: (id: any) => void;
}

const Autocomplete: React.FC<IAutocompleteProps> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef(null);

  /**
   *
   */
  const handleClickOutside = () => {
    if (isOpen) setIsOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    setIsOpen(props.data.length > 0);
  }, [props.data]);

  /**
   *
   */
  const renderItems = useMemo(() => {
    return props.data.map((item) => (
      <AutocompleteItem key={item.id} data={item} onSelect={props.onSelect} />
    ));
  }, [props.data]);

  return (
    <div className={'w-full'} ref={ref}>
      <div onClick={() => props.data.length > 0 && setIsOpen(true)}>
        {props.inputComponent}
      </div>

      {isOpen && <div className={'rounded-md border p-1'}>{renderItems}</div>}
    </div>
  );
};

export default Autocomplete;

interface IAutocompleteItemProps {
  data: AutoCompleteDataType;
  onSelect: (data: AutoCompleteDataType) => void;
}

const AutocompleteItem: React.FC<IAutocompleteItemProps> = (props) => {
  return (
    <div
      onClick={() => props.onSelect(props.data)}
      className={'cursor-pointer px-2 py-2 transition-all hover:bg-zinc-900'}>
      {props.data.name}
    </div>
  );
};
