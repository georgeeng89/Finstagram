import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditDeleteModal from '../EditDeleteModal';
import AddCommentForm from '../AddCommentForm';
import { useHistory } from 'react-router-dom';
import CommentList from '../CommentList';
import EditComment from '../EditComment';

import './PhotoList.css'

const PhotoList = () => {

  // <svg aria-label="Home" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>

  // <svg aria-label="New Post" className="_8-yf5 " color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24">
  //               <path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
  //               </path>
  //               <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001">
  //               </line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455">
  //               </line>
  //               </svg>


  const photosState = Object.values(useSelector(state => state.photos))
  const commentState = Object.values(useSelector(state => state.comments))

  // const commentLength = commentState.filter(comment => {
  //   comment.photo_id === photosState.id
  // })

  // console.log(commentLength)

  // console.log('COMMENTS ========> ', commentState)
  // let photosObj = useSelector(state => state.photos)

  // commentState.forEach(comment => console.log('MY COMMENT!!!', comment))

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

    var time = new Date(utc + (3600000*offset));

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
            <img className='picture' src={photo.url} onError={handleImage} />

            <div className='caption-container'>
              <div className='caption-username'>{photo.username}</div>
              <div className='caption'>{photo.caption}</div>
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
