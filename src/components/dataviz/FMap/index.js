import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import Choropleth from "react-leaflet-choropleth";
import * as d3 from 'd3';
import { blue, darkGrey, white, orange } from '../../../scss/_vars.scss';
import FTooltipDistrict from '../../atoms/FTooltipDistrict';
var hp_geojson = require("../../../data/hp_geojson.json");
console.log(hp_geojson);


const style = {
    fillColor: '#FFFFFF',
    weight: 0,
    opacity: 1,
    color: orange,
    fillOpacity: 0.8
}

type State = {
  lat: number,
  lng: number,
  zoom: number,
  tooltipDisplay: string,
  tooltipData: object
};

export default class FMap extends Component<{}, State> {

  constructor(props){
    super(props);
    this.highlightFeature = this.highlightFeature.bind(this);
    this.resetHighlight = this.resetHighlight.bind(this);
  }

  state = {
    lat: 31.1048,
    lng: 77.1734,
    zoom: 7,
    tooltipDisplay: "none",
    tooltipData: {}
  };



  highlightFeature(e) {
    console.log(e.target);
    var layer = e.target;

    layer.setStyle({
        weight: 5
    });

    this.setState({ tooltipDisplay : "block"})
    this.setState({ tooltipData: {
      gross: e.target.options.data.properties.gross
    }})

  }

  resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
      weight: 0
    });

    this.setState({ tooltipDisplay : "none"})
  }

// style={feature => feature.properties.gross ? showStyle : hideStyle}
  render() {
    console.log("re-render");
    const position = [this.state.lat, this.state.lng];
    return (
      <div style={{position: "relative"}}>
        <div style={{position: "absolute", top: 10, right: 10, width: "150px" ,height: "100px", backgroundColor: "#000", zIndex:100000}}>
          <p style={{display: this.state.tooltipDisplay, color: "#fff"}}>
            {this.state.tooltipData.gross && this.state.tooltipData.gross.toLocaleString('en-IN')}
          </p>
        </div>
      <Map center={position} zoom={this.state.zoom}>
      <TileLayer url="https://api.mapbox.com/styles/v1/abrarburk/ck5wgtnm04osr1inyi2ng4wo5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJyYXJidXJrIiwiYSI6ImNqM284MjlrbTAwMTMyd3BuemplOTVoMmYifQ.TX_JBU6Ff8EwHVx8dJfRPg" />
      <Choropleth
          data={this.props.data}
          valueProperty={feature => feature.properties.gross}
          scale={["hsl(177,100%,50%)", "hsl(177,100%,0%)"]}
          style={style}
          steps={7}
          mode="e"
          onEachFeature={(feature, layer) => layer.on({
            mouseover: this.highlightFeature,
            mouseout: this.resetHighlight
          })}
        />
      </Map>

      </div>
    );
  }
}
