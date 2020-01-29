import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
//redux
import { connect } from 'react-redux';

//carbon components
import { ContentSwitcher, Switch } from 'carbon-components-react';
import { MultiSelect } from 'carbon-components-react';

//custom components
import FLoading from '../../components/atoms/FLoading';
import FPageTitle from '../../components/organisms/FPageTitle';
import FMonthPicker from '../../components/molecules/FMonthPicker';

import FMap from '../../components/dataviz/FMap';
import FBarChart from '../../components/dataviz/FBarChart';
import FTimeSeries from '../../components/dataviz/FTimeSeries';
import FTable from '../../components/dataviz/FTable';

import FRadioGroup from '../../components/molecules/FRadioGroup';

import FFilterColumn2 from '../../components/organisms/FFilterColumn2';

import FTooltipDistricts from '../../components/atoms/FTooltipDistricts';

//actions
import { getExpDistrictwiseData, setActiveVizIdx }  from '../../actions/exp_districtwise';
import { getExpDistrictwiseFiltersData, updateExpDistrictwiseFilters, updateDistrictwiseOnDateRangeChange }  from '../../actions/exp_districtwise_filters';

var { exp_districtwise : filterOrderRef, districtwise_filter_comp } = require("../../data/filters_ref.json");

const sampleDataBar = [
  { month: "Jan", sanction: 3000, revised: 2500 },
  { month: "Feb", sanction: 3000, revised: 2500 },
  { month: "Mar", sanction: 3000, revised: 2500 },
  { month: "Apr", sanction: 3000, revised: 2500 },
  { month: "May", sanction: 3000, revised: 2500 },
  { month: "Jun", sanction: 3000, revised: 2500 },
  { month: "Jul", sanction: 3000, revised: 2500 },
  { month: "Aug", sanction: 3000, revised: 2500 },
  { month: "Sep", sanction: 3000, revised: 2500 },
  { month: "Oct", sanction: 3000, revised: 2500 },
  { month: "Nov", sanction: 3000, revised: 2500 },
  { month: "Dec", sanction: 3000, revised: 2500 }
]

//Name of components to switch between
const vizTypes = ["FMap", "FBarChart", "FTimeSeries", "FTable"];

const props = {
  FBarChart: {
    data: sampleDataBar,
    dataToX: 'month',
    dataPoints: ['sanction', 'revised'],

  }
}

const ExpDistrictwise = ({
  exp_districtwise : {
    data : {
      mapData,
      barChrtData : { data: barChrtData },
      lineChrtData : { data: lineChrtData, xLabelVals, xLabelFormat },
      tableData : { headers, rows }
    },
    loading,
    activeVizIdx,
    activeFilters,
    dateRange
  },
  exp_districtwise_filters : { allFiltersData, rawFilterDataAllHeads, loading : filtersLoading },
  getExpDistrictwiseData,
  setActiveVizIdx,
  getExpDistrictwiseFiltersData,
  updateDistrictwiseOnDateRangeChange,
  updateExpDistrictwiseFilters }) => {

  const activeViz = vizTypes[activeVizIdx];
  console.log("MAPDATA!");
  console.log(mapData);

  const switchActiveViz = (e) => { setActiveVizIdx(e) };
  // const [activeViz, setActiveViz] = useState(vizTypes[0]);
  const [activeVizView, setActiveVizView] = useState("gross");



  useEffect(() => {
    getExpDistrictwiseData(activeFilters, dateRange);
    getExpDistrictwiseFiltersData(allFiltersData, rawFilterDataAllHeads);

  }, []);

  const clearAllChildFilters = (filterName) => {
    document
      .querySelectorAll(`.f-${filterName}-multiselect .bx--list-box__selection--multi`)
      .forEach(e => e.click());
  }

  const onViewChange = (value, name) => {
    setActiveVizView(value);
  }

  const onFilterChange = (e, key) => {
    //if at least 1 option is selected,
    if(e.selectedItems.length > 0){
      activeFilters[key] = e.selectedItems.map(selectedItem => {
        return selectedItem.id;
      })
    }else{ delete activeFilters[key]; }
    //remove all child filters from activeFiltersArray
    const currFilterOrderIndex = filterOrderRef.indexOf(key);
    filterOrderRef.map((filterName,i) => {
      if(i > currFilterOrderIndex && activeFilters[filterName] ){
        delete activeFilters[filterName];
        clearAllChildFilters(filterName);
      }
    })

    console.log("activeFilters");
    console.log(activeFilters);
    getExpDistrictwiseData(activeFilters, dateRange);
    updateExpDistrictwiseFilters(e, activeFilters, allFiltersData, rawFilterDataAllHeads);
	}


  const onDateRangeSet = (newDateRange) => {
		updateDistrictwiseOnDateRangeChange(newDateRange, activeFilters);
	}



  const renderSwitch = () => {
    switch (activeViz) {
      case 'FMap':
      return <div id="fmap">
              <FMap
                data={mapData}
                dataPointToMap={activeVizView}
                />
             </div>;

      case 'FBarChart':
      return <FBarChart
              data={barChrtData}
              dataToX="districtName"
              dataPoints={["gross", "netPayment"]}
              barColors={["black", "darkGrey"]}
              xLabelVals={xLabelVals}
              yAxisLabel="total amount in rupees"
              xAxisLabel="districts"
              tooltip={<FTooltipDistricts activeDataPoint={["gross", "netPayment"]}/>}
              />;

      case 'FTimeSeries':
      return  <Fragment>
                <FTimeSeries
                  dataToX="date"
                  dataToY={activeVizView}
                  data={lineChrtData}
                  dataAryName="datewiseExp"
                  xLabelVals={xLabelVals}
  								xLabelFormat={xLabelFormat}
                  tooltip={<FTooltipDistricts vizType={vizTypes[activeVizIdx]} activeDataPoint={[activeVizView]}/>}
                />
              </Fragment>

      case 'FTable':
      return <FTable
              rows={rows}
              headers={headers}
              onClickDownloadBtn={(e) => { console.log(e)}}
              />

      default:
      return <div>nothing to display</div>;
    }
  }

  const createDataUIComponent = () => {
		if(loading === true){
			return <FLoading />;
		}else{
			return (
				<Fragment>
					<div className="content-switcher-wrapper">
            <ContentSwitcher onChange={switchActiveViz} selectedIndex={activeVizIdx} >
              <Switch  text="Map" />
              <Switch  text="Bar Chart" />
              <Switch  text="Time Series" />
              <Switch  text="Table" />
            </ContentSwitcher>
					</div>
          { (activeViz === 'FTimeSeries' || activeViz === 'FMap') &&
            <FRadioGroup
              className = "viz-view-toggle"
              name = "gross_netPayment"
              titleText = "View:"
              onChange = {(value, name) => onViewChange(value, name)}
              items = {[
                { label : "Gross", id : "gross" },
                { label : "Net Payment", id : "netPayment" }
              ]}
              valueSelected = "gross"
            />
          }
					{ renderSwitch() }
				</Fragment>
			)
		}
	}

  return (
    <div className="f-content">
      <FPageTitle
        pageTitle="Expenditure | District Comparison"
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
      <div className="data-viz-col exp-districtwise">
        {createDataUIComponent()}
      </div>
      <div className="filter-col-wrapper">
        <FFilterColumn2
          allFiltersData = {allFiltersData && allFiltersData}
          filterCompData = {districtwise_filter_comp}
          filtersLoading = {filtersLoading}
          activeFilters = {activeFilters}
          onChange = {(e, key) => onFilterChange(e, key)}
          />
      </div>
    </div>
  )

}

ExpDistrictwise.propTypes ={
  exp_districtwise : PropTypes.object.isRequired,
  exp_districtwise_filters : PropTypes.object.isRequired,
  getExpDistrictwiseData : PropTypes.func.isRequired,
  setActiveVizIdx : PropTypes.func.isRequired,
  getExpDistrictwiseFiltersData : PropTypes.func.isRequired,
  updateExpDistrictwiseFilters : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  exp_districtwise : state.exp_districtwise,
  exp_districtwise_filters : state.exp_districtwise_filters
})

export default connect(
  mapStateToProps,
  { getExpDistrictwiseData,
    setActiveVizIdx,
    getExpDistrictwiseFiltersData,
    updateDistrictwiseOnDateRangeChange,
    updateExpDistrictwiseFilters
  }
)(ExpDistrictwise);
