import React from "react";
import sassVars from '../../../scss/_vars.scss'
import tooltipBubble from '../../../imgs/tooltipBubble.svg'
const { orange, blue, lightGrey, darkGrey, extraLightGrey, grey } = sassVars;

const FTooltipDistricts = ( { x, y, datum, datum : { gross, AGDED, BTDED, netPayment}, activeDataPoint, vizType} ) => {

  gross = gross.toLocaleString('en-IN');
  netPayment = netPayment.toLocaleString('en-IN');
  AGDED = AGDED.toLocaleString('en-IN');
  BTDED = BTDED.toLocaleString('en-IN');

  const xAxisDimension = (vizType === "FTimeSeries") ?  datum.date :  datum.districtName;

  const width = 140;
  const paddingX = 14;

  const generatePolygonPoints = () => {
    switch(vizType){
      case "FTimeSeries_" :
      return "0 0 145 0 140 6 140 96 0 96";
             // "0 0          145 0
             //              140 6
             //
             //
             //              140 96
             //  0 96"
      default:
      return "0 0 140 0 140 42 145 48 140 54 140 96 0 96";
             // "0 0        140 0
             //
             //             140 42
             //               145 48
             //             140 54
             //
             //             140 96
             // 0 96
    }

  }

  if(vizType === "FTimeSeries"){
    x = x-width-4;
    y = (3*y)/2;
  }else{
    x = x-width;
  }

  return (

    <g fontSize={7} transform={`translate(${x},${y})`}>
      <polygon
        points={generatePolygonPoints()}
        fill={extraLightGrey}
        opacity="1"/>

      <g fontWeight={600} transform="translate(0,19)" >
        <text x={paddingX} y={0} fill={darkGrey} letter-spacing="0.5" text-anchor="start"> {xAxisDimension} </text>
        <line x1={paddingX} y1={8} x2={width-paddingX} y2={8} stroke={lightGrey} />
        <text fontWeight={activeDataPoint.includes("gross") ? 700 : 500} x={paddingX} y={22} letter-spacing="0.5" text-anchor="start"> Gross  : </text>
        <text fontWeight={activeDataPoint.includes("gross") ? 700 : 500} x={width-paddingX} y={22} text-anchor="end">₹ {gross}</text>
        <text x={paddingX} y={36} letter-spacing="0.5" text-anchor="start"> AGDED  : </text>
        <text x={width-paddingX} y={36} text-anchor="end">+ ₹ {AGDED} </text>
        <text x={paddingX} y={50} letter-spacing="0.5" text-anchor="start">BTDED  : </text>
        <text x={width-paddingX} y={50} text-anchor="end">- ₹ {BTDED} </text>
        <text fontWeight={activeDataPoint.includes("netPayment") ? 700 : 500} x={paddingX} y={64}  letter-spacing="0.5" text-anchor="start"> Net  : </text>
        <text fontWeight={activeDataPoint.includes("netPayment") ? 700 : 500} x={width-paddingX} y={64}  text-anchor="end">₹ {netPayment} </text>
      </g>
    </g>

  )
}



export default FTooltipDistricts;
