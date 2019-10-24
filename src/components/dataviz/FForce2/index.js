import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Axis, axisPropsFromTickScale, LEFT} from 'react-d3-axis';
import {scaleLinear} from 'd3-scale';

import * as d3 from 'd3';

var exp_summary_data = require('../../../data/exp-summary.json');


var force;

///////////////////////////////////////////////////////////
/////// Functions and variables
const width = 800;
const height = 600;
const colorArray = ["#d73027","#fdae61","#abd9e9","#74add1","#1a6cd7"];


const enterNode = (selection) => {
  selection.select('circle')
    .attr("r", d => { return Math.sqrt(d.sanctioncurrent / Math.PI) / 180 })
    // .style("fill", "#000000")
    // .style("opacity", ".7")

  // selection.select('text')
  //   .attr("dy", ".35em")
  //   .attr("dx", 12)


};


// Resolve collisions between nodes.

 function collide() {

   return function(node) {
     var radius = Math.sqrt(node.sanctioncurrent / Math.PI) / 200;
     var padding = 0;
     var r = node.radius + 16,
         nx1 = node.x - r,
         nx2 = node.x + r,
         ny1 = node.y - r,
         ny2 = node.y + r;
     return function(quad, x1, y1, x2, y2) {
       if (quad.point && (quad.point !== node)) {
         var x = node.x - quad.point.x,
             y = node.y - quad.point.y,
             l = Math.sqrt(x * x + y * y),
             r = node.radius + quad.point.radius;
         if (l < r) {
           l = (l - r) / l * 0.5;
           node.x -= x *= l;
           node.y -= y *= l;
           quad.point.x += x;
           quad.point.y += y;
         }
       }
       return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
     };
   }
 }

   function moveTowardDataPosition(alpha) {
   return function(d, index) {
     // console.log(y(d.rateOfChange));
     // console.log(index + "  |  "+ y(d.rateOfChange));
     d.y += (range[index] - d.y) * 0.1 * alpha;
   };
 }



const updateNode = (selection) => {
  // selection.attr("transform", (d) => "translate(" + d.x + "," + d.y + ")")
  // selection.attr("transform", (d, i) => "translate(" + d.x + "," + "0)")
  // console.log(force.alpha());
  // selection.each(moveTowardDataPosition(force.alpha()));
  // selection.each(collide());
  selection.select('circle')
              .attr("cx", d => d.x)
              .attr("cy", d => d.y)
              ;

  // selection.select('text')
  //             .attr("cx", d => d.x)
  //             .attr("cy", d => d.y)
  //             ;

  selection.select('g.tooltip')
              .attr("transform", d => "translate(" + d.x + "," + d.y + ")")
              ;
};



const updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode)
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

var domain = [];
var range = [];

exp_summary_data.map(demandObj => {
  domain.push(demandObj.rateOfChange);
})

exp_summary_data.map((demandObj, index) => {
  range.push(scale(demandObj.rateOfChange, minVal, maxVal, 0, height));
})

console.log(domain);
console.log(range);

var y = d3.scaleOrdinal()
  .domain(domain)
  .range(range)
// .domain([-0.22, -0.04, 0.27, 0.28, 0.31])
// .range([20, 183, 464, 473, 500])


const scaleAxis = scaleLinear().domain([0, 100]).range([0, 500]);

///////////////////////////////////////////////////////////
/////// Graph component. Holds Link and Node components

class FForce2 extends React.Component {

  constructor(props){
    super(props);

    this.state ={
      display: 'none',
      translateX: 0,
      translateY: 0
    };
  }

  componentDidMount() {
    this.d3Graph = d3.select(ReactDOM.findDOMNode(this));

    force = d3.forceSimulation(this.props.data.nodes)
      // .force("y", d3.forceY()
      //   .strength(15)
      //   .y(function (d,i) { return y(range[i]) }))
      .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
      .force("center", d3.forceCenter( width/2, height/2))
      .force("collide", d3.forceCollide()
        .strength(.1)
        .radius(d => (Math.sqrt(d.sanctioncurrent / Math.PI) / 180) + 4)
        .iterations(5)) // Force that avoids circle overlapping


    // function dragStarted(d) {
    //   if(!d3.event.active) force.alphaTarget(0.3)
    //     .restart()
    //   d.fx = d.x
    //   d.fy = d.y
    //
    // }
    //
    // function dragging(d) {
    //   d.fx = d3.event.x
    //   d.fy = d3.event.y
    // }
    //
    // function dragEnded(d) {
    //   if(!d3.event.active) force.alphaTarget(0)
    //   d.fx = null
    //   d.fy = null
    // }

    const node = d3.selectAll('g.node')
      .call(d3.drag()
        .on("start", /*dragStarted*/ null)
        .on("drag", /*dragging*/ null)
        .on("end", /*dragEnded*/ null)
      );

    force.on('tick', () => {
      this.d3Graph.call(updateGraph);
    });
  }

  showTooltip(d){
    this.setState(
      {
        display: 'block',
        translateX: d.x,
        translateY: d.y,
        sanctioncurrent: d.sanctioncurrent,
        sanctionprevious: d.sanctionprevious,
        rateOfChange: d.rateOfChange,
        demandDisplayName: d.demandid+"_"+d.demandname
      }
    )
    console.log(d);
  }

  hideTooltip(){
    this.setState({display: 'none'})
  }

  render() {

    const {display, translateX, translateY, sanctioncurrent, sanctionprevious, rateOfChange, demandDisplayName} = this.state;

    var nodes = this.props.data.nodes.map((node, index) => {
      //set a color code to each node based on rateOfChange to give it the appropriate color
      if(node.rateOfChange < 0){
        node.colorCode = 0;
      }else if(node.rateOfChange > 0 && node.rateOfChange < 0.25){
        node.colorCode = 1;
      }else if(node.rateOfChange > 0.25 && node.rateOfChange < 0.50){
        node.colorCode = 2;
      }else if(node.rateOfChange > 0.50 && node.rateOfChange < 0.75){
        node.colorCode = 3;
      }else if(node.rateOfChange > 0.75){
        node.colorCode = 4;
      }

      return (
        <Node
            index={index}
            data={node}
            cy={height - range[index]}
            key={node.id}
            display='none'
            showTooltip={this.showTooltip.bind(this)}
            hideTooltip={this.hideTooltip.bind(this)}
            color={colorArray[node.colorCode]}
        />);
    });

    return (
        <svg className="graph" width={width} height={height} style={{width: "100%"}}>
          <Axis {...axisPropsFromTickScale(scaleAxis, 5)} style={{orient: LEFT}}/>
          <g>
            {nodes}
          </g>
          <g className="tooltip"
             style={
               {
                 display:display,
                 transform: 'translate('+translateX+'px,'+translateY+'px)'
               }
             }
             id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g id="Group">
                  <rect id="Rectangle" stroke="#979797" fill="#fff" x="0.5" y="0.5" width="239" height="83"></rect>
                  <text id="Line-1" font-size="12" fill="#4A4A4A">
                      <tspan x="10" y="19">{demandDisplayName}</tspan>
                  </text>
                  <text id="Line-2" font-size="12" fill="#4A4A4A">
                      <tspan x="10" y="37">Sanction This Year: {sanctioncurrent}</tspan>
                  </text>
                  <text id="Line-3"  font-size="12"  fill="#4A4A4A">
                      <tspan x="10" y="55">Sanction Last Year: {sanctionprevious}</tspan>
                  </text>
                  <text id="Line-4"  font-size="12" font-weight="bold" fill="#4A4A4A">
                      <tspan x="10" y="73">% Change: {rateOfChange}</tspan>
                  </text>
              </g>
          </g>
        </svg>
    );
  }
}


///////////////////////////////////////////////////////////
/////// Node component

class Node extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      display: this.props.display
    };
  }

  componentDidMount() {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this))
      .datum(this.props.data)
      .call(enterNode)
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data)
      .call(updateNode)
  }




  render() {
    return (
      <g className='node'>
          <circle fill={this.props.color}  ref="dragMe" onMouseEnter={() => this.props.showTooltip(this.props.data)} onMouseLeave={this.props.hideTooltip}/>
        {
          // <circle className='node' cy ={this.props.cy} ref="dragMe" onClick={this.handle.bind(this)}/>
        }
      </g>
    );
  }
}

export default FForce2;
