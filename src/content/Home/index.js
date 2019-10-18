import React, { Component } from "react";


import ReactDOM from 'react-dom';

//custom components
import FBubble from '../../components/dataviz/FBubble';
import * as d3 from "d3";

//sample data
var exp_summary_data = require('../../data/exp-summary.json');

///////////////////////////////////////////////////////////
/////// Functions and variables
const width = 1080;
const height = 1000;
const color = d3.scaleOrdinal(d3.schemeCategory10);


const enterNode = (selection) => {
  selection.select('circle')
    .attr("r", d => { return Math.sqrt(d.sanctioncurrent / Math.PI) / 100 })
    .style("fill", "#000000")
    .style("opacity", ".7")


  selection.select('text')
    .attr("dy", ".35em")
    .style("transform", "translateX(-50%,-50%")
};


const updateNode = (selection) => {

  selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")

};

const enterLink = (selection) => {
  selection.attr("stroke-width", 2)
    .style("stroke", "yellow")
    .style("opacity", ".2")
};

const updateLink = (selection) => {
  selection
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
};

const updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode)
  selection.selectAll('.link')
    .call(updateLink);
};

const scale = (num, in_min, in_max, out_min, out_max) => {
  return Math.round((num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min);
}


//extract min and max val from data;
var minVal;
var maxVal;

exp_summary_data.map((demandObj, index) => {

  if(index === 0) {
    minVal = demandObj.rateOfChange;
    maxVal = demandObj.rateOfChange;
  }
  if(demandObj.rateOfChange < minVal) {
    minVal = demandObj.rateOfChange;
  }
  if(demandObj.rateOfChange > maxVal) {
    maxVal = demandObj.rateOfChange;
  }

})

console.log("MIN VAL IS " + minVal);
console.log("MAX VAL IS " + maxVal);
console.log("og rateOfChange vals: ")

var domain = [];
var range = [];

exp_summary_data.map(demandObj => {

  domain.push(demandObj.rateOfChange);
})
console.log(domain);
console.log("scaled rateOfChange vals: ")
exp_summary_data.map((demandObj, index) => {
  range.push(scale(demandObj.rateOfChange, minVal, maxVal, 20, 500));
})
console.log(range);


var y = d3.scaleOrdinal()
  .domain(domain)
  .range(range)
// .domain([-0.22, -0.04, 0.27, 0.28, 0.31])
// .range([20, 183, 464, 473, 500])


////////////////////////////////////////////////////////////////////////////
/////// App component. Hold graph data in state and renders Graph component.
/////// Graph component in turn renders Link and Node components.

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {
        "nodes": exp_summary_data
          /*[
            { "sanctioncurrent": 100, "rateOfChange": 1 },
            { "sanctioncurrent": 50, "rateOfChange": 2 },
            { "sanctioncurrent": 70, "rateOfChange": 3 },
            { "sanctioncurrent": 80, "rateOfChange": 4 },
          ]*/
          ,
        "links": [

        ]
      }
    }
  }

  render() {
    return (
      <div>
      <div style={{width:"50%"}}>
        <FBubble  />
      </div>
      <div className="graphContainer">
                <Graph data={this.state.data} />
            </div>
    </div>
    )
  }
}

///////////////////////////////////////////////////////////
/////// Graph component. Holds Link and Node components

class Graph extends React.Component {

  componentDidMount() {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this));

    var force = d3.forceSimulation(this.props.data.nodes)
      // .force("y", d3.forceY()
      //   .strength(15)
      //   .y(function (d) { return y(d.rateOfChange) }))
      // .force("charge", d3.forceManyBody()
      //   .strength(1)) // Nodes are attracted one each other of value is > 0
      .force("link", d3.forceLink(this.props.data.links)
        .distance(90))
      .force("center", d3.forceCenter()
        .x(width / 2)
        .y(height / 2)) // Attraction to the center of the svg area

      .force("collide", d3.forceCollide()
        .strength(.1)
        .radius(d => (Math.sqrt(d.sanctioncurrent / Math.PI) / 100))
        .iterations(5)) // Force that avoids circle overlapping


    function dragStarted(d) {
      if(!d3.event.active) force.alphaTarget(0.3)
        .restart()
      d.fx = d.x
      d.fy = d.y

    }

    function dragging(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragEnded(d) {
      if(!d3.event.active) force.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    const node = d3.selectAll('g.node')
      .call(d3.drag()
        .on("start", /*dragStarted*/ null)
        .on("drag", /*dragging*/ null)
        .on("end", /*dragEnded*/ null)
      );


    force.on('tick', () => {
      this.d3Graph.call(updateGraph)
    });
  }

  render() {
    var nodes = this.props.data.nodes.map((node, index) => {
      return (
        <Node
                data={node}
                name={node.name}
                cy={range[index]}
                key={node.id}
            />);
    });
    var links = this.props.data.links.map((link, i) => {
      return (
        <Link
                    key={link.target+i}
                    data={link}
                />);
    });
    return (
      <svg className="graph" width={width} height={height}>
                <g>
                    {nodes}
                </g>
                <g>
                    {links}
                </g>
            </svg>
    );
  }
}

///////////////////////////////////////////////////////////
/////// Link component

class Link extends React.Component {

  componentDidMount() {
    this.d3Link = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(enterLink);
  }

  componentDidUpdate() {
    this.d3Link.datum(this.props.data)
      .call(updateLink);
  }

  render() {
    return (
      <line className='link' />
    );
  }
}

///////////////////////////////////////////////////////////
/////// Node component

class Node extends React.Component {

  componentDidMount() {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(enterNode)
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(updateNode)
  }

  handle(e) {
    console.log(this.props.data.id + ' been clicked')
  }

  render() {
    return (
      <g className='node'>
                <circle  ref="dragMe" onClick={this.handle.bind(this)}/>
                {
                  // <circle cy ={this.props.cy} ref="dragMe" onClick={this.handle.bind(this)}/>
                  // <text>{this.props.data.name}</text>
                }
            </g>
    );
  }
}

export default Home;
