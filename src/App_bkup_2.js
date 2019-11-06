import React, { Fragment, useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from "axios";

import MediaQuery from 'react-responsive'

//get idb
import { deleteDB, wrap, unwrap } from 'idb';
import { openDB } from 'idb/with-async-ittr.js';

//from carbon's components
import { Content } from 'carbon-components-react/lib/components/UIShell';

//from our components

import FHeader1 from './components/organisms/FHeader1';
import FHeader2 from './components/organisms/FHeader2';

//from our content
import Home from './content/Home';

import AboutUs from './content/AboutUs';
import ContactUs from './content/ContactUs';

//test comp
import Idb_test from './content/Idb_test';

//dictionary to convert exp_details data to objects
import exp_details_keys from "./dictionary/exp_details_keys.json";

import ExpSummary from './content/ExpSummary';
import ExpDetails from './content/ExpDetails';
import ExpTracker from './content/ExpTracker';

import BudgetHighlights from './content/BudgetHighlights';

import './App.scss';



function App() {

  //set app level state containing raw data.
  const [expData, setExpData] = useState([]);

  //get exp_details_data
  const getExpDataFromAPI = async (api_url_1, api_url_2, api_url_3) => {
  };


  const openIDB = async () => {

    const dbName = 'hp_fiscal_data'
    const storeName = 'exp_data'
    const version = 1 //versions start at 1
    let didUpgrade = false;
    var objectStore;
    var db;

    var request = indexedDB.open(dbName, version);
    request.onerror = function(event) { /*Handle errors.*/ };
    request.onupgradeneeded = function(event) {
      db = event.target.result;
      didUpgrade = true;

      objectStore = db.createObjectStore(storeName, {
        keyPath: "id",
        autoIncrement: true
      });
    };

  console.log("did upgrade? ");
  console.log(didUpgrade);
  //if did upgrade is false, then hydrate expData state var from IDB,
  if(didUpgrade === false){
      console.log("your IDB looks up-to-date. So I'll just fetch data from it and populate your exp_data state var");
      console.log("**fetching data from IDB pending**");
  }else{ //else fetch data from api and put it in IDB, along with hydrating expData state var.
      let expDataToJson = [];
    try {
      console.log("no idb / old version of IDB detected. so I'm going to create / update it");
      console.log("getting data...");
      const res1 = await axios.get("http://13.126.189.78/api/detail_exp_test?start=2018-01-01&end=2018-01-01");
      const res2 = await axios.get("http://13.126.189.78/api/detail_exp_test?start=2018-05-01&end=2018-05-01");
      const res3 = await axios.get("http://13.126.189.78/api/detail_exp_test?start=2018-09-01&end=2018-09-01");
      let resMaster = res1.data.concat(res2.data, res3.data);
      //jsonify data
      resMaster.map((entryAry, i) => {
        const entryObj = {};
        entryAry.map((value, index) => {
          entryObj[exp_details_keys.keys[index]] = value;
        });
        expDataToJson.push(entryObj);
      });

      setExpData(expDataToJson);
      console.log("finished setting up the expData state variable");
      // console.log(resMaster);
    } catch (err) {
      console.log(err);
    }

    // const tx = db.transaction(storeName, 'readwrite')
    // const store = tx.objectStore(storeName)
    //
    // const val = "hello";
    // expDataToJson.map((expObj, i) => {
    //   store.add(expObj, i);
    // })
    // await tx.done;

    // Use transaction oncomplete to make sure the objectStore creation is
    // finished before adding data into it.
    objectStore.transaction.oncomplete = function(event) {
      // Store values in the newly created objectStore.
      var expDataObjectStore = db
        .transaction(storeName, "readwrite")
        .objectStore(storeName);
      expDataToJson.forEach(function(exp_line) {
        expDataObjectStore.add(exp_line);
      });
    };

  }


}

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

    openIDB();

  }, []);

  return (<div>
    <FHeader1/>
    <MediaQuery query="(min-device-width: 768px)">
      <FHeader2/>
    </MediaQuery>

    <Content>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/aboutus" component={ContactUs}/>
        <Route exact path="/contactus" component={AboutUs}/>
        <Route exact path="/expenditure/summary" component={ExpSummary}/>
        <Route exact path="/expenditure/details" render={() => <ExpDetails expData={expData}/>}/>
        <Route exact path="/expenditure/tracker" component={ExpTracker}/>
        <Route exact path="/budget_highlights" component={BudgetHighlights}/>
        <Route exact path="/idb_test" component={Idb_test}/>
      </Switch>
    </Content>
  </div>);
}

export default App;
