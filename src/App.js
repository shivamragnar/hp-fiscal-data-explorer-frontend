import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types"
import { Route, Switch } from "react-router-dom";
import axios from "axios";

//redux
import { connect } from "react-redux";

//actions
import { getExpDemandwiseData } from "./actions/exp_demandwise.js"
import { getExpDemandwiseFiltersData } from './actions/exp_demandwise_filters';

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

//dictionary to convert exp_details data to objects
import exp_details_keys from "./dictionary/exp_details_keys.json";

import ExpSummary from "./content/ExpSummary";
import ExpDetails from "./content/ExpDetails";
import ExpTracker from "./content/ExpTracker";
import Receipts from "./content/Receipts";

import BudgetHighlights from "./content/BudgetHighlights";

import "./App.scss";





const App = ({ exp_demandwise : {
								  activeFilters : initExpFilters,
								  dateRange : initDateRange
							 }, getExpDemandwiseData,
               getExpDemandwiseFiltersData }) => {

 // const initExpFilters = { "filters":{} };
 // const initDateFrom = "2018-04-01";
 // const initDateTo = "2019-03-31";

 useEffect(() => {
   getExpDemandwiseData(initExpFilters, [initDateRange[0], initDateRange[1]]);
   getExpDemandwiseFiltersData();
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
            <Route exact path="/expenditure/details" component={ExpDetails} />
            <Route exact path="/expenditure/tracker" component={ExpTracker} />
            <Route exact path="/receipts" component={Receipts} />
            <Route exact path="/budget_highlights" component={BudgetHighlights} />
          </Switch>
        </Content>
      </div>
  );
}

App.propTypes = {
  exp_demandwise : PropTypes.object.isRequired,
  getExpDemandwiseData : PropTypes.func.isRequired,
  getExpDemandwiseFiltersData : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  exp_demandwise : state.exp_demandwise
})

export default connect(mapStateToProps, { getExpDemandwiseData, getExpDemandwiseFiltersData })(App);
