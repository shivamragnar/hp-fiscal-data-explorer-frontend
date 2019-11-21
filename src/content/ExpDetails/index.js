import React, { Fragment, useEffect, useState } from "react";
import axios from 'axios';

//carbon components
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { ContentSwitcher, Switch } from 'carbon-components-react';

//custom components
import FSASRChart from '../../components/dataviz/FSASRChart';
import FTimeSeries from '../../components/dataviz/FTimeSeries';
import FTable from '../../components/dataviz/FTable';
import FDropdown from '../../components/molecules/FDropdown';
import FRadioGroup from '../../components/molecules/FRadioGroup';


const sampleDataSASR = [
	{ date: "Jan", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Feb", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Mar", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Apr", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "May", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Jun", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Jul", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Aug", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Sep", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Oct", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Nov", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Dec", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 }
]

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

const props = {
	FTable: { rows: sampleRows, headers: sampleHeaders },
	FSASRChart: { dataToX: 'date', yLabelFormat: [""," L INR",1/100000] }
}

var expFilterHierarchy = require("../../data/expFilterHierarchy.json");

var rawFilterData;

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
		key: 'sub-major',
		val: [
			{ dd_name: "sub-major", id : 'all', label : 'All' },
		]
	},
	{
		key: 'minor',
		val: [
			{ dd_name: "minor", id : 'all', label : 'All' },
		]
	},
	{
		key: 'sub-minor',
		val: [
			{ dd_name: "sub-minor", id : 'all', label : 'All' },
		]
	}
];


var expFilters = { "filters":{} };


const ExpDetails = ( { expData, expDataLoading, getData } ) => {

	//initialize useState hook
	const [currentVizType, setCurrentVizType] = useState(vizTypes[0]);

	//1
	const switchVizType = (e) => { setCurrentVizType(vizTypes[e]); }

	//2
	const onFilterChange = (e) => {
		if(e.selectedItem.id !== "all"){
			expFilters.filters[e.selectedItem.dd_name] = e.selectedItem.id;
		} else {
			delete(expFilters.filters[e.selectedItem.dd_name]);
		}
		// ---get active filter,
		//---get index of active filter from expFilterHierarchy json
		//---wipe out all the val array of all the other filter objects in filterData EXCEPT the 'all'
		//loop through raw filterdata,
		//whichever child_arr has active filter at index of active filter
		//repopulate all other filter objects by matching the index
		if(expFilters.filters.demand){
			const demandHierarchyIndex = expFilterHierarchy.indexOf("demand");
			filtersData.map((filterObj, i) => {
				if( i !== demandHierarchyIndex){
					filterObj.val = [{ dd_name: filterObj.key, id : 'all', label : 'All' }];
				}
			})
			rawFilterData.data.records.map(child_arr =>{
				if(child_arr[demandHierarchyIndex] === expFilters.filters.demand){
					filtersData.map((filterObj, i) => {
						if( i !== demandHierarchyIndex){
							if(filterObj.val.some(item => item.id === child_arr[i]) !== true ){
								filterObj.val.push({ dd_name: filterObj.key, id : child_arr[i], label : child_arr[i] });
							}
						}
					})
				}
			})
			console.log("newfiltersData: "); console.log(filtersData);
		}


		console.log("filterchange! active filters: "); console.log(expFilters.filters);
		getData(expFilters); //update expData state at App level
	}

	//3
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
		//reset expFilters every time this component is loaded.
		console.log(filtersData);
		getFiltersData();
		expFilters = { "filters":{} };
	}, []);

	var currentVizComp;
	if(currentVizType === vizTypes[0]){
		if(expDataLoading === true){
			currentVizComp = <div>Loading...</div>;
		}else{
			console.log("loading is finished");
			currentVizComp = <FSASRChart data={expData} {...props.FSASRChart} />;
		}
	}else{
		// currentVizComp = <FTable {...props.FTable}  />;
		currentVizComp = <div>this is a data table</div>;
	}

	return (
		<div>
        <div className="data-viz-col exp-details">
					<div className="content-switcher-wrapper">
            <ContentSwitcher onChange={switchVizType} >
              <Switch  text="SASR Chart" />
              <Switch  text="Table" />
            </ContentSwitcher>
          </div>
          <div>
            {currentVizComp}
          </div>
        </div>
			<div className="filter-col-wrapper">
        <div className="filter-col">
          <FDropdown
						className = "filter-col--ops"
						titleText = "Demand"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[0].val}
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Major"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[1].val}
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Sub Major"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[2].val}
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Minor"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[3].val}
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Sub Minor"
						label = "All"
						onChange = {onFilterChange}
						items = {filtersData[4].val}
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Budget"
						label = "All"
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "SOE"
						label = "All"
					/>
					<FRadioGroup
						className = "filter-col--ops"
						name = "plan_nonplan"
						titleText = ""
						radioButtons = {[
							{id:"plan", labelText: "Plan", value: "default-selected"},
					    {id:"non-plan", labelText: "Non Plan", value: "standard"}
						]}
					/>
					<FRadioGroup
						className = "filter-col--ops"
						name = "voted_charged"
						titleText = ""
						radioButtons = {[
							{id:"voted", labelText: "Voted", value: "default-selected"},
							{id:"charged", labelText: "Charged", value: "standard"}
						]}
					/>
        </div>
			</div>
    </div>
	)

}
export default ExpDetails;
