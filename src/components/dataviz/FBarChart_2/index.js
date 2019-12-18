import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryTooltip } from 'victory';

const sampleData = [
  {x: 1, y: 13000},
  {x: 2, y: 16500},
  {x: 3, y: 14250},
  {x: 4, y: 19000}
];

const FBarChart_2 = () => {
  return (
    <VictoryBar horizontal
      domain={{ y: [0, 10] }}
      data={sampleData}
      labels={() => "HELLO"}
      labelComponent={
        <VictoryTooltip
        />}
        />
  )
}

export default FBarChart_2;
