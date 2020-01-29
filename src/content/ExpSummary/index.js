import React, { Component } from "react";
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//actions
import { getExpSummaryData } from '../../actions/exp_summary';

//carbon components
import { Content } from 'carbon-components-react/lib/components/UIShell';
import { ContentSwitcher, Switch } from 'carbon-components-react';
import { Button } from 'carbon-components-react';

//custom components
import FTable from '../../components/dataviz/FTable';
import FSlope from '../../components/dataviz/FSlope';
import FForce from '../../components/dataviz/FForce';
import FForce_Y from '../../components/dataviz/FForce_Y';
import FForce_X from '../../components/dataviz/FForce_X';
import FPageTitle from '../../components/organisms/FPageTitle';

//sample data
var exp_summary_data = require('../../data/exp-summary.json');

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
})

//Name of components to switch between
const sec1VizTypes = ["FForce", "FTable"];

const props = {
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
    };
		this.switchSec1VizType = this.switchSec1VizType.bind(this);
	}

	switchSec1VizType(e) {
		this.setState({ currentSec1VizType: sec1VizTypes[e] })
	}

  componentDidMount() {
    this.props.getExpSummaryData();
}

	render() {

    var currentSec1VizComp;
    if(this.state.currentSec1VizType === sec1VizTypes[0]){
      if(this.props.exp_summary.loading === false){
        // currentSec1VizComp = <FForce_Y nodes={this.props.exp_summary.data} />
				currentSec1VizComp = <FForce_X nodes={this.props.exp_summary.data} />
      }else{
        currentSec1VizComp = <div>Loading...</div>
      }

    }else{
      currentSec1VizComp = <FTable {...props.FTable}  />;
    }


    return (
      <div className="f-content exp-summary-content">
				<FPageTitle
					pageTitle={ <span>Expenditure | Summary  <span className="f-light-grey">| FY: 2018-19</span></span> }
					pageDescription= "Carbon is IBM’s open-source design system for digital
					 			products and experiences. With the IBM Design Language
					 			as its foundation, the system consists of working code,
					 			design tools and resources, human interface guidelines,
					 			and a vibrant community of contributors."
					showLegend={ true }
					/>
        <div className="data-viz-col exp-summary">
          <div className="content-switcher-wrapper">
            <ContentSwitcher onChange={this.switchSec1VizType} >
              <Switch  text="Visual" />
              <Switch  text="Table" />
            </ContentSwitcher>
          </div>
          <div className="data-viz-wrapper">
          {currentSec1VizComp}
          </div>
        </div>
        <div>
        </div>
      </div>
    )
	}
}

ExpSummary.propTypes = {
  exp_summary: PropTypes.object.isRequired,
  getExpSummaryData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  exp_summary: state.exp_summary
})


export default connect(mapStateToProps, { getExpSummaryData })(ExpSummary);
