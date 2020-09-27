import React from 'react';

import { SelectItem } from '../../../../models/widget'
import SimpleSelect from '../../../UI/Selects';

interface MobileSelectProps {
  onChange: (item: any) => void,
  value: SelectItem,
  className?: string,
  selectClassName?: string,
  options: SelectItem[],
}
export const MobileSelect: React.FC<MobileSelectProps> = (props) => {
  function onSelectChange(value: string) {
    const item = props.options.find((item) => {
      return item.value === value;
    });

    props.onChange(item);
  };

  return (
    <SimpleSelect
      onChange={onSelectChange}
      value={props.value.value}
      className={props.className}
      selectClassName={props.selectClassName}
    >
      {props.options.map((item) => {
        return (
          <option
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.title}
          </option>
        )
      })}
    </SimpleSelect>
  )
}
