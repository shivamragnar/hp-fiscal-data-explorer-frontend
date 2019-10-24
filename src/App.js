import React from 'react';
import { Route, Switch } from 'react-router-dom';

import MediaQuery from 'react-responsive'


//from carbon's components
import { Content } from 'carbon-components-react/lib/components/UIShell';

//from our components
import FButton from './components/atoms/FButton';
import FHeader1 from './components/organisms/FHeader1';
import FHeader2 from './components/organisms/FHeader2';

//from our content
import Home from './content/Home';

import AboutUs from './content/AboutUs';
import ContactUs from './content/ContactUs';

import ExpSummary from './content/ExpSummary';
import ExpDetails from './content/ExpDetails';
import ExpTracker from './content/ExpTracker';

import * as d3 from "d3";

import './App.scss';

///////////////

const width = 1080;
const height = 250;
const color = d3.scaleOrdinal(d3.schemeCategory10);


const enterNode = (selection) => {
  selection.select('circle')
    .attr("r", 30)
    .style("fill", function (d) { return color(d.name) })


  selection.select('text')
    .attr("dy", ".35em")
    .style("transform", "translateX(-50%,-50%")
};

const updateNode = (selection) => {
  selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

};

const enterLink = (selection) => {
  selection.attr("stroke-width", 2)
    .style("stroke", "yellow")
    .style("opacity", ".2")
};

const updateLink = (selection) => {
  selection
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
};

const updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode)
  selection.selectAll('.link')
    .call(updateLink);
};

////////////////////////////////////////////////////////////////////////////
/////// App component. Hold graph data in state and renders Graph component.
/////// Graph component in turn renders Link and Node components.

//////////////


function App() {
  return (<div>
    <FHeader1/>
    <MediaQuery query="(min-device-width: 768px)">
      <FHeader2/>
    </MediaQuery>

    <Content>
      <Switch>
        <Route exact="exact" path="/" component={Home}/>
        <Route exact="exact" path="/aboutus" component={ContactUs}/>
        <Route exact="exact" path="/contactus" component={AboutUs}/>
        <Route exact="exact" path="/expenditure/summary" component={ExpSummary}/>
        <Route exact="exact" path="/expenditure/details" component={ExpDetails}/>
        <Route exact="exact" path="/expenditure/tracker" component={ExpTracker}/>
      </Switch>
    </Content>
  </div>);
}

export default App;
