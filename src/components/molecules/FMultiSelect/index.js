import React from "react";

import { Select } from 'antd';

import "./_style.scss"


const FMultiSelect = ({className, disabled, initialSelectedItems, useTitleInItem, label, invalid, invalidText, onChange, items, type}) => {

  const handleChange = (val, arr) => {
    let event = {selectedItems: arr}
    if(type==="timeseries"){
      val = val.filter(item => item !== 'All Demands')
      onChange(val)
    }
    else{
      onChange(event)
    }
  } 

  return (
    <div className={className} key={items && items.length && items[0].filter_name}>
    <Select
      mode="multiple"
      disabled={disabled}
      value={initialSelectedItems ? initialSelectedItems.map(item => item.label) : []}
      style={{ width: '100%' }}
      placeholder="ALL"
      options={items}
      onChange={handleChange}
  />
    </div>
  )};


export default FMultiSelect;
