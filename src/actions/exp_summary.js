import axios from "axios";
import { GET_EXP_SUMMARY_DATA, EXP_SUMMARY_DATA_ERROR } from "./types";


export const getExpSummaryData = () => async dispatch => {
  try {
    const res = await axios.get("http://13.126.189.78/api/exp_summary");
    dispatch({
      type: GET_EXP_SUMMARY_DATA,
      payload: res.data.records });
  } catch (err) {
    dispatch({
      type: EXP_SUMMARY_DATA_ERROR,
      payload: {
        status: err.response.status
      }
    });
  }
};
