import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MediaQuery from 'react-responsive'


//from carbon's components
import { Content } from 'carbon-components-react/lib/components/UIShell';

//from our components

import FHeader1 from './components/organisms/FHeader1';
import FHeader2 from './components/organisms/FHeader2';

//from our content
import Home from './content/Home';

import AboutUs from './content/AboutUs';
import ContactUs from './content/ContactUs';

import ExpSummary from './content/ExpSummary';
import ExpDetails from './content/ExpDetails';
import ExpTracker from './content/ExpTracker';

import './App.scss';


function App() {
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
        <Route exact path="/expenditure/details" component={ExpDetails}/>
        <Route exact path="/expenditure/tracker" component={ExpTracker}/>
      </Switch>
    </Content>
  </div>);
}

export default App;
