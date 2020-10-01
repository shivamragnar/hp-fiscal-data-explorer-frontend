import React, {Component, Fragment} from "react";
import { Button } from "carbon-components-react";
import { darkGrey, black, orange, blue, legend_point_1, legend_point_2, legend_point_3, legend_point_4, legend_point_5 } from '../../../scss/_vars.scss'


const FLegendBar = (props) => {

  console.log(props);

  const colors = {
    darkGrey,
    black,
    orange,
    blue,
    legend_point_1,
    legend_point_2,
    legend_point_3,
    legend_point_4,
    legend_point_5,
  }


  const genLegend = () => {
    switch(true){
      case props.vizType === 'bar' || props.vizType === 'bubble':
      return (
        <Fragment>
        {props.data.map((d,i) =>( 
        <Fragment>
        { d.type === 'grooveLeft' && (
          <div className='f-legend-item--flex'>
            <div
              className='groove-icon--groove'
              style={{
                borderBottom: `6px solid ${colors[d.color[0]]}`,
                borderRight: `6px solid ${colors[d.color[1]]}`}}
                >
            </div>
            <div className='groove-text'>{d.key}</div>
          </div>
        )}
        { d.type === 'grooveRight' && (
          <div className='f-legend-item--flex'>
            <div
              className='groove-icon--groove'
              style={{
                borderLeft: `6px solid ${colors[d.color[0]]}`,
                borderBottom: `6px solid ${colors[d.color[1]]}`
                }}
                >
            </div>
            <div className='groove-text'>{d.key}</div>
          </div>
        )}
        { d.type === 'bubble' && (
          <div className='f-legend-item--flex'>
            <div
              className='groove-icon--bubble'
              style={{
                borderRadius: `50%`,
                backgroundColor: colors[d.color]
                }}
                >
            </div>
            <div className='groove-text'>{d.key}</div>
          </div>
        )}
        { d.type === 'bar' && <div key={i} className='f-legend-item' style={{borderLeft: d.type === 'bar' && `6px solid ${colors[d.color]}`}}>{d.key}</div>}
        </Fragment>
        ))}
        </Fragment>
      )
      case props.vizType === 'map':
      return (
        <div style={{display: 'flex' }}>
          <div style={{paddingRight: '1rem'}}>{props.data.key[0]}</div>
          <div style={{width: '8rem', background: `linear-gradient(0.25turn, ${props.data.color[0]}, ${props.data.color[1]})` }}></div>
          <div style={{paddingLeft: '1rem'}}>{props.data.key[1]}</div>
        </div>)
      case props.vizType === "procurement_map": 
      return (
        <Fragment>
        {props.showTitle ? <div className="legend-title-text">{props.showTitle}</div> : null }
        <div className="d-flex flex-wrap">
        {props.data.map((d,i) =>( 
          <div className='f-legend-item--flex'>
            <div
              className='groove-icon--bubble'
              style={{
                borderRadius: `50%`,
                backgroundColor: colors[d.color]
              }}
            >
            </div>
            <div className='groove-text'>{d.key}</div>
          </div>
          ))}
        </div>
          </Fragment>
      )
      default : return <></>
    }
  }

  return(
    <div className='f-legend-bar'>
  { genLegend() }
    </div>
  )
}

export default FLegendBar;
