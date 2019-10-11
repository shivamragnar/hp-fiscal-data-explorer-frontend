import React, {
  Component
} from "react";
import {Content} from 'carbon-components-react/lib/components/UIShell';
import FPieChart from '../../datavizcomps/FPieChart';
import FBarChart from '../../datavizcomps/FBarChart';
import FTable from '../../datavizcomps/FTable';
import FSlope from '../../datavizcomps/FSlope';
import FSlope2 from '../../datavizcomps/FSlope2';
import FTimeSeries from '../../datavizcomps/FTimeSeries';

import { DataTable } from 'carbon-components-react';
import {ContentSwitcher, Switch} from 'carbon-components-react';
import { Button } from 'carbon-components-react';
// De-structure `DataTable` directly to get local references
import Download16 from '@carbon/icons-react/lib/download/16';


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


const sampleDataTime = [
  {
    x: 1,
    sanction: 4,
    addition: 5,
    saving: 6,
    revised: 7,
  },
  {
    x: 2,
    sanction: 4.5,
    addition: 8,
    saving: 5.7,
    revised: 9,
  }
]


const rows = [
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
const headers = [
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
  FSlope2: {
    data : sampleDataTime,
    dataToX: 'x',
    dataPoints: ['sanction','revised', 'addition', 'saving'],
    xLabelValues: ["2017","2018"],
    xLabelFormat: (t) => t
  },

  FTable: {
    rows: rows,
    headers: headers
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
      currentSec1VizComp = <FSlope2 {...props.FSlope2} /> :
      currentSec1VizComp = <FTable {...props.FTable} />;

    return (
      <div>
        <Content>
          <div className="bx--grid">
            <div className="bx--row">
              <div className="left-col bx--col-lg-4">
                <h3>Some title text</h3>
                <p>
                  Carbon is IBM’s open-source design system for digital
                  products and experiences. With the IBM Design Language
                  as its foundation, the system consists of working code,
                  design tools and resources, human interface guidelines,
                  and a vibrant community of contributors.
                </p>
              </div>
              <div className="right-col bx--col-lg-8">
                <div style={{display: "flex"}}>
                  <ContentSwitcher onChange={this.switchSec1VizType} >
                    <Switch  text="Slope Chart" />
                    <Switch  text="Table" />
                  </ContentSwitcher>
                </div>
                {currentSec1VizComp}
              </div>
            </div>

          </div>
        </Content>

      </div>
    )
  }
}
export default ExpSummary;
