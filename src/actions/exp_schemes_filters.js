import axios from "axios";
import {
  GET_EXP_SCHEMES_FILTERS_DATA,
  EXP_SCHEMES_FILTERS_DATA_ERROR,
  SET_DATA_LOADING_EXP_SCHEMES_FILTERS,
  UPDATE_EXP_SCHEMES_FILTERS_DATA
} from "./types";
import { getExpSchemesData } from "./exp_schemes";


import { onDateRangeChange, recursFilterFetch, recursFilterFind2, resetFiltersToAllFilterHeads } from "../utils/functions";

var { exp_schemes : filterOrderRef } = require("../data/filters_ref.json");
var yymmdd_ref = require("../data/yymmdd_ref.json");

export const getExpSchemesFiltersData = (allFiltersData, rawFilterDataAllHeads) => async dispatch => {
  try {

      dispatch({ type: SET_DATA_LOADING_EXP_SCHEMES_FILTERS, payload: {} });
			//fetch raw filter data all heads only if we dont already have it in redux store
      if(Object.keys(rawFilterDataAllHeads).length === 0){
        console.log("need to fetch raw district filter data");
        rawFilterDataAllHeads = await axios.get("http://13.126.189.78/api/unique_acc_heads_schemes");

      }else{
        console.log("already have raw distrcit filter data");
      }

			console.log('raw_filter_data_all_heads: '); console.log(rawFilterDataAllHeads);

      //populate all dropdown filters' data from the raw response provided by API
      allFiltersData = resetFiltersToAllFilterHeads( rawFilterDataAllHeads, filterOrderRef);

      dispatch({
        type: GET_EXP_SCHEMES_FILTERS_DATA,
        payload: { allFiltersData, rawFilterDataAllHeads }
      });

  }catch(err){
    dispatch({
      type: EXP_SCHEMES_FILTERS_DATA_ERROR,
      payload: err
    });
  }
}


export const updateExpSchemesFilters = (e, activeFilters, allFiltersData, rawFilterDataAllHeads ) => async dispatch => {
  try {
    console.log("got here");
    dispatch({ type: SET_DATA_LOADING_EXP_SCHEMES_FILTERS, payload: {} });

    //call dynamic filter data API if we have some active filters. e.g. a filter was selected
    if( Object.keys(activeFilters).length > 0){
      const currFilterOrderIndex = filterOrderRef.indexOf(e.selectedItems[0].filter_name);
      //1 empty allFiltersData, leave only the 'All' option
      allFiltersData.map((filterObj, i) => {
        if( i > currFilterOrderIndex){
          filterObj.val = [{ filter_name: filterObj.key, id : 'all', label : 'All' }];
        }
      })
      console.log("got here");

      //2 fetch raw filter data
      const activeFilterKeys = Object.keys(activeFilters);
      const activeFilterVals = Object.values(activeFilters);
      var stringForApi = "";
      activeFilterVals.map((val, i) => {
          let tempVal = val.map(item => { return item.split('-')[0]});
          tempVal = tempVal.join('","');
          stringForApi +=  activeFilterKeys[i] + '="' + tempVal + '"';
          if(i < activeFilterVals.length - 1){
            stringForApi += '&';
          }
      })
      console.log("THIS WILLBE THE UPDATE FILTER QUERY :");
      console.log(`http://13.126.189.78/api/acc_heads_schemes?${stringForApi}`);
      const rawFilterData = await axios.get(`http://13.126.189.78/api/acc_heads_schemes?${stringForApi}`);
      console.log('raw_dynamic_filter_data: ');
      console.log(rawFilterData);

      const results = [];
      recursFilterFind2(rawFilterData.data.records, e.selectedItems, results, 0, filterOrderRef, activeFilters, currFilterOrderIndex );
      console.log("district_results");
      console.log(results);
      results.map(result => {
        recursFilterFetch( allFiltersData, result, currFilterOrderIndex+1);
      })
      console.log(allFiltersData);
    }
    //else if we have no active filters fetch rawFilterDataAllHeads and populate allFiltersData. e.g. when active filters are deselected.
    else{
      console.log("allFiltersData_before");
      console.log(allFiltersData);
      allFiltersData = resetFiltersToAllFilterHeads(rawFilterDataAllHeads, filterOrderRef);
      console.log("allFiltersData_after");
      console.log(allFiltersData);
    }

    dispatch({
      type: UPDATE_EXP_SCHEMES_FILTERS_DATA,
      payload: { allFiltersData }
    });


  }catch(err){
    console.log("error > updateExpSchemesFilters");
  }
}

export const updateSchemesOnDateRangeChange = (newDateRange, activeFilters) => async dispatch => {
  dispatch(getExpSchemesData(activeFilters, onDateRangeChange(newDateRange))); //update expData state at App level
}
