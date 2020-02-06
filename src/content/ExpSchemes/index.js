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


//actions
import { getExpSchemesData }  from '../../actions/exp_schemes';
import { getExpSchemesFiltersData, updateExpSchemesFilters, updateSchemesOnDateRangeChange }  from '../../actions/exp_schemes_filters';

var { exp_schemes : filterOrderRef, schemes_filter_comp } = require("../../data/filters_ref.json");

//Name of components to switch between
const vizTypes = ["FMap", "FBarChart", "FTimeSeries", "FTable"];

const ExpSchemes = ({
  exp_schemes : {
    data : {
      mapData,
      barChrtData : { data: barChrtData },
      lineChrtData : { data: lineChrtData, xLabelVals, xLabelFormat },
      tableData : { headers, rows }
    },
    loading,
    activeFilters,
    dateRange
  },
  exp_schemes_filters : { allFiltersData, rawFilterDataAllHeads, loading : filtersLoading },
  getExpSchemesData,
  getExpSchemesFiltersData,
  updateSchemesOnDateRangeChange,
  updateExpSchemesFilters }) => {

  const [currentVizType, setCurrentVizType] = useState(vizTypes[0]);
	const switchVizType = (e) => { setCurrentVizType(vizTypes[e]); }

  const [activeVizView, setActiveVizView] = useState("gross");

  useEffect(() => {
    getExpSchemesData(activeFilters, dateRange);
    getExpSchemesFiltersData(allFiltersData, rawFilterDataAllHeads);

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
    getExpSchemesData(activeFilters, dateRange);
    updateExpSchemesFilters(e, activeFilters, allFiltersData, rawFilterDataAllHeads);
	}


  const onDateRangeSet = (newDateRange) => {
		updateSchemesOnDateRangeChange(newDateRange, activeFilters);
	}


  const renderSwitch = () => {
    switch (currentVizType) {
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
            <ContentSwitcher onChange={switchVizType} selectedIndex={vizTypes.indexOf(currentVizType)} >
              <Switch  text="Map" />
              <Switch  text="Bar Chart" />
              <Switch  text="Time Series" />
              <Switch  text="Table" />
            </ContentSwitcher>
					</div>
          { (currentVizType === 'FTimeSeries' || currentVizType === 'FMap') &&
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
        pageTitle="Schemes"
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
          filterCompData = {schemes_filter_comp}
          filtersLoading = {filtersLoading}
          activeFilters = {activeFilters}
          onChange = {(e, key) => onFilterChange(e, key)}
          />
      </div>
    </div>
  )

}

ExpSchemes.propTypes ={
  exp_schemes : PropTypes.object.isRequired,
  exp_schemes_filters : PropTypes.object.isRequired,
  getExpSchemesData : PropTypes.func.isRequired,
  getExpSchemesFiltersData : PropTypes.func.isRequired,
  updateExpSchemesFilters : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  exp_schemes : state.exp_schemes,
  exp_schemes_filters : state.exp_schemes_filters
})

export default connect(
  mapStateToProps,
  { getExpSchemesData,
    getExpSchemesFiltersData,
    updateSchemesOnDateRangeChange,
    updateExpSchemesFilters
  }
)(ExpSchemes);
