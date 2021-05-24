import React, { useState, useEffect } from "react";

//Styles
import "./_style.scss";

import { connect } from "react-redux";

//data
import howToUseContent from "../../data/howToUseContent.json";
import Tooltips from "../../utils/tooltips";

import FPageMeta from "../../components/organisms/FPageMeta";
import FPageTitle from "../../components/organisms/FPageTitle";

//Custom components
import FLoading from "../../components/atoms/FLoading";
import FMonthPicker from "../../components/molecules/FMonthPickerUpdated";
import FFilterColumn2 from "../../components/organisms/FFilterColumn2";
import FLegendBar from "../../components/atoms/FLegendBar";
import FProcurementMap from "../../components/dataviz/FProcurementMap";
import FTable from "../../components/dataviz/FTable";

// Custom Content Swticher
import FContentSwitcher from "../../components/molecules/FContentSwitcher";
import DistrictReport from "../../components/organisms/FDistricReport";
import Methodology from "../../components/organisms/FMethodology";

import {
  updateFiltersData,
  updateProcurementsDateRange,
  updateActiveFilters,
  getProcurementsDataTenderAPI,
  getProcurementsDataTenderAPIUpdateFilters,
} from "../../actions/procurements";

import { districtReport } from "../../data/districtReport";
// import procurements from "../../reducers/procurements";

var hp_geojson = JSON.stringify(require("../../data/hp_geojson.json"));

var {
  procurements: procurements_keys,
  procurements_filter_comp,
} = require("../../data/filters_ref.json");

//Name of components to switch between
const vizTypes = ["FMap", "FTable", "FTableSDG"];
const vizTypesData = ["FTableTenders", "FTableAwards"];

const noExpDataYears = ["2016_17", "2020_21"];

const tooltips = Tooltips.procurement_analysis;

const OCPDashboard = ({
  procurements_data: {
    initData,
    mapData,
    tableData: { tableDataHeaders: headers, tableDataRows: rows },
    loading,
    activeFilters,
    allFiltersData,
    dateRange,
    districtReport,
    KPIDistrictTableData: {
      tableDataHeaders: kpiTableHeaders,
      tableDataRows: kpiTableRows,
      tablekpis: tablekpis,
    },
    ocdsTendersData,
    ocdsAwardsData,
    ocdsAwardsDataAPI,
    ocdsTendersDataAPI,
    error,
  },
  updateFiltersData,
  updateProcurementsDateRange,
  updateActiveFilters,
  getProcurementsDataTenderAPI,
  getProcurementsDataTenderAPIUpdateFilters,

  // getProcurementsDataTendersAPI,
}) => {
  const [currentVizType, setCurrentVizType] = useState(vizTypes[0]);
  const switchVizType = (e) => {
    setCurrentVizType(vizTypes[e.index]);
  };
  const [currentVizTypeData, setCurrentVizTypeData] = useState(vizTypesData[0]);
  const switchVizTypeData = (e) => {
    setCurrentVizTypeData(vizTypesData[e.index]);
  };

  //handle filter bar responsiveness
  const [filterBarVisibility, setFilterBarVisibility] = useState(false);
  const handleFilterBarVisibility = () => {
    setFilterBarVisibility(!filterBarVisibility);
  };

  const handleSelectFiscalYear = (e) => {
    let curr_year = e.target.value.split("-").join("_");
    // Need to update this line
    let prev_year = `20${parseInt(e.target.value.split("-")[1]) - 2}_${
      parseInt(e.target.value.split("-")[1]) - 1
    }`;
    console.log("curr prev", curr_year, prev_year);
    // getExpSummaryData(curr_year, prev_year, initData)
  };

  const onDateRangeSet = (newDateRange) => {
    const dateRange = `${newDateRange.from.year}-${newDateRange.to.year}`;
    console.log("testing date ranges ", dateRange);
    updateProcurementsDateRange(dateRange);
    getProcurementsDataTenderAPI(dateRange);
  };

  const onFilterChange = (e, key) => {
    console.log("testing e and key", e, key, procurements_keys);
    let filterIndex = procurements_keys.findIndex((elem) => elem === key);
    console.log(
      filterIndex,
      activeFilters,
      allFiltersData,
      e.selectedItems.value
    );
    // #1 ADD OR REMOVE FILTER ID, depending on if its a selection or deselection
    // if(e.selectedItems.length > 0){ //if at least 1 option is selected,
    //   expDistrictwiseActiveFilters[key] = e.selectedItems.map(selectedItem => {
    //     return selectedItem.id;
    //   })
    // }else{ delete expDistrictwiseActiveFilters[key]; }
    // //#2 remove all child filters from activeFiltersArray : because thats the rule : PARENT FILTER RESETS CHILD FILTERS
    // const currFilterOrderIndex = filterOrderRef.indexOf(key);
    // filterOrderRef.map((filterName,i) => {
    //   if(i > currFilterOrderIndex && expDistrictwiseActiveFilters[filterName] ){
    //     delete expDistrictwiseActiveFilters[filterName];
    //     clearAllSelectedOptions(filterName);
    //   }
    // })
    // getExpDistrictwiseData(initData, expDistrictwiseActiveFilters, dateRange);
    // updateExpDistrictwiseFilters(e, key, expDistrictwiseActiveFilters, allFiltersData, rawFilterDataAllHeads);
    // updateActiveFilters(filterIndex, e.selectedItems.value)

    updateFiltersData(
      filterIndex,
      activeFilters,
      dateRange,
      allFiltersData,
      e.selectedItems.value
    );
    getProcurementsDataTenderAPIUpdateFilters(
      filterIndex,
      activeFilters,
      dateRange,
      allFiltersData,
      e.selectedItems.value
    );
  };
  useEffect(() => {
    // createAllFiltersData()
  }, []);

  const renderUI = () => {
    switch (currentVizType) {
      case "FMap":
        return (
          <>
            <FLegendBar
              vizType="procurement_map"
              data={[
                {
                  key: "Very Low (0.0 - 0.2)",
                  type: "bubble",
                  color: "legend_point_1",
                },
                {
                  key: "Low (0.2 - 0.4)",
                  type: "bubble",
                  color: "legend_point_2",
                },
                {
                  key: "Moderate (0.4 - 0.6)",
                  type: "bubble",
                  color: "legend_point_3",
                },
                {
                  key: "High (0.6 - 0.8)",
                  type: "bubble",
                  color: "legend_point_4",
                },
                {
                  key: "Very High (0.8 - 1.0)",
                  type: "bubble",
                  color: "legend_point_5",
                },
              ]}
              showTitle="District Performance: "
            />
            <div id="fmapOCP">
              <FProcurementMap
                data={mapData}
                showValue={activeFilters["kpi"].val.length > 0}
                initData={initData}
                dateRange={dateRange}
                activeFilters={activeFilters}
                dataPointToMap={"index"}
              />
            </div>
          </>
        );

      case "FTable":
        return (
          <>
            <FLegendBar
              vizType="procurement_map"
              data={[
                {
                  key: "Very Low (0.0 - 0.2)",
                  type: "bubble",
                  color: "legend_point_1",
                },
                {
                  key: "Low (0.2 - 0.4)",
                  type: "bubble",
                  color: "legend_point_2",
                },
                {
                  key: "Moderate (0.4 - 0.6)",
                  type: "bubble",
                  color: "legend_point_3",
                },
                {
                  key: "High (0.6 - 0.8)",
                  type: "bubble",
                  color: "legend_point_4",
                },
                {
                  key: "Very High (0.8 - 1.0)",
                  type: "bubble",
                  color: "legend_point_5",
                },
              ]}
              showTitle="District Performance: "
            />
            <FTable
              rows={kpiTableRows}
              headers={kpiTableHeaders}
              kpis={tablekpis}
              onClickDownloadBtn={(e) => {
                console.log(e);
              }}
              showBar={true}
              activeFilters={activeFilters}
            />
          </>
        );

      case "FTableSDG":
        return (
          <FTable
            rows={rows}
            headers={headers}
            onClickDownloadBtn={(e) => {
              console.log(e);
            }}
            showHeaderTooltip={true}
          />
        );

      default:
        return <div>nothing to display</div>;
    }
  };
  const renderUIData = () => {
    switch (currentVizTypeData) {
      case "FTableTenders":
        return (
          <div className="procurementsDataTable">
            <FTable
              rows={
                ocdsTendersDataAPI.tableDataTenders.rows
                  ? ocdsTendersDataAPI.tableDataTenders.rows
                  : []
              }
              headers={
                ocdsTendersDataAPI.tableDataTenders.headers
                  ? ocdsTendersDataAPI.tableDataTenders.headers
                  : []
              }
              onClickDownloadBtn={(e) => {
                console.log(e);
              }}
              showHeaderTooltip={true}
            />
          </div>
        );
      case "FTableAwards":
        return (
          <div className="procurementsDataTable">
            <FTable
              rows={
                ocdsAwardsDataAPI.tableData.rows
                  ? ocdsAwardsDataAPI.tableData.rows
                  : []
              }
              headers={
                ocdsAwardsDataAPI.tableData.headers
                  ? ocdsAwardsDataAPI.tableData.headers
                  : []
              }
              onClickDownloadBtn={(e) => {
                console.log(e);
              }}
              showHeaderTooltip={true}
            />
          </div>
        );

      default:
        return <div>nothing to display</div>;
    }
  };

  return (
    <div className={`f-content exp-summary-content ocp-dashboard-content`}>
      <FPageMeta pageId="expenditure_summary" />
      <FPageTitle
        pageTitle="Health Procurement Performance Index"
        pageDescription={howToUseContent[5].content.body}
        showLegend={true}
        subTitle={"v0.01 Alpha"}
        monthPicker={
          <FMonthPicker
            availableFinancialYears={[
              { label: "2017-2018", value: "2017-2018" },
              { label: "2018-2019", value: "2018-2019" },
              { label: "2019-2020", value: "2019-2020" },
              { label: "2020-2021", value: "2020-2021" },
            ]}
            disableMonths={true}
            onDateRangeSet={onDateRangeSet}
            hideMonths={true}
          />
        }
      />
      <div className="d-flex flex-row-reverse p-relative">
        <div
          className={`data-viz-col exp-summary procurements ${
            currentVizType === vizTypes[0] ? "timeseries-is-active" : ""
          }`}
        >
          {loading ? (
            <FLoading />
          ) : (
            <>
              <div className="content-switcher-wrapper">
                <FContentSwitcher
                  onChange={switchVizType}
                  options={[
                    {
                      label: "Map",
                      infoText: tooltips.map_chart_tooltip,
                    },
                    {
                      label: "Table",
                      infoText: tooltips.table_tooltip,
                    },
                    {
                      label: "SDG Description",
                      infoText: tooltips.table_tooltip,
                    },
                  ]}
                  defaultValue="Map"
                  activeVizIdx={vizTypes.indexOf(currentVizType)}
                />
              </div>
              {renderUI()}
            </>
          )}
        </div>
        {currentVizType === vizTypes[0] && (
          <div
            className={`filter-col-wrapper ${
              filterBarVisibility === true ? "show" : "hide"
            }`}
          >
            <FFilterColumn2
              section="procurements"
              allFiltersData={allFiltersData && allFiltersData}
              filterCompData={procurements_filter_comp}
              filtersLoading={loading}
              activeFilters={activeFilters}
              className="custom-class-filter-box"
              onChange={(e, key) => onFilterChange(e, key)}
              onFilterIconClick={handleFilterBarVisibility}
            />
          </div>
        )}
      </div>
      <div className="section-wrapper">
        <>
          <div className="content-switcher-wrapper">
            <FContentSwitcher
              onChange={switchVizTypeData}
              options={[
                {
                  label: "Tenders OCDS Data",
                  infoText: tooltips.map_chart_tooltip,
                },
                {
                  label: "Awards OCDS Data",
                  infoText: tooltips.table_tooltip,
                },
              ]}
              activeVizIdx={vizTypesData.indexOf(currentVizTypeData)}
            />
          </div>
          {renderUIData()}
        </>
      </div>

      <DistrictReport districtReport={districtReport} />
      <Methodology />
    </div>
  );
};

const mapStateToProps = (state) => ({
  procurements_data: state.procurements,
});

export default connect(mapStateToProps, {
  updateFiltersData,
  updateProcurementsDateRange,
  updateActiveFilters,
  getProcurementsDataTenderAPI,
  getProcurementsDataTenderAPIUpdateFilters,
})(OCPDashboard);
