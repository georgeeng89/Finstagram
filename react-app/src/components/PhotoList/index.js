import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PhotoList.css'

const PhotoList = () => {

  let photosState = useSelector(state => state.photos)

  return (
    <>

      <div className='photo-container-outer'>

        {photosState?.photos?.map(photo => (
          <div key={photo.id} className='photo-container-inner'>
            <div className='caption-username'>{photo.username}</div>
            {/* {console.log('photo username ============>,', photo.username)} */}
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
