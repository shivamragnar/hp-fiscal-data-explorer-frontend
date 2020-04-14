import React, {Fragment, useState} from "react";

import aboutus from '../../data/aboutus.json';

import arun_img from '../../imgs/arun_img.jpg';
// import gaurav_img from '../../imgs/gaurav.jpg';

const AboutUs = () => {

  const imgs = {
    arun_img,
    // gaurav_img
  }

  return(
    <div className="f-content aboutus bx--grid">
      <div className='bx--offset-lg-1 bx--col-lg-10 about-us-content-wrapper'>
        <h1 style={{ fontWeight: '500'}}>About Us</h1>
        <div className='bx--row about-us-content' >
          { aboutus.map( (d, i) => (
            <div key={i} className='bx--col-lg-4 f-person-card'>
              <div className='f-person-card__img-wrapper' style={{width:'100%'}}>
                <img src={imgs[d.img]} alt="" />
              </div>
              <div className='f-person-card__text-wrapper'>
              <h3 className='f-person-card__name'>{d.name}</h3>
              <p className='f-person-card__desc'>{d.desc}</p>
              </div>
            </div>
          )) }

        </div>
      </div>
    </div>
  )

}

export default AboutUs;
