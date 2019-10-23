import React, { Component } from "react";


import ReactDOM from 'react-dom';

//custom components
import FBubble from '../../components/dataviz/FBubble';
import FForce from '../../components/dataviz/FForce';
import * as d3 from "d3";

//sample data
var exp_summary_data = require('../../data/exp-summary.json');


class Home extends Component {

  render() {
    return (
      <div>
      <div style={{width:"50%"}}>
        <FBubble  />
      </div>
    </div>
    )
  }
}

export default Home;
