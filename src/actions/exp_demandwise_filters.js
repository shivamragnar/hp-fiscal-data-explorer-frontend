import axios from "axios";
import {
  GET_EXP_DEMANDWISE_FILTERS_DATA,
  UPDATE_EXP_DEMANDWISE_ON_FILTER_CHANGE,
  UPDATE_EXP_DEMANDWISE_ON_DATERANGE_CHANGE,
  EXP_DEMANDWISE_FILTERS_DATA_ERROR
} from "./types";
import { getExpDemandwiseData } from "./exp_demandwise";

import { onDateRangeChange } from "../utils/functions";

var { exp_demandwise : filterOrderRef } = require("../data/filters_ref.json");
var yymmdd_ref = require("../data/yymmdd_ref.json");

export const getExpDemandwiseFiltersData = () => async dispatch => {
  try {
    console.time("Axios Fetching Filters"); console.log("Fetching Filters Started");

			//fetch raw filter data
			const rawFilterData = await axios.get("http://13.126.189.78/api/acc_heads");
			console.log('raw_filter_data: '); console.log(rawFilterData);

      const allFiltersData = []
      filterOrderRef.map(filter_name => {
        allFiltersData.push({
          key: filter_name,
          val: [ { filter_name, id : 'all', label : 'All'} ]
        })
      })


			//populate all dropdown filters' data from the raw response provided by API
			allFiltersData.map((filter, i) => {
				rawFilterData.data.records.map(child_arr => {
					if(filter.val.some(item => item.id === child_arr[i]) !== true){
						const filterOption = {
							filter_name: filter.key,
							id: child_arr[i],
							label: child_arr[i]
						}
						filter.val.push(filterOption);
					}
				})
			})

      dispatch({
        type: GET_EXP_DEMANDWISE_FILTERS_DATA,
        payload: {
          allFiltersData,
          rawFilterData
        }
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

  //1 Remove all child filters from activeFilters
  filterOrderRef.map((filterName,i) => {
    if(i > currFilterOrderIndex && activeFilters.filters[filterName] ){
      delete(activeFilters.filters[filterName]);
    }
  })

  //2 add selected filter to the activeFilters array
  if(e.selectedItem.id !== "all"){
    activeFilters.filters[e.selectedItem.filter_name] = e.selectedItem.id;
  } else {
    delete(activeFilters.filters[e.selectedItem.filter_name]);
  }


  //3 repopulate all child filters
  allFiltersData.map((filterObj, i) => {
    if( i > currFilterOrderIndex){
      filterObj.val = [{ filter_name: filterObj.key, id : 'all', label : 'All' }];
    }
  })

  rawFilterData.data.records.map(child_arr =>{
    var comboValidityCheckCount = 0;
    var activeFiltersValAry = Object.values(activeFilters.filters);
    var activeFiltersKeyAry = Object.keys(activeFilters.filters);

    activeFiltersValAry.map((filterVal, i) => {
      let child_arr_index = filterOrderRef.indexOf(activeFiltersKeyAry[i]);
      if(child_arr[child_arr_index] === filterVal){
        comboValidityCheckCount++;
      }
    })

    if(comboValidityCheckCount === activeFiltersKeyAry.length){
      allFiltersData.map((filterObj, i) => {
        if( i > currFilterOrderIndex){
          if(filterObj.val.some(item => item.id === child_arr[i]) !== true ){
            filterObj.val.push({ filter_name: filterObj.key, id : child_arr[i], label : child_arr[i] });
          }
        }
      })
    }
  })

  dispatch(getExpDemandwiseData(activeFilters, dateRange)); //update expData state at App level
}

export const updateExpDemandwiseOnDateRangeChange = (newDateRange, activeFilters) => async dispatch => { 
  dispatch(getExpDemandwiseData(activeFilters, onDateRangeChange(newDateRange))); //update expData state at App level
}
