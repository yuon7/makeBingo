import type { StylesConfig } from 'react-select';
import type { OptionType } from '../types/type';

export const customSelectStyles: StylesConfig<OptionType> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    borderColor: '#ccc',
    boxShadow: 'none',
    ':hover': { borderColor: 'lightgray' },
    borderRadius: 20,
    padding: 4,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? 'lightgray' : isFocused ? 'white' : undefined,
    ':active': { backgroundColor: isSelected ? 'lightgray' : undefined },
    borderRadius: 10,
  }),
  menu: (styles) => ({
    ...styles,
    borderRadius: 10,
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
  }),
  singleValue: (styles) => ({
    ...styles,
    color: 'black',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: 'lightgray',
  }),
};
