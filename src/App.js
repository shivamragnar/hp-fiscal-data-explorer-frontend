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

//initialize all filters
const initExpFilters = { "filters":{} };


function App() {
  //set app level state containing raw data.
  const [expData, setExpData] = useState();
  const [expDataLoading, setExpDataLoading] = useState(true);

  const getData = async (payload) => {

    console.time("Axios Fetch");
    console.log("Axios Fetch Started");

    try {
      const res = await axios.post(
        "http://13.126.189.78/api/detail_exp_month?start=2018-04-01&end=2019-03-31", payload
      );

      console.log(res.data.records);
      var tempExpData = [];
      var highestRecord = 0;
      res.data.records.map((record, i) => {
        var dataObj = {};
        if(i === 0){

          res.data.records.map((record, i) => {
            if(record[0] > highestRecord){
              highestRecord = record[0];
            }
          })
        }
        dataObj.date = monthsOfTheYr[(i+3)%12];
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
    getData(initExpFilters);
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
