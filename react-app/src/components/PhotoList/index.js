import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './PhotoList.css'
import EditDeleteModal from '../EditDeleteModal';
import AddCommentForm from '../AddCommentForm';

const PhotoList = () => {

  const photosState = Object.values(useSelector(state => state.photos))
  const commentState = Object.values(useSelector(state => state.comments))

  console.log('COMMENTS ========> ', commentState)
  // let photosObj = useSelector(state => state.photos)

  commentState.forEach(comment => console.log('MY COMMENT!!!', comment))

  const state = useSelector(state => state)
  const user = useSelector(state => state.session.user);

  // console.log('state ====================> ', state)

  // console.log('photosState ------------------->', photosState)

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

              {user?.id === photo.user_id && <EditDeleteModal photoId={photo.id} photoUrl={photo.url} photoCaption={photo.caption} />}

              {/* <EditDeleteModal /> */}
              {/* <i class="fas fa-heart"></i> */}
              {/* <i class="fa-solid fa-heart"></i> */}
            </div>
            <img className='picture' src={photo.url} />

            <div className='caption-container'>
              <div className='caption-username'>{photo.username}</div>
              <div className='caption'>{photo.caption}</div>
            </div>

            {commentState.map(comment => {

              if (comment.photo_id === photo.id) {
                return (<>
                  < div className='comment-container'>
                    <p>{comment.username}</p>
                    <p>{comment.content}</p>
                  </div>
                </>)
              }

            })}


            <div className='caption-container'>
              <i class="far fa-smile"></i>

              {/* <input className='placeholder'></input>
              <p>Post</p> */}
              <AddCommentForm photoId={photo.id} userId={user.id} />
            </div>

          </div>
        ))}

      </div>
    </>
  );
};

export default PhotoList;
