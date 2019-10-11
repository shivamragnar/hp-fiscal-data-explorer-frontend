import React, {PropTypes, Component} from "react";
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryGroup, VictoryLabel } from 'victory';

const tickLabelStyle = {
  fontFamily: 'IBM Plex Sans',
  fontSize: '7px'
  }

const height = 300;
const width = 300;
const padding = { top: 20, left: 75, right: 75, bottom: 50 };

class FTimeSeries extends Component {

  static defaultProps = {
      //yLabelFormat mnust be an array of 3. each value representing  'prefix', 'suffix' and multiplier
      yLabelFormat: ["","",1]
   };

  render() {
    return (
      <VictoryChart
        animate={{ duration: 1000, easing: "expOut" }}
        height={height} width={width} padding={padding}
      >
      <VictoryAxis
          tickLabelComponent={<VictoryLabel y={padding.top - 40}/>}
          tickFormat={this.props.xLabelFormat}
          tickValues={this.props.xLabelValues}
        />
      <VictoryAxis
        dependentAxis
        key={0}
        offsetX={padding.left}
        tickLabelComponent={
          <VictoryLabel
            dx={5}
            style={tickLabelStyle}
          />
        }
        tickFormat={(x) => (this.props.yLabelFormat[0]+x*this.props.yLabelFormat[2]+this.props.yLabelFormat[1])}
      />
      <VictoryAxis
        dependentAxis
        key={1}
        offsetX={width-padding.right}
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
