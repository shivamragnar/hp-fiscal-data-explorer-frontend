//HOW TO USE:

//1 import FBarChart into which ever component you wanna use this in.
//2 data should be of the format:
// [
//  { someKeyForX: "value", someKeyForY1: "value", someKeyForY2, someKeyForYn },
//  { someKeyForX: "value", someKeyForY1: "value", someKeyForY2, someKeyForYn },
//  ...
// ]
//3 following props required: data, dataToX (string), dataPoints: [Array of Y1 to Yn keys as strings], yLabelFormat: [Array of prefix, suffix and multiplier],
//xLabelVals: [Array of actual numbers that plot the bars], xLabelFormat: [Array of actual stuff you want to show]


import React, { Component} from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryGroup,
  VictoryLabel,
  VictoryTooltip } from 'victory';

import FTooltipReceipts from '../../atoms/FTooltipReceipts';

import sassVars from '../../../scss/_vars.scss'
const { black } = sassVars;

const tickLabelStyle = {
  fontFamily: 'IBM Plex Sans',
  fontSize: '7px'
  }



class FBarChart extends Component {

  static defaultProps = {
      //yLabelFormat mnust be an array of 3. each value representing  'prefix', 'suffix' and multiplier
      yLabelFormat: ["","",1]
   };

  render() {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        width= {700}
        height= {300}
      >
      <VictoryAxis
        tickLabelComponent={
          <VictoryLabel
            dy={-5}
            style={tickLabelStyle}
          />
        }
        tickFormat={this.props.xLabelFormat}
        tickValues={this.props.xLabelVals}
      />
      <VictoryAxis
        dependentAxis
        tickLabelComponent={
          <VictoryLabel
            dx={5}
            style={tickLabelStyle}
          />
        }
        tickFormat={(x) => (this.props.yLabelFormat[0]+x*this.props.yLabelFormat[2]+this.props.yLabelFormat[1])}
      />
        <VictoryGroup
          offset={7}
          style={{ data: { width: 5 } }}
          labelComponent={<VictoryTooltip
            labelComponent={<FTooltipReceipts />}
            flyoutComponent={<g></g>}
            />}
        >
        {
          this.props.dataPoints && //if multiple datapoints is specified via the datapoints prop,
            this.props.dataPoints.map((dataToY, i) =>{
              return(
                <VictoryBar
                  style={{ data: { fill: black} }}
                  data={this.props.data}
                  x={this.props.dataToX}
                  y={dataToY}
                  labels={({ datum }) => `${datum.date}_${datum.receipt}`}
                />
              )
            })
        }
        </VictoryGroup>
      </VictoryChart>

    )
  }
}

export default FBarChart;
