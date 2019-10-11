import React, {
  Component
} from "react";
import {Content} from 'carbon-components-react/lib/components/UIShell';
import FPieChart from '../../datavizcomps/FPieChart';
import FBarChart from '../../datavizcomps/FBarChart';
import FTable from '../../datavizcomps/FTable';


import FSlope from '../../datavizcomps/FSlope';
import FTimeSeries from '../../datavizcomps/FTimeSeries';

import { DataTable } from 'carbon-components-react';
import {ContentSwitcher, Switch} from 'carbon-components-react';
import { Button } from 'carbon-components-react';
// De-structure `DataTable` directly to get local references
import Download16 from '@carbon/icons-react/lib/download/16';

//data
var exp_summary_data = require('../../data/exp-summary.json');

const {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableHeader,
  TableToolbar,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  TableToolbarContent,
  TableBatchActions,
  TableBatchAction,
  TableSelectAll,
  TableSelectRow
} = DataTable;

const currentYear = "2019";
const prevYear = "2018";


var slopeData = [

];

var tableData = {
  headers: [

  ],
  rows: [

  ]
}

var tableHeaderDisplay = [
  'Demand ID',
  'Demand Name',
  'Sanction This Year',
  'Sanction Last Year',
  'Rate Of Change'
]

exp_summary_data.map((d, i) =>{
  i === 0 && tableData.headers.push(
    { key: 'demandid', header: tableHeaderDisplay[0] },
    { key: 'demandname', header: tableHeaderDisplay[1] },
    { key: 'sanctioncurrent', header: tableHeaderDisplay[2] },
    { key: 'sanctionprevious', header: tableHeaderDisplay[3] },
    { key: 'rateOfChange', header: tableHeaderDisplay[4] }
  );
  tableData.rows.push(
    {
      id: i,
      'demandid': d.demandid,
      'demandname': d.demandname,
      'sanctioncurrent': d.sanctioncurrent,
      'sanctionprevious': d.sanctionprevious,
      'rateOfChange': d.rateOfChange
    }
  )
  slopeData.push(
    [
      { year : prevYear, sanction : d.sanctionprevious},
      { year : currentYear, sanction : d.sanctioncurrent, "label" : `${d.demandid}_${d.demandname}` }
    ]
  );
})




const sampleSlopeData = [
  [
    {  year: "1", sanction: 0.1 },
    {  year: "4", sanction: 0.5, label: "demand_1" }
  ],
  [
    {  year: "1", sanction: 0.2 },
    {  year: "4", sanction: 0.5, label: "B" }
  ],
  [
    {  year: "1", sanction: 0.3 },
    {  year: "4", sanction: 0.6, label: "C" }
  ]
]

//table data
const sampleRows = [
  {
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

// We would have a headers array like the following
const sampleHeaders = [
  {
    // `key` is the name of the field on the row object itself for the header
    key: 'demand_code',
    // `header` will be the name you want rendered in the Table Header
    header: 'Demand',
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

//Name of components to switch between
const sec1VizTypes = ["FSlope", "FTable"];

const xLabelFormat = (t) => t;

const props = {
  FSlope: {
    data : slopeData,
    x : "year",
    y : "sanction",
    height: 3000,
    width: 300,
    padding: {top: 20, left: 75, right: 75, bottom: 50},
    tickFormatY: ["", " Cr", 1/10000000],
  },

  FTable: {
    rows: tableData.rows,
    headers: tableData.headers
  }
}


class ExpSummary extends Component {

  constructor(props){
    super(props);

    this.state = {currentSec1VizType: sec1VizTypes[0]};

    this.consoleFilteredRows = this.consoleFilteredRows.bind(this);
    this.switchSec1VizType = this.switchSec1VizType.bind( this );
  }

  switchSec1VizType(e) {
    this.setState({ currentSec1VizType: sec1VizTypes[e] })
  }

  consoleFilteredRows(rows){
    console.log(rows);
  }

  render() {




    var currentSec1VizComp;
    this.state.currentSec1VizType === sec1VizTypes[0] ?
      currentSec1VizComp = <FSlope {...props.FSlope} /> :
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
              <div className="data-viz-col">
                <div className="content-switcher-wrapper" style={{display: "flex"}}>
                  <ContentSwitcher onChange={this.switchSec1VizType} >
                    <Switch  text="Slope Chart" />
                    <Switch  text="Table" />
                  </ContentSwitcher>
                </div>
                {currentSec1VizComp}
              </div>




      </div>
    )
  }
}
export default ExpSummary;
