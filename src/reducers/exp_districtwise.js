import {
  DISTRICTWISE_SWITCH_ACTIVE_VIZ_IDX,
  GET_EXP_DISTRICTWISE_DATA,
  SET_DATA_LOADING_EXP_DISTRICTWISE,
  EXP_DISTRICTWISE_DATA_ERROR } from "../actions/types";

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
    case GET_EXP_DISTRICTWISE_DATA:
      return {
        ...state,
        data: payload.data,
        dateRange: payload.dateRange,
        activeFilters: payload.activeFilters,
        loading: false
      };
    case SET_DATA_LOADING_EXP_DISTRICTWISE:
      return {
        ...state,
        loading: true
      };
    case EXP_DISTRICTWISE_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case DISTRICTWISE_SWITCH_ACTIVE_VIZ_IDX:
      return {
        ...state,
        activeVizIdx: payload
      };
    default:
      return state;
  }
}
