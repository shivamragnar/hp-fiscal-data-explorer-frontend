import React, {Component} from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';



class FBarChart extends Component {
  render() {
    return (
      <VictoryChart
        animate={{ duration: 1000, easing: "expOut" }}
        theme={VictoryTheme.material}
        domainPadding={20}
      >
        <VictoryAxis
          tickValues={this.props.xLabelPos}
          tickFormat={this.props.xLabelTxt}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryStack
          colorScale={"warm"}
        >
        {this.props.data.map((dataset, i) => {

          console.log(dataset);
            return(

                <VictoryBar
                        key={i}
                        data={dataset}
                        x={this.props.dataToX}
                        y={this.props.dataToY}
                />

            )
          })
        }
        </VictoryStack>
      </VictoryChart>

    )
  }
}

export default FBarChart;
