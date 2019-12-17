import axios from "axios";
import {
  GET_EXP_DEMANDWISE_FILTERS_DATA,
  EXP_DEMANDWISE_FILTERS_DATA_ERROR
} from "./types";
import { getExpDemandwiseData } from "./exp_demandwise";

import { onDateRangeChange, recursFilterFetch, recursFilterFind } from "../utils/functions";

var { exp_demandwise : filterOrderRef } = require("../data/filters_ref.json");
var yymmdd_ref = require("../data/yymmdd_ref.json");

export const getExpDemandwiseFiltersData = () => async dispatch => {
  try {
    console.time("Axios Fetching Filters"); console.log("Fetching Filters Started");

			//fetch raw filter data
			const rawFilterData = await axios.get("http://13.126.189.78/api/acc_heads_desc");
			console.log('raw_filter_data: '); console.log(rawFilterData);

      const allFiltersData = []
      filterOrderRef.map(filter_name => {
        allFiltersData.push({
          key: filter_name,
          val: [ { filter_name, id : 'all', label : 'All'} ]
        })
      })

      //populate all dropdown filters' data from the raw response provided by API
      recursFilterFetch(allFiltersData, rawFilterData.data.records, 0);
      console.log("recurs filter find");


      dispatch({
        type: GET_EXP_DEMANDWISE_FILTERS_DATA,
        payload: { allFiltersData, rawFilterData }
      });

  }catch(err){
    dispatch({
      type: EXP_DEMANDWISE_FILTERS_DATA_ERROR,
      payload: err
    });
  }
  console.timeEnd("Axios Fetching Filters");
}

export const updateExpDemandwiseOnFilterChange = (e, activeFilters, allFiltersData, rawFilterData, dateRange) => async dispatch => {

  const currFilterOrderIndex = filterOrderRef.indexOf(e.selectedItem.filter_name);

  //1 repopulate allFiltersData
  allFiltersData.map((filterObj, i) => {
    if( i > currFilterOrderIndex){
      filterObj.val = [{ filter_name: filterObj.key, id : 'all', label : 'All' }];
    }
  })

  const results = [];
  recursFilterFind(rawFilterData.data.records, e.selectedItem.id, results, 0, filterOrderRef, activeFilters );
  console.log(results);
  results.map(result => {
    recursFilterFetch( allFiltersData, result, currFilterOrderIndex+1);
  })

  console.log(allFiltersData);

  //2 Remove all child filters from activeFilters
  filterOrderRef.map((filterName,i) => {
    if(i > currFilterOrderIndex && activeFilters.filters[filterName] ){
      delete(activeFilters.filters[filterName]);
    }
  })

  //3 add selected filter to the activeFilters array
  if(e.selectedItem.id !== "all"){
    activeFilters.filters[e.selectedItem.filter_name] = e.selectedItem.id.split("-")[0];
  } else {
    delete(activeFilters.filters[e.selectedItem.filter_name]);
  }

  dispatch(getExpDemandwiseData(activeFilters, dateRange)); //update expData state at App level
}

export const updateExpDemandwiseOnDateRangeChange = (newDateRange, activeFilters) => async dispatch => {
  dispatch(getExpDemandwiseData(activeFilters, onDateRangeChange(newDateRange))); //update expData state at App level
}
