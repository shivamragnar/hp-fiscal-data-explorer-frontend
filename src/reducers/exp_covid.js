import { GET_EXP_COVID_DATA, SET_DATA_LOADING_EXP_COVID, EXP_COVID_DATA_ERROR } from "../actions/types";

const initialState = {
  initData: {},
  tableData: {},
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXP_COVID_DATA:
      return {
        ...state,
        initData: payload.initData,
        tableData: payload.tableData,
        loading: false
      };
    case SET_DATA_LOADING_EXP_COVID:
      return {
        ...state,
        loading: true
      };
    case EXP_COVID_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
