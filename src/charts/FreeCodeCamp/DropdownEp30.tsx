import React from 'react';

const DropdownEp30 = ({
                          options,
                          id,
                          onSelectedValueChange,
                          selectedValue
                      }: any) => {

    return (
        <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
            {options.map((option: any) => <option value={option.value}
                                                  selected={option.value === selectedValue}>{option.label}</option>)}
        </select>
    );
};

export default DropdownEp30;