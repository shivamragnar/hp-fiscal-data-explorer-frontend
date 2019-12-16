import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import axios from 'axios';

//redux
import { connect } from 'react-redux';

//actions
import { getReceiptsData } from '../../actions/receipts';

import { updateReceiptsOnDateRangeChange } from '../../actions/receipts_filters';

//carbon components
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { ContentSwitcher, Switch } from 'carbon-components-react';

//custom components
import FButton from '../../components/atoms/FButton';
import FLoading from '../../components/atoms/FLoading';
import FBarChart from '../../components/dataviz/FBarChart';
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

const Receipts = ( { receipts : {
											 data : {
												 vizData : { data, yLabelFormat, xLabelVals, xLabelFormat } ,
												 tableData : { headers, rows }
											 },
											 loading,
											 activeFilters,
											 dateRange
									 },
									 getReceiptsData,
									 updateReceiptsOnDateRangeChange
								   } ) => {

	//initialize useState hook
	const [currentVizType, setCurrentVizType] = useState(vizTypes[0]);
	const switchVizType = (e) => { setCurrentVizType(vizTypes[e]); }

	console.log(yLabelFormat);

	useEffect(() => {

		getReceiptsData(activeFilters, dateRange);
  }, []);

	const onRadioChange = (value, name) => {
		console.log(value + "," + name);
		onFilterChange({selectedItem:{filter_name:name,id:value}});
  }

	const onFilterChange = (e) => {
		// updateExpDemandwiseOnFilterChange(e, activeFilters, allFiltersData, rawFilterData, dateRange);
	}

	const onDateRangeSet = (newDateRange) => {
		updateReceiptsOnDateRangeChange(newDateRange, activeFilters);
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
							<FBarChart
								data={data}
								dataToX="date"
								dataPoints={["receipt"]}
								yLabelFormat={yLabelFormat}
								xLabelVals={xLabelVals}
								xLabelFormat={xLabelFormat}
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
				<h3>Receipts</h3>
				<FMonthPicker
					defaultSelect = {{
						years:[ parseInt(dateRange[0].split('-')[0]), parseInt(dateRange[1].split('-')[0]) ],
						months:[ parseInt(dateRange[0].split('-')[1]), parseInt(dateRange[1].split('-')[1]) ] }}
					dateRange = {{years:[2018, 2019], months:[4, 3]}}
					onDateRangeSet={onDateRangeSet}
				/>
			</div>
      <div className="data-viz-col receipts">
				{createDataUIComponent()}
      </div>
			<div className="filter-col-wrapper">
        <div className="filter-col">
					<FDropdown
						className = "filter-col--ops"
						titleText = "Major"
						label = "All"
						onChange = {onFilterChange}

					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Sub Major"
						label = "All"
						onChange = {onFilterChange}

					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Minor"
						label = "All"
						onChange = {onFilterChange}

					/>
					<FDropdown
						className = "filter-col--ops"
						titleText = "Sub Minor"
						label = "All"
						onChange = {onFilterChange}

					/>

        </div>
			</div>
    </div>
	)
}

Receipts.propTypes = {
	receipts : PropTypes.object.isRequired,
	getReceiptsData : PropTypes.func.isRequired,
	updateReceiptsOnDateRangeChange : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	receipts : state.receipts,
})

export default connect(mapStateToProps, { getReceiptsData, updateReceiptsOnDateRangeChange })(Receipts);
