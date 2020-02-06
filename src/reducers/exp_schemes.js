import {
  GET_EXP_SCHEMES_DATA,
  SET_DATA_LOADING_EXP_SCHEMES,
  EXP_SCHEMES_DATA_ERROR } from "../actions/types";

const initialState = {
  data: { mapData:{}, barChrtData:{}, lineChrtData:{}, tableData:{}},
  dateRange: ["2018-04-01","2019-03-31"],
  activeFilters: {},
  loading: true,
  activeVizIdx: 0,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXP_SCHEMES_DATA:
      return {
        ...state,
        data: payload.data,
        dateRange: payload.dateRange,
        activeFilters: payload.activeFilters,
        loading: false
      };
    case SET_DATA_LOADING_EXP_SCHEMES:
      return {
        ...state,
        loading: true
      };
    case EXP_SCHEMES_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
