import React from "react";

import PropTypes from "prop-types";
//redux
import { connect } from 'react-redux';

import FDidYouKnowSection from "../../components/organisms/FDidYouKnowSection";
import FTable from '../../components/dataviz/FTable';
import FLoading from '../../components/atoms/FLoading';

import "./_style.scss"


const ExpCovidTracker = ({
	exp_covid : {
		tableData : { headers, rows },
		loading,
		error,
	  }
}) => {
	return (
		<div className="f-content f-home">
			<iframe src='https://cdn.knightlab.com/libs/timeline3/latest/embed/index.html?source=1t9sSeZyLFykxPpd3ep3-DioIHiEBpF5v2scdMSk7xN8&font=Default&lang=en&initial_zoom=2&height=750' 
			width='100%' height='750' webkitallowfullscreen mozallowfullscreen allowfullscreen frameborder='0' title="Himachal COVID Timeline"></iframe>
			<div className="f-home__section">
				<FDidYouKnowSection />
			</div>
			<div className="f-home__section exp-covid">
				{
					loading ? 
					<FLoading/>
					:
					<FTable
						rows={rows}
						headers={headers}
						onClickDownloadBtn={(e) => { }}
						sort={false}
              		/>
				}
			</div>
		</div>
	);
};



ExpCovidTracker.propTypes ={
	exp_covid : PropTypes.object.isRequired
  }
  
  const mapStateToProps = state => ({
	exp_covid : state.exp_covid
  })
  
  export default connect(
	mapStateToProps,
	null
  )(ExpCovidTracker);
