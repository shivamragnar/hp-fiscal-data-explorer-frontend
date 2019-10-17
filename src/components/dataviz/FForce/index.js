import React, { Component, cloneElement } from 'react';
import { ForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import lesMisJSON from '../../../data/les-miserables.json';



class FForce extends Component {


  render() {
    return (


      <ForceGraph
        simulationOptions={{
          animate: true,
          strength: {
            charge: -5,
            gravity: 0

          }
        }}
      >
        {lesMisJSON.nodes.map(node => (
          <ForceGraphNode
            key={node.id}
            node={{ ...node, radius: 5 }}
          />
        ))}
        {lesMisJSON.links.map(link => (
          <ForceGraphLink
            key={`${link.source}=>${link.target}`}
            link={{ ...link, value: 2 }}
          />
        ))}
      </ForceGraph>


    )
  }
}

export default FForce;
