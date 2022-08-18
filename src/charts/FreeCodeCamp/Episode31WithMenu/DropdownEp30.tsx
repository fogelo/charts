import React from 'react';

const DropdownEp30 = ({
                          options,
                          id,
                          onSelectedValueChange,
                          selectedValue
                      }: any) => {

    return (
        <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
            {options.map(({value, label}: any) => <option value={value}
                                                  selected={value === selectedValue}>{label}</option>)}
        </select>
    );
};

export default DropdownEp30;