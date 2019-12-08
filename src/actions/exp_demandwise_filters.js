import axios from "axios";
import {
  GET_EXP_DEMANDWISE_FILTERS_DATA,
  EXP_DEMANDWISE_FILTERS_DATA_ERROR
} from "./types";

var filters_ref = require("../data/filters_ref.json");

export const getExpDemandwiseFiltersData = () => async dispatch => {
  try {
    console.time("Axios Fetching Filters"); console.log("Fetching Filters Started");

			//fetch raw filter data
			const rawFilterData = await axios.get("http://13.126.189.78/api/acc_heads");
			console.log('raw_filter_data: '); console.log(rawFilterData);

      const allFiltersData = []
      filters_ref.exp_demandwise.map(filter_name => {
        allFiltersData.push({
          key: filter_name,
          val: [ { filter_name, id : 'all', label : 'All'} ]
        })
      })

      console.log("all_filters_data");
      console.log(allFiltersData);

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
			console.log("allfiltersData"); console.log(allFiltersData);
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
      payload: {
        status: err.response.status
      }
    });
  }
  console.timeEnd("Axios Fetching Filters");
}
