import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditDeleteModal from '../EditDeleteModal';
import AddCommentForm from '../AddCommentForm';
import { useHistory } from 'react-router-dom';
import { getComments } from '../../store/comment';

import './CommentList.css'

const CommentList = ({ photo, photoId, userId }) => {

  const photosState = Object.values(useSelector(state => state.photos))
  const commentState = Object.values(useSelector(state => state.comments))

  const filteredComments = commentState.filter(comment => comment.photo_id === photo.id)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getComments())
  },[dispatch])

  console.log('filteredComments length -------------> ', filteredComments)

  let commentCount = 0;
  let numberOfComments = 0;
  let viewComments = false;

  return (
    <div >
      {/* <h3>hello from commentlist</h3> */}
      <div className='view-all-comments'>View All {filteredComments.length} Comments</div>
      {commentState.reverse().map(comment => {


        // if (numberOfComments > 3 && viewComments === true) {
        //   viewComments = false;
        //   return (
        //     <div className='view-all-comments'>View All {numberOfComments} Comments (this will open a modal when clicked)</div>
        //   )
        // }


        if (comment.photo_id === photo.id && commentCount <= 2) {
          return (
            <div>
              <div className='comment-container'>
                <div className='comment-username'>{comment.username}</div>
                <div className='comment'>{comment.content}</div>
              </div>

              <div className='commentCounter'>
                {commentCount++}
              </div>
            </div>)
        }


      })
      }
        {/* <AddCommentForm photoId={photoId} userId={userId}/> */}
    </div>
  )
}







// })}
export default CommentList
