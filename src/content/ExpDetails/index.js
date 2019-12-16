import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import axios from 'axios';

//redux
import { connect } from 'react-redux';

//actions
import { getExpDemandwiseData } from '../../actions/exp_demandwise';
import { updateExpDemandwiseOnFilterChange } from '../../actions/exp_demandwise_filters';
import { updateExpDemandwiseOnDateRangeChange } from '../../actions/exp_demandwise_filters';

//carbon components
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { ContentSwitcher, Switch } from 'carbon-components-react';

//custom components
import FButton from '../../components/atoms/FButton';
import FLoading from '../../components/atoms/FLoading';
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
											 getExpDemandwiseData,
											 updateExpDemandwiseOnFilterChange,
											 updateExpDemandwiseOnDateRangeChange
										  	} ) => {

	console.log("allFiltersData"); console.log(allFiltersData);

	//initialize useState hook
	const [currentVizType, setCurrentVizType] = useState(vizTypes[0]);
	const switchVizType = (e) => { setCurrentVizType(vizTypes[e]); }

	const onRadioChange = (value, name) => {
		console.log(value + "," + name);
		onFilterChange({selectedItem:{filter_name:name,id:value}});
  }

	const onFilterChange = (e) => {
		updateExpDemandwiseOnFilterChange(e, activeFilters, allFiltersData, rawFilterData, dateRange);
	}

	const onDateRangeSet = (newDateRange) => {
		updateExpDemandwiseOnDateRangeChange(newDateRange, activeFilters);
	}

	const createDataUIComponent = () => {
		if(loading === true){
			return <FLoading />;
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
			<div className="f-page-title">
			<h3>Demand-wise Expenditure Details</h3>
			<FMonthPicker
				defaultSelect = {{
					years:[ parseInt(dateRange[0].split('-')[0]), parseInt(dateRange[1].split('-')[0]) ],
					months:[ parseInt(dateRange[0].split('-')[1]), parseInt(dateRange[1].split('-')[1]) ] }}
				dateRange = {{years:[2018, 2019], months:[4, 3]}}
				onDateRangeSet={onDateRangeSet}
			/>
			</div>
        <div className="data-viz-col exp-details">
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
	getExpDemandwiseData : PropTypes.func.isRequired,
	updateExpDemandwiseOnFilterChange : PropTypes.func.isRequired,
	updateExpDemandwiseOnDateRangeChange : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	exp_demandwise : state.exp_demandwise,
	exp_demandwise_filters : state.exp_demandwise_filters
})

export default connect(mapStateToProps, { getExpDemandwiseData, updateExpDemandwiseOnFilterChange, updateExpDemandwiseOnDateRangeChange })(ExpDetails);
