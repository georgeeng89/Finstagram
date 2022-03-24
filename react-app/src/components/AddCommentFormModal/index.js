import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addPhoto } from '../../store/photo';
import { Modal } from '../context/Modal';
import { addComment } from '../../store/comment';
import { getComments } from '../../store/comment';

import './AddCommentFormModal.css'

function AddCommentFormModal({ photoId, userId }) {

  const [content, setContent] = useState('');
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();

  const updateContent = e => {
    setContent(e.target.value)
  }

  // useEffect(() => {

  //   dispatch(getComments())

  // },[dispatch, addComment])

  const handleSubmit = async e => {

    e.preventDefault();
    setErrors([]);
    let data = [];

    // let comment = {
    //   userId,
    //   photoId,
    //   url
    // };

    data = await dispatch(addComment(userId, photoId, content));

    if (data) {
      setErrors(data);
    }

    if (data === null) {
      setContent('');
    }

    // if (data === null) {
    //   setShowModal(false);
    // }

  };

  return (

    <div className='comment-form-modal-container'>

      <div className='comment-errors'>
        {errors?.map((error, ind) => (
          <div key={ind}>{error.split(':')[1]}</div>
        ))}
      </div>

      <form className='comment-form-modal' onSubmit={handleSubmit}>

        <i class="far fa-smile smile-icon-modal"></i>


        <div>
          {/* <label htmlFor='comment'>Comment </label> */}
          <input
            name='comment'
            type='text'
            placeholder='Add a comment...'
            value={content}
            onChange={updateContent}
          />
        </div>

        <button className='submit-button-modal' type='submit'>Post</button>

      </form>
    </div>


  )


}


export default AddCommentFormModal
