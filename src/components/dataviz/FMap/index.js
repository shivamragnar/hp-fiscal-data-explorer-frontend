import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import Choropleth from "react-leaflet-choropleth";

var hp_geojson = require("../../../data/hp_geojson.json");
console.log(hp_geojson);

const showStyle = {
  fillColor: "#FFFFFF",
  weight: 2,
  opacity: 1,
  color: "#ffffff",
  fillOpacity: 0.8
};

const hideStyle = {
  weight: 0,
  opacity: 0,
  fillOpacity: 0
}

type State = {
  lat: number,
  lng: number,
  zoom: number
};

export default class FMap extends Component<{}, State> {

  constructor(props){
    super(props);
    this.highlightFeature = this.highlightFeature.bind(this);

  }
  state = {
    lat: 31.1048,
    lng: 77.1734,
    zoom: 7
  };

  highlightFeature(e) {
    console.log(e.target);
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
      <TileLayer url="https://api.mapbox.com/styles/v1/abrarburk/ck5wgtnm04osr1inyi2ng4wo5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJyYXJidXJrIiwiYSI6ImNqM284MjlrbTAwMTMyd3BuemplOTVoMmYifQ.TX_JBU6Ff8EwHVx8dJfRPg" />
      <Choropleth
          data={this.props.data}
          valueProperty={feature => feature.properties.gross}
          scale={["hsl(177,100%,50%)", "hsl(177,100%,0%)"]}
          style={feature => feature.properties.gross ? showStyle : hideStyle}
          steps={7}
          mode="e"
          onEachFeature={(feature, layer) => layer.on({
            mouseover: this.highlightFeature,
          })}
          ref={(el) => this.choropleth = el.leafletElement}
        />
      </Map>
    );
  }
}
