import React, {useState, useEffect, Fragment} from "react";
import {Tabs, Tab } from 'carbon-components-react';
import {Link, useHistory} from "react-router-dom";
import FButton from '../../atoms/FButton';
import DidYouKnow from '../DidYouKnow';

import howToUseContent from '../../../data/howToUseContent.json';
import placeholder from '../../../imgs/placeholder.jpg';


const HomeHowToUse = (props) => {

const [screenWidth, setScreenWidth ] = useState(window.innerWidth);
  
const history = useHistory();

const handleClick = linkRoute => history.push(linkRoute);

const imgs = { placeholder }

const createImg = (img) => (
  <div className='f-tab-content__img_wrapper bx--col-lg-6'>
    <img className='f-tab-content__img' src={img}/>
  </div>
)

const createText = (title, body, linkRoute, linkText, padding) => {

  return(
    <div className='f-tab-content__text-wrapper bx--col-lg-6' style={{[`padding${padding[0]}`] : padding[1]}}>
      <h4 className='f-tab-content__title'>{title}</h4>
      { body.map(datum => (
        <p className='f-tab-content__body'>{datum}</p>
      )) }
      {/*<Link className='f-link f-tab-content__link' to={linkRoute}>{linkText}</Link>*/}
      <div style={{marginTop: '2rem'}}><FButton onClick={() => handleClick(linkRoute)}>{linkText}</FButton></div>
    </div>
  )
}

  return (

      <Fragment>

        {
          howToUseContent.map((d, i) => {
            let img = imgs[d.content.img];
            console.log(screenWidth);
            return (
              <Fragment>
                <div className="f-tab-content-wrapper">
                  <div className='bx--row' style={{ alignItems: 'center'}}>
                  { screenWidth <= 1055
                  ? <Fragment>
                      { createText(d.content.title, d.content.body, d.content.link.route, d.content.link.text, ['Right', '0']) }
                      { createImg(img) }
                    </Fragment>
                  : <Fragment>
                    { (i+1)%2 === 1
                    ? <Fragment>
                      { createText(d.content.title, d.content.body, d.content.link.route, d.content.link.text, ['Right', '5rem']) }
                      { createImg(img) }
                      </Fragment>
                    : <Fragment>
                      { createImg(img) }
                      { createText(d.content.title, d.content.body, d.content.link.route, d.content.link.text, ['Left', '5rem']) }
                      </Fragment> }
                    </Fragment>
                  }


                  </div>
                </div>
                {i === 1 && <DidYouKnow /> }
              </Fragment>
            )
          })
        }
			</Fragment>

  );
}
export default HomeHowToUse;
