import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditDeleteModal from '../EditDeleteModal';
import AddCommentForm from '../AddCommentForm';
import { useHistory } from 'react-router-dom';
import CommentList from '../CommentList';
import EditComment from '../EditComment';

import './PhotoList.css'

const PhotoList = () => {



  const photosState = Object.values(useSelector(state => state.photos))
  const commentState = Object.values(useSelector(state => state.comments))


  const user = useSelector(state => state.session.user);

  const history = useHistory();


  const handleImage = (e) => {
    e.target.src = '/static/aa_default_image.png'
  }


  let commentCount = 0;
  let numberOfComments = 0;
  let viewComments = false;
  let timestamp = false;

  // let date = new Date();

  function calcTime(offset) {
    var d = new Date();

    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    var time = new Date(utc + (3600000 * offset));

    return time.toLocaleString('en-US', { hour12: false });
  }

  let date = calcTime('-7')


  if (!user) {
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
                <a href={`/profile/${photo.user_id}`}>
                  {photo.username}
                </a>
              </div>


              {user?.id === photo.user_id && <EditDeleteModal photoId={photo?.id} photoUrl={photo?.url} photoCaption={photo.caption} />}

              {/* <EditDeleteModal /> */}
              {/* <i class="fas fa-heart"></i> */}
              {/* <i class="fa-solid fa-heart"></i> */}

            </div>
            <img className='picture' src={photo.url} onError={handleImage} />

            <div className='caption-container'>
              <div className='caption-username'>
                <a href={`/profile/${photo.user_id}`}>
                  {photo.username}
                </a>
                <span className='photo-caption-text'>
                  {photo.caption}
                </span>
                {/* <div className='caption'>{photo.caption}</div> */}
              </div>
            </div>

            {commentState.forEach(comment => {
              if (comment.photo_id === photo.id) {
                numberOfComments++
              }
            })}

            {/* <div className='view-all-comments'>
                View All {commentState.filter(comment => comment.photo_id === photo.id).length} Comments
              </div> */}


            <CommentList profileDetails={false} photo={photo} photoId={photo?.id} userId={user?.id} />

            {/* {commentState.reverse().map(comment => {


              // if (numberOfComments > 3 && viewComments === true) {
              //   viewComments = false;
              //   return (
              //     <div className='view-all-comments'>View All {numberOfComments} Comments (this will open a modal when clicked)</div>
              //   )
              // }



              // if (comment.photo_id === photo.id && commentCount <= 2) {
              //   return (
              //     <>
              //       < div className='comment-container'>
              //         <div className='comment-username'>{comment.username}</div>
              //         <div className='comment'>{comment.content}</div>
              //       </div>

              //       <div className='commentCounter'>
              //         {commentCount++}
              //       </div>
              //     </>)
              // }



            })} */}

            <div className='timestamp'>

              <div>Posted on {photo.created_at.split('GMT')}</div>
              {/* <div>today:- {date}</div> */}

              {/* {(timestamp === false) && date.toGMTString().split(' ')[1] - photo.created_at.split(' ')[1] > 1 && (
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
              )} */}

              {/* <div>{date.toGMTString().split(' ')[4].split(':')[0]}</div> */}

            </div>

            <div className='comment-form-container'>

              {/* <i class="far fa-smile"></i> */}

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
