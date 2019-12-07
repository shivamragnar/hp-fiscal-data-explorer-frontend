import React, { Fragment, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

//carbon components
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { ContentSwitcher, Switch } from 'carbon-components-react';

//download files components
import { CSVLink, CSVDownload } from "react-csv";

//custom components
import FButton from '../../components/atoms/FButton';
import FSASRChart from '../../components/dataviz/FSASRChart';
import FTimeSeries from '../../components/dataviz/FTimeSeries';
import FTable from '../../components/dataviz/FTable';
import FDropdown from '../../components/molecules/FDropdown';
import FMonthPicker from '../../components/molecules/FMonthPicker';
import FRadioGroup from '../../components/molecules/FRadioGroup';

//data-refs
var yymmdd_ref = require("../../data/yymmdd_ref.json");

//sample table data
const sampleRows = [{
		id: 'a',
		demand_code: '1',
		sanction: '1000',
		percent_change: '10%',
  },
	{
		id: 'b',
		demand_code: '2',
		sanction: '800',
		percent_change: '12%'
  },
	{
		id: 'c',
		demand_code: '3',
		sanction: '1200',
		percent_change: '6%'
  },
];
const sampleHeaders = [{
		// `key` is the name of the field on the row object itself for the header
		key: 'demand_code',
		// `header` will be the name you want rendered in the Table Header
		header: 'Demand',
  },
	{
		key: 'sanction',
		header: 'Sanction',
  },
	{
		key: 'percent_change',
		header: 'Pecentage Change Since Last Year',
  },
];


//Name of components to switch between
const vizTypes = ["FSASR", "FTable"];



var expFilterHierarchy = require("../../data/expFilterHierarchy.json");

var rawFilterData;






//this will store all the possible options the various filters could have.
const filtersData = [
	{
		key: 'demand',
		val: [
			{ dd_name: "demand", id : 'all', label : 'All' },
		]
	},
	{
		key: 'major',
		val: [
			{ dd_name: "major", id : 'all', label : 'All' },
		]
	},
	{
		key: 'sub_major',
		val: [
			{ dd_name: "sub_major", id : 'all', label : 'All' },
		]
	},
	{
		key: 'minor',
		val: [
			{ dd_name: "minor", id : 'all', label : 'All' },
		]
	},
	{
		key: 'sub_minor',
		val: [
			{ dd_name: "sub_minor", id : 'all', label : 'All' },
		]
	},
	{
		key: 'budget',
		val: [
			{ dd_name: "budget", id : 'all', label : 'All' },
		]
	},
	{
		key: 'voted_charged',
		val: [
			{ dd_name: "voted_charged", id : 'all', label : 'All' },
		]
	},
	{
		key: 'plan_nonplan',
		val: [
			{ dd_name: "plan_nonplan", id : 'all', label : 'All' },
		]
	},
	{
		key: 'SOE',
		val: [
			{ dd_name: "SOE", id : 'all', label : 'All' },
		]
	}

];

//initialize filters at component level
var expFilters;
var dateFrom;
var dateTo;
var monthPickerSelectedRange = {years:[2018, 2019], months:[4, 3]} //default selected range


const ExpDetails = ( { expData : { vizData : { data, yLabelFormat, scsrOffset }, tableData : { headers, rows }  } , expDataLoading, getData, initExpFilters,  initDateFrom, initDateTo } ) => {

  //download JSON
	const convertDataToJson = (data) => {
		const dataToJson = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
		return dataToJson;
	}

	//initialize useState hook
	const [currentVizType, setCurrentVizType] = useState(vizTypes[0]);

	//1
	const switchVizType = (e) => { setCurrentVizType(vizTypes[e]); }

	const onRadioChange = (value, name) => {
		console.log(value + "," + name);
	}

	//2
	const onFilterChange = (e) => {
		//3 steps -
		//1//remove all active filters bellow current
		//2//add current to the list of active filters
		//3//repopulate all filters below active filter

		//first switch all filters below its hierarchy to 'all'
		const currFilterHierarchyIndex = expFilterHierarchy.indexOf(e.selectedItem.dd_name);
		console.log("currHier: " + currFilterHierarchyIndex);
		//loop through all the filter names in hierarchical order
		expFilterHierarchy.map((filterName,i) => {
			//if the filter is lower in hierarchy that the currently changed filter
			if(i > currFilterHierarchyIndex){
				//and if this filter currently exists in the active filters object (called expFilters)
				if(expFilters.filters[filterName]){
					//then remove it
					delete(expFilters.filters[filterName]);
				}
			}
		})

		if(e.selectedItem.id !== "all"){
			expFilters.filters[e.selectedItem.dd_name] = e.selectedItem.id;
		} else {
			delete(expFilters.filters[e.selectedItem.dd_name]);
		}

		//---wipe out all the val array of all the other filter objects at lower hierarchy than currently selected filter
		//loop through raw filterdata,
		//whichever child_arr has active filter at index of active filter
		//repopulate all lower hierarchy filter objects by matching the index

			filtersData.map((filterObj, i) => {
				if( i > currFilterHierarchyIndex){
					filterObj.val = [{ dd_name: filterObj.key, id : 'all', label : 'All' }];
				}
			})

			rawFilterData.data.records.map(child_arr =>{
				// expFilters.filters.map()
				var comboValidityCheckCount = 0;

				var expFiltersValAry = Object.values(expFilters.filters);
				var expFiltersKeyAry = Object.keys(expFilters.filters);

				expFiltersValAry.map((filterVal, i) => {
					let child_arr_index = expFilterHierarchy.indexOf(expFiltersKeyAry[i]);
					if(child_arr[child_arr_index] === filterVal){
						comboValidityCheckCount++;
					}
				})
				// if(child_arr[currFilterHierarchyIndex] === e.selectedItem.id){}

				if(comboValidityCheckCount === expFiltersKeyAry.length){
					filtersData.map((filterObj, i) => {
						if( i > currFilterHierarchyIndex){
							if(filterObj.val.some(item => item.id === child_arr[i]) !== true ){
								filterObj.val.push({ dd_name: filterObj.key, id : child_arr[i], label : child_arr[i] });
							}
						}
					})
				}
			})
			console.log("newfiltersData: "); console.log(filtersData);



		console.log("filterchange! active filters: "); console.log(expFilters.filters);
		getData(expFilters, dateFrom, dateTo); //update expData state at App level
	}

	//2 ---- ACTION : DATE RANGE FILTER
	const onDateRangeSet = (newDateRange) => { //the month number-range is coming in as 1 - 12

		const { year : fromYear, month : fromMonth } = newDateRange.from;
		const { year : toYear, month : toMonth } = newDateRange.to;

		monthPickerSelectedRange = {years:[fromYear, toYear], months:[fromMonth, toMonth]};

		dateFrom = fromYear.toString()+ "-" + ( fromMonth < 10 ? "0" : "") + fromMonth.toString() + "-01" ;
		dateTo = toYear.toString() + "-" + //YY
						 ( toMonth < 10 ? "0" : "") + toMonth.toString() + "-" + //MM
						 ( toMonth !== 2 ? //dealing with day count of feb and leap year
							 yymmdd_ref.noOfDays[toMonth-1] :
							 yymmdd_ref.noOfDays[toMonth-1].split('_')[ (toYear%4 === 0 ? 1 : 0)] ) ; //DD

		console.log("newFromMth " + dateFrom);
		console.log("newToMth " + dateTo);

		getData(expFilters, dateFrom, dateTo); //update expData state at App level
	}

	//3 --- ACTION : POPULATE FILTERS WITH OPTIONS
	const getFiltersData = async () => {
    console.time("Axios Fetching Filters"); console.log("Fetching Filters Started");

    try {
			//fetch raw filter data
			rawFilterData = await axios.get("http://13.126.189.78/api/acc_heads");
			console.log('filters!: '); console.log(rawFilterData);

			//populate all dropdown filters' data from the raw response provided by API
			filtersData.map((filter, i) => {
				rawFilterData.data.records.map(child_arr => {
					if(filter.val.some(item => item.id === child_arr[i]) !== true){
						const filterOption = {
							dd_name: filter.key,
							id: child_arr[i],
							label: child_arr[i]
						}
						filter.val.push(filterOption);
					}
				})
			})
			console.log("filtersData"); console.log(filtersData);

    } catch (err) { console.log(err); }

    console.timeEnd("Axios Fetching Filters");
  };

	useEffect(() => {
		//reset all filters every time this component is loaded.
		console.log(filtersData);
		getFiltersData();
		expFilters = initExpFilters;
		dateFrom = initDateFrom;
		dateTo = initDateTo;
	}, []);

	var currentVizComp;
	if(expDataLoading === true){
		currentVizComp = <div>Loading...</div>;
	}else{
		if(currentVizType === vizTypes[0]){
				currentVizComp = <Fragment>
													<div className="content-switcher-wrapper">
														<ContentSwitcher onChange={switchVizType} >
															<Switch  text="SASR Chart" />
															<Switch  text="Table" />
														</ContentSwitcher>
													</div>
													<div>
														<FSASRChart
															data={data}
															yLabelFormat={yLabelFormat}
															scsrOffset={scsrOffset}
															/>
													</div>
											   </Fragment>;

		}else{
			currentVizComp = <Fragment>
												<div className="content-switcher-wrapper">
													<ContentSwitcher onChange={switchVizType} >
														<Switch  text="SASR Chart" />
														<Switch  text="Table" />
													</ContentSwitcher>
												</div>
												<div>

													<CSVLink data={rows}><FButton>DOWNLOAD CSV</FButton></CSVLink>
													<a href={`data:${convertDataToJson(rows)}`} download="exp_details_data.json"><FButton>DOWNLOAD JSON</FButton></a>

													<FTable
														rows={rows}
														headers={headers}
														onClickDownloadBtn={(e) => { console.log(e)}}
													  />
												</div>
											 </Fragment>;

		}
	}
	return (
		<div>
        <div className="data-viz-col exp-details">
					<FMonthPicker
						defaultSelect = {monthPickerSelectedRange}
						dateRange = {{years:[2018, 2019], months:[1, 3]}}
						onDateRangeSet={onDateRangeSet}
					/>

            {currentVizComp}

        </div>
			<div className="filter-col-wrapper">
        <div className="filter-col">

          <FDropdown
						className = "filter-col--ops"
						titleText = "Demand"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[0].val}
						selectedItem = { expFilters && expFilters.filters.demand ? expFilters.filters.demand : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Major"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[1].val}
						selectedItem = { expFilters && expFilters.filters.major ? expFilters.filters.major : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Sub Major"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[2].val}
						selectedItem = { expFilters && expFilters.filters.sub_major ? expFilters.filters.sub_major : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Minor"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[3].val}
						selectedItem = { expFilters && expFilters.filters.minor ? expFilters.filters.minor : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Sub Minor"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[4].val}
						selectedItem = { expFilters && expFilters.filters.sub_minor ? expFilters.filters.sub_minor : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Budget"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[5].val}
						selectedItem = { expFilters && expFilters.filters.budget ? expFilters.filters.budget : "All" }
					/>
					<FRadioGroup
						className = "filter-col--ops"
						name = "plan_nonplan"
						titleText = ""
						onChange = {(value, name) => onRadioChange(value, name)}
						items = {[
							{ id:"p_np_all", label: "All", value: "all"},
							{ id:"plan", label: "Plan", value: "plan"},
							{ id:"nonplan", label: "Non Plan", value: "nonplan"}
						]}
						valueSelected = { expFilters && expFilters.filters.voted_charged ? expFilters.filters.voted_charged : "all" }
					/>
					<FRadioGroup
						className = "filter-col--ops"
						name = "voted_charged"
						titleText = ""
						onChange = {(value, name) => onRadioChange(value, name)}
						items = {[
							{ id:"v_c_all", label: "All", value: "all"},
							{ id:"voted", label: "Voted", value: "voted"},
							{ id:"charged", label: "Charged", value: "charged"}
						]}
						valueSelected = { expFilters && expFilters.filters.voted_charged ? expFilters.filters.voted_charged : "all" }
					 />
					 <FDropdown
 						className = "filter-col--ops"
 						titleText = "SOE"
 						label = "All"
 						onChange = {onFilterChange}
 						items = {filtersData[8].val}
 						selectedItem = { expFilters && expFilters.filters.SOE ? expFilters.filters.SOE : "All" }
 					/>
        </div>
			</div>
    </div>
	)

}
export default ExpDetails;
