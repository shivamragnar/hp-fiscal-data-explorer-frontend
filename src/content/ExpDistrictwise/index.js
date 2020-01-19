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

//actions
import { getExpDistrictwiseData }  from '../../actions/exp_districtwise';
import { getExpDistrictwiseFiltersData, updateExpDistrictwiseFilters }  from '../../actions/exp_districtwise_filters';

var { exp_districtwise : filterOrderRef } = require("../../data/filters_ref.json");

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
  FMap: null,
  FBarChart: {
    data: sampleDataBar,
    dataToX: 'month',
    dataPoints: ['sanction', 'revised'],

  }
}

const ExpDistrictwise = ({
  exp_districtwise : {
    data : {
      barChrtData : { data: barChrtData , xLabelVals, xLabelFormat },
      lineChrtData : { data: lineChrtData },
      tableData : { headers, rows }
    },
    loading,
    activeFilters,
    dateRange
  },
  exp_districtwise_filters : { allFiltersData, rawFilterDataAllHeads, loading : filtersLoading },
  getExpDistrictwiseData,
  getExpDistrictwiseFiltersData,
  updateExpDistrictwiseFilters }) => {


  const [activeViz, setActiveViz] = useState(vizTypes[0]);
  const switchActiveViz = (e) => { setActiveViz(vizTypes[e]) };


  useEffect(() => {
    getExpDistrictwiseData(activeFilters, dateRange);
    getExpDistrictwiseFiltersData(allFiltersData, rawFilterDataAllHeads);

  }, []);

  const clearAllChildFilters = (filterName) => {
    document
      .querySelectorAll(`.f-${filterName}-multiselect .bx--list-box__selection--multi`)
      .forEach(e => e.click());
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
        delete(activeFilters[filterName]);
        clearAllChildFilters(filterName);
      }
    })



    console.log("activeFilters");
    console.log(activeFilters);
    getExpDistrictwiseData(activeFilters, dateRange);
    updateExpDistrictwiseFilters(e, activeFilters, allFiltersData, rawFilterDataAllHeads);
	}

  const renderSwitch = () => {
    switch (activeViz) {
      case 'FMap':
      return <div id="fmap"><FMap {...props.FMap}/></div>;

      case 'FBarChart':
      return <FBarChart
              data={barChrtData}
              dataToX="districtName"
              dataPoints={["gross", "netPayment"]}
              xLabelVals={xLabelVals}
              xLabelFormat={xLabelFormat}
              />;

      case 'FTimeSeries':
      return <div>this is the timeseries graph</div>

      case 'FTable':
      return <div>this is the table</div>

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
            <ContentSwitcher onChange={switchActiveViz} >
              <Switch  text="Map" />
              <Switch  text="Bar Chart" />
              <Switch  text="Time Series" />
              <Switch  text="Table" />
            </ContentSwitcher>
					</div>
					{ renderSwitch() }
				</Fragment>
			)
		}
	}

  return (
    <div className="f-content">
      <FPageTitle
        pageTitle="District-wise Expenditure Details"
        showLegend={false}
        monthPicker={
          <FMonthPicker
            defaultSelect = {{
              years:[ parseInt(dateRange[0].split('-')[0]), parseInt(dateRange[1].split('-')[0]) ],
              months:[ parseInt(dateRange[0].split('-')[1]), parseInt(dateRange[1].split('-')[1]) ] }}
            dateRange = {{years:[2018, 2019], months:[4, 3]}}
          />
        }
        />
      <div className="data-viz-col exp-districtwise">
        {createDataUIComponent()}
      </div>
      <div className="filter-col-wrapper">
        <div className="filter-col">
          <div className="filter-col--ops">
            <MultiSelect
              className={`f-${allFiltersData[0] && allFiltersData[0].key}-multiselect`}
              titleText = "District"
              disabled = {filtersLoading}
              useTitleInItem={false}
              label={filtersLoading ? "Loading..." : activeFilters[allFiltersData[0].key] ? activeFilters[allFiltersData[0].key].join(", ") : "All"}
              invalid={false}
              invalidText="Invalid Selection"
              onChange={(e) => onFilterChange(e, allFiltersData[0] && allFiltersData[0].key  )}
              items={allFiltersData[0] && allFiltersData[0].val}
              />
          </div>

          <div className="filter-col--ops">
            <MultiSelect
              className={`f-${allFiltersData[1] && allFiltersData[1].key}-multiselect`}
              titleText = "Treasury Code"
              disabled = {filtersLoading}
              useTitleInItem={false}
              label={filtersLoading ? "Loading..." : activeFilters[allFiltersData[1].key] ? activeFilters[allFiltersData[1].key].join(", ") : "All"}
              invalid={false}
              invalidText="Invalid Selection"
              onChange={(e) => onFilterChange(e, allFiltersData[1] && allFiltersData[1].key  )}
              items={allFiltersData[1] && allFiltersData[1].val}
              />
          </div>
          <div className="filter-col--ops">
            <MultiSelect
              className={`f-${allFiltersData[2] && allFiltersData[2].key}-multiselect`}
              titleText = "DDO Code"
              disabled = {filtersLoading}
              useTitleInItem={false}
              label={filtersLoading ? "Loading..." : activeFilters[allFiltersData[2].key] ? activeFilters[allFiltersData[2].key].join(", ") : "All"}
              invalid={false}
              invalidText="Invalid Selection"
              onChange={(e) => onFilterChange(e, allFiltersData[2] && allFiltersData[2].key  )}
              items={allFiltersData[2] && allFiltersData[2].val}
              />
          </div>
          <div className="filter-col--ops">
            <MultiSelect
              className={`f-${allFiltersData[3] && allFiltersData[3].key}-multiselect`}
              titleText = "Demand"
              disabled = {filtersLoading}
              useTitleInItem={false}
              label={filtersLoading ? "Loading..." : activeFilters[allFiltersData[3].key] ? activeFilters[allFiltersData[3].key].join(", ") : "All"}
              invalid={false}
              invalidText="Invalid Selection"
              onChange={(e) => onFilterChange(e, allFiltersData[3] && allFiltersData[3].key  )}
              items={allFiltersData[3] && allFiltersData[3].val}
              />
          </div>
        </div>
      </div>
    </div>
  )

}

ExpDistrictwise.propTypes ={
  exp_districtwise : PropTypes.object.isRequired,
  exp_districtwise_filters : PropTypes.object.isRequired,
  getExpDistrictwiseData : PropTypes.func.isRequired,
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
    getExpDistrictwiseFiltersData,
    updateExpDistrictwiseFilters
  }
)(ExpDistrictwise);
