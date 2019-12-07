import React, { Component } from "react";


import ReactDOM from 'react-dom';

//custom components

import FForce_col from '../../components/dataviz/FForce_col';
import FSASRChart from '../../components/dataviz/FSASRChart';
import * as d3 from "d3";

//sample data
var exp_summary_data = require('../../data/exp-summary.json');

var testData = [
  { date: 0, sanction: 20, addition: 30, savings: 40, revised: 25, mark: 20 },
  { date: 5, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20  },
	{ date: 10, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
  { date: 15, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20},
  { date: 20, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
  { date: 25, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
  { date: 30, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
  { date: 35, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
  { date: 40, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
  { date: 45, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 }




]


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
      <div style={{width:"100%"}}>
        <FSASRChart
          data={testData}
          xLabelFormat={(t) => `${t} month`}
          />
          {
            // <FForce_col data={this.state.data} />
          }

      </div>
    </div>
    )
  }
}

export default Home;
