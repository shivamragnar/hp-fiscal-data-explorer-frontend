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

function App() {
  //set app level state containing raw data.
  const [expData, setExpData] = useState([]);

  const [apiDataLoading, setApiDataLoading] = useState(true);

  const getData = async () => {
    console.time("Axios Fetch");
    console.log("Axios Fetch Started");

    let expDataToJson = [];
    try {
      const res1 = await axios.get(
        "http://13.126.189.78/api/detail_exp_test?start=2018-03-01&end=2018-03-01"
      );
      const res2 = await axios.get(
        "http://13.126.189.78/api/detail_exp_test?start=2018-04-01&end=2018-04-01"
      );
      const res3 = await axios.get(
        "http://13.126.189.78/api/detail_exp_test?start=2018-05-01&end=2018-05-01"
      );
      const res4 = await axios.get(
        "http://13.126.189.78/api/detail_exp_test?start=2018-06-01&end=2018-06-01"
      );
      let resMaster = res1.data.concat(res2.data, res3.data, res4.data);
      //jsonify data
      resMaster.map((entryAry, i) => {
        const entryObj = {};
        entryAry.map((value, index) => {
          entryObj[exp_details_keys.keys[index]] = value;
        });
        expDataToJson.push(entryObj);
      });

      setExpData(expDataToJson);
      setApiDataLoading(false);
    } catch (err) {
      console.log(err);
    }

    console.timeEnd("Axios Fetch");
  };

  useEffect(() => {
    // getData(
    //   "http://13.126.189.78/api/detail_exp_test?start=2018-01-01&end=2018-04-30",
    //   "http://13.126.189.78/api/detail_exp_test?start=2018-05-01&end=2018-08-31",
    //   "http://13.126.189.78/api/detail_exp_test?start=2018-09-01&end=2018-12-31"
    // );

    // getExpData(
    //   "http://13.126.189.78/api/detail_exp_test?start=2018-01-01&end=2018-01-01",
    //   "http://13.126.189.78/api/detail_exp_test?start=2018-05-01&end=2018-05-01",
    //   "http://13.126.189.78/api/detail_exp_test?start=2018-09-01&end=2018-09-01"
    // );

    getData();
  }, []);

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
              <ExpDetails expData={expData} apiDataLoading={apiDataLoading} />
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
