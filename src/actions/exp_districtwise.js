import axios from "axios";
import {
  DISTRICTWISE_SWITCH_ACTIVE_VIZ_IDX,
  GET_EXP_DISTRICTWISE_DATA,
  HYDRATE_EXP_DISTRICTWISE_DATA_FROM_INITDATA,
  SET_DATA_LOADING_EXP_DISTRICTWISE,
  RESET_ACTIVE_FILTERS_AND_DATE_RANGE_DISTRICTWISE,
  EXP_DISTRICTWISE_DATA_ERROR
} from "./types";


import moment from 'moment';
import {
  getWeekwiseDates,
  calcMonthOrWeek,
  createBudgetCodeString,
  createObjForPayload
} from '../utils/functions';

//data-refs
var yymmdd_ref = require("../data/yymmdd_ref.json");
var hp_geojson = JSON.stringify(require("../data/hp_geojson.json"));
const { exp_districtwise : filterOrderRef } = require("../data/filters_ref.json");

export const getExpDistrictwiseData = (initData, activeFilters, dateRange, triggeredByDateRangeChange = false) => async dispatch => {
  try {

    console.log(triggeredByDateRangeChange);

    if(Object.keys(activeFilters).length === 0 && initData && triggeredByDateRangeChange === false){
      dispatch({
        type: HYDRATE_EXP_DISTRICTWISE_DATA_FROM_INITDATA,
        payload: {
          populateInitData: false,
          data: initData,
          dateRange: dateRange,
          activeFilters: activeFilters
        }
      });
    }else{

      const [ dateFrom , dateTo ] = dateRange;
      console.log("dateRange", dateRange)
      const { months , years, years_short } = yymmdd_ref;
      const month_week = calcMonthOrWeek(dateFrom, dateTo);
      const fromMonthIndex = parseInt(dateFrom.split('-')[1])-1;
      const fromYearIndex = years.indexOf(dateFrom.split('-')[0]);
      const toMonthIndex = parseInt(dateTo.split('-')[1])-1;

      const tempLineChrtData = [];
      const tempBarChrtData = [];
      const tempMapData = JSON.parse(hp_geojson);

      const tempTableData = { headers : [], rows : [] };

      const activeFilterKeys = Object.keys(activeFilters);
      const activeFilterVals = Object.values(activeFilters);

      const objForPayload = createObjForPayload(activeFilterVals, activeFilterKeys);
      // var objForPayload = {};
      // activeFilterVals.map((val, i) => {
      //     let tempVal = val.map(item => { return item.split('-')[0]});
      //     tempVal = tempVal.join('","');
      //     objForPayload[activeFilterKeys[i]] =  '"' + tempVal + '"';
      // })
      console.log("objForPayload");
      console.log(objForPayload);

      //0 SET LOADING TO TRUE
      dispatch({ type: SET_DATA_LOADING_EXP_DISTRICTWISE, payload: {} });

      //1 PREP AND MAKE API CALL
      const config = { headers: { "content-type": "application/json" } };
      console.log('exp_districtwise_api_call:', `https://hpback.openbudgetsindia.org/api/treasury_exp?start=${dateFrom}&end=${dateTo}&range=${month_week[0].toUpperCase() + month_week.slice(1)}`);
      const res = month_week === 'month'
      ? await axios.post(
          `https://hpback.openbudgetsindia.org/api/treasury_exp?start=${dateFrom}&end=${dateTo}&range=${month_week[0].toUpperCase() + month_week.slice(1)}`, {filters:objForPayload}
        )
      : await axios.post(
          `https://hpback.openbudgetsindia.org/api/treasury_exp_temp?start=${dateFrom}&end=${dateTo}&range=${month_week[0].toUpperCase() + month_week.slice(1)}`, {filters:objForPayload}
        )
  		console.log("exp districtwise raw data"); console.log(res.data.records);
      console.log('weektesttttt', moment('2019').add(0, 'weeks').startOf('week').format('Do MMM YY'))

      //2 PREP DATA FOR VISUALIZATION
      const districtNames = Object.keys(res.data.records);
      const districtwiseExpVals = Object.values(res.data.records);

      //calc x-tick-vals if is week
      let offset = 0;
      let corresWeekNum = month_week !== 'month' && districtwiseExpVals[0].map((d,i) => {
        if(i !== 0 && districtwiseExpVals[0][i-1][0] > d[0]){ //if year has changed
           offset = districtwiseExpVals[0][i-1][0]+1;
        }
        return offset + d[0];
      })

      //calc x-tick-formats if is week
      let switchYear = false;
      let corresWeekDateRange = month_week !== 'month' && districtwiseExpVals[0].map((d,i) => {
        if(i !== 0 && districtwiseExpVals[0][i-1][0] > d[0]){ //if year has changed
           switchYear = true;
        }
        let yearForMoment = switchYear === true ? dateTo : dateFrom;
        return (
          `${moment(yearForMoment.split('-')[0]).add(d[0], 'weeks').startOf('week').format('DD MMM YY') /*gets the sunday of the week*/}
          to
          ${moment(yearForMoment.split('-')[0]).add(d[0], 'weeks').endOf('week').add(1, 'd').format('DD MMM YY') /*gets the saturday of the week*/}`

        )
      })

      districtNames.map((districtName, i) => {
        let datewiseExp = [];
        let totalExp = { districtName, gross: 0, AGDED: 0, BTDED: 0, netPayment: 0};
        // datewiseExp.push({"date":(month_week === "month" ? " " : 0), "gross": 0, "AGDED": 0, "BTDED": 0, "netPayment": 0});
        let distExpValsToMap = month_week === 'month'
        ? districtwiseExpVals[i]
        : districtwiseExpVals[i].map(d => d[1] ) ;

        console.log("distExpValsToMap", distExpValsToMap);
        distExpValsToMap.map((expArray, i) => {
          let dataObj = {};
          dataObj.idx = i;
          dataObj.date = month_week === "month"
                         ? months[(i+fromMonthIndex)%12]+" "+years_short[Math.floor((i+fromMonthIndex)/12) + fromYearIndex]
                         : corresWeekNum[i]

          dataObj.gross = expArray[0];
          dataObj.AGDED = expArray[1];
          dataObj.BTDED = expArray[2];
          dataObj.netPayment = expArray[3];
          datewiseExp.push(dataObj);

          totalExp.gross += expArray[0]
          totalExp.AGDED += expArray[1]
          totalExp.BTDED += expArray[2]
          totalExp.netPayment += expArray[3]
        })
        tempLineChrtData.push({
          districtName,
          datewiseExp,
          totalExp
        })
        tempBarChrtData.push(totalExp);
        tempMapData.features.map((feature,i) =>{
          const { properties : { NAME_2 : districtName_inJson }} = feature; //the district name as in the geojson
          if(districtName_inJson.toUpperCase() === districtName ){
            feature.properties.gross = totalExp.gross;
            feature.properties.AGDED = totalExp.AGDED;
            feature.properties.BTDED = totalExp.BTDED;
            feature.properties.netPayment = totalExp.netPayment;
          }else{
          }
        })
      })

      console.log("tempLineChrtData");
      console.log(tempLineChrtData);

      console.log("tempBarChrtData");
      console.log(tempBarChrtData);

      console.log("tempMapData");
      console.log(tempMapData);

      //3 PREP DATA FOR TABLE
      tempTableData.headers.push(
        { key: 'districtName', header: 'District' },
        { key: 'treasuryCode', header: 'Treasury Code' },
        { key: 'budgetCode', header: 'Budget Code' },
        { key: 'gross', header: 'Gross (INR)' },
        { key: 'AGDED', header: 'AGDED (INR)' },
        { key: 'BTDED', header: 'BTDED (INR)' },
        { key: 'netPayment', header: 'Net Payment (INR)' }
      )

      tempBarChrtData.map((d, i) => {
      	tempTableData.rows.push({
      		id: i,
      		'districtName': d.districtName,
          'treasuryCode' : createBudgetCodeString(activeFilterVals, activeFilterKeys, filterOrderRef, [0, 2]),
          'budgetCode' : createBudgetCodeString(activeFilterVals, activeFilterKeys, filterOrderRef, [3, filterOrderRef.length-1]),
      		'gross': d.gross.toLocaleString('en-IN'),
          'AGDED': d.AGDED.toLocaleString('en-IN'),
      		'BTDED': d.BTDED.toLocaleString('en-IN'),
      		'netPayment': d.netPayment.toLocaleString('en-IN')
      	})
      })
      console.log("tempTableData");
      console.log(tempTableData);
      console.log('tickkkkkks', month_week === "week" ? tempLineChrtData[0].datewiseExp.map(d => d.date) : 'nothing');

      dispatch({
        type: GET_EXP_DISTRICTWISE_DATA,
        payload: {
          populateInitData: initData ? false : true, //populate and store 'all data' so that we dont have to make API call again and again.
          data: {
            mapData: tempMapData,
            barChrtData: {
              data:tempBarChrtData
            },
            lineChrtData: {
              xLabelVals: month_week === "week" ? corresWeekNum : 'null',
              xLabelFormat: month_week === "week" ? corresWeekDateRange : tempLineChrtData[0].datewiseExp.map(d => d.date),
              data:tempLineChrtData
            },
            tableData: tempTableData
          },
          dateRange: dateRange,
          activeFilters: activeFilters
        }
      });
    }

  } catch (err) {
    dispatch({
      type: EXP_DISTRICTWISE_DATA_ERROR,
      payload: {
        status: err
      }
    });
  }
};

export const setActiveVizIdx = (e) => async dispatch => {
  try{
    dispatch({
      type: DISTRICTWISE_SWITCH_ACTIVE_VIZ_IDX,
      payload: e
    })
  }catch(err){

  }
}

export const resetActiveFiltersAndDateRange = () => async dispatch => {
  dispatch({
    type: RESET_ACTIVE_FILTERS_AND_DATE_RANGE_DISTRICTWISE,
    payload: ''
  })
}
