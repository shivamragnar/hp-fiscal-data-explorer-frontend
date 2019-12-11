import axios from "axios";
import {
  UPDATE_RECEIPTS_ON_DATERANGE_CHANGE,
} from "./types";
import { getReceiptsData } from "./receipts";
import { onDateRangeChange } from "../utils/functions";

var yymmdd_ref = require("../data/yymmdd_ref.json");


export const updateReceiptsOnDateRangeChange = (newDateRange, activeFilters) => async dispatch => {
  dispatch(getReceiptsData(activeFilters, onDateRangeChange(newDateRange))); //update expData state at App level
}
