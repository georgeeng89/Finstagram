import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditDeleteModal from '../EditDeleteModal';
import AddCommentForm from '../AddCommentForm';
import { useHistory } from 'react-router-dom';
import { getComments } from '../../store/comment';
import AddCommentFormModal from '../AddCommentFormModal';

import { CommentModal, Modal3, Modal, Modal4 } from '../context/Modal';

import { editComment } from '../../store/comment';

import EditComment from '../EditComment';

import './CommentList.css'

const CommentList = ({ profileDetails, photo, photoId, userId }) => {


  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal3, setShowModal3] = useState(false);



  const [content, setContent] = useState('')
  const [errors, setErrors] = useState([]);

  const photosState = Object.values(useSelector(state => state.photos))
  const commentState = Object.values(useSelector(state => state.comments))
  const user = useSelector(state => state.session.user);

  const filteredComments = commentState.filter(comment => comment.photo_id === photo.id)

  const dispatch = useDispatch();

  const updateContent = e => {
    setContent(e.target.value)
  }

  const handleClick = 1;

  const handleSubmit = async e => {
    e.preventDefault();


    setErrors([]);
    let data = [];

    // let comment = {
    //   user_id: userId,
    //   photo_id: photoId,
    //   content,
    //   id: commentId
    // };

    // data = await dispatch(editComment(comment));

    // if (data) {
    //   setErrors(data);
    // }

    // if (data === null) {
    //   setShowModal3(false)
    //   setShowModal1(false);
    //   setShowModal(false);
    // }
  };

  const handleImage = (e) => {
    e.target.src = '/static/aa_default_image.png'
  }


  let commentCount = 0;
  // let numberOfComments = 0;
  // let viewComments = false;

  return (
    <div >
      {/* <h3>hello from commentlist</h3> */}


      {filteredComments.length > 3 && !profileDetails && (<div className='view-all-comments' onClick={() => setShowModal(true)}>View All {filteredComments.length} Comments</div>)}

      {profileDetails && (<div className='view-all-comments' onClick={() => setShowModal(true)}>View Comments</div>)}

      {/* {<button onClick={() => setShowModal(true)} className='view-all-comments'>View All {filteredComments.length} Comments</button>} */}


      <CommentModal
        title={<img className='modal-picture' src={photo.url} onError={handleImage}></img>}
        onClose={() => {
          setShowModal(false)
          setShowModal1(false)
          setShowModal3(false)
        }}
        show={showModal}
        form={<AddCommentFormModal photoId={photoId} userId={userId} />}
      >

        {/* <div className='modal-picture'> */}
        {/* <img className='picture' src={photo.url} /> */}
        {/* </div> */}

        <div className='modal-comments'>
          <div className='photo-username'>
            <a href={`/profile/${photo.user_id}`}>
              {photo.username}
            </a>
          </div>

          <div className='comment-modal-inner-content'>
            <div className='comment-username'>
              <a href={`/profile/${photo.user_id}`}>
                {photo.username}
              </a>
              <span className='comment-text'>{photo.caption}</span>
            </div>
          </div>


          {filteredComments.map(comment => (
            <div className='comment-modal-inner-content'>
              <div className='comment-username'>
                <a href={`/profile/${comment.user_id}`}>
                  {comment.username}
                </a>

                <span className='comment-text'> {comment.content} </span>
              </div>

              {comment.user_id === user?.id && (

                <EditComment comment={comment} />

              )}
            </div>
          ))}

          {/* <h1>PLACEHOLDER ADD COMMENT</h1> */}



        </div>
        {/* <button className='delete-photo' id={photoId}>Delete</button> */}
      </CommentModal>


      {!profileDetails && commentState.reverse().map(comment => {

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
                <div className='comment-username'>
                  <a href={`/profile/${comment.user_id}`}>
                    {comment.username}
                  </a>
                  <span className='comment-text'>{comment.content}</span>
                </div>
                {user?.id === comment.user_id && <EditComment comment={comment} />}
              </div>

              <div className='commentCounter'>
                {commentCount++}
              </div>
            </div>)
        }
      })}

      {/* <AddCommentForm photoId={photoId} userId={userId}/> */}

    </div>
  )
}







// })}
export default CommentList
