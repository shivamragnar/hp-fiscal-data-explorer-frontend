import React, { Component } from "react";
import { render } from "react-dom";
import { VictoryScatter, VictoryChart, VictoryTheme, VictoryAxis, VictoryLabel } from "victory";

var exp_summary_data = require('../../data/exp-summary.json');

const tickLabelStyle = {
  fontFamily: "IBM Plex Sans",
  fontSize: "7px"
};


const data2 = [
  { sanctionprevious: 1, rateOfChange: 2, sanctioncurrent: 30 },
  { sanctionprevious: 2, rateOfChange: 3, sanctioncurrent: 40 },
  { sanctionprevious: 3, rateOfChange: 5, sanctioncurrent: 25 },
  { sanctionprevious: 4, rateOfChange: 4, sanctioncurrent: 10 },
  { sanctionprevious: 5, rateOfChange: 7, sanctioncurrent: 45 }
]

const data = [
  { sanctioncurrent: 100, sanctionprevious: 1, rateOfChange: 2 },
  { sanctioncurrent: 5, sanctionprevious: 5, rateOfChange: 4 },
  { sanctioncurrent: 9, sanctionprevious: 4000, rateOfChange: 1 }
]

class FBubble extends Component {

  static defaultProps = {
    //yLabelFormat mnust be an array of 3. each value representing  'prefix', 'suffix' and multiplier
    tickFormatY: ["", "", 100],
    height: 300,
    width: 300,
    padding: { top: 20, left: 75, right: 75, bottom: 50 }
  };


  render() {

    const { height, width, padding, tickFormatY, tickFormatX, data } = this.props;
    return (
      <VictoryChart
        animate={{duration: 1000, easing: "expOut"}}
        height={height}
        width={width}
        padding={padding}

      >


        <VictoryAxis
          key={0}
          dependentAxis
          offsetX={padding.left-20}
          tickLabelComponent={<VictoryLabel dx={5} style={tickLabelStyle} />}
          tickFormat={y => tickFormatY[0] + y * tickFormatY[2] + tickFormatY[1]}
        />

        <VictoryScatter

          style={{ data: { fill: "#c43a31", opacity: "0.5" } }}
          maxBubbleSize={25}
          minBubbleSize={5}
          bubbleProperty="sanctioncurrent"
          data={exp_summary_data}
          x="sanctionprevious"
          y="rateOfChange"
        />
      </VictoryChart>

    );
  }
}

export default FBubble;
