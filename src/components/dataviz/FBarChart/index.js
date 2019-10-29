import React, { Component} from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryGroup, VictoryLabel } from 'victory';

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
        animate={{ duration: 1000, easing: "expOut" }}
      >
      <VictoryAxis
        tickLabelComponent={
          <VictoryLabel
            dy={-5}
            style={tickLabelStyle}
          />
        }
        tickFormat={this.props.xLabelTxt}
        tickValues={this.props.xLabelPos}
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
        >
        {
          this.props.dataPoints && //if multiple datapoints is specified via the datapoints prop,
            this.props.dataPoints.map((dataToY, i) =>{
              return(
                <VictoryBar
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

export default FBarChart;
