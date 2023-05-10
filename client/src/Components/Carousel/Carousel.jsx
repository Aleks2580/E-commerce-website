import { Carousel } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'grey',

};
export default function SliderCarousel() {
  return (
    <Carousel style={{width: '550px', borderRadius: '5px'}} autoplay>
      <div>
        <Link to='/category/20'>
          <img style={{width: '550px', height: '160px',borderRadius: '5px' }} src='/img/sale2.png' />
        </Link>
        
      </div>
      <div>
        <Link to='/category/1'>
          <img style={{width: '550px', height: '160px', borderRadius: '5px' }} src='/img/mainblock.png' />
        </Link>
      </div>
    </Carousel>
  );
}
