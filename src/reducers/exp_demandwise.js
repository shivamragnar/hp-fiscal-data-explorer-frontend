import { GET_EXP_DEMANDWISE_DATA, SET_DATA_LOADING, EXP_DEMANDWISE_DATA_ERROR } from "../actions/types";

const initialState = {
  data: { vizData:{}, tableData:{}},
  dateRange: [],
  activeFilters: { filters: {}},
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXP_DEMANDWISE_DATA:
      return {
        ...state,
        data: payload.data,
        dateRange: payload.dateRange,
        activeFilters: payload.activeFilters,
        loading: false
      };
    case EXP_DEMANDWISE_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case SET_DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
