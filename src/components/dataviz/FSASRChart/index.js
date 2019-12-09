import React, { Component} from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack,
  VictoryGroup,
  VictoryLabel,
  VictoryTooltip,
  VictoryVoronoiContainer } from 'victory';

import sassVars from '../../../scss/_vars.scss'

const { orange, blue } = sassVars

const tickLabelStyle = {
  fontFamily: 'IBM Plex Sans',
  fontSize: '7px',
  textAnchor: 'end'
  }

class FSASRChart extends Component {

  static defaultProps = {
      //yLabelFormat mnust be an array of 3. each value representing  'prefix', 'suffix' and multiplier
      yLabelFormat: ["","",1],
      barWidth: 3
   };

  render() {

    const { data } = this.props;
    //sample data structure = [
    //	{ date: "Jan", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 },
    //	{ date: "Feb", sanction: 3000, addition: 300, savings: 400, revised: 2900, mark: 20 }
    //]

    return (
      <div className="sasr">
      <VictoryChart

        theme={VictoryTheme.material}
        domainPadding={{x: 30}}
        width= {600}
        height= {300}


      >
        <VictoryAxis
        tickLabelComponent={
          <VictoryLabel
            dy={0}
            style={tickLabelStyle}
            angle={-45}
          />
        }
        tickFormat={this.props.xLabelFormat}
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
        tickFormat={(x) => (this.props.yLabelFormat[0]+(Math.round(x*this.props.yLabelFormat[2]* 100) / 100)+this.props.yLabelFormat[1])}
      />
        <VictoryGroup
          offset={this.props.barWidth}
          style={{ data: { width: this.props.barWidth} }}
          groupComponent={<g transform={`translate(${this.props.scsrOffset}, 0)`} />}
          labelComponent={<VictoryTooltip
                            labelComponent={<CustomTooltip/>}
                            flyoutComponent={<g></g>}
                            />}

        >
        <VictoryStack >
          <VictoryBar key={0} style={{ data: { fill:  "#fff", opacity: "0" } }} data={data} x="date" y="sanction"/>
          <VictoryBar key={1} style={{ data: { fill:  "#000" } }} data={data} x="date" y="mark"/>
        </VictoryStack>
        <VictoryStack >
          <VictoryBar key={0} style={{ data: { fill:  "#fff", opacity: "0" } }} data={data} x="date" y="sanction"/>
          <VictoryBar key={1} style={{ data: { fill:  "#000" } }} data={data} x="date" y="mark"/>
          <VictoryBar key={2} style={{ data: { fill:  "#FF6100" } }} data={data} x="date" y="addition" labels={({ datum }) => `${datum.sanction}_${datum.addition}_${datum.savings}_${datum.revised}`} />
        </VictoryStack>
        <VictoryStack >
          <VictoryBar key={0} style={{ data: { fill:  "#fff", opacity: "0" } }} data={data} x="date" y="revised"/>
          <VictoryBar key={1} style={{ data: { fill:  "#000" } }} data={data} x="date" y="mark"/>
          <VictoryBar key={1} style={{ data: { fill:  "#0077FF" } }} data={data}  x="date" y="savings" labels={({ datum }) => `${datum.sanction}_${datum.addition}_${datum.savings}_${datum.revised}`}/>
        </VictoryStack>
        <VictoryStack >
          <VictoryBar key={0} style={{ data: { fill:  "#fff", opacity: "0"} }} data={data} x="date" y="revised"/>
          <VictoryBar key={1} style={{ data: { fill:  "#000" } }} data={data} x="date" y="mark"/>
        </VictoryStack>
        {
          // this.props.dataPoints && //if multiple datapoints is specified via the datapoints prop,
          //   this.props.dataPoints.map((dataToY, i) =>{
          //     return(
          //       <VictoryBar
          //         colorScale={"blue"}
          //         data={this.props.data}
          //         x={this.props.dataToX}
          //         y={dataToY}
          //       />
          //     )
          //   })
        }
        </VictoryGroup>
      </VictoryChart>

      </div>

    )
  }
}

class CustomTooltip extends React.Component {
  render() {
    var { x, y, datum} = this.props;

    x = x-42;
    y = y-10;

    const width = 120;
    const height = 55;

    const dx_1 = 55;
    const dx_2 = 59;
    const padding_top = 12;
    const line_space = 10;
    const para_space = 5;

    const dy_1 = padding_top;
    const dy_2 = padding_top + line_space;
    const dy_3 = padding_top + line_space*2 + para_space;
    const dy_4 = padding_top + line_space*3 + para_space;

    return (
      <g fontSize={7}>
        <rect x={x} y={y} width={width} height={height} stroke="#dfdfdf" fill="#fff" opacity="0.8" />
        <g fontWeight={500}>
          <text x={x+dx_1} y={y+dy_1} letter-spacing="0.5" text-anchor="end"> SANCTION  : </text>
          <text x={x+dx_2} y={y+dy_1} text-anchor="start">{datum.sanction}</text>
          <text x={x+dx_1} y={y+dy_2} letter-spacing="0.5" text-anchor="end"> REVISED  : </text>
          <text x={x+dx_2} y={y+dy_2} text-anchor="start"> {datum.revised} </text>
        </g>
        <g fontWeight={400}>
          <text x={x+dx_1} y={y+dy_3} fill={orange} letter-spacing="0.5" text-anchor="end"> ADDITION  : </text>
          <text x={x+dx_2} y={y+dy_3} fill={orange} text-anchor="start"> {datum.addition} </text>
          <text x={x+dx_1} y={y+dy_4} fill={blue} letter-spacing="0.5" text-anchor="end"> SAVINGS  : </text>
          <text x={x+dx_2} y={y+dy_4} fill={blue} text-anchor="start"> {datum.savings} </text>
        </g>
      </g>

    );
  }
}

class HideFlyout extends React.Component {
  render() {
    const {x, y, orientation} = this.props;
    const newY = orientation === "bottom" ? y - 35 : y + 35;
    return (
      <g>

      </g>
    );
  }
}

export default FSASRChart;
