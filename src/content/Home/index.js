import React, { Component } from "react";


import ReactDOM from 'react-dom';

//custom components

import FForce_col from '../../components/dataviz/FForce_col';
import * as d3 from "d3";

//sample data
var exp_summary_data = require('../../data/exp-summary.json');


class Home extends Component {

  constructor(props) {
		super(props);

    var nodes = [];
    var n = 30;
    for (var y = 0; y < n; ++y) {
      for (var x = 0; x < n; ++x) {
        nodes.push({
          x: 15,
          y: y
        })
      }
    }

		this.state = {
      data: {
        "nodes": nodes,
        "nodes_2": exp_summary_data,
      }
    };

	}

  render() {
    // console.log("nodes");
    // console.log(this.state.data.nodes);
    return (
      <div>
      <div style={{width:"50%"}}>

          {
            // <FForce_col data={this.state.data} />
          }

      </div>
    </div>
    )
  }
}

export default Home;
