import axios from "axios";
import {
  GET_EXP_DEMANDWISE_DATA,
  SET_DATA_LOADING,
  EXP_DEMANDWISE_DATA_ERROR,
  GET_EXP_DEMANDWISE_FILTERS_DATA
} from "./types";

//data-refs
var yymmdd_ref = require("../data/yymmdd_ref.json");
var scsr_offset = require("../data/scsr_offset.json");

export const getExpDemandwiseData = (activeFilters, dateRange) => async dispatch => {
  try {

    const [ dateFrom , dateTo ] = dateRange;
    const { months , years, years_short } = yymmdd_ref;

    console.time("Axios Fetch"); console.log("Axios Fetch Started");

    dispatch({
      type: SET_DATA_LOADING,
      payload: {}
    });

    // const config = { headers: { "content-type": "application/json" } };
    // const res = await axios.post(`http://13.126.189.78/api/detail_exp_month?start=${dateFrom}&end=${dateTo}`, activeFilters, config );

    //calc actual number of days between 2 dates
    var dateFromTime = new Date(dateFrom).getTime();
    var dateToTime = new Date(dateTo).getTime();
    var daysDiff = ((dateToTime - dateFromTime) / (1000 * 3600 * 24)) + 2; //this calcs every day BETWEEN the given 2 dates. So add '2' to correct this


    const month_week = daysDiff > 125 ? "month" : "week"; //give month-wise breakdown if range > 125 days
    const fromMonthIndex = parseInt(dateFrom.split('-')[1])-1;
    const fromYearIndex = years.indexOf(dateFrom.split('-')[0]);


      const config = { headers: { "content-type": "application/json" } };
      const res = await axios.post(
        `http://13.126.189.78/api/detail_exp_${month_week}?start=${dateFrom}&end=${dateTo}`, activeFilters, config
      );
      console.log("raw data from API: ");
      console.log(res.data.records);
      var tempExpData = [];
      var tempTableData = {
        headers : [],
        rows : []
      };
      var highestRecord = 0;
      res.data.records.map((record, i) => {
        var dataObj = {};
        if(i === 0){ //first we identify highest record to define the 'height of mark' appropriately
          res.data.records.map((record, i) => {
            if(record[0] > highestRecord){
              highestRecord = record[0];
            }
          })
        }

        dataObj.date = month_week === "month" ?
                       months[(i+fromMonthIndex)%12]+" "+years_short[Math.floor((i+fromMonthIndex)/12) + fromYearIndex] :
                       "w_"+(i+1)*7;
        dataObj.sanction = Math.round(record[0]*100)/100;
        dataObj.addition = Math.round(record[1]*100)/100;
        dataObj.savings = Math.round(record[2]*100)/100;
        dataObj.revised = Math.round(record[3]*100)/100;
        dataObj.mark = Math.round((1/100)*highestRecord);
        tempExpData.push(dataObj);
      })

      const calcScsrOffset = (tempExpData) => {
        const noOfDataRecords = tempExpData.length;
        return scsr_offset.xOffset[noOfDataRecords - 1];

      }

      const getYLabelFormatVals = (highestRecord) => {
        const highestRecordLength = Math.floor(highestRecord).toString().length;
        if( highestRecordLength > 5 ){ return [ 100000 , " L "] }
        else if( highestRecordLength < 5 && highestRecordLength > 3 ){ return [ 100 , " K "] }
        else{ return [ 1 , " "] }
      }

      //setup exp details table data
      tempExpData.map((d, i) => {

      	i === 0 && tempTableData.headers.push(
          { key: 'date', header: 'Date' },
          { key: 'sanction', header: 'Sanction' },
          { key: 'addition', header: 'Addition' },
          { key: 'savings', header: 'Savings' },
          { key: 'revised', header: 'Revised' }
        );

      	tempTableData.rows.push({
      		id: i,
      		'date': d.date,
      		'sanction': Math.round(d.sanction*100)/100,
      		'addition': Math.round(d.addition*100)/100,
      		'savings': Math.round(d.savings*100)/100,
      		'revised': Math.round(d.revised*100)/100
      	})
      })

      console.log("highestRecord: " + highestRecord);
      console.log(getYLabelFormatVals(highestRecord)[0]);


    dispatch({
      type: GET_EXP_DEMANDWISE_DATA,
      payload: {
        data: {
          vizData: {
            yLabelFormat:["", getYLabelFormatVals(highestRecord)[1]+"INR",1/getYLabelFormatVals(highestRecord)[0]],
            data:tempExpData,
            scsrOffset: calcScsrOffset(tempExpData)
          },
          tableData: tempTableData
        },
        dateRange: dateRange,
        activeFilters: activeFilters
      }
    });
  } catch (err) {
    dispatch({
      type: EXP_DEMANDWISE_DATA_ERROR,
      payload: {
        status: err.response.status
      }
    });
  }
  console.timeEnd("Axios Fetch");
};
