import React from "react";
import sassVars from '../../../scss/_vars.scss'
const { orange, blue } = sassVars;

const FTooltipReceipts = ( { x, y, datum} ) => {

  x = x-42;
  y = y-10;

  const width = 120;
  const height = 30;

  const dx_1 = 55;
  const dx_2 = 59;
  const padding_top = 12;
  const line_space = 10;
  const para_space = 5;

  const dy_1 = padding_top;
  const dy_2 = padding_top + line_space;
  const dy_3 = padding_top + line_space*2 + para_space;
  const dy_4 = padding_top + line_space*3 + para_space;

  return (

    <g fontSize={7}>
      <rect x={x} y={y} width={width} height={height} stroke="#dfdfdf" fill="#fff" opacity="0.9" />
      <g fontWeight={400}>
        <text x={x+dx_1} y={y+dy_1} letter-spacing="0.5" text-anchor="end"> DATE  : </text>
        <text x={x+dx_2} y={y+dy_1} text-anchor="start">{datum.date}</text>

      </g>
      <g fontWeight={500}>
        <text x={x+dx_1} y={y+dy_2} letter-spacing="0.5" text-anchor="end"> RECEIPT  : </text>
        <text x={x+dx_2} y={y+dy_2} text-anchor="start"> {datum.receipt} </text>
      </g>
    </g>

  )
}



export default FTooltipReceipts;
