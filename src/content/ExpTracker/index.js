import React, {
  Component
} from "react";
import {Content} from 'carbon-components-react/lib/components/UIShell';
import {ContentSwitcher, Switch} from 'carbon-components-react';
import FMap from '../../datavizcomps/FMap';
import FBarChart from '../../datavizcomps/FBarChart';

const sampleDataBar = [
  {month: "Jan", sanction: 3000, revised: 2500},
  {month: "Feb", sanction: 3000, revised: 2500},
  {month: "Mar", sanction: 3000, revised: 2500},
  {month: "Apr", sanction: 3000, revised: 2500},
  {month: "May", sanction: 3000, revised: 2500},
  {month: "Jun", sanction: 3000, revised: 2500},
  {month: "Jul", sanction: 3000, revised: 2500},
  {month: "Aug", sanction: 3000, revised: 2500},
  {month: "Sep", sanction: 3000, revised: 2500},
  {month: "Oct", sanction: 3000, revised: 2500},
  {month: "Nov", sanction: 3000, revised: 2500},
  {month: "Dec", sanction: 3000, revised: 2500}
]

//Name of components to switch between
const sec1VizTypes = ["FMap", "FBarChart"];

const props = {
  FMap: null,
  FBarChart: {
    data : sampleDataBar,
    dataToX : 'month',
    dataPoints : ['sanction','revised'],
    yLabelFormat : [""," L INR",1/1000]
  }
}

class ExpTracker extends Component {

  constructor( props ) {
    super( props )
    this.state = {currentSec1VizType: sec1VizTypes[0]};
    this.switchSec1VizType = this.switchSec1VizType.bind( this );
  }

  switchSec1VizType(e) {
    this.setState({ currentSec1VizType: sec1VizTypes[e] })
  }

  render() {
    var currentSec1VizComp;
    this.state.currentSec1VizType === "FMap" ?
      currentSec1VizComp = <div id="mapid"><FMap {...props.FMap}/></div> :
      currentSec1VizComp = <FBarChart {...props.FBarChart}/>;

    return (
      <div>
        <Content>
          <div style={{display: "flex"}}>
            <ContentSwitcher onChange={this.switchSec1VizType} >
              <Switch  text="Map" />
              <Switch  text="Bar Chart" />
            </ContentSwitcher>
          </div>
          {currentSec1VizComp}
        </Content>
      </div>
    )
  }
}
export default ExpTracker;
