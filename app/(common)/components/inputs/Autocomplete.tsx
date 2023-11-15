import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';

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
    setIsOpen(!!props.data.length);
  }, [props.data.length]);

  /**
   * Render memoized items
   */
  const renderItems = useMemo(() => {
    if (props.data.length === 0) return <></>;

    return (
      <div
        className={
          'sticky mt-1 max-h-[250px] w-full overflow-y-auto rounded-md border border-zinc-800'
        }
        style={{ maxWidth: 'inherit' }}>
        {props.data.map((item: AutoCompleteDataType) => (
          <div
            className={
              'cursor-pointer px-3 py-2 text-xs transition-all hover:bg-zinc-900'
            }
            key={item.id}
            onClick={() => props.onSelect && props.onSelect(item.id)}>
            {item.name}
          </div>
        ))}
      </div>
    );
  }, [props]);

  return (
    <div
      className={'relative w-full ' + props.className}
      ref={ref}
      onClick={() => setIsOpen(true)}>
      {props.inputComponent}
      {isOpen && renderItems}
    </div>
  );
};

export default Autocomplete;
