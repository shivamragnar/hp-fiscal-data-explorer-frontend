import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from 'axios';

//redux
import { connect } from 'react-redux';

//actions
import { getReceiptsData } from '../../actions/receipts';
import {
	getReceiptsFiltersData,
	updateReceiptsOnFilterChange,
	updateReceiptsOnDateRangeChange } from '../../actions/receipts_filters';

//carbon components
import { ContentSwitcher, Switch } from 'carbon-components-react';

//custom components
import FLoading from '../../components/atoms/FLoading';
import FBarChart from '../../components/dataviz/FBarChart';
import FTable from '../../components/dataviz/FTable';
import FMonthPicker from '../../components/molecules/FMonthPicker';
import FPageTitle from '../../components/organisms/FPageTitle';
import FFilterColumn from '../../components/organisms/FFilterColumn';
import FTooltipReceipts from '../../components/atoms/FTooltipReceipts';

//import helpers
import { convertDataToJson } from '../../utils/functions';

// data_ref
const { receipts: filterOrderRef, receipts_filter_comp } = require('../../data/filters_ref.json');

//Name of components to switch between
const vizTypes = ["FSASR", "FTable"];

const Receipts = ( { receipts : {
											 data : {
												 vizData : { data, xLabelVals, xLabelFormat } ,
												 tableData : { headers, rows }
											 },
											 loading,
											 activeFilters,
											 dateRange
									 },
									 receipts_filters : { allFiltersData, rawFilterData },
									 getReceiptsData,
									 updateReceiptsOnFilterChange,
									 updateReceiptsOnDateRangeChange,
									 getReceiptsFiltersData
								   } ) => {

	//initialize useState hook
	const [currentVizType, setCurrentVizType] = useState(vizTypes[0]);
	const switchVizType = (e) => { setCurrentVizType(vizTypes[e]); }

	useEffect(() => {
		getReceiptsData(activeFilters, dateRange);
		getReceiptsFiltersData();
  }, []);

	const onRadioChange = (value, name) => {
		console.log(value + "," + name);
		onFilterChange({selectedItem:{filter_name:name,id:value}});
  }

	const onFilterChange = (e) => {
		updateReceiptsOnFilterChange(e, activeFilters, allFiltersData, rawFilterData, dateRange);
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
								xLabelVals={xLabelVals}
								xLabelFormat={xLabelFormat}
								tooltip={<FTooltipReceipts/>}
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
		<div className="f-content">
			<FPageTitle
				pageTitle="Receipts"
				showLegend={false}
				monthPicker={
					<FMonthPicker
						defaultSelect = {{
							years:[ parseInt(dateRange[0].split('-')[0]), parseInt(dateRange[1].split('-')[0]) ],
							months:[ parseInt(dateRange[0].split('-')[1]), parseInt(dateRange[1].split('-')[1]) ] }}
						dateRange = {{years:[2018, 2019], months:[4, 3]}}
						onDateRangeSet={onDateRangeSet}
					/>
				}
				/>
      <div className="data-viz-col receipts">
				{createDataUIComponent()}
      </div>
			<div className="filter-col-wrapper">
				<FFilterColumn
					onChange={onFilterChange}
					allFiltersData={allFiltersData}
					activeFilters={activeFilters}
					receiptsFilterCompData={receipts_filter_comp}
					filterOrderRef={filterOrderRef}
					/>
			</div>
    </div>
	)
}

Receipts.propTypes = {
	receipts : PropTypes.object.isRequired,
	receipts_filters : PropTypes.object.isRequired,
	getReceiptsData : PropTypes.func.isRequired,
	updateReceiptsOnFilterChange : PropTypes.func.isRequired,
	updateReceiptsOnDateRangeChange : PropTypes.func.isRequired,
	getReceiptsFiltersData : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	receipts : state.receipts,
	receipts_filters : state.receipts_filters
})

export default connect(
	mapStateToProps,
	{ getReceiptsData,
		getReceiptsFiltersData,
		updateReceiptsOnFilterChange,
		updateReceiptsOnDateRangeChange
	}
)(Receipts);
