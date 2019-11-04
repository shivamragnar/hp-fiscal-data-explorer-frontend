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
		dataToX: 'date',
		yLabelFormat: [""," L INR",1/100000]
	}
}

class ExpDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
      currentVizType: vizTypes[0],
			sasr: {
				dateRange: this.calcDateRange('20181001', '20181003'),
				isLoading: true,
				data: [],
				errors: null
			},
			mar: [],
			apr: [],
			may: [],
			jun: [],
			sasrmonthwise:{
				data: [],
				isLoading: false,
				errors: null
			}


    };
		this.switchVizType = this.switchVizType.bind(this);
		this.calcDateRange = this.calcDateRange.bind(this);
		this.calcDaywiseData = this.calcDaywiseData.bind(this);
		this.calcMonthwiseData = this.calcMonthwiseData.bind(this);
	}

	async getDataTest1(apiUrl){
    try{
      const res = await axios.get(apiUrl);
      console.log(res.data);
			// this.calcDaywiseData(res.data);

    }catch(err){
      console.log(err);
    }
  }

	async getDataMonthwiseTest2(){
    try{
			// const res = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-01-01&end=2018-01-03');
			// console.log(res.data);
			const jan = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-01-01&end=2018-01-31');
			this.calcMonthwiseData(jan.data.records, "january");

			const feb = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-02-01&end=2018-02-28');
			this.calcMonthwiseData(feb.data.records, "february");

			const mar = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-03-01&end=2018-03-31');
			this.calcMonthwiseData(mar.data.records, "march");

			const apr = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-04-01&end=2018-04-30');
			this.calcMonthwiseData(apr.data.records, "april");

			const may = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-05-01&end=2018-05-31');
			this.calcMonthwiseData(may.data.records, "may");

			const jun = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-06-01&end=2018-06-30');
			this.calcMonthwiseData(jun.data.records, "june");

			const jul = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-07-01&end=2018-07-31');
			this.calcMonthwiseData(jul.data.records, "july");

			const aug = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-08-01&end=2018-08-31');
			this.calcMonthwiseData(aug.data.records, "august");

			const sep = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-09-01&end=2018-09-30');
			this.calcMonthwiseData(sep.data.records, "september");

			const oct = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-10-01&end=2018-10-31');
			this.calcMonthwiseData(oct.data.records, "october");

			const nov = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-11-01&end=2018-11-30');
			this.calcMonthwiseData(nov.data.records, "november");

			const dec = await axios.get('http://13.126.189.78/api/detail_exp?start=2018-12-01&end=2018-12-31');
			this.calcMonthwiseData(dec.data.records, "december");

    }catch(err){
      console.log(err);
    }
  }
	calcMonthwiseData(api_response, month){
		var mark = 800000; //height of the 'black marker'. not elegantly written. will find a better way later.
		var tot = {
			date: month,
			sanction: 0,
			addition: 0,
			savings: 0,
			revised: 0,
			mark: mark
		}
		api_response.map((d,i) =>{
			let {date, sanction, addition, revised, savings} = d;
			tot.sanction += sanction;
			tot.addition += addition;
			tot.revised += revised;
			tot.savings += savings;
		})
		// console.log("tot is: ");
		// console.log(tot);
		let sasrmonthwise = {...this.state.sasrmonthwise};
		sasrmonthwise.data.push(tot);
		this.setState({sasrmonthwise});
	}

	calcDaywiseData(api_response){
		var data = [];
		var pDate = "0";
		var index; //initiate to keep track of every new 'day object' that is pushed into the data array
		var mark = 20000; //height of the 'black marker'. not elegantly written. will find a better way later.

		api_response.records.map((d, i) => {
			let {date, sanction, addition, revised, savings} = d;
			if(date.trim() !== pDate.trim()){ //if a new day record is found...
				console.log("dates are: "+date.trim()+ "| index: "+i);
				index = data.push({ i, date, sanction, addition, savings, revised, mark}); //initiate a 'day object' with properties date, sanction, addition, savings, revised
				console.log(data);
				console.log(d.sanction + " | "+ i);
				console.log(sanction + "	 | "+ i);
			}else{

				data[index-1].sanction += sanction;
				data[index-1].addition += addition;
				data[index-1].savings += savings;
				data[index-1].revised += revised;
			}
			pDate = date;
		})
		let updatedSasrState = {...this.state.sasr} //temp variable to store the current sasr state
		updatedSasrState.data = data; //update temp variable with this new data
		updatedSasrState.isLoading = false; //update temp variable with this new data
		this.setState({sasr: updatedSasrState});

	}

	calcDateRange(rawDate1, rawDate2){
		rawDate1 = rawDate1.slice(0, 4) + "-" + rawDate1.slice(4, 6) + "-" + rawDate1.slice(6, 8);
		rawDate2 = rawDate2.slice(0, 4) + "-" + rawDate2.slice(4, 6) + "-" + rawDate2.slice(6, 8);
		let date1 = new Date(rawDate1);
		let date2 = new Date(rawDate2);
		return Math.floor((date2 - date1)/(1000*60*60*24))+1;
	}

	switchVizType(e) {
		this.setState({ currentVizType: vizTypes[e] })
	}

	componentDidMount() {
		// console.log(this.state.sasr.dateRange);
		// this.getDataTest1('http://13.126.189.78/api/detail_exp?start=2018-03-28&end=2018-03-28');
		// this.getDataMonthwiseTest2();
		this.getDataTest1("http://13.126.189.78/api/detail_exp_test?start=2018-11-01&end=2018-11-02")
	}

	render() {


		var currentVizComp;

		if(this.state.currentVizType === vizTypes[0]){
			if(this.state.sasrmonthwise.isLoading === false){
					currentVizComp = <FSASRChart data={this.state.sasrmonthwise.data} {...props.FSASRChart} />;
			}else{
				currentVizComp = <h1>Loading...</h1>
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
