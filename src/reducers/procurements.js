import {
  GET_PROCUREMENTS_DATA,
  SET_PROCUREMENTS_DATA_LOADING,
  PROCUREMENTS_DATA_ERROR,
  UPDATE_DATA_WITH_FILTERS,
  UPDATE_DATERANGE,
  GET_PROCUREMENTS_DATA_API,
  SET_PROCUREMENTS_DATA_LOADING_API,
  EXP_PROCUREMENTS_DATA_ERROR_API,
  GET_PROCUREMENTS_DATA_AWARDS_API,
  SET_PROCUREMENTS_DATA_AWARDS_LOADING_API,
  EXP_PROCUREMENTS_DATA_AWARDS_ERROR_API,
} from "../actions/types";

const initialState = {
  initData: {},
  mapData: {},
  tableData: {},
  dateRange: "2020-2021",
  activeFilters: {},
  allFiltersData: [],
  districtReport: {},
  loading: true,
  KPIDistrictTableData: {},
  error: {},
  ocdsTendersData: {},
  ocdsAwardsData: {},
  ocdsTendersDataAPI: {
    initData: {},
    tableDataTenders: {},
  },
  ocdsAwardsDataAPI: {
    initData: {},
    tableData: {},
  },
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROCUREMENTS_DATA:
      return {
        ...state,
        initData: payload.initData,
        mapData: payload.mapData,
        tableData: payload.tableData,
        activeFilters: payload.activeFilters,
        allFiltersData: payload.allFiltersData,
        dateRange: payload.dateRange,
        districtReport: payload.districtReport,
        KPIDistrictTableData: payload.KPIDistrictTableData,
        ocdsTendersData: payload.ocdsTendersData,
        ocdsAwardsData: payload.ocdsAwardsData,
        // ocdsTendersDataAPI: payload.ocdsTendersDataAPI,
        // ocdsAwardsDataAPI: payload.ocdsAwardsDataAPI,
        loading: false,
      };
    case SET_PROCUREMENTS_DATA_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PROCUREMENTS_DATA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_DATA_WITH_FILTERS:
      return {
        ...state,
        mapData: payload.mapData,
        tableData: payload.tableData,
        activeFilters: payload.activeFilters,
        allFiltersData: payload.allFiltersData,
        dateRange: payload.dateRange,
        loading: payload.loading,
      };
    case UPDATE_DATERANGE:
      return {
        ...state,
        mapData: payload.mapData,
        tableData: payload.tableData,
        activeFilters: payload.activeFilters,
        allFiltersData: payload.allFiltersData,
        KPIDistrictTableData: payload.KPIDistrictTableData,
        dateRange: payload.dateRange,
        loading: payload.loading,
      };
    case GET_PROCUREMENTS_DATA_API:
      return {
        ...state,
        ocdsTendersDataAPI: {
          initData: payload.initData,
          tableDataTenders: payload.tableDataTenders,
        },
        loading: false,
      };
    case SET_PROCUREMENTS_DATA_LOADING_API:
      return {
        ...state,
        loading: true,
      };
    case EXP_PROCUREMENTS_DATA_ERROR_API:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_PROCUREMENTS_DATA_AWARDS_API:
      return {
        ...state,
        ocdsAwardsDataAPI: {
          initData: payload.initData,
          tableData: payload.tableData,
        },
        loading: false,
      };
    case SET_PROCUREMENTS_DATA_AWARDS_LOADING_API:
      return {
        ...state,
        loading: true,
      };
    case EXP_PROCUREMENTS_DATA_AWARDS_ERROR_API:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
