import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Map, TileLayer } from "react-leaflet";
import Choropleth from "react-leaflet-choropleth";

var hp_geojson = require("../../../data/hp_geojson.json");
console.log(hp_geojson);

const style = {
  fillColor: "#F28F3B",
  weight: 2,
  opacity: 1,
  color: "white",
  dashArray: "3",
  fillOpacity: 0.5
};

type State = {
  lat: number,
  lng: number,
  zoom: number
};

export default class FMap extends Component<{}, State> {
  state = {
    lat: 31.1048,
    lng: 77.1734,
    zoom: 7
  };

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer url="https://api.mapbox.com/styles/v1/abrarburk/ck2q17qlb24pl1co3k3g06j6n/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWJyYXJidXJrIiwiYSI6ImNqM284MjlrbTAwMTMyd3BuemplOTVoMmYifQ.TX_JBU6Ff8EwHVx8dJfRPg" />
        <Choropleth
          data={hp_geojson}
          valueProperty={feature => feature.properties.value}
          scale={["#b3cde0", "#011f4b"]}
          steps={7}
          mode="e"
          style={style}
          onEachFeature={(feature, layer) =>
            layer.bindPopup(feature.properties.label)
          }
        />
      </Map>
    );
  }
}
