import React, { Fragment, useEffect, useState } from "react";
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

var expFilters = { "filters":{} };

const ExpDetails = (props) => {

	const [currentVizType, setCurrentVizType] = useState(vizTypes[0]);

	const switchVizType = (e) => {
		setCurrentVizType(vizTypes[e]);
	}

	const onFilterChange = (e) => {
		expFilters.filters[e.selectedItem.dd_name] = e.selectedItem.id;
		console.log("filterchange! current active filters: ");
		console.log(expFilters.filters);

		//update expData state
		props.getData(expFilters);
	}

	const getFiltersData = async () => {

    console.time("Axios Fetching Filters");
    console.log("Fetching Filters Started");

    try {
      const res = await axios.get(
        "http://13.126.189.78/api/acc_heads"
      );
			console.log('filters!: ');
			console.log(res);
			var demandOps = [];
			var majorOps = [];
			res.data.records.map((filterOp, i) =>{
		
				if(demandOps.includes(filterOp[0]) === false){
					demandOps.push(filterOp[0]);
				}
				if(majorOps.includes(filterOp[1]) === false){
					majorOps.push(filterOp[1]);
				}
			})
			console.log("demandOps are: ");
			console.log(demandOps);
			console.log("majorOps are: ");
			console.log(majorOps);

    } catch (err) { console.log(err); }

    console.timeEnd("Axios Fetching Filters");
  };

	useEffect(() => {
		//reset expFilters every time this component is loaded.
		getFiltersData();
		expFilters = { "filters":{} };
		console.log("exp_filters");
		console.log(expFilters);
	}, []);

	var currentVizComp;

	if(currentVizType === vizTypes[0]){
		if(props.expDataLoading === true){
			currentVizComp = <div>Loading...</div>;
		}else{
			// currentVizComp = <FSASRChart data={SASRData} {...props.FSASRChart} />;
			currentVizComp = <div>Data Loaded!</div>
		}
	}else{
		// currentVizComp = <FTable {...props.FTable}  />;
		currentVizComp = <div>this is a data table</div>;
	}

		return (
			<div>
          <div className="data-viz-col exp-details">
						<div className="content-switcher-wrapper">
	            <ContentSwitcher onChange={switchVizType} >
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
							onChange = {onFilterChange}
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
							onChange = {onFilterChange}
							items = {[
								{ dd_name: "major", id: "1011", label: "1011" },
								{ dd_name: "major", id: "2216", label: "2216" }
							]}
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
export default ExpDetails;
