import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer, GeoJSON } from "react-leaflet";
import Choropleth from "react-leaflet-choropleth";
import * as d3 from "d3";
import { blue, darkGrey, white, orange } from "../../../scss/_vars.scss";
import "./_style.scss";

var hp_geojson = require("../../../data/hp_geojson.json");


// const style = {
//     fillColor: '#FFFFFF',
//     weight: 2,
//     opacity: 1,
//     color: '#fff',
//     fillOpacity: 0.8
// }

type State = {
	lat: number,
	lng: number,
	zoom: number,
	tooltipDisplay: string,
	tooltipData: object,
};

const lessThanKPIs = {
	"Spending Per Capita": {val: 10, text: "has performed poorly on spending per capita toward health and sanitation"},
	"Average days allowed for bid submission": {val: 10, text: "has performed poorly in allowing enough time for bidders to submit bids for a tender"},
	"Average number of bids received per tender": {val: 2, text: "has not performed well in terms of allowing for enough participation in the bidding process"},
};

const greaterThanKPIs = {
	"Average days taken for bid evaluation": {val: 130, text: "has performed poorly on the number of days taken to evaluate a bid"},
	"Number of tenders concluded after validity days": {val: 2, text: "has awarded a contract to too many suppliers after the tender expired"},
	"Average difference between awarded and tender value": {val: 300000, text: "has had significant cost overruns while budgeting for a tender"},
};

export default class FMap extends Component<{}, State> {
	constructor(props) {
		super(props);
		this.state = {
			lat: 31.1048,
			lng: 77.1734,
			zoom: 7,
			tooltipDisplay: "none",
			tooltipData: {},
			isMobile:false
		};
	}

	componentDidMount(){
		let isMobile = this.isMobile();
		this.setState({
			isMobile
		})
	}

	isMobile = () => {
		return window.innerWidth < 768 
	}

	highlightFeature = (e) => {
		let value, redFlag, redFlagText;
		if (this.props.showValue) {
			value =
				this.props.initData &&
				this.props.initData[this.props.dateRange].values[
					this.props.activeFilters["sdg"].val
				].values[this.props.activeFilters["works"].val].values[this.props.activeFilters["indicator"].val].values[
					this.props.activeFilters["kpi"].val
				].values[e.target.feature.properties.NAME_2.toUpperCase()];

			redFlag = lessThanKPIs[this.props.activeFilters["kpi"].val]
				? lessThanKPIs[this.props.activeFilters["kpi"].val].val >
				  value
				: greaterThanKPIs[this.props.activeFilters["kpi"].val]
				? greaterThanKPIs[this.props.activeFilters["kpi"].val].val <
				  value                                                                                                                                                                                                                                                                                                                                                                                                         
				: false;

			redFlagText = lessThanKPIs[this.props.activeFilters["kpi"].val]
			? lessThanKPIs[this.props.activeFilters["kpi"].val].text 
			: greaterThanKPIs[this.props.activeFilters["kpi"].val]
			? greaterThanKPIs[this.props.activeFilters["kpi"].val].text                                                                                                                                                                                                                                                                                                                                                                                                  
			: "No Red Flags Observed";
		}

		var layer = e.target;

		layer.setStyle({
			weight: 5,
		});

		this.setState({ tooltipDisplay: "block" });
		this.setState({
			tooltipData: {
				dataPointToMap:
					e.target.feature.properties.NAME_2 !== "Lahaul and Spiti"
						? e.target.feature.properties[this.props.dataPointToMap]
						: "null",
				districtName: e.target.feature.properties.NAME_2,
				value: value,
				redFlag: redFlag,
				redFlagText: redFlagText
			},
		});
	};

	resetHighlight = (e) => {
		var layer = e.target;
		layer.setStyle({
			weight: 2,
		});

		this.setState({
			tooltipDisplay: "none",
		});

		this.setState({
			tooltipDisplay: "none",
		});
	};

	getColor = (d) => {
		return d > 0.8
			? "hsl(177, 100%, 70%)"
			: d > 0.6
			? "hsl(177, 100%, 56%)"
			: d > 0.4
			? "hsl(177, 100%, 42%)"
			: d > 0.2
			? "hsl(177, 100%, 28%)"
			: "hsl(177, 100%, 14%)";
	};

	handleMapStyle = (feature) => {
		if (feature.properties.NAME_2 === "Lahaul and Spiti") {
			return {
				fillColor: "rgb(179,179,179)",
				weight: 2,
				opacity: 1,
				color: "#ffffff",
				fillOpacity: 0.8,
			};
		} else {
			return {
				fillColor:
					(feature.properties.index &&
						feature.properties.index !== "null") ||
					feature.properties.index === 0
						? this.getColor(feature.properties.index)
						: "rgb(179,179,179)",
				weight: 2,
				opacity: 1,
				color: feature.properties.index ? "#FFFFFF" : "#e1e1e1",
				fillOpacity: 0.8,
			};
		}
	};

	handleTooltipString = () => {};

	handleMapPosition = () => {
		const map = this.mapRef.current.leafletElement;  //get native Map instance
    	const group = this.groupRef.current.leafletElement; //get native featureGroup instance
    	map.fitBounds(group.getBounds());
	}

	handleCheckRedFlags = () => {
		return this.props.activeFilters.kpi.val.length > 0;
	};

	render() {
		const position = [31.8147, 77.2198];
		return (
			<div
				style={{ position: "relative", zIndex: 10 }}
				className="procurement"
			>
				<div className="f-map-tooltip-wrapper">
					{this.state.tooltipDisplay === "block" ? (
						<div
							className="f-map-tooltip"
							style={{ display: this.state.tooltipDisplay }}
						>
							<p className="f-map-tooltip__district-name">
								{this.state.tooltipData.districtName &&
									this.state.tooltipData.districtName}
							</p>
							<div className="f-map-tooltip__separator"></div>
							<div className="f-map-tooltip__data-wrapper">
								<p className="f-map-tooltip__data-point-key">
									{this.props.dataPointToMap &&
										`${this.props.dataPointToMap.replace(
											/([a-z0-9])([A-Z])/g,
											"$1 $2"
										)}:`}
								</p>
								<p className="f-map-tooltip__data-point-value">
									{(this.state.tooltipData.dataPointToMap ||
										this.state.tooltipData
											.dataPointToMap === 0) &&
									this.state.tooltipData.dataPointToMap !==
										"null"
										? `${this.state.tooltipData.dataPointToMap}`
										: "N/A"}
								</p>
							</div>
							{this.props.showValue ? (
								<div className="f-map-tooltip__data-wrapper">
									<p className="f-map-tooltip__data-point-key">
										Value:
									</p>
									<p className="f-map-tooltip__data-point-value">
										{(this.state.tooltipData.value ||
											this.state.tooltipData.value ===
												0) &&
										this.state.tooltipData.value !== "null"
											? this.state.tooltipData.value
											: "N/A"}
									</p>
								</div>
							) : (
								""
							)}
							{this.handleCheckRedFlags() ? (
								<div className={`${!this.state.tooltipData.redFlag ? "f-map-tooltip__data-wrapper" : "" }`}>
									<p className={`f-map-tooltip__data-point-key ${this.state.tooltipData.redFlag ? "red-flag-text" : ""}`}>
										Red Flag :
									</p>
									<p className={`f-map-tooltip__data-point-value ${this.state.tooltipData.redFlag ? "red-flag-text" : ""}`}>
										{this.state.tooltipData.redFlag
											? `${this.state.tooltipData.districtName} ${this.state.tooltipData.redFlagText}`
											: "No Red Flags Observed"										}
									</p>
								</div>
							) : (
								""
							)}
						</div>
					) : (
						<div className="f-map-tooltip__guide-text-wrapper">
							<p className="f-map-tooltip__guide-text">
								{this.state.isMobile ? "Click a district to see its spending info." :"Hover over a district to see its spending info."}
							</p>
						</div>
					)}
				</div>
				<Map
					center={position}
					scrollWheelZoom={false}
					zoom={this.state.isMobile ? 7 : 8}
					zoomControl={false}
					style={{ backgroundColor: "white" }}
					doubleClickZoom={false}
					// load={this.handleMapPosition}
					ref={this.mapRef}
					dragging={false}
				>
					<GeoJSON
						data={this.props.data}
						style={this.handleMapStyle}
						onEachFeature={(feature, layer) =>
							layer.on({
								mouseover: this.highlightFeature,
								mouseout: this.resetHighlight,
								click: this.highlightFeature,
							})
						}
					/>
				</Map>
			</div>
		);
	}
}
