import React, { Component } from "react";


import ReactDOM from 'react-dom';
import { getWeekwiseDates } from '../../utils/functions';
//custom components

import FSASRChart from '../../components/dataviz/FSASRChart';
import * as d3 from "d3";

//sample data
var exp_summary_data = require('../../data/exp-summary.json');

var testData = [
  { date: 0, sanction: 20, addition: 30, savings: 40, revised: 25, mark: 20 },
  { date: 7, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20  },
	{ date: 14, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
  { date: 21, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
  { date: 28, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
  { date: 31, sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
]

var yymmdd_ref = require("../../data/yymmdd_ref.json");

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

    const initDateFrom = "2018-05-01";
    const initDateTo = "2018-08-31";


    const fromMonthIndex = parseInt(initDateFrom.split("-")[1])-1;
    const toMonthIndex = parseInt(initDateTo.split("-")[1])-1;

    console.log(getWeekwiseDates(fromMonthIndex, toMonthIndex).date_for_x_axis[5])
    //
    // var totWeekWiseDays = [];
    //
    // for(var i = fromMonthIndex ; i <= toMonthIndex ; i++){
    //     const jsDateFrom = new Date(`2018-0${i+1}-01`)
    //     const dayFromIndex = jsDateFrom.getDay()
    //     const totDaysCurrMonth = parseInt(yymmdd_ref.noOfDays[i]);
    //     const firstWeekend = (7 - dayFromIndex);
    //     const weekwiseDaysOfMonth = [firstWeekend]; //a week = SUN to SAT
    //     let weekendCounter = firstWeekend ;
    //     while((weekendCounter+7) <= totDaysCurrMonth){
    //       weekendCounter += 7;
    //       weekwiseDaysOfMonth.push(weekendCounter)
    //     }
    //     if(i === toMonthIndex){ //if this is the last month only then add the end of month date
    //       weekwiseDaysOfMonth.push(totDaysCurrMonth);
    //     }
    //
    //     totWeekWiseDays = totWeekWiseDays.concat(weekwiseDaysOfMonth);
    // }




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
