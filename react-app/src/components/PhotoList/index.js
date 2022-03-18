import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PhotoList.css'

const PhotoList = () => {

  let photosState = Object.values(useSelector(state => state.photos))
  // let photosObj = useSelector(state => state.photos)

  let state = useSelector(state => state)

  console.log('state ====================> ', state)

  console.log('photosState ------------------->', photosState)

  return (
    <>

      <div className='photo-container-outer'>

        {photosState?.reverse().map(photo => (
          <div key={photo.id} className='photo-container-inner'>
            <div className='caption-username'>{photo.username}</div>

            <img className='picture' src={photo.url} />

            <div className='caption-container'>
              <div className='caption-username'>{photo.username}</div>
              <div className='caption'>{photo.caption}</div>
            </div>

          </div>
        ))}

      </div>
    </>
  );
};

export default PhotoList;
