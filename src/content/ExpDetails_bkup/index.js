import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import axios from 'axios';

//redux
import { connect } from 'react-redux';

//actions
import { getExpDemandwiseData } from '../../actions/exp_demandwise';

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

//import helpers
import { convertDataToJson } from '../../utils/functions';

//data-refs
var yymmdd_ref = require("../../data/yymmdd_ref.json");
var { exp_demandwise : filterOrderRef } = require("../../data/filters_ref.json");

//Name of components to switch between
const vizTypes = ["FSASR", "FTable"];


var monthPickerSelectedRange = {years:[2018, 2019], months:[4, 3]} //default selected range


const ExpDetails = ( { exp_demandwise : {
													data : {
														vizData : { data, yLabelFormat, xLabelVals, xLabelFormat, scsrOffset } ,
												    tableData : { headers, rows }
													},
												  loading,
												  activeFilters,
												  dateRange
											 },
											 exp_demandwise_filters : { allFiltersData, rawFilterData },
											 getExpDemandwiseData } ) => {


	//initialize useState hook
	const [currentVizType, setCurrentVizType] = useState(vizTypes[0]);

	//1
	const switchVizType = (e) => { setCurrentVizType(vizTypes[e]); }

	const onRadioChange = (value, name) => {
		console.log(value + "," + name);
		onFilterChange({selectedItem:{filter_name:name,id:value}});
	}

	//2
	const onFilterChange = (e) => {

		const currFilterOrderIndex = filterOrderRef.indexOf(e.selectedItem.filter_name);

		//1 Remove all child filters from activeFilters
		filterOrderRef.map((filterName,i) => {
			if(i > currFilterOrderIndex && activeFilters.filters[filterName] ){
				delete(activeFilters.filters[filterName]);
			}
		})

		//2 add selected filter to the activeFilters array
		if(e.selectedItem.id !== "all"){
			activeFilters.filters[e.selectedItem.filter_name] = e.selectedItem.id;
		} else {
			delete(activeFilters.filters[e.selectedItem.filter_name]);
		}


		//3 repopulate all child filters
		allFiltersData.map((filterObj, i) => {
			if( i > currFilterOrderIndex){
				filterObj.val = [{ filter_name: filterObj.key, id : 'all', label : 'All' }];
			}
		})

		rawFilterData.data.records.map(child_arr =>{
			var comboValidityCheckCount = 0;
			var activeFiltersValAry = Object.values(activeFilters.filters);
			var activeFiltersKeyAry = Object.keys(activeFilters.filters);

			activeFiltersValAry.map((filterVal, i) => {
				let child_arr_index = filterOrderRef.indexOf(activeFiltersKeyAry[i]);
				if(child_arr[child_arr_index] === filterVal){
					comboValidityCheckCount++;
				}
			})

			if(comboValidityCheckCount === activeFiltersKeyAry.length){
				allFiltersData.map((filterObj, i) => {
					if( i > currFilterOrderIndex){
						if(filterObj.val.some(item => item.id === child_arr[i]) !== true ){
							filterObj.val.push({ filter_name: filterObj.key, id : child_arr[i], label : child_arr[i] });
						}
					}
				})
			}
		})

		console.log("newfiltersData: "); console.log(allFiltersData);
		console.log("filterchange! active filters: "); console.log(activeFilters.filters);


		getExpDemandwiseData(activeFilters, dateRange); //update expData state at App level
	}

	//2 ---- ACTION : DATE RANGE FILTER
	const onDateRangeSet = (newDateRange) => { //the month number-range is coming in as 1 - 12

		const { year : fromYear, month : fromMonth } = newDateRange.from;
		const { year : toYear, month : toMonth } = newDateRange.to;

		monthPickerSelectedRange = {years:[fromYear, toYear], months:[fromMonth, toMonth]};

		const dateFrom = fromYear.toString()+ "-" + ( fromMonth < 10 ? "0" : "") + fromMonth.toString() + "-01" ;
		const dateTo = toYear.toString() + "-" + //YY
						 ( toMonth < 10 ? "0" : "") + toMonth.toString() + "-" + //MM
						 ( toMonth !== 2 ? //dealing with day count of feb and leap year
							 yymmdd_ref.noOfDays[toMonth-1] :
							 yymmdd_ref.noOfDays[toMonth-1].split('_')[ (toYear%4 === 0 ? 1 : 0)] ) ; //DD

		console.log("newFromMth " + dateFrom);
		console.log("newToMth " + dateTo);

		getExpDemandwiseData(activeFilters, [dateFrom, dateTo]); //update expData state at App level
	}


	useEffect(() => {
		// getFiltersData();
	}, []);


	const createDataUIComponent = () => {
		if(loading === true){
			return <div>Loading...</div>;
		}else{
			return (
				<Fragment>
					<div className="content-switcher-wrapper">
						<ContentSwitcher onChange={switchVizType} >
							<Switch  text="Visual" />
							<Switch  text="Table" />
						</ContentSwitcher>
					</div>
					{ currentVizType === vizTypes[0] ?
							<FSASRChart
								data={data}
								yLabelFormat={yLabelFormat}
								xLabelVals={xLabelVals}
								xLabelFormat={xLabelFormat}
								scsrOffset={scsrOffset}
								/> :
						 <Fragment>
								<CSVLink data={rows}><FButton>DOWNLOAD CSV</FButton></CSVLink>
								<a href={`data:${convertDataToJson(rows)}`} download="exp_details_data.json"><FButton>DOWNLOAD JSON</FButton></a>
								<FTable
									rows={rows}
									headers={headers}
									onClickDownloadBtn={(e) => { console.log(e)}}
								  />
						 </Fragment>
				 	 }
				</Fragment>
			)
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
					{createDataUIComponent()}
        </div>
			<div className="filter-col-wrapper">
        <div className="filter-col">

          <FDropdown
						className = "filter-col--ops"
						titleText = "Demand"
						label = "All"
						onChange = {onFilterChange}
						items = {allFiltersData[0] && allFiltersData[0].val}
						selectedItem = { activeFilters && activeFilters.filters.demand ? activeFilters.filters.demand : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Major"
						label = "All"
						onChange = {onFilterChange}
						items = {allFiltersData[1] && allFiltersData[1].val}
						selectedItem = { activeFilters && activeFilters.filters.major ? activeFilters.filters.major : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Sub Major"
						label = "All"
						onChange = {onFilterChange}
						items = {allFiltersData[2] && allFiltersData[2].val}
						selectedItem = { activeFilters && activeFilters.filters.sub_major ? activeFilters.filters.sub_major : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Minor"
						label = "All"
						onChange = {onFilterChange}
						items = {allFiltersData[3] && allFiltersData[3].val}
						selectedItem = { activeFilters && activeFilters.filters.minor ? activeFilters.filters.minor : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Sub Minor"
						label = "All"
						onChange = {onFilterChange}
						items = {allFiltersData[4] && allFiltersData[4].val}
						selectedItem = { activeFilters && activeFilters.filters.sub_minor ? activeFilters.filters.sub_minor : "All" }
					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Budget"
						label = "All"
						onChange = {onFilterChange}
						items = {allFiltersData[5] && allFiltersData[5].val}
						selectedItem = { activeFilters && activeFilters.filters.budget ? activeFilters.filters.budget : "All" }
					/>
					<FRadioGroup
						className = "filter-col--ops"
						name = "voted_charged"
						titleText = ""
						onChange = {(value, name) => onRadioChange(value, name)}
						items = {allFiltersData[6] && allFiltersData[6].val}
						valueSelected = { activeFilters && activeFilters.filters.voted_charged ? activeFilters.filters.voted_charged : "all" }
					/>
					<FRadioGroup
						className = "filter-col--ops"
						name = "plan_nonplan"
						titleText = ""
						onChange = {(value, name) => onRadioChange(value, name)}
						items = {allFiltersData[7] && allFiltersData[7].val}
						valueSelected = { activeFilters && activeFilters.filters.plan_nonplan ? activeFilters.filters.plan_nonplan : "all" }
					/>
					 <FDropdown
 						className = "filter-col--ops"
 						titleText = "SOE"
 						label = "All"
 						onChange = {onFilterChange}
 						items = {allFiltersData[8] && allFiltersData[8].val}
 						selectedItem = { activeFilters && activeFilters.filters.SOE ? activeFilters.filters.SOE : "All" }
 					/>
        </div>
			</div>
    </div>
	)
}

ExpDetails.propTypes = {
	exp_demandwise : PropTypes.object.isRequired,
	exp_demandwise_filters : PropTypes.object.isRequired,
	getExpDemandwiseData : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	exp_demandwise : state.exp_demandwise,
	exp_demandwise_filters : state.exp_demandwise_filters
})

export default connect(mapStateToProps, { getExpDemandwiseData })(ExpDetails);
