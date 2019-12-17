import axios from "axios";
import {
  GET_RECEIPTS_FILTERS_DATA,
  RECEIPTS_FILTERS_DATA_ERROR
} from "./types";
import { getReceiptsData } from "./receipts";
import { onDateRangeChange, recursFilterFetch, recursFilterFind } from "../utils/functions";

var { receipts : filterOrderRef } = require("../data/filters_ref.json");
var yymmdd_ref = require("../data/yymmdd_ref.json");

export const getReceiptsFiltersData = () => async dispatch => {
  try {
    console.time("Axios Fetching Receipts Filters"); console.log("Fetching Receipts Filters Started");

		//fetch raw filter data
		const rawFilterData = await axios.get("http://13.126.189.78/api/acc_heads_receipts");
		console.log('raw_receipts_filter_data: '); console.log(rawFilterData);

    const allFiltersData = []
    filterOrderRef.map(filter_name => {
      allFiltersData.push({
        key: filter_name,
        val: [ { filter_name, id : 'all', label : 'All'} ]
      })
    })

    //populate all dropdown filters' data from the raw response provided by API
    recursFilterFetch(allFiltersData, rawFilterData.data.records, 0);

    dispatch({
      type: GET_RECEIPTS_FILTERS_DATA,
      payload: { allFiltersData, rawFilterData }
    });

  }catch(err){
    dispatch({
      type: RECEIPTS_FILTERS_DATA_ERROR,
      payload: err
    });
  }
  console.timeEnd("Axios Fetching Receipts Filters");
}

export const updateReceiptsOnFilterChange = (e, activeFilters, allFiltersData, rawFilterData, dateRange) => async dispatch => {

  const currFilterOrderIndex = filterOrderRef.indexOf(e.selectedItem.filter_name);

  //1 repopulate allFiltersData
  allFiltersData.map((filterObj, i) => {
    if( i > currFilterOrderIndex){
      filterObj.val = [{ filter_name: filterObj.key, id : 'all', label : 'All' }];
    }
  })

  const results = [];
  recursFilterFind(rawFilterData.data.records, e.selectedItem.id, results, 0, filterOrderRef, activeFilters );
  results.map(result => {
    recursFilterFetch( allFiltersData, result, currFilterOrderIndex+1);
  })

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

  dispatch(getReceiptsData(activeFilters, dateRange)); //update expData state at App level
}

export const updateReceiptsOnDateRangeChange = (newDateRange, activeFilters) => async dispatch => {
  dispatch(getReceiptsData(activeFilters, onDateRangeChange(newDateRange))); //update expData state at App level
}
