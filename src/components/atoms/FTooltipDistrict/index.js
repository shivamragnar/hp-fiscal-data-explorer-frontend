import React from "react";
import sassVars from '../../../scss/_vars.scss'
const { orange, blue, lightGrey, darkGrey, extraLightGrey, grey } = sassVars;

const FTooltipDistrict = ( { x, y } ) => {

  // receipt = receipt.toLocaleString('en-IN');

  const width = 145;
  const paddingX = 14;

  x = x-width-5;



  return (

    <g fontSize={7} transform={`translate(${x},${y})`}>
      <polygon

        points=
          "0 0        140 0

                      140 22
                        145 28
                      140 34

                      140 56
          0 56"

        fill={extraLightGrey}
        opacity="1"
        />

      <g fontWeight={600} transform="translate(0,19)" >
        <text x={paddingX} y={0} fill={darkGrey}  letter-spacing="0.5" text-anchor="start"> "some date" </text>
        <line x1={paddingX} y1={8} x2={width-paddingX} y2={8} stroke={lightGrey} />
        <g fontWeight={700}>
          <text x={paddingX} y={24}  letter-spacing="0.5" text-anchor="start"> RECEIPT  : </text>
          <text x={width-paddingX} y={24}  text-anchor="end">₹ "some amount" </text>
        </g>
      </g>
    </g>
  )
}



export default FTooltipDistrict;
