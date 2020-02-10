import React from "react";
import sassVars from '../../../scss/_vars.scss'
import tooltipBubble from '../../../imgs/tooltipBubble.svg'
const { orange, blue, lightGrey, darkGrey, extraLightGrey, grey, black, white } = sassVars;

const FTooltipDistricts = ( { x, y, datum, datum : { gross, AGDED, BTDED, netPayment}, activeDataPoint, vizType, totalTicks} ) => {

  gross = gross.toLocaleString('en-IN');
  netPayment = netPayment.toLocaleString('en-IN');
  AGDED = AGDED.toLocaleString('en-IN');
  BTDED = BTDED.toLocaleString('en-IN');


  console.log(totalTicks);
  const firsthalf = () => {
    if(datum._voronoiX > totalTicks/2){
      return false;
    }else{
      return true;
    }
  }

  const xAxisDimension = (vizType === "FTimeSeries") ?  datum.date :  datum.districtName;

  const width = 140;
  const paddingX = 14;

  const generatePolygonPoints = () => {
    switch(vizType){
      case "FTimeSeries" :
      switch(true){
        case firsthalf() === true :
        return "-5 0 140 0 140 96 0 96 0 5";
        default:
        return "0 0 145 0 140 6 140 96 0 96";
      }
      return;
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
    if(firsthalf() === true){
      x = x+4;
    }else{
      x = x-width-4;
    }

    // y = (3*y)/2;
  }else{
    x = x-width;
  }

  return (

    <g fontSize={7} transform={`translate(${x},${y})`}>
      <polygon
        points={generatePolygonPoints()}
        fill={black}
        opacity="1"/>

      <g fontWeight={500} transform="translate(0,19)" fill={white} >
        <text x={paddingX} y={0} fill={darkGrey} letter-spacing="0.5" text-anchor="start"> {xAxisDimension} </text>
        <line x1={paddingX} y1={8} x2={width-paddingX} y2={8} stroke={darkGrey} />
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
