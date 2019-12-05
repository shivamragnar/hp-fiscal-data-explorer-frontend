import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";

import MediaQuery from "react-responsive";

//get idb
import { deleteDB, wrap, unwrap } from "idb";
import { openDB } from "idb/with-async-ittr.js";

//from carbon's components
import { Content } from "carbon-components-react/lib/components/UIShell";

//from our components

import FHeader1 from "./components/organisms/FHeader1";
import FHeader2 from "./components/organisms/FHeader2";

//from our content
import Home from "./content/Home";

import AboutUs from "./content/AboutUs";
import ContactUs from "./content/ContactUs";

//test comp
import Idb_test from "./content/Idb_test";

//dictionary to convert exp_details data to objects
import exp_details_keys from "./dictionary/exp_details_keys.json";

import ExpSummary from "./content/ExpSummary";
import ExpDetails from "./content/ExpDetails";
import ExpTracker from "./content/ExpTracker";

import BudgetHighlights from "./content/BudgetHighlights";

import "./App.scss";

var monthsOfTheYr = require("./data/monthsOfTheYr.json");

//initialize all filters with init value
const initExpFilters = { "filters":{} };
const initDateFrom = "2018-01-01";
const initDateTo = "2018-03-31";


function App() {
  //set app level state containing raw data.
  const [expData, setExpData] = useState();
  const [expDataLoading, setExpDataLoading] = useState(true);

  const getData = async (payload, dateFrom, dateTo) => {

    console.time("Axios Fetch");
    console.log("Axios Fetch Started");

    //calc actual number of days between 2 dates
    var dateFromTime = new Date(dateFrom).getTime();
    var dateToTime = new Date(dateTo).getTime();
    var daysDiff = ((dateToTime - dateFromTime) / (1000 * 3600 * 24)) + 2; //this calcs every day BETWEEN the given 2 dates. So add '2' to correct this
    console.log("daysDiff: " + daysDiff);

    const month_week = daysDiff > 125 ? "month" : "week"; //give month-wise breakdown if range > 125 days
    const fromMonthIndex = parseInt(initDateFrom.split('-')[1])-1;
    console.log("first month:" + fromMonthIndex);

    try {
      const config = { headers: { "content-type": "application/json" } };
      const res = await axios.post(
        `http://13.126.189.78/api/detail_exp_${month_week}?start=${dateFrom}&end=${dateTo}`, payload, config

      );

      console.log(res.data.records);
      var tempExpData = [];
      var highestRecord = 0;
      res.data.records.map((record, i) => {
        var dataObj = {};
        if(i === 0){ //first we identify highest record to define the 'height of mark' appropriately
          res.data.records.map((record, i) => {
            if(record[0] > highestRecord){
              highestRecord = record[0];
            }
          })
        }
        dataObj.date = month_week === "month" ? monthsOfTheYr[(i+fromMonthIndex)%12]+"_"+i : "w_"+i;
        dataObj.sanction = Math.round(record[0]*100)/100;
        dataObj.addition = Math.round(record[1]*100)/100;
        dataObj.savings = Math.round(record[2]*100)/100;
        dataObj.revised = Math.round(record[3]*100)/100;
        dataObj.mark = Math.round(highestRecord/250);
        tempExpData.push(dataObj);
      })


      setExpData(tempExpData);
      setExpDataLoading(false);

    } catch (err) { console.log(err); }

    console.timeEnd("Axios Fetch");
  };

  useEffect(() => {
    getData(initExpFilters, initDateFrom, initDateTo );
  }, []);

  console.log("expData:");
  console.log(expData);

  return (
    <div>
      <FHeader1 />
      <MediaQuery query="(min-device-width: 768px)">
        <FHeader2 />
      </MediaQuery>

      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/expenditure/summary" component={ExpSummary} />
          <Route
            exact
            path="/expenditure/details"
            render={() => (
              <ExpDetails
                expData={expData}
                expDataLoading={expDataLoading}
                getData={getData}
                initExpFilters={initExpFilters}
                initDateFrom={initDateFrom}
                initDateTo={initDateTo}
              />
            )}
          />
          <Route exact path="/expenditure/tracker" component={ExpTracker} />
          <Route exact path="/budget_highlights" component={BudgetHighlights} />
          <Route exact path="/idb_test" component={Idb_test} />
        </Switch>
      </Content>
    </div>
  );
}

export default App;
