import axios from 'axios';
import { GET_EXP_SUMMARY_DATA, EXP_SUMMARY_DATA_ERROR, SET_EXP_SUMMARY_DATA_LOADING } from './types';

const sortObjectByYears = (unsortedObject) => {
  return Object.keys(unsortedObject)
    .sort((a, b) => b.split('_')[0] - a.split('_')[0])
    .reduce((result, key) => {
      result[key] = unsortedObject[key];
      return result;
    }, {});
};

export const getExpSummaryData = (current, previous, rawData) => async (dispatch) => {
  try {
    let res, sortedRecords, yearsToCompare, aryOfYears;
    if (rawData) {
      res = rawData;
      sortedRecords = sortObjectByYears(res.data.records);
      yearsToCompare = [current, previous];
      aryOfYears = Object.keys(sortedRecords); //all the years that are being returned by data from jewset to oldest
    } else {
      dispatch({ type: SET_EXP_SUMMARY_DATA_LOADING, payload: '' });
      res = await axios.get('https://hpback.openbudgetsindia.org/api/allocation_exp_summary');
      sortedRecords = sortObjectByYears(res.data.records);
      aryOfYears = Object.keys(sortedRecords); //all the years that are being returned by data from jewset to oldest
      yearsToCompare = [aryOfYears[0], aryOfYears[1]]; //gets newest and second to newest F year
    }

    let initData = res;

    let vizData = [];

    let newestYearDataObj = sortedRecords[yearsToCompare[0]];
    let prevYearDataObj = sortedRecords[yearsToCompare[1]];

    const getPercent = (curr, prev) => {
      return Math.round((curr / prev - 1) * 100 * 100) / 100;
    };

    Object.values(newestYearDataObj).map((d, i) => {
      let vizObj = {};
      let demand_string = Object.keys(newestYearDataObj)[i];
      let demand_id = demand_string.split('-')[0];
      let demand_desc = demand_string.split('-')[1];
      vizObj.curr_year = current ? current : aryOfYears[0];
      vizObj.prev_year = previous ? previous : aryOfYears[1];
      vizObj.demand = demand_id;
      vizObj.demand_description = demand_desc;
      vizObj.alloc = {
        current: d[0],
        previous: Object.values(prevYearDataObj)[i][0]
      };
      vizObj.alloc.pct_change = getPercent(vizObj.alloc.current, vizObj.alloc.previous);
      vizObj.exp = {
        current: d[1],
        previous: Object.values(prevYearDataObj)[i][1]
      };
      vizObj.exp.pct_change = getPercent(vizObj.exp.current, vizObj.exp.previous); // in relation to 1 not 100
      vizData.push(vizObj);
    });


    //----------------

    let valuesFromAllYrs = Object.values(sortedRecords);
    let keysFromAllYrs = Object.keys(sortedRecords);


    var lineChrtData = {};

    //calc tot alloc & exp amounts per year
    lineChrtData['All Demands'] = [
      { exp_alloc: 'allocated', yearwise: [] },
      { exp_alloc: 'expenditure', yearwise: [] }
    ];
    //calc tot vals per yearx
    aryOfYears.map((yr, i) => {
      let totAlloc = 0;
      let totExp = 0;
      Object.values(valuesFromAllYrs[i]).map((v) => {
        totAlloc = totAlloc + v[0];
        totExp = totExp + v[1];
      });
      lineChrtData['All Demands'][0].yearwise.unshift({
        idx: aryOfYears.length - 1 - i,
        year: yr.split('_').join('-'),
        amount: Math.round(totAlloc * 100) / 100
      });
      lineChrtData['All Demands'][1].yearwise.unshift({
        idx: aryOfYears.length - 1 - i,
        year: yr.split('_').join('-'),
        amount: Math.round(totExp * 100) / 100,
        pctUsed: Math.round((totExp / totAlloc) * 100 * 100) / 100 + '%'
      });
    });

    //restructure api data for timeseries component
    Object.keys(valuesFromAllYrs[0]).map((k, i) => {
      lineChrtData[k] = [
        { exp_alloc: 'allocated', yearwise: [] },
        { exp_alloc: 'expenditure', yearwise: [] }
      ];
      //
      aryOfYears.map((yr,j) => {
        lineChrtData[k][0].yearwise.unshift({ idx :  aryOfYears.length - 1 - j, year: yr.split('_').join('-'), amount: Object.values(valuesFromAllYrs[j])[i][0] }) //allocated
        lineChrtData[k][1].yearwise.unshift({ idx :  aryOfYears.length - 1 - j, year: yr.split('_').join('-'), amount: Object.values(valuesFromAllYrs[j])[i][1], pctUsed: Object.values(valuesFromAllYrs[j])[i][2]  }) //expenditure
      })
    })

    var tableData = {
      headers: [{ key: 'demandname', header: 'Demand Name' }],
      rows: []
    };

    aryOfYears.map((yr) => {
      tableData.headers.push(
        { key: `allocated__${yr}`, header: `Budget Allocated (${yr.split('_')[0] + ' - ' + yr.split('_')[1]})` },
        { key: `tot_exp__${yr}`, header: `Total Expenditure (${yr.split('_')[0] + ' - ' + yr.split('_')[1]})` },
        { key: `pct_spent__${yr}`, header: `Percentage Spent (${yr.split('_')[0] + ' - ' + yr.split('_')[1]})` }
      );
    });

    Object.values(valuesFromAllYrs[0]).map((v, v_i) => {
      tableData.rows.push({
        id: v_i,
        demandname: Object.keys(valuesFromAllYrs[0])[v_i]
      });
      /*      let i = 0;
      for (i<=aryOfYears.length; i++;){
        if (aryOfYears[i] == "2020_21") {
              aryOfYears.map(yr => {
                tableData.rows[v_i][`allocated__${yr}`] ="N/A";
                tableData.rows[v_i][`tot_exp__${yr}`] = (Object.values(res.data.records[yr])[v_i][1]/10000000).toFixed(2).toLocaleString('en-IN');
                tableData.rows[v_i][`pct_spent__${yr}`] = Object.values(res.data.records[yr])[v_i][2].toLocaleString('en-IN')+'%';
              })
            }

        else{
         aryOfYears.map(yr => {
                 tableData.rows[v_i][`allocated__${yr}`] = (Object.values(res.data.records[yr])[v_i][0]/10000000).toFixed(2).toLocaleString('en-IN');
                 tableData.rows[v_i][`tot_exp__${yr}`] = (Object.values(res.data.records[yr])[v_i][1]/10000000).toFixed(2).toLocaleString('en-IN');
                 tableData.rows[v_i][`pct_spent__${yr}`] = Object.values(res.data.records[yr])[v_i][2].toLocaleString('en-IN')+'%';
               })
             }
        }
      })*/
      aryOfYears.map((yr) => {
        if (yr === '2021_22') {
          tableData.rows[v_i][`allocated__${yr}`] = (Object.values(res.data.records[yr])[v_i][0] / 10000000)
            .toFixed(2)
            .toLocaleString('en-IN');
          tableData.rows[v_i][`tot_exp__${yr}`] = 'N/A';
          tableData.rows[v_i][`pct_spent__${yr}`] = 'N/A';
        } else if (yr === '2015_16') {
          tableData.rows[v_i][`allocated__${yr}`] = (Object.values(res.data.records[yr])[v_i][0] / 10000000)
            .toFixed(2)
            .toLocaleString('en-IN');
          tableData.rows[v_i][`tot_exp__${yr}`] = 'N/A';
          tableData.rows[v_i][`pct_spent__${yr}`] = 'N/A';
        } else {
          tableData.rows[v_i][`allocated__${yr}`] = (Object.values(res.data.records[yr])[v_i][0] / 10000000)
            .toFixed(2)
            .toLocaleString('en-IN');
          tableData.rows[v_i][`tot_exp__${yr}`] = (Object.values(res.data.records[yr])[v_i][1] / 10000000)
            .toFixed(2)
            .toLocaleString('en-IN');
          tableData.rows[v_i][`pct_spent__${yr}`] =
            Object.values(res.data.records[yr])[v_i][2].toLocaleString('en-IN') + '%';
        }
      });
    });


    dispatch({
      type: GET_EXP_SUMMARY_DATA,
      payload: {
        initData,
        vizData,
        lineChrtData,
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
