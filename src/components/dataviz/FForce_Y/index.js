import React from 'react';
import ReactDOM from 'react-dom';

import * as d3 from 'd3';


class FForce_Y extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    this.drawChart();
    console.log("propnodes");
    console.log(this.props.nodes);
  }

  componentWillUnmount(){
    console.log("remove svg");
    d3.selectAll("svg").remove();
  }

  drawChart(){
    var n = 10,
    	width = 800,
      height = 1300,
    	padding = 100,
    	nodes = [

      ];

    for (var y = 0; y < n; y++) {
    	for (var x = 0; x < n; ++x) {
    		nodes.push({
    			x: 0,
    			y: y,
    		})
    	}
    }
    console.log("this.props.nodes");
    console.log(this.props.nodes);

    var svg = d3.select(".data-viz-wrapper")
    	.append("svg")
    	.attr("width", width)
    	.attr("height", height)
      .append("g");
      // .attr("transform", "translate(" + width / 2 + "," + width / 2 + ")");

    var scale = d3.scaleLinear()
    	.domain([-30, 150])
    	.range([padding, height - padding]);

    var simulation = d3.forceSimulation()
    	.force("charge", d3.forceManyBody().strength(1))
    	.force("xPos", d3.forceX(width/2).strength(1))
    	.force("yPos", d3.forceY(d => scale(d.pct_change)).strength(1))
    	.force("collide", d3.forceCollide(d => d.radius + 5).strength(1))
      ;

    var circles = svg.selectAll("foo")
    	.data(this.props.nodes)
    	.enter()
    	.append("circle")
    	.attr("fill", "darkslateblue")
    	// .attr("r", d => {d.radius = d.sanction_current/10000000; return d.radius} )
      .attr("r", d => {d.radius = Math.sqrt(d.sanction_current / Math.PI) / 240; return d.radius} )
    	.call(d3.drag()
    		.on("start", dragstarted)
    		.on("drag", dragged)
    		.on("end", dragended));

    simulation.nodes(this.props.nodes)
    	.on("tick", ticked);

    function ticked() {
    	circles.attr("cx", d => d.x).attr("cy", d => d.y)
    }

    function dragstarted(d) {
    	if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    	d.fx = d.x;
    	d.fy = d.y;
    }

    function dragged(d) {
    	d.fx = d3.event.x;
    	d.fy = d3.event.y;
    }

    function dragended(d) {
    	if (!d3.event.active) simulation.alphaTarget(0);
    	d.fx = null;
    	d.fy = null;
    }
  }

  render() {
    return (
      <div className=""></div>
    )
  }
}

export default FForce_Y;
