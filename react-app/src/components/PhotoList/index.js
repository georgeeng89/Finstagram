import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PhotoList.css'
import EditDeleteModal from '../EditDeleteModal';

const PhotoList = () => {

  const photosState = Object.values(useSelector(state => state.photos))
  // let photosObj = useSelector(state => state.photos)

  const state = useSelector(state => state)
  const user = useSelector(state => state.session.user);

  console.log('state ====================> ', state)

  console.log('photosState ------------------->', photosState)

  return (
    <>

      <div className='photo-container-outer'>

        {photosState?.reverse().map(photo => (
          <div key={photo.id} className='photo-container-inner'>

            <div className='photo-container-header'>

              <div className='caption-username'>
                {photo.username}
              </div>

              {/* <div>
                ...
              </div> */}

              {user.id === photo.user_id && <EditDeleteModal />}

              {/* <EditDeleteModal /> */}


            </div>
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
