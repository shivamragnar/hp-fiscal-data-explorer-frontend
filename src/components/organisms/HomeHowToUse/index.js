import React, {useState, Fragment} from "react";
import {Tabs, Tab } from 'carbon-components-react';
import {Link} from "react-router-dom";

import howToUseContent from '../../../data/howToUseContent.json';
import placeholder from '../../../imgs/placeholder.jpg';

const HomeHowToUse = (props) => {

const handleTabClick = e => console.log(e.target.value);

const imgs = {
  placeholder
}

const createImg = (img) => (
  <div className='f-tab-content__img_wrapper bx--col-lg-6'>
    <img className='f-tab-content__img' src={img}/>
  </div>
)

const createText = (title, body, linkRoute, linkText) => (
  <div className='f-tab-content__text-wrapper bx--col-lg-6'>
    <h4 className='f-tab-content__title'>{title}</h4>
    { body.map(datum => (
      <p className='f-tab-content__body'>{datum}</p>
    )) }
    <Link className='f-link f-tab-content__link' to={linkRoute}>{linkText}</Link>
  </div>
)

  return (

      <Fragment>

        {
          howToUseContent.map((d, i) => {
            let img = imgs[d.content.img];
            return (
              <div className="f-tab-content-wrapper">
                <div className='bx--row' style={{ alignItems: 'center'}}>
                { (i+1)%2 === 1
                ? <Fragment>
                  { createText(d.content.title, d.content.body, d.content.link.route, d.content.link.text) }
                  { createImg(img) }
                  </Fragment>
                : <Fragment>
                  { createImg(img) }
                  { createText(d.content.title, d.content.body, d.content.link.route, d.content.link.text) }
                  </Fragment>
                }

                </div>
              </div>
            )
          })
        }
			</Fragment>

  );
}
export default HomeHowToUse;
