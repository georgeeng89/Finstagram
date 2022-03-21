import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditDeleteModal from '../EditDeleteModal';
import AddCommentForm from '../AddCommentForm';
import { useHistory } from 'react-router-dom';

import './PhotoList.css'

const PhotoList = () => {

  const photosState = Object.values(useSelector(state => state.photos))
  const commentState = Object.values(useSelector(state => state.comments))

  // console.log('COMMENTS ========> ', commentState)
  // let photosObj = useSelector(state => state.photos)

  // commentState.forEach(comment => console.log('MY COMMENT!!!', comment))

  const state = useSelector(state => state)
  const user = useSelector(state => state.session.user);

  const history = useHistory();

  let commentCount = 0;
  let numberOfComments = 0;
  let viewComments = false;
  let date = new Date();
  let timestamp = false;

  // console.log('state ====================> ', state)
  // console.log('photosState ------------------->', photosState)

  if(!user){
    history.push('/login')
  }

  return (
    <>

      <div className='photo-container-outer'>

        {photosState?.reverse().map(photo => (




          <div key={photo?.id} className='photo-container-inner'>
            <div className='commentCounter'>
              {commentCount = 0}
              {viewComments = true}
              {numberOfComments = 0}
              {timestamp = false}
            </div>
            <div className='photo-container-header'>

              <div className='caption-username'>
                {photo.username}
              </div>

              {/* <div>
                ...
              </div> */}

              {user?.id === photo.user_id && <EditDeleteModal photoId={photo?.id} photoUrl={photo?.url} photoCaption={photo.caption} />}

              {/* <EditDeleteModal /> */}
              {/* <i class="fas fa-heart"></i> */}
              {/* <i class="fa-solid fa-heart"></i> */}

            </div>
            <img className='picture' src={photo.url} />

            <div className='caption-container'>
              <div className='caption-username'>{photo.username}</div>
              <div className='caption'>{photo.caption}</div>
            </div>

            {commentState.forEach(comment => {
              if (comment.photo_id === photo.id) {
                numberOfComments++
              }
            })}

            {commentState.reverse().map(comment => {

              if (numberOfComments > 3 && viewComments === true) {
                viewComments = false;
                return (
                  <div className='view-all-comments'>View All {numberOfComments} Comments (this will open a modal when clicked)</div>
                )
              }

              if (comment.photo_id === photo.id && commentCount <= 2) {
                return (
                  <>
                    < div className='comment-container'>
                      <div className='comment-username'>{comment.username}</div>
                      <div className='comment'>{comment.content}</div>
                    </div>

                    <div className='commentCounter'>
                      {commentCount++}
                    </div>
                  </>)
              }



            })}

            <div className='timestamp'>

              {/* <div>{photo.created_at}</div>
              <div>{date.toGMTString()}</div> */}

              {(timestamp === false) && date.toGMTString().split(' ')[1] - photo.created_at.split(' ')[1] > 1 && (
                <>
                  <div>
                    {date.toGMTString().split(' ')[1] - photo.created_at.split(' ')[1]} DAYS AGO
                  </div>
                  <div className='commentCounter'>
                    {timestamp = true}
                  </div>
                </>
              )}

              {(timestamp === false) && date.toGMTString().split(' ')[4].split(':')[0] - photo.created_at.split(' ')[4].split(':')[0] > 1 && (
                <>
                  <div>
                    {date.toGMTString().split(' ')[4].split(':')[0] - photo.created_at.split(' ')[4].split(':')[0]} HOURS AGO
                  </div>
                  <div className='commentCounter'>
                    {timestamp = true}
                  </div>
                </>
              )}


              {/* <div>{date.toGMTString().split(' ')[4].split(':')[0]}</div> */}


            </div>

            <div className='caption-container'>
              <i class="far fa-smile"></i>

              {/* <input className='placeholder'></input>
              <p>Post</p> */}

              <AddCommentForm photoId={photo?.id} userId={user?.id} />
            </div>

          </div>

        ))}

      </div>
    </>
  );
};

export default PhotoList;
