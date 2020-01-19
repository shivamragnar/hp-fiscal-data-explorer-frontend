import axios from "axios";
import {
  GET_EXP_DISTRICTWISE_DATA,
  SET_DATA_LOADING_EXP_DISTRICTWISE,
  EXP_DISTRICTWISE_DATA_ERROR
} from "./types";

import {
  getWeekwiseDates,
  calcMonthOrWeek
} from '../utils/functions';

//data-refs
var yymmdd_ref = require("../data/yymmdd_ref.json");

export const getExpDistrictwiseData = (activeFilters, dateRange) => async dispatch => {
  try {

    const [ dateFrom , dateTo ] = dateRange;
    const { months , years, years_short } = yymmdd_ref;
    const month_week = calcMonthOrWeek(dateFrom, dateTo);
    const fromMonthIndex = parseInt(dateFrom.split('-')[1])-1;
    const fromYearIndex = years.indexOf(dateFrom.split('-')[0]);
    const toMonthIndex = parseInt(dateTo.split('-')[1])-1;

    const tempVizData = [];
    const tempBarChrtData = [];
    const tempTableData = { headers : [], rows : [] };

    const activeFilterKeys = Object.keys(activeFilters);
    const activeFilterVals = Object.values(activeFilters);
    var objForPayload = {};
    activeFilterVals.map((val, i) => {
        let tempVal = val.map(item => { return item.split('-')[0]});
        tempVal = tempVal.join('","');
        objForPayload[activeFilterKeys[i]] =  '"' + tempVal + '"';
    })
    console.log("objForPayload");
    console.log(objForPayload);

    //0 SET LOADING TO TRUE
    dispatch({ type: SET_DATA_LOADING_EXP_DISTRICTWISE, payload: {} });

    //1 PREP AND MAKE API CALL
    const config = { headers: { "content-type": "application/json" } };
		const res = await axios.post(
      `http://13.126.189.78/api/treasury_exp?start=${dateFrom}&end=${dateTo}&range=${month_week[0].toUpperCase() + month_week.slice(1)}`, {filters:objForPayload}
    );
		console.log("exp districtwise raw data"); console.log(res.data.records);


    //2 PREP DATA FOR VISUALIZATION
    const districtNames = Object.keys(res.data.records);
    const districtwiseExpVals = Object.values(res.data.records);
    console.log("districtwiseExpVals");
    console.log(districtwiseExpVals);
    districtNames.map((districtName, i) => {
      let datewiseExp = [];
      let totalExp = { districtName, gross: 0, BTDED: 0, AGDED: 0, netPayment: 0};
      datewiseExp.push({"date":(month_week === "month" ? " " : 0), "gross": 0, "BTDED": 0, "AGDED": 0, "netPayment": 0});
      districtwiseExpVals[i].map((expArray, i) => {
        let dataObj = {};
        dataObj.date = month_week === "month" ?
                       months[(i+fromMonthIndex)%12]+" "+years_short[Math.floor((i+fromMonthIndex)/12) + fromYearIndex] :
                       getWeekwiseDates( dateFrom, fromMonthIndex, toMonthIndex, fromYearIndex).date_for_x_axis[i];
        dataObj.gross = expArray[0];
        dataObj.BTDED = expArray[1];
        dataObj.AGDED = expArray[2];
        dataObj.netPayment = expArray[3];
        datewiseExp.push(dataObj);

        totalExp.gross += expArray[0]
        totalExp.BTDED += expArray[1]
        totalExp.AGDED += expArray[2]
        totalExp.netPayment += expArray[3]
      })
      tempVizData.push({
        districtName,
        datewiseExp,
        totalExp
      })
      tempBarChrtData.push(totalExp);
    })

    console.log("tempVizData");
    console.log(tempVizData);

    console.log("tempBarChrtData");
    console.log(tempBarChrtData);

    //3 PREP DATA FOR TABLE
    tempVizData.map((d, i) => {

    	i === 0 && tempTableData.headers.push(
        { key: 'districtName', header: 'District' },
        { key: 'gross', header: 'Gross' },
        { key: 'BTDED', header: 'BTDED' },
        { key: 'AGDED', header: 'AGDED' },
        { key: 'netPayment', header: 'netPayment' }
      );

    	i !== 0 && tempTableData.rows.push({
    		id: i,
    		'districtName': d.districtName,
    		'gross': d.totalExp.gross,
    		'BTDED': d.totalExp.BTDED,
    		'AGDED': d.totalExp.AGDED,
    		'netPayment': d.totalExp.netPayment
    	})
    })
    console.log("tempTableData");
    console.log(tempTableData);

    dispatch({
      type: GET_EXP_DISTRICTWISE_DATA,
      payload: {
        data: {
          barChrtData: {
            xLabelVals:getWeekwiseDates( dateFrom, fromMonthIndex, toMonthIndex, fromYearIndex).date_for_x_axis,
            xLabelFormat: month_week === "week" ? getWeekwiseDates( dateFrom, fromMonthIndex, toMonthIndex, fromYearIndex).date_for_tick : null,
            data:tempBarChrtData
          },
          lineChrtData: {
            data:tempVizData
          },
          tableData: tempTableData
        },
        dateRange: dateRange,
        activeFilters: activeFilters
      }
    });

  } catch (err) {
    dispatch({
      type: EXP_DISTRICTWISE_DATA_ERROR,
      payload: {
        status: err
      }
    });
  }
};
