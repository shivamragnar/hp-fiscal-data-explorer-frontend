import React from "react";

import { Select } from 'antd';

const FMultiSelect = ({className, disabled, initialSelectedItems, useTitleInItem, label, invalid, invalidText, onChange, items}) => {

  const handleChange = (val, arr) => {
    let event = {selectedItems: arr}
    onChange(event)
  } 

  return (
    <div className={className} key={items && items.length && items[0].filter_name}>
    <Select
      mode="multiple"
      disabled={disabled}
      defaultValue={initialSelectedItems ? initialSelectedItems.map(item => item.label) : []}
      style={{ width: '100%' }}
      placeholder="ALL"
      options={items}
      onChange={handleChange}
  />
    </div>
  )};


export default FMultiSelect;
