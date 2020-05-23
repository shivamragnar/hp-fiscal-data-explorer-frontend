import axios from "axios";
import { GET_EXP_SUMMARY_DATA, EXP_SUMMARY_DATA_ERROR, SET_EXP_SUMMARY_DATA_LOADING } from "./types";


export const getExpSummaryData = () => async dispatch => {
  try {
    dispatch({ type: SET_EXP_SUMMARY_DATA_LOADING, payload: ""});
    const res = await axios.get("http://13.126.189.78/api/allocation_exp_summary");

    let aryOfYears = Object.keys(res.data.records); //all the years that are being returned by data from jewset to oldest

    let yearsToCompare = [aryOfYears[0], aryOfYears[1]] //gets newest and second to newest F year

    let vizData = [];

    let newestYearDataObj = res.data.records[yearsToCompare[0]];
    let prevYearDataObj = res.data.records[yearsToCompare[1]];

    Object.values(newestYearDataObj).map((d,i) => {
      let vizObj = {};
      let demand_string = Object.keys(newestYearDataObj)[i];
      let demand_id = demand_string.split('-')[0];
      let demand_desc = demand_string.split('-')[1];
      vizObj.demand = demand_id;
      vizObj.demand_description = demand_desc;
      vizObj.sanction_current = d[0];
      vizObj.sanction_previous = Object.values(prevYearDataObj)[i][0];
      vizObj.pct_change = (vizObj.sanction_current/vizObj.sanction_previous) - 1; // in relation to 1 not 100
      vizObj.exp_current = d[1];
      vizObj.exp_previous = Object.values(prevYearDataObj)[i][1];
      vizObj.exp_pct_change = (vizObj.exp_current/vizObj.exp_previous) - 1; // in relation to 1 not 100
      vizData.push(vizObj);
    })

    console.log('SMRY_VIZ_DATA', vizData);


    var tableData = {
    	headers: [
        { key: 'demandname', header: 'Demand Name' },
      ],
    	rows: []
    }

    aryOfYears.map(yr => {
      tableData.headers.push(
        { key: `allocated__${yr}`, header: `Budget Allocated (${yr.split('_')[0] + ' - ' + yr.split('_')[1] })` },
        { key: `tot_exp__${yr}`, header: `Total Expenditure (${yr.split('_')[0] + ' - ' + yr.split('_')[1] })` },
        { key: `pct_spent__${yr}`, header: `Percentage Spent (${yr.split('_')[0] + ' - ' + yr.split('_')[1] })` },
      )
    })

    console.log('SMRY_TBL_DATA', tableData);

    let valuesFromAllYrs = Object.values(res.data.records);

    Object.values(valuesFromAllYrs[0]).map((v, v_i) => {
      tableData.rows.push({
        id : v_i,
        demandname: Object.keys(valuesFromAllYrs[0])[v_i]
      })

      aryOfYears.map(yr => {
        tableData.rows[v_i][`allocated__${yr}`] = Object.values(res.data.records[yr])[v_i][0].toLocaleString('en-IN');
        tableData.rows[v_i][`tot_exp__${yr}`] = Object.values(res.data.records[yr])[v_i][1].toLocaleString('en-IN');
        tableData.rows[v_i][`pct_spent__${yr}`] = Object.values(res.data.records[yr])[v_i][2].toLocaleString('en-IN')+'%';
      })
    })

    console.log('SMRY_TBL_DATA', tableData);

    dispatch({
      type: GET_EXP_SUMMARY_DATA,
      payload: {
        vizData: res.data.records,
        tableData
      }
    });
  } catch (err) {
    dispatch({
      type: EXP_SUMMARY_DATA_ERROR,
      payload: {
        status: err
      }
    });
  }
};
