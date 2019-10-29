import React, { Component } from "react";
import axios from 'axios';
//carbon components
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { ContentSwitcher, Switch } from 'carbon-components-react';
import { Button } from 'carbon-components-react';


//custom components
import FTable from '../../components/dataviz/FTable';
import FSlope from '../../components/dataviz/FSlope';
import FForce from '../../components/dataviz/FForce';

//sample data
var exp_summary_data = require('../../data/exp-summary.json');

//make api call for exp-summary dataviz


//sample slope data
const sampleSlopeData = [
  [
		{ year: "1", sanction: 0.1 },
		{ year: "4", sanction: 0.5, label: "demand_1" }
  ],
  [
		{ year: "1", sanction: 0.2 },
		{ year: "4", sanction: 0.5, label: "B" }
  ],
  [
		{ year: "1", sanction: 0.3 },
		{ year: "4", sanction: 0.6, label: "C" }
  ]
]
//sample table data
const sampleRows = [{
		id: 'a',
		demand_code: '1',
		sanction: '1000',
		percent_change: '10%',
  },
	{
		id: 'b',
		demand_code: '2',
		sanction: '800',
		percent_change: '12%'
  },
	{
		id: 'c',
		demand_code: '3',
		sanction: '1200',
		percent_change: '6%'
  },
];
const sampleHeaders = [
  {
		key: 'demand_code', // `key` is the name of the field on the row object itself for the header
		header: 'Demand', // `header` will be the name you want rendered in the Table Header
  },
	{
		key: 'sanction',
		header: 'Sanction',
  },
	{
		key: 'percent_change',
		header: 'Pecentage Change Since Last Year',
  },
];

const currentYear = "2019";
const prevYear = "2018";

var slopeData = [];

var tableData = {
	headers: [],
	rows: []
}

const thousands_separators = (num) =>
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

//
exp_summary_data.map((d, i) => {

	i === 0 && tableData.headers.push(
    { key: 'demandid', header: 'Demand ID' },
    { key: 'demandname', header: 'Demand Name' },
    { key: 'sanctioncurrent', header: 'Sanction This Year (INR)' },
    { key: 'sanctionprevious', header: 'Sanction Last Year (INR)' },
    { key: 'rateOfChange', header: '% Change' }
  );

	tableData.rows.push({
		id: i,
		'demandid': d.demandid,
		'demandname': d.demandname,
		'sanctioncurrent': Math.round(d.sanctioncurrent*100)/100,
		'sanctionprevious': Math.round(d.sanctionprevious*100)/100,
		'rateOfChange': Math.round((d.rateOfChange*100) * 100)/100
	})
	slopeData.push(
    [
			{ year: prevYear, sanction: d.sanctionprevious },
			{ year: currentYear, sanction: d.sanctioncurrent, "label": `${d.demandid}_${d.demandname}` }
    ]
	);
})

//Name of components to switch between
const sec1VizTypes = ["FForce", "FTable"];

const props = {
	FSlope: {
		data: slopeData,
		x: "year",
		y: "sanction",
		height: 3000,
		width: 300,
		padding: { top: 20, left: 75, right: 75, bottom: 50 },
		tickFormatY: ["", " Cr", 1 / 10000000],
	},

	FTable: {
		rows: tableData.rows,
		headers: tableData.headers
	}
}


class ExpSummary extends Component {

	constructor(props) {
		super(props);

		this.state = {
      currentSec1VizType: sec1VizTypes[0],
      data: {
        "nodes": exp_summary_data
          /*[
            { "sanctioncurrent": 100, "rateOfChange": 1 },
            { "sanctioncurrent": 50, "rateOfChange": 2 },
            { "sanctioncurrent": 70, "rateOfChange": 3 },
            { "sanctioncurrent": 80, "rateOfChange": 4 },
          ]*/
          ,
        "links": [],
        "apiData": {
          data: null,
          isLoading: true,
          errors: null
        }
      }
    };
		this.switchSec1VizType = this.switchSec1VizType.bind(this);
	}

  async getData(apiUrl){
    try{
      const res = await axios.get(apiUrl);
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

	switchSec1VizType(e) {
		this.setState({ currentSec1VizType: sec1VizTypes[e] })
	}

  componentDidMount() {
  this.getData('http://13.126.189.78/api/detail_exp?start=2019-4-01&end=2019-4-30');
  this.getData('http://13.126.189.78/api/detail_exp?start=2019-3-01&end=2019-3-31');
  this.getData('http://13.126.189.78/api/detail_exp?start=2019-2-01&end=2019-2-28');
  this.getData('http://13.126.189.78/api/detail_exp?start=2019-1-01&end=2019-1-31');
  this.getData('http://13.126.189.78/api/detail_exp?start=2018-12-01&end=2018-12-31');
  this.getData('http://13.126.189.78/api/detail_exp?start=2018-11-01&end=2018-11-30');
  this.getData('http://13.126.189.78/api/detail_exp?start=2018-10-01&end=2018-10-31');
  this.getData('http://13.126.189.78/api/detail_exp?start=2018-9-01&end=2018-9-30');
  this.getData('http://13.126.189.78/api/detail_exp?start=2018-8-01&end=2018-8-31');
  this.getData('http://13.126.189.78/api/detail_exp?start=2018-7-01&end=2018-7-31');
  this.getData('http://13.126.189.78/api/detail_exp?start=2018-6-01&end=2018-6-30');
  this.getData('http://13.126.189.78/api/detail_exp?start=2018-5-01&end=2018-5-31');
  this.getData('http://13.126.189.78/api/detail_exp?start=2018-4-01&end=2018-4-30');
}

	render() {

		var currentSec1VizComp;
		this.state.currentSec1VizType === sec1VizTypes[0] ?
			currentSec1VizComp = <FForce data={this.state.data} /> :
			currentSec1VizComp = <FTable {...props.FTable}  />;

		return (
			<div className="exp-summary-content">
        <div className="text-col">
          <h3>Some title text</h3>
          <p>
            Carbon is IBM’s open-source design system for digital
            products and experiences. With the IBM Design Language
            as its foundation, the system consists of working code,
            design tools and resources, human interface guidelines,
            and a vibrant community of contributors.
          </p>
        </div>
        <div className="data-viz-col exp-summary">
          <div className="content-switcher-wrapper">
            <ContentSwitcher onChange={this.switchSec1VizType} >
              <Switch  text="Bubble Chart" />
              <Switch  text="Table" />
            </ContentSwitcher>
          </div>
          {currentSec1VizComp}
        </div>
        <div>

        </div>
      </div>
		)
	}
}
export default ExpSummary;
