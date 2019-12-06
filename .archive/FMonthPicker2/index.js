import React from "react";
import { Link } from "react-router-dom";
import Picker from 'react-month-picker';
import FMonthBox from '../../atoms/FMonthBox';

const FMonthPicker2 = props => {

  let pickerLang = {
            months: ['Jan', 'Feb', 'Mar', 'Spr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            , from: 'From', to: 'To'
        }
        , mvalue = {year: 2015, month: 11}
        , mrange = {from: {year: 2014, month: 8}, to: {year: 2015, month: 5}}

    let makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
        return '?'
    }

  function handleClickMonthBox(){

  }

  function _handleClickRangeBox(){

  }

  function handleAMonthChange(){

  }

  function handleAMonthDismiss(){

  }

  function handleRangeChange(){

  }

  function handleRangeDismiss(){

  }

  return (
    <ul>
            <li>
                <label>Pick A Month</label>
                <div className="edit">
                    <Picker

                        years={[2008, 2010, 2011, 2012, 2014, 2015, 2016, 2017]}
                        value={mvalue}
                        lang={pickerLang.months}
                        onChange={handleAMonthChange}
                        onDismiss={handleAMonthDismiss}
                        >

                        <FMonthBox value={makeText(mvalue)} onClick={handleClickMonthBox} />

                    </Picker>
                </div>
            </li>
            <li>
                <label>Pick A Span of Months</label>
                <div className="edit">
                    <Picker

                        years={{min: 2010, max: 2018}}
                        range={mrange}
                        lang={pickerLang}
                        theme="dark"
                        onChange={handleRangeChange}
                        onDismiss={handleRangeDismiss}
                        >

                          <FMonthBox value={makeText(mrange.from) + ' ~ ' + makeText(mrange.to)} onClick={_handleClickRangeBox} />

                    </Picker>
                </div>
            </li>
        </ul>
  )
}


export default FMonthPicker2;
