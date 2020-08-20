import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";

//custom components
import FLoading from "../../components/atoms/FLoading";
import FPageTitle from "../../components/organisms/FPageTitle";
import FMonthPicker from "../../components/molecules/FMonthPickerUpdated";

import FMap from "../../components/dataviz/FMap";
import FBarChart from "../../components/dataviz/FBarChart";
import FTimeSeries from "../../components/dataviz/FTimeSeries";
import FTable from "../../components/dataviz/FTable";

import FRadioGroup from "../../components/molecules/FRadioGroup";
import FLegendBar from "../../components/atoms/FLegendBar";
import FFilterColumn2 from "../../components/organisms/FFilterColumn2";

import FPageMeta from "../../components/organisms/FPageMeta";
import FNoDataFound from "../../components/organisms/FNoDataFound";

// Component to keep watch for not being generic
import FTooltipDistrictsAndSchemes from "../../components/atoms/FTooltipDistrictsAndSchemes";
import FTooltipReceipts from '../../components/atoms/FTooltipReceipts';


// Custom Content Swticher
import FContentSwitcher from "../../components/molecules/FContentSwitcher";

//actions
import actions from "../../actions";

//data
import howToUseContent from "../../data/howToUseContent2.json";
import vizTypesList from "../../data/vizTypes.json";
import Tooltips from "../../utils/tooltips";
import Filters_ref from "../../data/filters_ref.json";

const barChartDataV1 = [
	{
		key: "Gross Amount",
		type: "bar",
		color: "darkGrey",
	},
	{
		key: "Net Amount",
		type: "bar",
		color: "black",
	},
];

const barChartDataV2 = [{ key: "Receipt", type: "bar", color: "darkGrey" }];

const barChartDataPointsV1 = ["gross", "netPayment"];
const barChartDataPointsV2 = ["receipt"];

const DetailsBoilerPlate = ({
	// Generic Props being shown, have to check for other pages, fine for exp districtwise now
	districtwise_data: {
		initData,
		data: {
			mapData,
			barChrtData: { data: barChrtData },
			lineChrtData: { data: lineChrtData, xLabelVals, xLabelFormat },
			tableData: { headers, rows },
		},
		loading,
		error,
		activeVizIdx,
		activeFilters,
		dateRange,
	},
	districtwise_filters: {
		allFiltersData,
		rawFilterDataAllHeads,
		loading: filtersLoading,
	},
	getDistrictwiseData,
	setActiveVizIdx,
	updateDistrictwiseOnDateRangeChange,
	updateDistrictwiseFilters,
	FirstReducer,
	SecondReducer,
}) => {
	//----------- initiatialization and handler pairs -----------//
	console.log("testing data in ", FirstReducer, mapData);
	//Name of components to switch between
	const vizTypes = vizTypesList[FirstReducer];

	//Initialising tooltips
	const tooltips = Tooltips[FirstReducer];

	//Initialising Filter order
	const filterOrderRef = Filters_ref[FirstReducer];
	const filter_comp = Filters_ref[SecondReducer];

	//#1 LEFT FILTER BAR
	const [filterBarVisibility, setFilterBarVisibility] = useState(false);
	const handleFilterBarVisibility = () =>
		setFilterBarVisibility(!filterBarVisibility);

	//#2 CONTENT SWITCHER TABS
	const activeViz = vizTypes[activeVizIdx];
	const switchActiveViz = (e) => setActiveVizIdx(e.index);

	//#3 SECONDARY CONTENT SWITCHER RADIO BUTTONS
	const [activeVizView, setActiveVizView] = useState({
		FTimeSeriesVizView: "gross",
		FMapVizView: "gross",
	});
	const onViewChange = (value, name) => {
		setActiveVizView({
			...activeVizView,
			[name]: value,
		});
	};

	//#4 MAIN DATA & FILTER DATA HANDLERS.
	let DistrictwiseActiveFilters = { ...activeFilters };

	const onFilterChange = (e, key) => {
		//#1 ADD OR REMOVE FILTER ID, depending on if its a selection or deselection
		if (e.selectedItems.length > 0) {
			//if at least 1 option is selected,
			DistrictwiseActiveFilters[key] = e.selectedItems.map(
				(selectedItem) => {
					return selectedItem.id;
				}
			);
		} else {
			delete DistrictwiseActiveFilters[key];
		}

		//#2 remove all child filters from activeFiltersArray : because thats the rule : PARENT FILTER RESETS CHILD FILTERS
		const currFilterOrderIndex = filterOrderRef.indexOf(key);
		filterOrderRef.map((filterName, i) => {
			if (
				i > currFilterOrderIndex &&
				DistrictwiseActiveFilters[filterName]
			) {
				delete DistrictwiseActiveFilters[filterName];
				clearAllSelectedOptions(filterName);
			}
		});
		getDistrictwiseData(initData, DistrictwiseActiveFilters, dateRange);
		updateDistrictwiseFilters(
			e,
			key,
			DistrictwiseActiveFilters,
			allFiltersData,
			rawFilterDataAllHeads
		);
	};

	const onDateRangeSet = (newDateRange) => {
		updateDistrictwiseOnDateRangeChange(
			initData,
			newDateRange,
			DistrictwiseActiveFilters
		);
	};

	//----------- END initiatialization and handler pairs -----------//

	//----------- probably redundant now, since multiselect comp has changed -------------//
	const clearAllSelectedOptions = (filterName) => {
		document
			.querySelectorAll(
				`.f-${filterName}-multiselect .bx--list-box__selection--multi`
			)
			.forEach((e) => e.click());
	};

	//----------- probably redundant now, since multiselect comp has changed -------------//

	const renderSwitch = () => {
		console.log('testing render switch', activeViz, FirstReducer)
		switch (activeViz) {
			case "FMap":
				return (
					<Fragment>
						<FLegendBar
							vizType="map"
							data={{
								key: ["Lowest", "Highest"],
								type: "gradient",
								color: [
									"hsl(177,100%,0%)",
									"hsl(177,100%,70%)",
								],
							}}
						/>
						{FirstReducer !== "receipts_districtwise" ? (
							<FRadioGroup
								className="viz-view-toggle"
								name="FMapVizView"
								titleText="View:"
								onChange={(value, name) =>
									onViewChange(value, name)
								}
								items={[
									{ label: "Gross", id: "gross" },
									{ label: "Net Payment", id: "netPayment" },
								]}
								valueSelected={activeVizView.FMapVizView}
							/>
						) : null}
						<div id="fmap">
							<FMap
								data={mapData}
								dataPointToMap={
									FirstReducer !== "receipts_districtwise"
										? activeVizView.FMapVizView
										: "receipt"
								}
							/>
						</div>
					</Fragment>
				);

			case "FBarChart":
				return (
					<Fragment>
						<FLegendBar
							vizType="bar"
							data={
								FirstReducer !== "receipts_districtwise"
									? barChartDataV1
									: barChartDataV2
							}
						/>
						<FBarChart
							data={barChrtData}
							dataToX="districtName"
							dataPoints={FirstReducer !== "receipts_districtwise" ? barChartDataPointsV1 : barChartDataPointsV2 }
							barColors={["darkGrey", "black"]}
							xLabelVals={xLabelVals}
							yAxisLabel={FirstReducer !== "exp_districtwise" ? "Amount" : "total amount in crores"  }
							xAxisLabel="districts"
							tooltip={
								FirstReducer !== "receipts_districtwise"
								?
								<FTooltipDistrictsAndSchemes
									activeDataPoint={["gross", "netPayment"]}
									vizType={vizTypes[activeVizIdx]}
								/>
								:
								<FTooltipReceipts/>
							}
						/>
					</Fragment>
				);

			case "FTimeSeries":
				return (
					<Fragment>
						<FTimeSeries
							dataToX="date"
							dataToY={FirstReducer !== "receipts_districtwise" ? activeVizView.FTimeSeriesVizView : "receipt"}
							data={lineChrtData}
							dataAryName={FirstReducer !== "receipts_districtwise" ? "datewiseExp" : "datewiseRec"}
							xLabelVals={xLabelVals}
							xLabelFormat={xLabelFormat}
							dateRange={dateRange}
							yAxisLabel="amount"
							xAxisLabel="date"
							tooltip={
								FirstReducer !== "receipts_districtwise" ?
								<FTooltipDistrictsAndSchemes
									vizType={vizTypes[activeVizIdx]}
									activeDataPoint={[activeVizView]}
									totalTicks={
										lineChrtData[0].datewiseExp.length
									}
								/>
								:
								<FTooltipReceipts vizType="FTimeSeries"/>
							}
						/>
					</Fragment>
				);

			case "FTable":
				return (
					<FTable
						rows={rows}
						headers={headers}
						onClickDownloadBtn={(e) => {
							console.log(e);
						}}
						showTotal={true}
						showHeaderTooltip={true}
					/>
				);

			default:
				return <div>nothing to display</div>;
		}
	};

	const createDataUIComponent = () => {
		switch (true) {
			case loading:
				return <FLoading />;
			case error.status === "emptyResponseError":
				return <FNoDataFound />;
			default:
				return (
					<Fragment>
						<div className="content-switcher-wrapper">
							<FContentSwitcher
								onChange={switchActiveViz}
								options={[
									{
										label: "Map",
										infoText: tooltips.map_chart_tooltip,
									},
									{
										label: "Bar Chart",
										infoText: tooltips.bar_chart_tooltip,
									},
									{
										label: "Time Series",
										infoText:
											tooltips.time_series_chart_tooltip,
									},
									{
										label: "Table",
										infoText: tooltips.table_tooltip,
									},
								]}
								defaultValue="Map"
								activeVizIdx={activeVizIdx}
							/>
						</div>
						{activeViz === "FTimeSeries" && FirstReducer !== "receipts_districtwise" &&  (
							<FRadioGroup
								className="viz-view-toggle"
								name="FTimeSeriesVizView"
								titleText="View:"
								onChange={(value, name) =>
									onViewChange(value, name)
								}
								items={[
									{ label: "Gross", id: "gross" },
									{ label: "Net Payment", id: "netPayment" },
									{ label: "Both", id: "gross,netPayment" },
								]}
								valueSelected={activeVizView.FTimeSeriesVizView}
							/>
						)}

						{renderSwitch()}
					</Fragment>
				);
		}
	};

	return (
		<div className="f-content">
			{/* Create this reusable, pass pageID in props */}
			<FPageMeta pageId={howToUseContent[FirstReducer].id} />
			{/* Pass page Title in props */}
			<FPageTitle
				pageTitle={howToUseContent[FirstReducer].label}
				pageDescription={howToUseContent[FirstReducer].content.body}
				showLegend={false}
				monthPicker={
					<FMonthPicker
						availableFinancialYears={[
							{ label: "2015-2016", value: "2015-2016" },
							{ label: "2016-2017", value: "2016-2017" },
							{ label: "2017-2018", value: "2017-2018" },
							{ label: "2018-2019", value: "2018-2019" },
							{ label: "2019-2020", value: "2019-2020" },
							{ label: "2020-2021", value: "2020-2021" },
						]}
						onDateRangeSet={onDateRangeSet}
					/>
				}
			/>
			<div className="data-viz-col exp-districtwise">
				{createDataUIComponent()}
			</div>
			<div
				className={`filter-col-wrapper ${
					filterBarVisibility === true ? "show" : "hide"
				}`}
			>
				<FFilterColumn2
					section={FirstReducer}
					allFiltersData={allFiltersData && allFiltersData}
					filterCompData={filter_comp}
					filtersLoading={filtersLoading}
					activeFilters={DistrictwiseActiveFilters}
					onChange={(e, key) => onFilterChange(e, key)}
					onFilterIconClick={handleFilterBarVisibility}
				/>
			</div>
		</div>
	);
};

// Generic Code at the end

DetailsBoilerPlate.propTypes = {
	districtwise_data: PropTypes.object.isRequired,
	districtwise_filters: PropTypes.object.isRequired,
	getDistrictwiseData: PropTypes.func.isRequired,
	setActiveVizIdx: PropTypes.func.isRequired,
	getDistrictwiseFiltersData: PropTypes.func.isRequired,
	resetActiveFiltersAndDateRange: PropTypes.func.isRequired,
	updateDistrictwiseFilters: PropTypes.func.isRequired,
	updateDistrictwiseOnDateRangeChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
	districtwise_data: state[ownProps.FirstReducer],
	districtwise_filters: state[ownProps.SecondReducer],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	getDistrictwiseData: (
		initData,
		activeFilters,
		dateRange,
		triggeredByDateRangeChange
	) =>
		dispatch(
			actions[ownProps.FirstReducer].getDistrictwiseData(
				initData,
				activeFilters,
				dateRange,
				triggeredByDateRangeChange
			)
		),
	setActiveVizIdx: (e) =>
		dispatch(actions[ownProps.FirstReducer].setActiveVizIdx(e)),
	resetActiveFiltersAndDateRange: () =>
		dispatch(
			actions[ownProps.FirstReducer].resetActiveFiltersAndDateRange()
		),
	getDistrictwiseFiltersData: (allFiltersData, rawFilterDataAllHeads) =>
		dispatch(
			actions[ownProps.SecondReducer].getDistrictwiseFiltersData(
				allFiltersData,
				rawFilterDataAllHeads
			)
		),
	updateDistrictwiseFilters: (
		e,
		key,
		activeFilters,
		allFiltersData,
		rawFilterDataAllHeads
	) =>
		dispatch(
			actions[ownProps.SecondReducer].updateDistrictwiseFilters(
				e,
				key,
				activeFilters,
				allFiltersData,
				rawFilterDataAllHeads
			)
		),
	updateDistrictwiseOnDateRangeChange: (
		initData,
		newDateRange,
		activeFilters
	) =>
		dispatch(
			actions[ownProps.SecondReducer].updateDistrictwiseOnDateRangeChange(
				initData,
				newDateRange,
				activeFilters
			)
		),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsBoilerPlate);
