import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EditDeleteModal from '../EditDeleteModal';
import AddCommentForm from '../AddCommentForm';
import { useHistory } from 'react-router-dom';
import { getComments } from '../../store/comment';

import { CommentModal, Modal3, Modal, Modal4 } from '../context/Modal';

import { editComment } from '../../store/comment';

import EditComment from '../EditComment';

import './CommentList.css'

const CommentList = ({ photo, photoId, userId }) => {


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


  let commentCount = 0;
  // let numberOfComments = 0;
  // let viewComments = false;

  return (
    <div >
      {/* <h3>hello from commentlist</h3> */}


      {filteredComments.length > 3 && (<div className='view-all-comments' onClick={() => setShowModal(true)}>View All {filteredComments.length} Comments</div>)}

      {/* {<button onClick={() => setShowModal(true)} className='view-all-comments'>View All {filteredComments.length} Comments</button>} */}


      <CommentModal
        title={<img className='modal-picture' src={photo.url}></img>}
        onClose={() => {
          setShowModal(false)
          setShowModal1(false)
          setShowModal3(false)
        }}
        show={showModal}
      >

        {/* <div className='modal-picture'> */}
        {/* <img className='picture' src={photo.url} /> */}
        {/* </div> */}

        <div className='modal-comments'>
          <div className='photo-username'>{photo.username}</div>

          {filteredComments.map(comment => (
            <div className='comment-modal-inner-content'>
              <div className='comment-username'> {comment.username} </div>
              <div className='comment-content'> {comment.content} </div>

              {comment.user_id === user.id && (


                // <button className='edit-photo' onClick={() => setShowModal1(true)}>...</button>

                <EditComment comment={comment} commentId={comment.id}/>

                // <>

                //   {/* <button onClick={() => setShowModal3(true)}>Edit</button>

                //   <button onClick={() => setShowModal1(true)}>Delete</button> */}

                  // <Modal3
                  //   title={<button id={comment.id} className='edit-photo' onClick={() => {
                  //     setShowModal3(true)
                  //     setShowModal1(false)
                  //   }}>Edit</button>}
                  //   onClose={() => setShowModal1(false)}
                  //   show={showModal1}
                  // >

                  //   <button className='delete-photo' id={photoId} onClick={handleClick}>Delete</button>

                  // </Modal3>


                  // <Modal4
                  //   title={'Edit Comment'}
                  //   onClose={() => setShowModal3(false)}
                  //   show={showModal3}
                  // >

                  //   <form onSubmit={handleSubmit}>
                  //     <div className='photo-errors'>
                  //       {errors?.map((error, ind) => (
                  //         <div key={ind}>{error}</div>
                  //       ))}
                  //     </div>

                  //     <div>
                  //       <input type='hidden' id='userId' name='userId' value={userId} />
                  //     </div>

                  //     {/* <div>
                  //       <input type='hidden' id='userId' name='userId' value={commentId=comment.id} />
                  //     </div> */}

                  //     {/* {console.log('COMMENT ID ================>', comment.id)} */}

                  //     <div>
                  //       <label htmlFor='comment'>Comment </label>
                  //       <input
                  //         name='comment'
                  //         type='text'
                  //         placeholder='Comment'
                  //         value={content}
                  //         onChange={updateContent}
                  //       />
                  //     </div>

                  //     <button className='submit-button' type='submit'>Submit Changes</button>
                  //   </form>

                  //   {/* <EditComment comment={comment} /> */}

                  // </Modal4>


                // </>

              )}





            </div>
          ))}
        </div>

        {/* <button className='delete-photo' id={photoId}>Delete</button> */}
      </CommentModal>


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
      })}

      {/* <AddCommentForm photoId={photoId} userId={userId}/> */}

    </div>
  )
}







// })}
export default CommentList
