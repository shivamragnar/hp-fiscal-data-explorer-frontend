import data from "../data/kpis_index (3).json"
import {sdgData} from "../data/sdgDescription";
import { procurements } from "../data/filters_ref.json";
import {districtReport} from "../data/districtReport"
import { KPIDistrictMapping} from "../data/KPIDistrictmapping"
import OCDS_tender from "../data/tender_data.json";
import OCDS_award from "../data/award_data.json";

import {
	GET_PROCUREMENTS_DATA,
	UPDATE_DATA_WITH_FILTERS,
	SET_PROCUREMENTS_DATA_LOADING,
	UPDATE_DATERANGE,
} from "./types";
import { Header } from "carbon-components-react";

var hp_geojson = JSON.stringify(require("../data/hp_geojson.json"));

const allFiltersData = [
	{
		key: "sdg",
		val: Object.keys(data["2020-2021"].values).map((option) => ({
			label: option,
			value: option,
		})),
	},
	{
		key: "works",
		val: [],
	},
	{
		key: "indicator",
		val: []
	},
	{
		key: "kpi",
		val: [],
	},
];
const activeFilters = {
	sdg: {
		val: "",
		status: true,
	},
	works: {
		val: "",
		status: false,
	},
	indicator: {
		val: "",
		status: false,
	},
	kpi: {
		val: "",
		status: false,
	},
};
// let formatdata = JSON.parse(data)

// SDG -> Work Type -> indicator -> KPI

// For first time Default year selected -> show index values for year in the data -> Keep first filter active others disabled
// Suppose a year change -> how index values for that particular year -> empty the selected filters -> Keep first filter active others disabled
// Select a SDG -> Show avg data for that SDG -> make next filter active others disabled -> add selected filter in active filters array
// Select a Type(only possible if SDG is selected) -> Show avg data for that Type -> make next filter active -> add selected filter in active filters array
// Select a KPI(only possible if Type is selected) -> Show avg data for that KPI -> Show avg data for that Type

// Deselect any filter -> all filters after that filter flush out -> show data based on current active filter or default for a year

// Basic functions to set data
export const getProcurementsData = (dateRange) => async (dispatch) => {
	const currYearData = data[dateRange];
	let mapData = calculateMapData(currYearData);
    let tableData = calculateTableData(); // currently giving table for SDG description
    let districtReport  = calculateDistrictReport();
	let KPIDistrictTableData = calculateKPIDistrictTableData(dateRange)
	let ocdsTendersData = calculateOCDSTableData()
	let ocdsAwardsData = calculateOCDSTableDataAward()
	
	dispatch({
		type: GET_PROCUREMENTS_DATA,
		payload: {
            initData: data,
			mapData: mapData,
			tableData: tableData,
			dateRange: dateRange,
			activeFilters: activeFilters,
            allFiltersData: allFiltersData,
            districtReport: districtReport,
			KPIDistrictTableData: KPIDistrictTableData,
			ocdsTendersData: ocdsTendersData, 
			ocdsAwardsData: ocdsAwardsData,
			loading: false,
		},
	});
};

// Helper function to calculate map data
const calculateMapData = (data) => {
	const tempMapData = JSON.parse(hp_geojson);
	Object.keys(data.index).map((districtName, i) => {
		tempMapData.features.map((feature, i) => {
			const {
				properties: { NAME_2: districtName_inJson },
			} = feature; //the district name as in the geojson
			if (districtName_inJson.toUpperCase() === districtName) {
                feature.properties.index = data.index[districtName];
                feature.properties.value = data.values[districtName];
			} else {
            }
		});
	});
	return tempMapData;
};

// Helper function to calculate report for a district
const calculateDistrictReport = () => {
    let result = {}

    districtReport.map(report => {
      result[report["District"].toUpperCase()] = report
    })
    return result
}

// Helper function to calculate table data currently doing data for SDG description
const calculateTableData = () => {
	const tableDataHeaders = [
		{
			key: "sdg",
			header: "SDGs",
			tooltip: "Sustainable Development Goal",
		},
		{
			key: "sdg_description",
			header: "SDG Description",
			tooltip: "Sustainable Development Goal's Description",
		},
	];

	const tableDataRows = sdgData.map((sdg) => {
		return {
			id: sdg["SDGs"],
            sdg: sdg["SDGs"],
            sdg_description : sdg["SDG_desc"] 
		};
    });
    return {tableDataHeaders, tableDataRows}
};

// Helper function to calculate table data for KPI and district mapping
const calculateKPIDistrictTableData = (dateRange) => {
    const tableDataHeaders = [
        {
            key: "kpi",
            header: "KPIs",
            tooltip: "Key Performance Indicator"
        },
        { key: "BILASPUR", header: "BILASPUR", tooltip: "District BILASPUR" },
		{ key: "CHAMBA", header: "CHAMBA", tooltip: "District CHAMBA" },
		{ key: "HAMIRPUR", header: "HAMIRPUR", tooltip: "District HAMIRPUR" },
		{ key: "KANGRA", header: "KANGRA", tooltip: "District KANGRA" },
		{ key: "KINNAUR", header: "KINNAUR", tooltip: "District KINNAUR" },
		{ key: "KULLU", header: "KULLU", tooltip: "District KULLU" },
		{ key: "SHIMLA", header: "SHIMLA", tooltip: "District SHIMLA" },
		{ key: "SIRMAUR", header: "SIRMAUR", tooltip: "District SIRMAUR" },
		{ key: "SOLAN", header: "SOLAN", tooltip: "District SOLAN" },
		{ key: "UNA", header: "UNA", tooltip: "District UNA" },
		{
			key: "LAHAUL_AND_SPITI",
			header: "LAHAUL AND SPITI",
			tooltip: "District LAHAUL AND SPITI",
		},
    ]

    let kpis = Object.keys(KPIDistrictMapping[dateRange].values)

    const tableDataRows = kpis.map((kpi, index) => {
        return {
			id: index,
			kpi: kpi,
			BILASPUR: KPIDistrictMapping[dateRange].values[kpi].index["BILASPUR"],
			CHAMBA: KPIDistrictMapping[dateRange].values[kpi].index["CHAMBA"],
			HAMIRPUR: KPIDistrictMapping[dateRange].values[kpi].index["HAMIRPUR"],
			KANGRA: KPIDistrictMapping[dateRange].values[kpi].index["KANGRA"],
			KINNAUR: KPIDistrictMapping[dateRange].values[kpi].index["KINNAUR"],
			KULLU: KPIDistrictMapping[dateRange].values[kpi].index["KULLU"],
			SHIMLA: KPIDistrictMapping[dateRange].values[kpi].index["SHIMLA"],
			SIRMAUR: KPIDistrictMapping[dateRange].values[kpi].index["SIRMAUR"],
			SOLAN: KPIDistrictMapping[dateRange].values[kpi].index["SOLAN"],
			UNA: KPIDistrictMapping[dateRange].values[kpi].index["UNA"],
			LAHAUL_AND_SPITI: KPIDistrictMapping[dateRange].values[kpi].index["LAHAUL AND SPITI"],
		};
    })

    return {tableDataHeaders, tableDataRows, tablekpis: kpis}
}

// All functions for filters
export const updateActiveFilters = (
	filterIndex,
	filter,
	activeFilters
) => async (dispatch) => {};

export const updateProcurementsDateRange = (newDateRange) => async (
	dispatch
) => {
	dispatch({
		type: SET_PROCUREMENTS_DATA_LOADING,
		payload: {
			loading: true,
		},
	});
	setTimeout(() => {
		//update data based on new date selection
		const currYearData = data[newDateRange];
		let mapData = calculateMapData(currYearData);
        let tableData = calculateTableData(); // Currently saving data for SDG description table
        let KPIDistrictTableData = calculateKPIDistrictTableData(newDateRange)
		const activeFilters = {
			sdg: {
				val: "",
				status: true,
			},
			works: {
				val: "",
				status: false,
			},
			indicator: {
				val: "",
				status: false
			},
			kpi: {
				val: "",
				status: false,
			},
		};
		const allFiltersData = [
			{
				key: "sdg",
				val: Object.keys(data[newDateRange].values).map((option) => ({
					label: option,
					value: option,
				})),
			},
			{
				key: "works",
				val: [],
			},
			{
				key: "indicator",
				val: []
			},
			{
				key: "kpi",
				val: [],
			},
		];
		dispatch({
			type: UPDATE_DATERANGE,
			payload: {
				mapData: mapData,
				tableData: tableData,
				dateRange: newDateRange,
				activeFilters: activeFilters,
                allFiltersData: allFiltersData,
                KPIDistrictTableData: KPIDistrictTableData
			},
		});
	}, 1000);

	// dispatch(getProcurementsData(newDateRange))

	// clear previous active filters

	// First filter be active
};

export const updateFiltersData = (
	filterIndex,
	activeFilters,
	dateRange,
	allFiltersData,
	filter
) => async (dispatch) => {
	dispatch({
		type: SET_PROCUREMENTS_DATA_LOADING,
		payload: {
			loading: true,
		},
	});
	console.log(
		"testing inside update filters data",
		filterIndex,
		activeFilters,
		dateRange,
		allFiltersData
	);
	// updateActiveFilters(filterIndex, filter, activeFilters)
	let mapData, tableData;
	// if(filterIndex !== procurements.length - 1){
	setTimeout(() => {
		switch (filterIndex) {
			case 0:
				activeFilters[procurements[filterIndex]].val = filter;
				activeFilters[procurements[filterIndex + 1]].status = true;
				activeFilters[procurements[filterIndex + 2]].status = false;
				activeFilters[procurements[filterIndex + 3]].status = false;
				activeFilters[procurements[filterIndex + 1]].val = "";
				activeFilters[procurements[filterIndex + 2]].val = "";
				activeFilters[procurements[filterIndex + 3]].val = "";

				allFiltersData[filterIndex + 1].val = Object.keys(
					data[dateRange].values[activeFilters["sdg"].val].values
				).map((option) => ({ label: option, value: option }));
				allFiltersData[filterIndex + 2].val = [];
				allFiltersData[filterIndex + 3].val = [];
				mapData = calculateMapData(
					data[dateRange].values[activeFilters["sdg"].val]
				);
				tableData = calculateTableData(); // Currently saving data for SDG description table
				break;

			case 1:
				activeFilters[procurements[filterIndex]].val = filter;
				activeFilters[procurements[filterIndex + 1]].status = true;
				activeFilters[procurements[filterIndex + 2]].status = false;
				activeFilters[procurements[filterIndex + 1]].val = "";
				activeFilters[procurements[filterIndex + 2]].val = "";
				allFiltersData[filterIndex + 1].val = Object.keys(
					data[dateRange].values[activeFilters["sdg"].val].values[
						activeFilters["works"].val
					].values
				).map((option) => ({ label: option, value: option }));
				allFiltersData[filterIndex + 2].val = [];
				mapData = calculateMapData(
					data[dateRange].values[activeFilters["sdg"].val].values[
						activeFilters["works"].val
					]
				);
				tableData = calculateTableData(); // Currently saving data for SDG description table
				break;

			case 2:
				activeFilters[procurements[filterIndex]].val = filter;
				activeFilters[procurements[filterIndex + 1]].status = true;
				activeFilters[procurements[filterIndex + 1]].val = "";

				allFiltersData[filterIndex + 1].val = Object.keys(
					data[dateRange].values[activeFilters["sdg"].val].values[
						activeFilters["works"].val
					].values[activeFilters["indicator"].val].values
				).map((option) => ({ label: option, value: option }));

				mapData = calculateMapData(
					data[dateRange].values[activeFilters["sdg"].val].values[
						activeFilters["works"].val].values[activeFilters["indicator"].val]
				);
				tableData = calculateTableData(); // Currently saving data for SDG description table
				break;
			case 3:
				activeFilters[procurements[filterIndex]].val = filter;
				mapData = calculateMapData(
					data[dateRange].values[activeFilters["sdg"].val].values[
						activeFilters["works"].val
					].values[activeFilters["indicator"].val].values[activeFilters["kpi"].val]
				);
				tableData = calculateTableData();  // Currently saving data for SDG description table
				break;

			default:
				return;

			//    }
		}
		dispatch({
			type: UPDATE_DATA_WITH_FILTERS,
			payload: {
				mapData: mapData,
				tableData: tableData,
				dateRange: dateRange,
				activeFilters: activeFilters,
				allFiltersData: allFiltersData,
				loading: false,
			},
		});
	}, 1000);
};

export const calculateOCDSTableData = () => {
	let headerArray = Object.keys(OCDS_tender)
	const tableDataHeaders = headerArray.map((header,index) => {
		return {
			key: header,
			header: header,
			tooltip: ""
		}
	})

	const tableDataRows = OCDS_tender[headerArray[0]].map((data, index) => {
		const result = {}
		headerArray.map(header => {
			result[header] = OCDS_tender[header][index]
		})
		result.id = Math.random()*10 + headerArray[0]
		return result
	})	
	return {tableDataHeaders, tableDataRows}
}


export const calculateOCDSTableDataAward = () => {
	let headerArray = Object.keys(OCDS_award)
	const tableDataHeaders = headerArray.map((header,index) => {
		return {
			key: header,
			header: header,
			tooltip: ""
		}
	})

	const tableDataRows = OCDS_award[headerArray[0]].map((data, index) => {
		const result = {}
		headerArray.map(header => {
			result[header] = OCDS_award[header][index]
		})
		
		return result
	})	
	console.log("kdnejwfnejfnejfne")
	console.log(tableDataRows)
	return {tableDataHeaders, tableDataRows}
}