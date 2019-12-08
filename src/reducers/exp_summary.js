import { GET_EXP_SUMMARY_DATA, EXP_SUMMARY_DATA_ERROR } from "../actions/types";

const initialState = {
  data: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EXP_SUMMARY_DATA:
      return {
        ...state,
        data: payload,
        loading: false
      };
    case EXP_SUMMARY_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
