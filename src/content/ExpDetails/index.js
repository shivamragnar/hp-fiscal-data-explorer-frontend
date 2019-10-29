import React, { Component } from "react";

//carbon components
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { ContentSwitcher, Switch } from 'carbon-components-react';

//custom components
import FSASRChart from '../../components/dataviz/FSASRChart';
import FTimeSeries from '../../components/dataviz/FTimeSeries';
import FTable from '../../components/dataviz/FTable';


const sampleDataSASR = [
	{ month: "Jan", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Feb", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Mar", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Apr", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "May", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Jun", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Jul", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Aug", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Sep", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Oct", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Nov", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
	{ month: "Dec", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 }
]

const sampleDataTime = [{
		x: 1,
		sanction: 4,
		addition: 5,
		saving: 6,
		revised: 7,
  },
	{
		x: 2,
		sanction: 4.5,
		addition: 5,
		saving: 6,
		revised: 7,
  },
	{
		x: 3,
		sanction: 4.7,
		addition: 5,
		saving: 6,
		revised: 7,
  },
	{
		x: 4,
		sanction: 4,
		addition: 5,
		saving: 6,
		revised: 7,
  },
	{
		x: 5,
		sanction: 4,
		addition: 5,
		saving: 6,
		revised: 7,
  },
	{
		x: 6,
		sanction: 4,
		addition: 5,
		saving: 6,
		revised: 7,
  },
	{
		x: 7,
		sanction: 4,
		addition: 5,
		saving: 6,
		revised: 7,
  },
	{
		x: 8,
		sanction: 4,
		addition: 5,
		saving: 6,
		revised: 7,
  },
	{
		x: 9,
		sanction: 4,
		addition: 5,
		saving: 6,
		revised: 7,
  },
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
const sampleHeaders = [{
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
const vizTypes = ["FSASR", "FTable"];

const props = {


	FTable: {
		rows: sampleRows,
		headers: sampleHeaders
	},

	FSASRChart: {
		data: sampleDataSASR,
		dataToX: 'month',
		dataPoints: ['sanction','revised'],
		yLabelFormat: [""," L INR",1/1000]
	}
}

class ExpDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
      currentVizType: vizTypes[0],
    };
		this.switchVizType = this.switchVizType.bind(this);
	}

	switchVizType(e) {
		this.setState({ currentVizType: vizTypes[e] })
	}

	render() {

		var currentVizComp;
		this.state.currentVizType === vizTypes[0] ?
			currentVizComp = <FSASRChart {...props.FSASRChart} /> :
			currentVizComp = <FTable {...props.FTable}  />;

		return (
			<div>

          <div className="data-viz-col exp-details">
						<div className="content-switcher-wrapper">
	            <ContentSwitcher onChange={this.switchVizType} >
	              <Switch  text="SASR Chart" />
	              <Switch  text="Table" />
	            </ContentSwitcher>
	          </div>
            <div>
              {currentVizComp}
            </div>
            <div>
              <FTimeSeries
                data={sampleDataTime}
                dataToX={'x'}
                dataPoints={['sanction','revised', 'addition', 'saving']}
                xLabelValues={[1,2,3,4,5,6,7,8,9]}
                xLabelFormat={(t) => t}
              />
            </div>
          </div>

        <div className="filter_col">
          <h3>Filter col</h3>
        </div>
      </div>
		)
	}
}
export default ExpDetails;
