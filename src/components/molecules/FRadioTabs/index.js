import React from "react"
import { Radio } from 'antd';

import "./_style.scss"

const financialYears = [ "2017-18", "2018-19", "2019-20"]

const FRadioTabs = (props) => {

  return(
    <Radio.Group defaultValue="2019-20" buttonStyle="solid" className={props.className} onChange={props.onChange}>
      {
        financialYears.map(year => {
          return (
            <Radio.Button value={year}>{year}</Radio.Button>
          )
        })
      }
    </Radio.Group>
  )
}

export default FRadioTabs;