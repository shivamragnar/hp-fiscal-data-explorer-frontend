import React from "react";

import { Select } from 'antd';

import "./_style.scss"

const { Option } = Select;


const FSelect = ({className, disabled, initialSelectedItems, useTitleInItem, label, invalid, invalidText, onChange, items, type}) => {

  const handleChange = (val, arr) => {
    console.log('testing handle change for ', val, arr)
    let event = {selectedItems: arr}
    onChange(event);
  } 
  console.log('inside single select element', items, initialSelectedItems)
  return (
    <div className={className} key={items && items.length && items[0].filter_name}>
    <Select
      disabled={disabled}
      value={initialSelectedItems ? initialSelectedItems.map(item => item.label) : ""}
      style={{ width: '100%' }}
      placeholder="ALL"
      // options={items}
      onChange={handleChange}
  >
    {
      items && items.map((item, ind) => <Option value={item.value} title={item.label}>{item.label}</Option>)
    }
  </Select>
    </div>
  )};


export default FSelect;
