import * as expCovidActions from "./exp_covid";
import * as expDistrictwise from "./exp_districtwise";
import * as expDistrictwiseFilters from "./exp_districtwise_filters"
import * as receiptsDistrictwise from "./receipts_districtwise";
import * as receiptsDistrictwiseFilters from "./receipts_districtwise_filters";
import * as schemes from "./exp_schemes";
import * as schemesFilters from "./exp_schemes_filters";

const actions = {
	exp_covid: expCovidActions,
	exp_districtwise: {
		getDistrictwiseData: expDistrictwise.getExpDistrictwiseData,
		setActiveVizIdx: expDistrictwise.setActiveVizIdx,
		resetActiveFiltersAndDateRange:
			expDistrictwise.resetActiveFiltersAndDateRange,
	},
	exp_districtwise_filters: {
		getDistrictwiseFiltersData: expDistrictwiseFilters.getExpDistrictwiseFiltersData,
		updateDistrictwiseFilters: expDistrictwiseFilters.updateExpDistrictwiseFilters,
		updateDistrictwiseOnDateRangeChange: expDistrictwiseFilters.updateDistrictwiseOnDateRangeChange
	},
	receipts_districtwise: {
		getDistrictwiseData: receiptsDistrictwise.getReceiptsDistrictwiseData,
		setActiveVizIdx: receiptsDistrictwise.setActiveVizIdx,
		resetActiveFiltersAndDateRange: receiptsDistrictwise.resetActiveFiltersAndDateRange,
	},
	receipts_districtwise_filters: {
		getDistrictwiseFiltersData: receiptsDistrictwiseFilters.getReceiptsDistrictwiseFiltersData,
		updateDistrictwiseFilters: receiptsDistrictwiseFilters.updateReceiptsDistrictwiseFilters,
		updateDistrictwiseOnDateRangeChange: receiptsDistrictwiseFilters.updateReceiptsDistrictwiseOnDateRangeChange
	},
	exp_schemes: {
		getDistrictwiseData: schemes.getExpSchemesData,
		setActiveVizIdx: schemes.setActiveVizIdx,
		resetActiveFiltersAndDateRange: schemes.resetActiveFiltersAndDateRange
	},
	exp_schemes_filters: {
		getDistrictwiseFiltersData: schemesFilters.getExpSchemesFiltersData,
		updateDistrictwiseFilters: schemesFilters.updateExpSchemesFilters,
		updateDistrictwiseOnDateRangeChange: schemesFilters.updateSchemesOnDateRangeChange
	},
};

export default actions;
