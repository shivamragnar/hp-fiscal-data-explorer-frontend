import { GET_EXP_DEMANDWISE_FILTERS_DATA, EXP_DEMANDWISE_FILTERS_DATA_ERROR } from "../actions/types";

const initialState = {
  allFiltersData: [],
  rawFilterData: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXP_DEMANDWISE_FILTERS_DATA:
      return {
        ...state,
        allFiltersData: payload.allFiltersData,
        rawFilterData: payload.rawFilterData,
        loading: false
      };
    case EXP_DEMANDWISE_FILTERS_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
