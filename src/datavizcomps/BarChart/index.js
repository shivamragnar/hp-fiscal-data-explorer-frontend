import React, {Component} from "react";
import * as d3 from "d3";

class BarChart extends Component {
  componentDidMount() {
    this.drawChart();
  }

  drawChart() {
    const data = this.props.data;
    const w = 700;
    const h = 300;

    const svg = d3
      .select(this.refs.barchartwrapper)
      .append("svg")
      .attr("width", w)
      .attr("height", h);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 25)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green");

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(d => d)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d - 3);
  }

  render() {
    return <div id={"#" + this.props.id} ref="barchartwrapper"></div>;
  }
}

export default BarChart;
