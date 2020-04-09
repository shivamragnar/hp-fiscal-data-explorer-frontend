import React, {useState, useEffect, Fragment} from "react";
import {Tabs, Tab } from 'carbon-components-react';
import {Link} from "react-router-dom";

import didYouKnowContent from '../../../data/didYouKnowContent.json';
import placeholder from '../../../imgs/did_you_know_img_ph.svg';

const DidYouKnow = (props) => {

const handleTabClick = e => console.log(e.target.value);

const imgs = {
  placeholder
}

const [activeIdx, setActiveIdx] = useState(0);

const autoUpdateIdx = () => {
  console.log('ran again');
  setInterval(() => updateActiveIdx(), 2000);
}

const updateActiveIdx = () => {
    function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  console.log(getRandomInt(didYouKnowContent.length));
  setActiveIdx(getRandomInt(didYouKnowContent.length));
}

useEffect(() => {
  autoUpdateIdx();
},[])

  return (
    <div className='did-you-know-wrapper'>
      <h1>Did You Know!</h1>
      <div className='bx--row'>
        <div className='f-did-you-know-content-wrapper bx--col-lg-6'>
        { didYouKnowContent.map((d,i) => (
            <div
              className='did-you-know-slide did-you-know-slide--text'
              style={{transform: `translateX(${-1*activeIdx*100}%)`}}
              >
            { d.content.map(datum => <p className='f-did-you-know__body' style={{fontStyle : 'italic'}}>{datum}</p>)}
            { d.link && <Link className='f-link f-did-you-know__link' to={d.link.route}>{d.link.text}</Link>}
            </div> )) }
        </div>
        <div className='f-did-you-know-content-wrapper f-did-you-know-content-wrapper--img bx--col-lg-6'>
        { didYouKnowContent.map((d,i) => (
            <div
              className='did-you-know-slide did-you-know-slide--img'
              style={{opacity: i === activeIdx ? 1 : 0 }}
              >
              <img src={imgs[d.img]} />
            </div>
          )) }
        </div>
      </div>
		</div>
  );
}
export default DidYouKnow;
