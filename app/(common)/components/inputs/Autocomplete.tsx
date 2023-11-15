import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type AutoCompleteDataType = {
  name: React.ReactNode;
  id: any;
};

interface IAutocompleteProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  data: AutoCompleteDataType[];
  inputComponent: React.ReactNode;
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

  return (
    <div className={'w-full'}>
      {props.inputComponent}

      <Select open={isOpen}>
        <SelectTrigger
          hideChevron
          className={'focus:none active:none h-0 border-none p-0 opacity-0'}
        />

        <SelectContent
          ref={ref}
          className={'w-full'}
          position={'popper'}
          unselectable={'on'}>
          <div className={'w-full'}>
            {props.data.map((item: AutoCompleteDataType) => (
              <SelectItem
                key={item.id}
                value={item.id}
                onClick={() => props.onSelect && props.onSelect(item.id)}
                className={'grid w-full cursor-pointer px-1'}>
                {item.name}
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Autocomplete;
