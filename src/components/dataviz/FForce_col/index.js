import React from 'react';
import ReactDOM from 'react-dom';

import * as d3 from 'd3';


///////////////////////////////////////////////////////////
/////// Functions and variables
// const width = 800;
// const height = 600;
const colorArray = ["#d73027","#fdae61","#abd9e9","#74add1","#1a6cd7"];


	var width = 800;
  var height = 800;
	var padding = 5;


var scale = d3.scaleLinear()
	.domain([0, 29])
	.range([padding, height - padding]);


const enterNode = (selection) => {
  selection.select('circle')
    .attr("r", 2)
};

const updateNode = (selection) => {
  selection.select('circle')
              .attr("cx", d => d.x)
              .attr("cy", d => d.y);

};

const updateGraph = (selection) => {
  selection.selectAll('.node')
    .call(updateNode)
};

///////////////////////////////////////////////////////////
/////// Graph component. Holds Node components

class FForce_col extends React.Component {

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

    // console.log(this.props.data.nodes);

    var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(1))
    .force("xPos", d3.forceX(d => scale(d.x)).strength(0.1))
    .force("yPos", d3.forceY(d => scale(d.y)).strength(0.1))
    .force("collide", d3.forceCollide(d => d.radius * 1.2).strength(1))
    ;


    simulation.nodes(this.props.data.nodes)
      .on('tick', () => {
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
            key={index}
            display='none'
            color={colorArray[node.colorCode]}
        />);
    });

    return (
        <svg className="graph"
             width={width}
             height={height}
             viewBox={"0,0,"+width+','+height}
             style={{width: "100%", height: "auto"}}>
          <g>
            {nodes}
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

  //the of code had the below componentDidUpdate function, but I can't identify what its doing really, so commented it out.
  // componentDidUpdate() {
  //   this.d3Node.datum(this.props.data)
  //     .call(updateNode)
  // }

  render() {
    return (
      <g className='node'>
          <circle
            fill={this.props.color}
          />
      </g>
    );
  }
}

export default FForce_col;
