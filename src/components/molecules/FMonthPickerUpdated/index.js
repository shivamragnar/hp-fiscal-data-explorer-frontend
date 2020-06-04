import React, {useState} from "react"
import moment from "moment"
import { DatePicker, Select } from 'antd';

import './_style.scss'

const { RangePicker } = DatePicker;

const dateFormat = 'MMM. YYYY'

const FMonthPickerUpdated = ({onDateRangeSet, availableFinancialYears}) => {
    const [financialYear, setFinancialYear] = useState("2019-2020")
    const [rangePickerValue, setRangePickerValue] = useState([
        moment(`2019/04/01`, "YYYY/MM/DD"),
        moment(`2020/03/31`, "YYYY/MM/DD")
    ])
    
    const handleSelectYear = (val, arr) => {
        let dates = val.split('-')
        setFinancialYear(val)
        setRangePickerValue([
            moment(`${dates[0]}/04/01`, "YYYY/MM/DD"),
            moment(`${dates[1]}/03/31`, "YYYY/MM/DD")
        ])
        let dateObject = {
            from: {
                year: dates[0],
                month: 4
            },
            to: {
                year: dates[1],
                month: 3
            }
        }
        onDateRangeSet(dateObject)
    }
    
    const handleDateRangeSelection = (dates) => {
        handleSetPanelButtonActions(dates)
        if(dates){
            let dateObject = {
                from: {
                    year: dates[0].year(),
                    month: dates[0].month() + 1
                },
                to: {
                    year: dates[1].year(),
                    month: dates[1].month() + 1
                }
            }
            setRangePickerValue(dates)
            onDateRangeSet(dateObject)
        }
    }

    const handleSetPanelButtonActions = (dates) => {
        let condition = (dates[0].year() === dates[1].year()) && (dates[0].year() ===  parseInt(financialYear.split('-')[1]))
        if(condition){
            let button = document.querySelector('.ant-picker-header > button')
            button.style.pointerEvents = "auto";
            button.addEventListener('click', () => {
                button.style.pointerEvents = "none"
            })
        }
    }

    return(
        <div className="ml-20">
           <Select 
           defaultValue="2019-2020"
           options={availableFinancialYears} 
           onChange={handleSelectYear}
           />
           <RangePicker
           className="ml-20"
            picker="month"
            allowClear={false}
            value={rangePickerValue}
            separator={""}
            onOpenChange={(open) => {
                if(open){
                   handleSetPanelButtonActions(rangePickerValue)
                }
            }}
            disabledDate={current =>
                current &&
                (current <  moment(`${financialYear.split('-')[0]}/04/01`, "YYYY/MM/DD") ||
                current >  moment(`${financialYear.split('-')[1]}/03/31`, "YYYY/MM/DD"))
            }
            format={dateFormat}
            onChange={handleDateRangeSelection}
        />
        </div>
    )
}


export default FMonthPickerUpdated