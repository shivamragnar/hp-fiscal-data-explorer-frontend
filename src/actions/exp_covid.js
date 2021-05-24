import axios from "axios";
import React from "react";

//redux dispatchers
import {
  GET_EXP_COVID_DATA,
  SET_DATA_LOADING_EXP_COVID,
  EXP_COVID_DATA_ERROR,
} from "./types";

export const getExpCovidData = () => async (dispatch) => {
  try {
    const tableData = { headers: [], rows: [] };

    //0 SET LOADING TO TRUE
    dispatch({ type: SET_DATA_LOADING_EXP_COVID, payload: {} });

    //1 PREP AND MAKE API CALL
    const res = await axios.get(
      `https://hpback.openbudgetsindia.org/api/covid_summary`
    );

    const comp = (
      <>
        <div>Name of Department/</div>
        <div>District/</div>
        <div>Organisation</div>
      </>
    );
    //3 PREP DATA FOR TABLE
    tableData.headers.push(
      { key: "name_of_department_distrits_organisation", header: comp },
      { key: "Date", header: "Date of Sanction" },
      { key: "Funds_Sanctioned", header: "Fund Sanctioned" },
      { key: "Funds_Sanctioned_From", header: "Funds Sanctioned From" },
      { key: "Purpose", header: "Purpose" }
    );

    res.data.records["Date"].map((d, i) => {
      tableData.rows.push({
        id: i + 5,
        name_of_department_distrits_organisation:
          res.data.records["name_of_department_distrits_organisation"][i],
        Date: res.data.records["Date"][i],
        Funds_Sanctioned: res.data.records["Funds_Sanctioned"][
          i
        ].toLocaleString("en-IN"),
        Funds_Sanctioned_From: res.data.records["Funds_Sanctioned_From"][i],
        Purpose: res.data.records["Purpose"][i],
      });
    });

    console.log("COVIIIIDD Data Table Format", tableData);

    dispatch({
      type: GET_EXP_COVID_DATA,
      payload: {
        initData: res.data.records ? res.data.records : [],
        tableData: tableData,
      },
    });
  } catch (err) {
    dispatch({
      type: EXP_COVID_DATA_ERROR,
      payload: {
        status: err,
      },
    });
  }
};
