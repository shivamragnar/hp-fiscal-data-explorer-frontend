import React, { Component} from "react";
import { VictoryLine, VictoryChart, VictoryAxis,  VictoryGroup, VictoryLabel } from 'victory';

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

const tickLabelStyle = {
  fontFamily: 'IBM Plex Sans',
  fontSize: '7px'
  }


class FTimeSeries extends Component {

  static defaultProps = {
      //yLabelFormat mnust be an array of 3. each value representing  'prefix', 'suffix' and multiplier
      yLabelFormat: ["","",1]
   };

  render() {
    return (
      <VictoryChart
        animate={{ duration: 1000, easing: "expOut" }}
      >
      <VictoryAxis
        tickLabelComponent={
          <VictoryLabel
            dy={-5}
            style={tickLabelStyle}
          />
        }
        tickFormat={this.props.xLabelFormat}
        tickValues={this.props.xLabelValues}
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

          style={{ data: { width: 5 } }}
        >

        {
          this.props.dataPoints && //if multiple datapoints is specified via the datapoints prop,
            this.props.dataPoints.map((dataToY, i) =>{
              return(
                <VictoryLine
                  key={i}
                  colorScale={"blue"}
                  data={this.props.data}
                  x={this.props.dataToX}
                  y={dataToY}
                />
              )
            })

        }

        </VictoryGroup>

      </VictoryChart>

    )
  }
}

export default FTimeSeries;
