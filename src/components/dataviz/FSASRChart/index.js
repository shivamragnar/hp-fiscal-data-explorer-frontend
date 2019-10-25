import React, {PropTypes, Component} from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryGroup, VictoryLabel } from 'victory';

const tickLabelStyle = {
  fontFamily: 'IBM Plex Sans',
  fontSize: '7px'
  }

  const testData = [

    	{ month: "Jan", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	{ month: "Feb", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	{ month: "Mar", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	{ month: "Apr", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	{ month: "May", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	// { month: "Jun", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	// { month: "Jul", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	// { month: "Aug", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	// { month: "Sep", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	// { month: "Oct", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	// { month: "Nov", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 },
    	// { month: "Dec", sanction: 3000, addition: 300, saving: 400, revision: 2900, mark: 20 }

  ]

class FSASRChart extends Component {

  static defaultProps = {
      //yLabelFormat mnust be an array of 3. each value representing  'prefix', 'suffix' and multiplier
      yLabelFormat: ["","",1],
      barWidth: 5
   };

  render() {


  const getBarData = [

        { "month": "Jan", "sanction": 0.6842085139548607, "mark": 0.6842085139548607, "gh": 0.6842085139548607 },
        { "month": "Feb", "sanction": 0.6842085139548607, "mark": 0.6842085139548607, "gh": 0.6842085139548607 },
        { "month": "Mar", "sanction": 0.6842085139548607, "mark": 0.6842085139548607, "gh": 0.6842085139548607 },
        { "month": "Apr", "sanction": 0.6842085139548607, "mark": 0.6842085139548607, "gh": 0.6842085139548607 },


    ]


    return (
      <div>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={{x: 20}}
        width= {600}
        height= {300}
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
          offset={this.props.barWidth}
          style={{ data: { width: this.props.barWidth } }}
        >
        <VictoryStack >
          <VictoryBar key={0} style={{ data: { fill:  "#fff" } }} data={testData} x="month" y="sanction"/>
          <VictoryBar key={1} style={{ data: { fill:  "#000" } }} data={testData} x="month" y="mark"/>
        </VictoryStack>
        <VictoryStack >
          <VictoryBar key={0} style={{ data: { fill:  "#fff" } }} data={testData} x="month" y="sanction"/>
          <VictoryBar key={1} style={{ data: { fill:  "#000" } }} data={testData} x="month" y="mark"/>
          <VictoryBar key={2} style={{ data: { fill:  "#FF6100" } }} data={testData} x="month" y="addition"/>
        </VictoryStack>
        <VictoryStack >
          <VictoryBar key={0} style={{ data: { fill:  "#fff" } }} data={testData} x="month" y="revision"/>
          <VictoryBar key={1} style={{ data: { fill:  "#000" } }} data={testData} x="month" y="mark"/>
          <VictoryBar key={1} style={{ data: { fill:  "#0077FF" } }} data={testData}  x="month" y="saving"/>
        </VictoryStack>
        <VictoryStack >
          <VictoryBar key={0} style={{ data: { fill:  "#fff" } }} data={testData} x="month" y="revision"/>
          <VictoryBar key={1} style={{ data: { fill:  "#000" } }} data={testData} x="month" y="mark"/>
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

export default FSASRChart;
