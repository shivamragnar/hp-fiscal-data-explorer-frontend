import { combineReducers } from "redux";

import exp_summary from "./exp_summary";
import exp_demandwise from "./exp_demandwise";
import exp_demandwise_filters from "./exp_demandwise_filters";

import receipts from "./receipts";
import receipts_filters from "./receipts_filters";

export default combineReducers({ exp_summary , exp_demandwise, exp_demandwise_filters, receipts, receipts_filters });
