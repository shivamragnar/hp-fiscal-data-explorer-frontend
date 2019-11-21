import React, { Component } from "react";
import axios from 'axios';

//carbon components
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { ContentSwitcher, Switch } from 'carbon-components-react';

//custom components
import FSASRChart from '../../components/dataviz/FSASRChart';
import FTimeSeries from '../../components/dataviz/FTimeSeries';
import FTable from '../../components/dataviz/FTable';
import FDropdown from '../../components/molecules/FDropdown';
import FRadioGroup from '../../components/molecules/FRadioGroup';

var SASRData;

const sampleDataSASR = [
	{ date: "Jan", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Feb", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Mar", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Apr", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "May", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Jun", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Jul", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Aug", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Sep", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Oct", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Nov", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
	{ date: "Dec", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 }
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
	FTable: { rows: sampleRows, headers: sampleHeaders },
	FSASRChart: { dataToX: 'date', yLabelFormat: [""," L INR",1/100000] }
}

class ExpDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
      currentVizType: vizTypes[0],
			activeFilters: []
    };

		this.switchVizType = this.switchVizType.bind(this);
		this.calcMonthwiseData = this.calcMonthwiseData.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
	}

	calcMonthwiseData(api_response){
		var mark = 60000; //height of the 'black marker'. not elegantly written. will find a better way later.
		var monthwiseObjRef = {
			date: "0",
			sanction: 0,
			addition: 0,
			savings: 0,
			revised: 0,
			mark: mark
		}
		var data = [];
		api_response.map((d,i) =>{
			let {date, sanction, addition, revised, savings} = d;
			date = date.substr(0,6);

			if(monthwiseObjRef.date !== date ){
				monthwiseObjRef.date = date;
				var cloneObj = Object.assign({}, monthwiseObjRef);
				data.push(cloneObj);
			}

		  data[data.length-1].sanction += sanction;
			data[data.length-1].addition += addition;
			data[data.length-1].revised += revised;
			data[data.length-1].savings += savings;
		})
		console.log("SASR data: ");
		console.log(data);
		SASRData = data;

	}

	switchVizType(e) {
		this.setState({ currentVizType: vizTypes[e] })
	}

	onFilterChange(e){
		let activeFiltersArray = this.state.activeFilters;
		var found = false;
		var foundIndex = -1;
		activeFiltersArray.map((d,i) =>{
			if(d.key === e.selectedItem.dd_name){
				found = true;
				foundIndex = i;
			}
		})
		if(found === false){
			activeFiltersArray.push({key: e.selectedItem.dd_name, value: e.selectedItem.id})
		}else{
			activeFiltersArray[foundIndex] = {key: e.selectedItem.dd_name, value: e.selectedItem.id};
		}

		this.setState({activeFilters : activeFiltersArray});
		console.log(e.selectedItem.id)
	}

	render() {

		console.log("master data: ");
		console.log(this.props.expData);

		console.log("activefilters");
		console.log(this.state.activeFilters);

		this.calcMonthwiseData(this.props.expData);

		var currentVizComp;

		if(this.state.currentVizType === vizTypes[0]){
			if(this.props.apiDataLoading === true){
				currentVizComp = <div>Loading...</div>;
			}else{
				currentVizComp = <FSASRChart data={SASRData} {...props.FSASRChart} />;
			}
		}else{
			currentVizComp = <FTable {...props.FTable}  />;
		}

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
          </div>
				<div className="filter-col-wrapper">
	        <div className="filter-col">
	          <FDropdown
							className = "filter-col--ops"
							titleText = "Demand"
							label = "All"
							onChange = {(e) => this.onFilterChange(e)}
							items = {[
								{ dd_name: "demand", id: "01", label: "01" },
								{ dd_name: "demand", id: "02", label: "02" },
								{ dd_name: "demand", id: "03", label: "03" },
								{ dd_name: "demand", id: "04", label: "04" },
								{ dd_name: "demand", id: "05", label: "05" },
								{ dd_name: "demand", id: "06", label: "06" },
								{ dd_name: "demand", id: "07", label: "07" },
								{ dd_name: "demand", id: "08", label: "08" },
								{ dd_name: "demand", id: "09", label: "09" },
								{ dd_name: "demand", id: "10", label: "10" },
							]}
						/>
						<FDropdown
							className = "filter-col--ops"
							titleText = "Major"
							label = "All"
						/>
						<FDropdown
							className = "filter-col--ops"
							titleText = "Sub Major"
							label = "All"
						/>
						<FDropdown
							className = "filter-col--ops"
							titleText = "Minor"
							label = "All"
						/>
						<FDropdown
							className = "filter-col--ops"
							titleText = "Sub Minor"
							label = "All"
						/>
						<FDropdown
							className = "filter-col--ops"
							titleText = "Budget"
							label = "All"
						/>
						<FDropdown
							className = "filter-col--ops"
							titleText = "SOE"
							label = "All"
						/>
						<FRadioGroup
							className = "filter-col--ops"
							name = "plan_nonplan"
							titleText = ""
							radioButtons = {[
								{id:"plan", labelText: "Plan", value: "default-selected"},
						    {id:"non-plan", labelText: "Non Plan", value: "standard"}
							]}
						/>
						<FRadioGroup
							className = "filter-col--ops"
							name = "voted_charged"
							titleText = ""
							radioButtons = {[
								{id:"voted", labelText: "Voted", value: "default-selected"},
								{id:"charged", labelText: "Charged", value: "standard"}
							]}
						/>
	        </div>
				</div>
      </div>
		)
	}
}
export default ExpDetails;
