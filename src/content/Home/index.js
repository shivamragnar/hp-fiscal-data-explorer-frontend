import React, { Component } from "react";
import axios from "axios";

import ReactDOM from 'react-dom';
import { getWeekwiseDates } from '../../utils/functions';
//custom components

import FSASRChart from '../../components/dataviz/FSASRChart';
import FBarChart from '../../components/dataviz/FBarChart';
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

var barData = [

  { date: "jan", receipt: 3000 },
  { date: "feb", receipt: 4000  },
  { date: "mar", receipt: 3000  }

]

var yymmdd_ref = require("../../data/yymmdd_ref.json");

const Home = (props) =>  {



    const getFilterTest = async () => {
      try{
        const res = await axios.get("http://13.126.189.78/api/acc_heads_test");
        console.log("getFilterTest");
        console.log(res);
        filChildFilters("01", res);


      }catch(err){
        console.log(err);
      }
    }

    const filChildFilters = (head, res) => {
      console.log(res.data.records[head]);

      console.log("major");
      console.log(Object.keys(res.data.records[head]));

      var array_0 = []
      var sub_major = [];
      var minor = [];
      var sub_minor = [];
      var budget = [];
      var voted_charged = [];
      var plan_nonplan = [];
      var SOE = [];
      //maybe passing count through is the answer.
      const recurs = (obj) => {

        Object.keys(obj).map(key => {
          if(obj[key]){
            console.log(Object.keys(obj[key]));
            recurs(obj[key])
          }
        });
      }





      Object.keys(res.data.records[head]).map(key1 => {
        sub_major = sub_major.concat(Object.keys(res.data.records[head][key1]));

        Object.keys(res.data.records[head][key1]).map(key2 => {
          minor = minor.concat(Object.keys(res.data.records[head][key1][key2]));

          Object.keys(res.data.records[head][key1][key2]).map(key3 => {
            sub_minor = sub_minor.concat(Object.keys(res.data.records[head][key1][key2][key3]));

            Object.keys(res.data.records[head][key1][key2][key3]).map(key4 => {
              budget = budget.concat(Object.keys(res.data.records[head][key1][key2][key3][key4]));

              Object.keys(res.data.records[head][key1][key2][key3][key4]).map(key5 => {
                voted_charged = voted_charged.concat(Object.keys(res.data.records[head][key1][key2][key3][key4][key5]));

                Object.keys(res.data.records[head][key1][key2][key3][key4][key5]).map(key6 => {
                  plan_nonplan = plan_nonplan.concat(Object.keys(res.data.records[head][key1][key2][key3][key4][key5][key6]));

                  Object.keys(res.data.records[head][key1][key2][key3][key4][key5][key6]).map(key7 => {
                    SOE = SOE.concat(Object.keys(res.data.records[head][key1][key2][key3][key4][key5][key6][key7]));
                  })

                })
              })
            })
          })
        })
      })

      console.log("sub-major");
      console.log(sub_major);

      console.log("minor");
      console.log(minor);

      console.log("sub_minor");
      console.log(sub_minor);

      console.log("budget");
      console.log(budget);

      console.log("voted_charged");
      console.log(voted_charged);

      console.log("plan_nonplan");
      console.log(plan_nonplan);

      console.log("SOE");
      console.log(SOE);

      console.log("---------------------------")
      recurs(res.data.records[head]);
      console.log("---------------------------")



    }

    getFilterTest();

    const initDateFrom = "2018-05-01";
    const initDateTo = "2018-08-31";


    const fromMonthIndex = parseInt(initDateFrom.split("-")[1])-1;
    const toMonthIndex = parseInt(initDateTo.split("-")[1])-1;

    console.log(getWeekwiseDates(fromMonthIndex, toMonthIndex).date_for_x_axis[5])

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
          <FBarChart
            data={barData}
            dataToX="date"
            dataPoints={["receipt"]}
            yLabelFormat={["","",1]}

          />
      </div>
    </div>
    )
  }


export default Home;
